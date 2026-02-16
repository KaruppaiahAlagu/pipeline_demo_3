const express = require('express');
const app = express();
const PORT = process.env.PORT || 3004;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'Allahuu akbar',
        version: '1.0.0',
        endpoints: {
            health: '/health',
            api: '/api',
            users: '/api/users'
        }
    });
});

app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

// API Routes
app.get('/api', (req, res) => {
    res.json({
        message: 'API endpoint',
        availableRoutes: ['/api/users']
    });
});

// Sample users endpoint
app.get('/api/users', (req, res) => {
    res.json({
        users: [
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
        ]
    });
});

app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    res.status(201).json({
        message: 'User created successfully',
        user: { id: 3, name, email }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.path
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📝 Available endpoints:`);
    console.log(`   GET  /`);
    console.log(`   GET  /health`);
    console.log(`   GET  /api`);
    console.log(`   GET  /api/users`);
    console.log(`   POST /api/users`);
});
