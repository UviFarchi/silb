const express = require('express');
const Queue = require('bull');
const bodyParser = require('body-parser');
const cors = require('cors');
const jobProcessor = require('./jobProcessor');
const path = require('path'); // Import path module

const app = express();

// Enable CORS
app.use(cors());

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Create a Bull queue with Redis connection details
const jobQueue = new Queue('jobQueue', {
    redis: {
        host: '127.0.0.1',
        port: 6379,
    },
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// API Routes
// Handle incoming requests to start a job
app.post('/start-job', async (req, res) => {
    const jobData = req.body;
    console.log('Job Data:', jobData);

    try {
        const job = await jobQueue.add(jobData);
        console.log('Job added with ID:', job.id);
        res.json({ jobId: job.id }); // Respond immediately with job ID
    } catch (error) {
        console.error('Error adding job to the queue:', error);
        res.status(500).send('Error adding job to the queue');
    }
});

// SSE endpoint for clients to listen for job completion
app.get('/events', (req, res) => {
    console.log(req.body)
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const onComplete = (job, result) => {
        const payload = {
            jobId: job.id,
            ...result, // Spread the result object to include result and url directly
        };
        res.write(`data: ${JSON.stringify(payload)}\n\n`);
    };

    jobQueue.on('completed', onComplete);

    req.on('close', () => {
        jobQueue.removeListener('completed', onComplete);
        res.end();
    });
});

// Background job processor
jobQueue.process(async (job) => {
    // Log job data to console
    console.log('Processing job:', job.data);

    await jobProcessor.run();

    console.log('Job processing complete:', job.id);
    return { result: 'Cita lista', url: 'http://localhost:3000' };
});

// Error handling for Redis connection
jobQueue.on('error', (error) => {
    console.error('Redis connection error:', error);
});

// Handle client-side routing by serving index.html for all unmatched routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
