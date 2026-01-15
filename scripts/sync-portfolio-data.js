/**
 * Sync Portfolio Data from MCP to React
 * Run before build to ensure data is up-to-date
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const MCP_DATA_PATH = path.join(__dirname, '..', 'mcp-server', 'src', 'data', 'portfolio-data.json');
const PUBLIC_DATA_PATH = path.join(__dirname, '..', 'public', 'portfolio-data.json');

console.log('🔄 Syncing portfolio data...\n');

try {
    // Read MCP data
    console.log('📖 Reading from:', MCP_DATA_PATH);
    const mcpData = fs.readFileSync(MCP_DATA_PATH, 'utf-8');
    const portfolioData = JSON.parse(mcpData);

    // Validate structure
    if (!portfolioData.projects || !portfolioData.skills || !portfolioData.experiences) {
        throw new Error('Invalid portfolio data structure');
    }

    // Ensure public directory exists
    const publicDir = path.dirname(PUBLIC_DATA_PATH);
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    // Write to public
    console.log('💾 Writing to:', PUBLIC_DATA_PATH);
    fs.writeFileSync(PUBLIC_DATA_PATH, JSON.stringify(portfolioData, null, 2));

    // Stats
    console.log('\n✅ Sync complete!');
    console.log(`   - Projects: ${portfolioData.projects.length}`);
    console.log(`   - Skills: ${portfolioData.skills.length}`);
    console.log(`   - Experiences: ${portfolioData.experiences.length}`);
    console.log(`   - Last updated: ${portfolioData.metadata.lastUpdated}\n`);

} catch (error) {
    console.error('❌ Sync failed:', error.message);
    process.exit(1);
}
