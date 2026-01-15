#!/usr/bin/env node

/**
 * Test script for Portfolio MCP Server
 * Run: node test-mcp.js
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serverPath = join(__dirname, 'mcp-server', 'dist', 'index.js');

console.log('🚀 Testing MCP Server...\n');

// Start the server
const server = spawn('node', [serverPath], {
    stdio: ['pipe', 'pipe', 'pipe']
});

// Test: List resources
setTimeout(() => {
    console.log('📋 Test 1: Listing resources...');

    const listResourcesRequest = JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'resources/list'
    }) + '\n';

    server.stdin.write(listResourcesRequest);
}, 1000);

// Test: Read projects resource
setTimeout(() => {
    console.log('📦 Test 2: Reading projects resource...');

    const readResourceRequest = JSON.stringify({
        jsonrpc: '2.0',
        id: 2,
        method: 'resources/read',
        params: {
            uri: 'portfolio://projects'
        }
    }) + '\n';

    server.stdin.write(readResourceRequest);
}, 2000);

// Test: List tools
setTimeout(() => {
    console.log('🛠️  Test 3: Listing available tools...');

    const listToolsRequest = JSON.stringify({
        jsonrpc: '2.0',
        id: 3,
        method: 'tools/list'
    }) + '\n';

    server.stdin.write(listToolsRequest);
}, 3000);

// Handle server output
server.stdout.on('data', (data) => {
    const response = data.toString();
    try {
        const json = JSON.parse(response);
        console.log('\n✅ Response:', JSON.stringify(json, null, 2));
    } catch (e) {
        console.log('📤 Output:', response);
    }
});

server.stderr.on('data', (data) => {
    console.log('ℹ️  Server:', data.toString());
});

server.on('close', (code) => {
    console.log(`\n🏁 Server exited with code ${code}`);
});

// Cleanup after 5 seconds
setTimeout(() => {
    console.log('\n🛑 Stopping test...');
    server.kill();
    process.exit(0);
}, 5000);
