import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { PortfolioDataSchema } from './types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, '..', 'src', 'data', 'portfolio-data.json');

// Middleware
app.use(cors({
    origin: '*', // For production, specify allowed origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'Portfolio MCP Server' });
});

// MCP Metadata endpoint
app.get('/mcp/info', (req, res) => {
    res.json({
        name: 'portfolio-mcp-server',
        version: '1.0.0',
        description: 'MCP Server for Portfolio Content Management',
        resources: [
            'portfolio://projects',
            'portfolio://skills',
            'portfolio://experiences',
            'portfolio://metadata',
        ],
        tools: [
            'add_project',
            'update_project',
            'delete_project',
            'get_project',
            'add_skill',
            'add_experience',
            'export_portfolio',
        ],
    });
});

// Get all projects
app.get('/api/projects', async (req, res) => {
    try {
        const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'));
        const validatedData = PortfolioDataSchema.parse(data);
        res.json(validatedData.projects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load projects' });
    }
});

// Get specific project
app.get('/api/projects/:id', async (req, res) => {
    try {
        const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'));
        const validatedData = PortfolioDataSchema.parse(data);
        const project = validatedData.projects.find(p => p.id === req.params.id);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.json(project);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load project' });
    }
});

// Get all skills
app.get('/api/skills', async (req, res) => {
    try {
        const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'));
        const validatedData = PortfolioDataSchema.parse(data);
        res.json(validatedData.skills);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load skills' });
    }
});

// Get all experiences
app.get('/api/experiences', async (req, res) => {
    try {
        const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'));
        const validatedData = PortfolioDataSchema.parse(data);
        res.json(validatedData.experiences);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load experiences' });
    }
});

// Add new project
app.post('/api/projects', async (req, res) => {
    try {
        const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'));
        const validatedData = PortfolioDataSchema.parse(data);

        const newProject = req.body;

        // Check if project ID already exists
        if (validatedData.projects.find(p => p.id === newProject.id)) {
            return res.status(400).json({ error: `Project with ID ${newProject.id} already exists` });
        }

        validatedData.projects.push(newProject);
        validatedData.metadata.lastUpdated = new Date().toISOString();

        await fs.writeFile(DATA_FILE, JSON.stringify(validatedData, null, 2), 'utf-8');

        res.status(201).json({ message: 'Project added successfully', project: newProject });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add project' });
    }
});

// Update project
app.put('/api/projects/:id', async (req, res) => {
    try {
        const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'));
        const validatedData = PortfolioDataSchema.parse(data);

        const projectIndex = validatedData.projects.findIndex(p => p.id === req.params.id);

        if (projectIndex === -1) {
            return res.status(404).json({ error: 'Project not found' });
        }

        validatedData.projects[projectIndex] = {
            ...validatedData.projects[projectIndex],
            ...req.body
        };
        validatedData.metadata.lastUpdated = new Date().toISOString();

        await fs.writeFile(DATA_FILE, JSON.stringify(validatedData, null, 2), 'utf-8');

        res.json({
            message: 'Project updated successfully',
            project: validatedData.projects[projectIndex]
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update project' });
    }
});

// Delete project
app.delete('/api/projects/:id', async (req, res) => {
    try {
        const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'));
        const validatedData = PortfolioDataSchema.parse(data);

        const initialLength = validatedData.projects.length;
        validatedData.projects = validatedData.projects.filter(p => p.id !== req.params.id);

        if (validatedData.projects.length === initialLength) {
            return res.status(404).json({ error: 'Project not found' });
        }

        validatedData.metadata.lastUpdated = new Date().toISOString();

        await fs.writeFile(DATA_FILE, JSON.stringify(validatedData, null, 2), 'utf-8');

        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete project' });
    }
});

// Export entire portfolio
app.get('/api/export', async (req, res) => {
    try {
        const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'));
        const validatedData = PortfolioDataSchema.parse(data);
        res.json(validatedData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to export portfolio' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Portfolio MCP API running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`MCP Info: http://localhost:${PORT}/mcp/info`);
});

export default app;
