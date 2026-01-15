#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema,
    ListResourcesRequestSchema,
    ListToolsRequestSchema,
    ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { PortfolioDataSchema, type PortfolioData, type Project, type Skill, type Experience } from './types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to portfolio data file
// When running from dist/, we need to go back to src/data
const DATA_FILE = path.join(__dirname, '..', 'src', 'data', 'portfolio-data.json');

class PortfolioMCPServer {
    private server: Server;
    private portfolioData: PortfolioData | null = null;

    constructor() {
        this.server = new Server(
            {
                name: 'portfolio-mcp-server',
                version: '1.0.0',
            },
            {
                capabilities: {
                    resources: {},
                    tools: {},
                },
            }
        );

        this.setupHandlers();
        this.setupErrorHandling();
    }

    private async loadPortfolioData(): Promise<PortfolioData> {
        if (this.portfolioData) {
            return this.portfolioData;
        }

        try {
            const rawData = await fs.readFile(DATA_FILE, 'utf-8');
            const parsedData = JSON.parse(rawData);
            this.portfolioData = PortfolioDataSchema.parse(parsedData);
            return this.portfolioData;
        } catch (error) {
            throw new Error(`Failed to load portfolio data: ${error}`);
        }
    }

    private async savePortfolioData(data: PortfolioData): Promise<void> {
        try {
            const validatedData = PortfolioDataSchema.parse(data);
            validatedData.metadata.lastUpdated = new Date().toISOString();
            await fs.writeFile(DATA_FILE, JSON.stringify(validatedData, null, 2), 'utf-8');
            this.portfolioData = validatedData;
        } catch (error) {
            throw new Error(`Failed to save portfolio data: ${error}`);
        }
    }

    private setupErrorHandling(): void {
        this.server.onerror = (error) => {
            console.error('[MCP Error]', error);
        };

        process.on('SIGINT', async () => {
            await this.server.close();
            process.exit(0);
        });
    }

    private setupHandlers(): void {
        // List available resources
        this.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
            resources: [
                {
                    uri: 'portfolio://projects',
                    mimeType: 'application/json',
                    name: 'All Projects',
                    description: 'Complete list of portfolio projects',
                },
                {
                    uri: 'portfolio://skills',
                    mimeType: 'application/json',
                    name: 'All Skills',
                    description: 'Complete list of technical and professional skills',
                },
                {
                    uri: 'portfolio://experiences',
                    mimeType: 'application/json',
                    name: 'Work Experiences',
                    description: 'Complete work experience history',
                },
                {
                    uri: 'portfolio://metadata',
                    mimeType: 'application/json',
                    name: 'Portfolio Metadata',
                    description: 'Portfolio version and last update information',
                },
            ],
        }));

        // Read resource content
        this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
            const data = await this.loadPortfolioData();
            const uri = request.params.uri;

            if (uri === 'portfolio://projects') {
                return {
                    contents: [
                        {
                            uri,
                            mimeType: 'application/json',
                            text: JSON.stringify(data.projects, null, 2),
                        },
                    ],
                };
            }

            if (uri === 'portfolio://skills') {
                return {
                    contents: [
                        {
                            uri,
                            mimeType: 'application/json',
                            text: JSON.stringify(data.skills, null, 2),
                        },
                    ],
                };
            }

            if (uri === 'portfolio://experiences') {
                return {
                    contents: [
                        {
                            uri,
                            mimeType: 'application/json',
                            text: JSON.stringify(data.experiences, null, 2),
                        },
                    ],
                };
            }

            if (uri === 'portfolio://metadata') {
                return {
                    contents: [
                        {
                            uri,
                            mimeType: 'application/json',
                            text: JSON.stringify(data.metadata, null, 2),
                        },
                    ],
                };
            }

            throw new Error(`Unknown resource: ${uri}`);
        });

        // List available tools
        this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
            tools: [
                {
                    name: 'add_project',
                    description: 'Add a new project to the portfolio',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', description: 'Unique project ID' },
                            title: { type: 'string', description: 'Project title' },
                            hoverTitle: { type: 'string', description: 'Short title for hover state' },
                            cat: { type: 'string', description: 'Project category' },
                            url: { type: 'string', description: 'Project image URL' },
                            demoUrl: { type: 'string', description: 'Demo URL (optional)' },
                            repoUrl: { type: 'string', description: 'Repository URL (optional)' },
                            year: { type: 'string', description: 'Project year' },
                            brief: { type: 'string', description: 'Project brief description' },
                            strategy: { type: 'string', description: 'Strategy description' },
                            technical: { type: 'string', description: 'Technical description' },
                            methodology: { type: 'array', items: { type: 'string' }, description: 'Methodology list' },
                            ba_focus: { type: 'array', items: { type: 'string' }, description: 'BA focus areas' },
                            tech_stack: { type: 'array', items: { type: 'string' }, description: 'Technologies used' },
                            outcomes: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        label: { type: 'string' },
                                        value: { type: 'string' },
                                        desc: { type: 'string' },
                                    },
                                    required: ['label', 'value', 'desc'],
                                },
                                description: 'Project outcomes',
                            },
                        },
                        required: ['id', 'title', 'hoverTitle', 'cat', 'url', 'year', 'brief', 'strategy', 'technical'],
                    },
                },
                {
                    name: 'update_project',
                    description: 'Update an existing project',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', description: 'Project ID to update' },
                            updates: { type: 'object', description: 'Fields to update' },
                        },
                        required: ['id', 'updates'],
                    },
                },
                {
                    name: 'delete_project',
                    description: 'Delete a project from the portfolio',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', description: 'Project ID to delete' },
                        },
                        required: ['id'],
                    },
                },
                {
                    name: 'get_project',
                    description: 'Get a specific project by ID',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', description: 'Project ID' },
                        },
                        required: ['id'],
                    },
                },
                {
                    name: 'add_skill',
                    description: 'Add a new skill to the portfolio',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', description: 'Unique skill ID' },
                            category: { type: 'string', description: 'Skill category' },
                            name: { type: 'string', description: 'Skill name' },
                            level: { type: 'string', enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] },
                            yearsOfExperience: { type: 'number', description: 'Years of experience' },
                            description: { type: 'string', description: 'Skill description (optional)' },
                        },
                        required: ['id', 'category', 'name', 'level', 'yearsOfExperience'],
                    },
                },
                {
                    name: 'add_experience',
                    description: 'Add a new work experience',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', description: 'Unique experience ID' },
                            company: { type: 'string', description: 'Company name' },
                            position: { type: 'string', description: 'Job position' },
                            location: { type: 'string', description: 'Work location' },
                            startDate: { type: 'string', description: 'Start date (YYYY-MM)' },
                            endDate: { type: 'string', description: 'End date (YYYY-MM, optional)' },
                            current: { type: 'boolean', description: 'Currently working here' },
                            description: { type: 'string', description: 'Job description' },
                            achievements: { type: 'array', items: { type: 'string' }, description: 'Key achievements' },
                            technologies: { type: 'array', items: { type: 'string' }, description: 'Technologies used' },
                        },
                        required: ['id', 'company', 'position', 'location', 'startDate', 'current', 'description'],
                    },
                },
                {
                    name: 'export_portfolio',
                    description: 'Export entire portfolio data as JSON',
                    inputSchema: {
                        type: 'object',
                        properties: {},
                    },
                },
            ],
        }));

        // Handle tool calls
        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            const { name, arguments: args } = request.params;

            try {
                switch (name) {
                    case 'add_project': {
                        const data = await this.loadPortfolioData();
                        const newProject = args as Project;

                        // Check if project ID already exists
                        if (data.projects.find(p => p.id === newProject.id)) {
                            throw new Error(`Project with ID ${newProject.id} already exists`);
                        }

                        data.projects.push(newProject);
                        await this.savePortfolioData(data);

                        return {
                            content: [
                                {
                                    type: 'text',
                                    text: `Project "${newProject.title}" added successfully!`,
                                },
                            ],
                        };
                    }

                    case 'update_project': {
                        const data = await this.loadPortfolioData();
                        const { id, updates } = args as { id: string; updates: Partial<Project> };

                        const projectIndex = data.projects.findIndex(p => p.id === id);
                        if (projectIndex === -1) {
                            throw new Error(`Project with ID ${id} not found`);
                        }

                        data.projects[projectIndex] = { ...data.projects[projectIndex], ...updates };
                        await this.savePortfolioData(data);

                        return {
                            content: [
                                {
                                    type: 'text',
                                    text: `Project "${id}" updated successfully!`,
                                },
                            ],
                        };
                    }

                    case 'delete_project': {
                        const data = await this.loadPortfolioData();
                        const { id } = args as { id: string };

                        const initialLength = data.projects.length;
                        data.projects = data.projects.filter(p => p.id !== id);

                        if (data.projects.length === initialLength) {
                            throw new Error(`Project with ID ${id} not found`);
                        }

                        await this.savePortfolioData(data);

                        return {
                            content: [
                                {
                                    type: 'text',
                                    text: `Project "${id}" deleted successfully!`,
                                },
                            ],
                        };
                    }

                    case 'get_project': {
                        const data = await this.loadPortfolioData();
                        const { id } = args as { id: string };

                        const project = data.projects.find(p => p.id === id);
                        if (!project) {
                            throw new Error(`Project with ID ${id} not found`);
                        }

                        return {
                            content: [
                                {
                                    type: 'text',
                                    text: JSON.stringify(project, null, 2),
                                },
                            ],
                        };
                    }

                    case 'add_skill': {
                        const data = await this.loadPortfolioData();
                        const newSkill = args as Skill;

                        if (data.skills.find(s => s.id === newSkill.id)) {
                            throw new Error(`Skill with ID ${newSkill.id} already exists`);
                        }

                        data.skills.push(newSkill);
                        await this.savePortfolioData(data);

                        return {
                            content: [
                                {
                                    type: 'text',
                                    text: `Skill "${newSkill.name}" added successfully!`,
                                },
                            ],
                        };
                    }

                    case 'add_experience': {
                        const data = await this.loadPortfolioData();
                        const newExperience = args as Experience;

                        if (data.experiences.find(e => e.id === newExperience.id)) {
                            throw new Error(`Experience with ID ${newExperience.id} already exists`);
                        }

                        data.experiences.push(newExperience);
                        await this.savePortfolioData(data);

                        return {
                            content: [
                                {
                                    type: 'text',
                                    text: `Experience at "${newExperience.company}" added successfully!`,
                                },
                            ],
                        };
                    }

                    case 'export_portfolio': {
                        const data = await this.loadPortfolioData();

                        return {
                            content: [
                                {
                                    type: 'text',
                                    text: JSON.stringify(data, null, 2),
                                },
                            ],
                        };
                    }

                    default:
                        throw new Error(`Unknown tool: ${name}`);
                }
            } catch (error) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                        },
                    ],
                    isError: true,
                };
            }
        });
    }

    async run(): Promise<void> {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.error('Portfolio MCP Server running on stdio');
    }
}

const server = new PortfolioMCPServer();
server.run().catch(console.error);
