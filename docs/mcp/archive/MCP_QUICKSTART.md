# 🚀 MCP Quick Start

## 5 Phút để Setup và Sử dụng MCP Server

### ✅ Bước 1: Verify Setup (30 giây)

MCP server đã được built sẵn! Kiểm tra:

```bash
# Verify files exist
ls mcp-server/dist/index.js
ls mcp-server/src/data/portfolio-data.json
```

✅ Nếu thấy files → Tiếp tục bước 2!

---

### ✅ Bước 2: Configure Claude Desktop (2 phút)

**Windows:**
1. Nhấn `Win + R`
2. Gõ: `%APPDATA%\Claude`
3. Mở file `claude_desktop_config.json`
4. Thêm vào:

```json
{
  "mcpServers": {
    "portfolio": {
      "command": "node",
      "args": ["d:\\portfolio_thienphuc\\mcp-server\\dist\\index.js"]
    }
  }
}
```

**macOS/Linux:**
1. Mở terminal
2. Edit: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
3. Thêm config như trên (adjust path)

---

### ✅ Bước 3: Restart Claude Desktop (10 giây)

1. Thoát hoàn toàn Claude Desktop
2. Mở lại Claude Desktop
3. Wait for MCP server to load

---

### ✅ Bước 4: Test MCP (1 phút)

Trong Claude Desktop, chat:

```
Show me all my portfolio projects
```

Nếu thấy list 3 projects → ✅ **SUCCESS!**

---

### ✅ Bước 5: Try Advanced Commands (1.5 phút)

```
"What skills do I have?"
```

```
"Show me work experiences"
```

```
"Add a new project about AI chatbot with React and OpenAI"
```

---

## 🎯 Cheat Sheet - Common Commands

### 📋 View Data
```
"Show me all projects"
"What skills do I have in Business Analysis?"
"Show my work experiences"
"Get project with ID 01"
```

### ➕ Add New
```
"Add a new project: [describe project]"
"Add a skill: Python, Expert level, 5 years"
"Add experience at Google as Software Engineer"
```

### ✏️ Update
```
"Update project 01: change year to 2024"
"Update project 02: add demo URL https://demo.com"
```

### 🗑️ Delete
```
"Delete project with ID 03"
```

### 📤 Export
```
"Export my entire portfolio as JSON"
```

---

## 🔧 Integration với React (Optional)

### Method 1: Direct Import
```typescript
import portfolioData from '@data/portfolio-data.json';
const projects = portfolioData.projects;
```

### Method 2: Fetch from Public
```typescript
useEffect(() => {
  fetch('/portfolio-data.json')
    .then(res => res.json())
    .then(data => setProjects(data.projects));
}, []);
```

### Method 3: With Sync Script
```bash
# Before build
npm run sync-data  # Copy MCP data to public folder
npm run dev
```

---

## 🎨 Architecture

![MCP Architecture](./artifacts/mcp_architecture_diagram.png)

**Data Flow:**
1. You talk to Claude Desktop
2. Claude uses MCP Protocol to communicate with MCP Server
3. MCP Server reads/writes `portfolio-data.json`
4. React Portfolio fetches data from JSON file
5. Display on website

---

## 🐛 Troubleshooting

### Claude không nhận MCP server?
- ✅ Check path trong config đúng chưa (absolute path)
- ✅ File `dist/index.js` có tồn tại không
- ✅ Restart Claude Desktop lại
- ✅ Check Claude logs (Help → View Logs)

### MCP server lỗi?
```bash
cd mcp-server
npm run build
```

### Data không update?
```bash
# Verify data file
cat mcp-server/src/data/portfolio-data.json | jq .

# Test server
node test-mcp.js
```

---

## 📚 Full Documentation

Cho detailed guides:
- **`MCP_INTEGRATION_GUIDE.md`** - Complete integration guide
- **`mcp-server/README.md`** - Server documentation
- **`MCP_CHECKLIST.md`** - Full checklist
- **`MCP_SETUP_COMPLETE.md`** - Setup summary

---

## 🎊 That's It!

Trong **5 phút** bạn đã có:
- ✅ Working MCP Server
- ✅ Claude Desktop integration
- ✅ Dynamic portfolio management
- ✅ AI-powered content updates

**Enjoy managing your portfolio with AI! 🚀**

---

Need help? Check the full docs or ask Claude:
```
"How do I add a new project to my portfolio?"
```
