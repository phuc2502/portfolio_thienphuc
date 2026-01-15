# 📚 Portfolio MCP Server - Complete Guide

**Model Context Protocol Server for Dynamic Portfolio Management**

Version: 1.0.0  
Last Updated: 2026-01-15  
Author: AI Assistant

---

## 📑 MỤC LỤC

### [PHẦN 1: TỔNG QUAN](#phần-1-tổng-quan)
- [1.1. MCP là gì?](#11-mcp-là-gì)
- [1.2. Tính năng chính](#12-tính-năng-chính)
- [1.3. Cấu trúc dự án](#13-cấu-trúc-dự-án)
- [1.4. 2 chế độ hoạt động](#14-2-chế-độ-hoạt-động)

### [PHẦN 2: QUICK START (5 PHÚT)](#phần-2-quick-start-5-phút)
- [2.1. Setup Desktop MCP](#21-setup-desktop-mcp)
- [2.2. Test kết nối](#22-test-kết-nối)
- [2.3. Commands cơ bản](#23-commands-cơ-bản)

### [PHẦN 3: DESKTOP SETUP CHI TIẾT](#phần-3-desktop-setup-chi-tiết)
- [3.1. Cài đặt dependencies](#31-cài-đặt-dependencies)
- [3.2. Build MCP server](#32-build-mcp-server)
- [3.3. Configure Claude Desktop](#33-configure-claude-desktop)
- [3.4. Restart và test](#34-restart-và-test)

### [PHẦN 4: TROUBLESHOOTING](#phần-4-troubleshooting)
- [4.1. Lỗi "Cannot find file"](#41-lỗi-cannot-find-file)
- [4.2. Lỗi "Unable to connect"](#42-lỗi-unable-to-connect)
- [4.3. Lỗi JSON syntax](#43-lỗi-json-syntax)
- [4.4. MCP không load](#44-mcp-không-load)
- [4.5. Debug commands](#45-debug-commands)

### [PHẦN 5: MOBILE SETUP](#phần-5-mobile-setup)
- [5.1. Hiểu về Remote MCP](#51-hiểu-về-remote-mcp)
- [5.2. Deploy to Cloud](#52-deploy-to-cloud)
- [5.3. Configure Claude.ai](#53-configure-claudeai)
- [5.4. Test trên mobile](#54-test-trên-mobile)

### [PHẦN 6: API REFERENCE](#phần-6-api-reference)
- [6.1. MCP Resources](#61-mcp-resources)
- [6.2. MCP Tools](#62-mcp-tools)
- [6.3. HTTP API Endpoints](#63-http-api-endpoints)
- [6.4. Data Schema](#64-data-schema)

### [PHẦN 7: ADVANCED](#phần-7-advanced)
- [7.1. Custom deployment](#71-custom-deployment)
- [7.2. Security setup](#72-security-setup)
- [7.3. Database integration](#73-database-integration)
- [7.4. Rate limiting](#74-rate-limiting)

### [PHẦN 8: FAQ & TIPS](#phần-8-faq--tips)
- [8.1. Câu hỏi thường gặp](#81-câu-hỏi-thường-gặp)
- [8.2. Best practices](#82-best-practices)
- [8.3. Performance tips](#83-performance-tips)

---

# PHẦN 1: TỔNG QUAN

## 1.1. MCP là gì?

**Model Context Protocol (MCP)** là giao thức cho phép Claude Desktop (và các AI clients khác) tương tác với external data sources và tools.

**Portfolio MCP Server** cho phép bạn:
- ✅ Quản lý portfolio content qua AI chat
- ✅ Add/update/delete projects, skills, experiences
- ✅ Sync data tự động giữa MCP server và React website
- ✅ Export/import portfolio data

---

## 1.2. Tính năng chính

### **Resources** (Read-only data)
```
portfolio://projects      → Tất cả projects
portfolio://skills        → Tất cả skills  
portfolio://experiences   → Work experiences
portfolio://metadata      → Version info
```

### **Tools** (Actions)
```
add_project      → Thêm project mới
update_project   → Cập nhật project
delete_project   → Xóa project
get_project      → Lấy chi tiết project
add_skill        → Thêm skill
add_experience   → Thêm experience
export_portfolio → Export toàn bộ data
```

### **Data Schema**
- **Projects:** 3 items (Banking, Analytics, Security)
- **Skills:** 5 categories (BA, Technical, Methodologies)
- **Experiences:** 2 positions (Current + Past)

---

## 1.3. Cấu trúc dự án

```
portfolio_thienphuc/
├── mcp-server/                    # MCP Server
│   ├── src/
│   │   ├── index.ts              # Stdio server (Desktop)
│   │   ├── api.ts                # HTTP server (Mobile/Web)
│   │   ├── types.ts              # Zod schemas
│   │   └── data/
│   │       └── portfolio-data.json  # Source of truth
│   ├── dist/                     # Compiled JS
│   ├── package.json
│   ├── tsconfig.json
│   └── vercel.json              # Deployment config
│
├── components/                   # React components
├── test-mcp.js                  # MCP test script
├── claude_desktop_config.json   # Config template
└── MCP_COMPLETE_GUIDE.md       # This file ⭐
```

---

## 1.4. 2 chế độ hoạt động

### **Local MCP** (Desktop only) ⚡

```
Mode:      stdio (stdin/stdout)
Location:  Your Windows PC
Devices:   ✅ Claude Desktop only
Internet:  ❌ Not required
Speed:     ⚡ Very fast
Cost:      🆓 Free
Setup:     Easy
```

**Use case:** Development, desktop-only usage

**Pros:**
- Rất nhanh (no network)
- Secure (data local)
- Free forever

**Cons:**
- Desktop only
- No mobile access
- No web access

---

### **Remote MCP** (Multi-device) ☁️

```
Mode:      HTTP API (REST)
Location:  Cloud (Vercel/Railway/Render)
Devices:   ✅ Desktop + Mobile + Web
Internet:  ✅ Required
Speed:     🌐 Good
Cost:      🆓 Free tier available
Setup:     Medium complexity
```

**Use case:** Access from anywhere, mobile support

**Pros:**
- Works everywhere
- Multi-device sync
- Scalable

**Cons:**
- Needs internet
- Deployment required
- May have costs (free tier OK)

---

# PHẦN 2: QUICK START (5 PHÚT)

## 2.1. Setup Desktop MCP

### **Bước 1: Verify files tồn tại** (30 giây)

```bash
# Check MCP server
dir d:\portfolio_thienphuc\mcp-server\dist\index.js

# Check data file
dir d:\portfolio_thienphuc\mcp-server\src\data\portfolio-data.json

# Check config template
dir d:\portfolio_thienphuc\claude_desktop_config.json
```

✅ Nếu thấy tất cả files → Tiếp tục!

---

### **Bước 2: Copy config to Claude** (2 phút)

**Windows:**
```powershell
# Method 1: PowerShell
Copy-Item -Path "d:\portfolio_thienphuc\claude_desktop_config.json" `
          -Destination "$env:APPDATA\Claude\claude_desktop_config.json" `
          -Force

# Method 2: Manual
# 1. Win + R
# 2. Gõ: %APPDATA%\Claude
# 3. Copy file claude_desktop_config.json vào đó
```

**macOS:**
```bash
cp claude_desktop_config.json ~/Library/Application\ Support/Claude/
```

**Config content:**
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

---

### **Bước 3: Restart Claude Desktop** (1 phút)

**Critical:** Phải thoát HOÀN TOÀN, không chỉ đóng cửa sổ!

**Method 1 - Task Manager:**
```
1. Ctrl + Shift + Esc
2. Tìm "Claude Desktop"
3. Right-click → End Task
4. Chờ 5 giây
5. Mở lại từ Start Menu
```

**Method 2 - Taskbar:**
```
1. Right-click Claude icon
2. Chọn "Exit"
3. Chờ 5 giây
4. Mở lại
```

---

## 2.2. Test kết nối

### **Chờ MCP load** (15 giây)

Sau khi mở Claude Desktop:
- Chờ 15-20 giây
- KHÔNG chat ngay!
- MCP server đang khởi động

---

### **Test command**

Trong Claude Desktop chat:

```
Show me all my portfolio projects
```

**✅ Kết quả mong đợi:**

```
I found 3 projects in your portfolio:

1. BANKING CORE SYSTEM (2023)
   - Category: MIS
   - Tech: Spring Boot, Apache Kafka, PostgreSQL
   - Outcomes: -65% processing time, +28% satisfaction

2. PREDICTIVE ANALYTICS (2024)
   - Category: FINANCE
   - Tech: Python, XGBoost, React, Apache Airflow
   - Outcomes: 92% forecast accuracy, 3x faster decisions

3. SECURITY PROTOCOL X (2024)
   - Category: SECURITY
   - Tech: OAuth 2.0, HashiCorp Vault, Istio
   - Outcomes: -95% security incidents, 100% compliance
```

🎉 **Nếu thấy 3 projects → SUCCESS!**

---

## 2.3. Commands cơ bản

### **View data:**
```
"Show me all projects"
"What skills do I have in Business Analysis?"
"Show my work experiences"
"Get project with ID 01"
```

### **Add new:**
```
"Add a new project about AI Chatbot with React and OpenAI"
"Add skill: Docker, Advanced level, 3 years experience"
"Add experience at Google as Software Engineer"
```

### **Update:**
```
"Update project 01: change year to 2024"
"Update project 02: add demo URL https://demo.com"
```

### **Delete:**
```
"Delete project with ID 03"
```

### **Export:**
```
"Export my entire portfolio as JSON"
```

---

# PHẦN 3: DESKTOP SETUP CHI TIẾT

## 3.1. Cài đặt dependencies

### **Prerequisites:**
- ✅ Node.js >= 16.x
- ✅ npm >= 8.x
- ✅ Claude Desktop installed

**Check versions:**
```bash
node --version    # v16.x.x or higher
npm --version     # 8.x.x or higher
```

---

### **Install MCP server dependencies:**

```bash
cd d:\portfolio_thienphuc\mcp-server
npm install
```

**Packages installed:**
```json
{
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.4",
    "zod": "^3.23.8",
    "express": "^4.18.2",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "@types/node": "^22.14.0",
    "@types/express": "^4.17.21",
    "@types/cors": "^2.8.17",
    "tsx": "^4.19.2",
    "typescript": "^5.8.2"
  }
}
```

---

## 3.2. Build MCP server

### **Compile TypeScript:**

```bash
cd d:\portfolio_thienphuc\mcp-server
npm run build
```

**Output:**
```
> portfolio-mcp-server@1.0.0 build
> tsc

✅ Build successful!
```

**Verify build:**
```bash
dir dist\index.js     # Should exist
dir dist\api.js       # Should exist
dir dist\types.js     # Should exist
```

---

### **Test MCP server locally:**

```bash
# Test stdio server
node dist\index.js
# Should see: "Portfolio MCP Server running on stdio"
# Press Ctrl+C to exit

# Or use test script
node ..\test-mcp.js
# Should see: ✅ All tests passed
```

---

## 3.3. Configure Claude Desktop

### **Find config location:**

**Windows:**
```
%APPDATA%\Claude\claude_desktop_config.json
```

Full path:
```
C:\Users\<YourUsername>\AppData\Roaming\Claude\claude_desktop_config.json
```

**macOS:**
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Linux:**
```
~/.config/Claude/claude_desktop_config.json
```

---

### **Create/Edit config:**

**Content:**
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

**⚠️ Important:**
- Use `\\` (double backslash) for Windows paths
- Must be **absolute path**
- Must be valid JSON (no trailing commas)

---

### **Validate JSON:**

**Online:**
- Copy config content
- Paste vào: https://jsonlint.com/
- Check for errors

**PowerShell:**
```powershell
Get-Content "$env:APPDATA\Claude\claude_desktop_config.json" | ConvertFrom-Json
# No error = Valid JSON
```

---

## 3.4. Restart và test

### **Full restart procedure:**

1. **Close Claude Desktop:**
   - Task Manager → End Task "Claude Desktop"
   - OR Right-click taskbar icon → Exit

2. **Wait:** 5 seconds

3. **Open Claude Desktop:**
   - Start Menu → Claude Desktop

4. **Wait:** 15 seconds (MCP loading)

5. **Test:**
   ```
   Show me all my portfolio projects
   ```

6. **Verify:**
   - ✅ See 3 projects → Success!
   - ❌ Error → Go to [Troubleshooting](#phần-4-troubleshooting)

---

# PHẦN 4: TROUBLESHOOTING

## 4.1. Lỗi "Cannot find file"

### **Error message:**
```
Failed to load portfolio data: Error: ENOENT: no such file
d:\portfolio_thienphuc\mcp-server\dist\data\portfolio-data.json
```

### **Nguyên nhân:**
- MCP server tìm file sai path
- File thực tế ở: `src/data/portfolio-data.json`
- Code tìm ở: `dist/data/portfolio-data.json` ❌

---

### **Giải pháp:**

**Check source code đã fix chưa:**
```bash
# View line 20-21 của index.ts
type d:\portfolio_thienphuc\mcp-server\src\index.ts | findstr /N "DATA_FILE"
```

**Should see:**
```typescript
// When running from dist/, we need to go back to src/data
const DATA_FILE = path.join(__dirname, '..', 'src', 'data', 'portfolio-data.json');
```

**If NOT fixed:**
```bash
# Rebuild
cd d:\portfolio_thienphuc\mcp-server
npm run build

# Restart Claude Desktop
```

---

## 4.2. Lỗi "Unable to connect"

### **Error message:**
```
Unable to connect to extension server.  
Please try disabling and re-enabling the extension.
```

### **Possible causes:**

1. **Config file sai path**
2. **Node.js không cài**
3. **MCP server không build**
4. **Chưa restart Claude**

---

### **Fix Step-by-step:**

**1. Verify config:**
```powershell
Get-Content "$env:APPDATA\Claude\claude_desktop_config.json"
```

Should show valid JSON with correct path.

**2. Check Node.js:**
```bash
node --version
# Must show: v16.x.x or higher
```

**3. Verify build:**
```bash
dir d:\portfolio_thienphuc\mcp-server\dist\index.js
# Must exist
```

**4. Test MCP manually:**
```bash
cd d:\portfolio_thienphuc
node mcp-server\dist\index.js
# Should see: "Portfolio MCP Server running on stdio"
```

**5. Restart Claude Desktop:**
- Full exit (Task Manager)
- Reopen
- Wait 15 seconds

---

## 4.3. Lỗi JSON syntax

### **Error message:**
```
Could not load MCP settings
Unexpected token ',' / Invalid JSON
```

### **Common mistakes:**

**❌ Trailing comma:**
```json
{
  "mcpServers": {
    "portfolio": {
      "command": "node",
      "args": ["path"],  // ← Trailing comma!
    }
  }
}
```

**✅ Correct:**
```json
{
  "mcpServers": {
    "portfolio": {
      "command": "node",
      "args": ["path"]
    }
  }
}
```

---

### **Fix:**

**Validate JSON:**
```powershell
# Test parse
Get-Content "$env:APPDATA\Claude\claude_desktop_config.json" | ConvertFrom-Json

# If error → Fix JSON
# Use https://jsonlint.com/
```

**Recreate config:**
```powershell
$config = @"
{
  "mcpServers": {
    "portfolio": {
      "command": "node",
      "args": ["d:\\portfolio_thienphuc\\mcp-server\\dist\\index.js"]
    }
  }
}
"@

$config | Out-File -FilePath "$env:APPDATA\Claude\claude_desktop_config.json" -Encoding UTF8
```

---

## 4.4. MCP không load

### **Symptoms:**
- Claude Desktop mở OK
- Không có error
- Nhưng MCP commands không work

### **Debug:**

**1. Check Claude logs:**
```
Claude Desktop → Menu → Help → View Logs
```

Search for:
- "MCP"
- "portfolio"
- "error"

**2. Verify MCP server starts:**
```bash
# Check if process running
Get-Process | Where-Object {$_.ProcessName -eq "node"}
```

**3. Test with MCP Inspector:**
```bash
cd d:\portfolio_thienphuc\mcp-server
npm run inspector
```

**4. Rebuild and restart:**
```bash
npm run build
# Then restart Claude Desktop
```

---

## 4.5. Debug commands

### **Check setup:**

```powershell
# 1. Config exists?
Test-Path "$env:APPDATA\Claude\claude_desktop_config.json"

# 2. View config
Get-Content "$env:APPDATA\Claude\claude_desktop_config.json"

# 3. MCP server exists?
Test-Path "d:\portfolio_thienphuc\mcp-server\dist\index.js"

# 4. Data file exists?
Test-Path "d:\portfolio_thienphuc\mcp-server\src\data\portfolio-data.json"

# 5. Node.js works?
node --version
```

---

### **Test MCP manually:**

```bash
# Full test suite
cd d:\portfolio_thienphuc
node test-mcp.js

# Output should show:
# ✅ List resources - OK
# ✅ Read projects - OK  
# ✅ List tools - OK
```

---

### **Verify data file:**

```bash
# Check file readable
type d:\portfolio_thienphuc\mcp-server\src\data\portfolio-data.json

# Validate JSON
Get-Content "d:\portfolio_thienphuc\mcp-server\src\data\portfolio-data.json" | ConvertFrom-Json
```

---

# PHẦN 5: MOBILE SETUP

## 5.1. Hiểu về Remote MCP

### **Tại sao cần Remote MCP?**

**Local MCP limitations:**
- ❌ Chỉ chạy trên máy tính có Claude Desktop
- ❌ Không dùng được mobile
- ❌ Không dùng được web (Claude.ai)
- ❌ Không access từ xa

**Remote MCP benefits:**
- ✅ Dùng mọi nơi (mobile, web, desktop)
- ✅ Auto-sync across devices
- ✅ Public URL access
- ✅ Multi-user support (nếu cần)

---

### **Local vs Remote:**

| Feature | Local MCP | Remote MCP |
|---------|-----------|------------|
| **Protocol** | stdio | HTTP REST API |
| **Location** | PC local | Cloud server |
| **Access** | Desktop only | Anywhere |
| **Internet** | No | Yes |
| **Setup** | Easy | Medium |
| **Cost** | Free | Free tier OK |
| **Speed** | Fastest | Good |
| **Security** | 100% local | Depends on config |

---

## 5.2. Deploy to Cloud

### **Option A: Vercel** ⭐ RECOMMENDED

**Why Vercel:**
- ✅ Free hobby plan
- ✅ Fast deployment
- ✅ Auto HTTPS/SSL
- ✅ Global CDN

**Steps:**

**1. Install Vercel CLI:**
```bash
npm install -g vercel
```

**2. Login:**
```bash
vercel login
```

**3. Deploy:**
```bash
cd d:\portfolio_thienphuc\mcp-server
vercel --prod
```

**4. Follow prompts:**
```
? Set up and deploy? Yes
? Which scope? Your account
? Link to existing project? No
? What's your project's name? portfolio-mcp-server
? In which directory is your code located? ./
? Want to override settings? No
```

**5. Get URL:**
```
✅ Deployed to: https://portfolio-mcp-server-xxx.vercel.app
```

**6. Test:**
```bash
curl https://portfolio-mcp-server-xxx.vercel.app/health
# Should return: {"status":"ok","service":"Portfolio MCP Server"}
```

---

### **Option B: Railway.app**

**Why Railway:**
- ✅ $5 free credit/month
- ✅ GitHub auto-deploy
- ✅ Simple UI

**Steps:**

**1. Push to GitHub:**
```bash
git add .
git commit -m "Add MCP server"
git push
```

**2. Railway setup:**
- Go to: https://railway.app/
- Login with GitHub
- New Project → Deploy from GitHub
- Select: `phuc2502/portfolio_thienphuc`
- Select directory: `mcp-server`

**3. Environment variables:**
```
NODE_ENV=production
PORT=3000
```

**4. Deploy:**
- Railway auto-detects and builds
- Get URL: `https://portfolio-mcp-server.up.railway.app`

---

### **Option C: Render.com**

**Why Render:**
- ✅ Completely free
- ✅ Auto-deploy from Git

**Limitations:**
- ⏳ Sleeps after 15min inactive
- 🐌 Slow cold start

**Steps:**

**1. Create account:** https://render.com/

**2. New Web Service:**
- Connect GitHub
- Select repo
- Build Command: `npm install && npm run build`
- Start Command: `npm run start:api`

**3. Environment:**
```
NODE_ENV=production
```

**4. Deploy:**
- Wait for build
- Get URL: `https://portfolio-mcp-server.onrender.com`

---

## 5.3. Configure Claude.ai

**⚠️ Important:** Configuration ONLY works on **Claude.ai website**, NOT mobile app!

### **Steps:**

**1. Open browser:**
```
https://claude.ai/
```

**2. Login** with your Claude account

**3. Go to Settings:**
```
Click avatar (top right) → Settings
```

**4. Find Connectors/Extensions tab:**
```
Settings → Connectors
OR
Settings → Extensions
```

**5. Add Custom Connector:**
```
Click: Add Custom Connector
OR
Click: + New Connector
```

**6. Fill in details:**
```
Name: Portfolio MCP Server
Type: MCP Server
URL: https://your-deployed-url.vercel.app

Example:
https://portfolio-mcp-server-abc123.vercel.app/mcp/info
```

**7. Authentication (Optional):**
- None (for now)
- Later: Bearer Token / API Key

**8. Save:**
- Click "Save" or "Add"
- Wait 5-10 seconds for sync

**9. Verify:**
- Should see "Portfolio MCP Server" in list
- Status: Connected ✅

---

## 5.4. Test trên mobile

### **iOS / Android:**

**1. Open Claude mobile app**

**2. Check settings synced:**
```
Menu → Settings → Connectors (or Extensions)
```

You should see:
- ✅ Portfolio MCP Server
- Status: Connected

**3. New chat:**
```
Tap: New Chat
```

**4. Test command:**
```
Show me all my portfolio projects
```

**5. Expected result:**
```
I found 3 projects:

1. BANKING CORE SYSTEM (2023)
   - MIS category
   - Spring Boot, Kafka, PostgreSQL
   
2. PREDICTIVE ANALYTICS (2024)
   - FINANCE category
   - Python, XGBoost, React
   
3. SECURITY PROTOCOL X (2024)
   - SECURITY category
   - OAuth 2.0, HashiCorp Vault
```

**6. Try more commands:**
```
"What skills do I have?"
"Show my work experiences"
"Export my portfolio"
```

✅ **All working → SUCCESS!**

---

# PHẦN 6: API REFERENCE

## 6.1. MCP Resources

Resources are **read-only** data sources.

### **portfolio://projects**

**Description:** All portfolio projects

**Example request:**
```
User: "Show me all projects"
```

**Response format:**
```json
[
  {
    "id": "01",
    "title": "BANKING CORE SYSTEM",
    "category": "MIS",
    "year": "2023",
    "tech_stack": ["Spring Boot", "Kafka"],
    "outcomes": [...]
  },
  ...
]
```

---

### **portfolio://skills**

**Description:** All skills across categories

**Example request:**
```
User: "What skills do I have in Business Analysis?"
```

**Response format:**
```json
[
  {
    "id": "skill-001",
    "category": "Business Analysis",
    "name": "Requirements Gathering",
    "level": "Expert",
    "yearsOfExperience": 5
  },
  ...
]
```

---

### **portfolio://experiences**

**Description:** Work experience history

**Example request:**
```
User: "Show my work experiences"
```

**Response format:**
```json
[
  {
    "id": "exp-001",
    "company": "Tech Corp International",
    "position": "Senior Business Analyst",
    "startDate": "2022-01",
    "current": true,
    "achievements": [...]
  },
  ...
]
```

---

### **portfolio://metadata**

**Description:** Portfolio version and update info

**Response format:**
```json
{
  "lastUpdated": "2026-01-15T17:45:00+07:00",
  "version": "1.0.0"
}
```

---

## 6.2. MCP Tools

Tools are **actions** that modify data.

### **add_project**

**Description:** Add new project to portfolio

**Input schema:**
```typescript
{
  id: string;              // Unique ID (e.g., "04")
  title: string;           // Project title
  hoverTitle: string;      // Short title for hover
  cat: string;             // Category
  url: string;             // Image URL
  demoUrl?: string;        // Demo URL (optional)
  repoUrl?: string;        // Repo URL (optional)
  year: string;            // Year
  brief: string;           // Description
  strategy: string;        // Strategy section
  technical: string;       // Technical section
  methodology?: string[];  // Methodology list
  ba_focus?: string[];     // BA focus areas
  tech_stack?: string[];   // Technologies
  outcomes?: Outcome[];    // Results
}
```

**Example usage:**
```
User: "Add a new project: E-commerce Platform built with Next.js and Stripe in 2024"
```

**Result:**
```
✅ Project "E-COMMERCE PLATFORM" added successfully!
```

---

### **update_project**

**Description:** Update existing project fields

**Input schema:**
```typescript
{
  id: string;              // Project ID to update
  updates: Partial<Project>;  // Fields to update
}
```

**Example:**
```
User: "Update project 01: change demo URL to https://new-demo.com"
```

**Result:**
```
✅ Project "01" updated successfully!
```

---

### **delete_project**

**Description:** Remove project from portfolio

**Input schema:**
```typescript
{
  id: string;  // Project ID to delete
}
```

**Example:**
```
User: "Delete project with ID 03"
```

**Result:**
```
✅ Project "03" deleted successfully!
```

---

### **get_project**

**Description:** Get details of specific project

**Input schema:**
```typescript
{
  id: string;  // Project ID
}
```

**Example:**
```
User: "Get project with ID 01"
```

**Result:**
```json
{
  "id": "01",
  "title": "BANKING CORE SYSTEM",
  "year": "2023",
  ...full project details
}
```

---

### **add_skill**

**Description:** Add new skill

**Input schema:**
```typescript
{
  id: string;              // Unique ID
  category: string;        // Category
  name: string;            // Skill name
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  yearsOfExperience: number;
  description?: string;
}
```

**Example:**
```
User: "Add skill: Docker with Advanced level, 3 years experience"
```

---

### **add_experience**

**Description:** Add work experience

**Input schema:**
```typescript
{
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;       // YYYY-MM
  endDate?: string;        // YYYY-MM
  current: boolean;
  description: string;
  achievements?: string[];
  technologies?: string[];
}
```

**Example:**
```
User: "Add experience at Google as Software Engineer from 2020-01 to 2022-12"
```

---

### **export_portfolio**

**Description:** Export entire portfolio as JSON

**Input:** None

**Example:**
```
User: "Export my entire portfolio"
```

**Result:**
```json
{
  "projects": [...],
  "skills": [...],
  "experiences": [...],
  "metadata": {...}
}
```

---

## 6.3. HTTP API Endpoints

When deployed as Remote MCP (cloud), these endpoints are available:

**Base URL:** `https://your-app.vercel.app`

### **Health Check**

```http
GET /health

Response:
{
  "status": "ok",
  "service": "Portfolio MCP Server"
}
```

---

### **MCP Info**

```http
GET /mcp/info

Response:
{
  "name": "portfolio-mcp-server",
  "version": "1.0.0",
  "resources": [...],
  "tools": [...]
}
```

---

### **Projects**

```http
# Get all projects
GET /api/projects

# Get specific project
GET /api/projects/:id

# Add new project
POST /api/projects
Content-Type: application/json
Body: { project data }

# Update project
PUT /api/projects/:id
Content-Type: application/json
Body: { updates }

# Delete project
DELETE /api/projects/:id
```

---

### **Skills**

```http
GET /api/skills

Response:
[
  {
    "id": "skill-001",
    "category": "Business Analysis",
    "name": "Requirements Gathering",
    "level": "Expert",
    "yearsOfExperience": 5
  },
  ...
]
```

---

### **Experiences**

```http
GET /api/experiences

Response:
[
  {
    "id": "exp-001",
    "company": "Tech Corp International",
    "position": "Senior Business Analyst",
    ...
  },
  ...
]
```

---

### **Export**

```http
GET /api/export

Response:
{
  "projects": [...],
  "skills": [...],
  "experiences": [...],
  "metadata": {...}
}
```

---

## 6.4. Data Schema

### **Project Schema**

```typescript
interface Project {
  id: string;
  title: string;
  hoverTitle: string;
  cat: string;              // Category
  url: string;              // Image URL
  demoUrl?: string;
  repoUrl?: string;
  year: string;
  brief: string;
  strategy: string;
  technical: string;
  methodology?: string[];
  ba_focus?: string[];
  tech_stack?: string[];
  outcomes?: {
    label: string;
    value: string;
    desc: string;
  }[];
}
```

---

### **Skill Schema**

```typescript
interface Skill {
  id: string;
  category: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  yearsOfExperience: number;
  description?: string;
}
```

---

### **Experience Schema**

```typescript
interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;        // YYYY-MM
  endDate?: string;         // YYYY-MM
  current: boolean;
  description: string;
  achievements?: string[];
  technologies?: string[];
}
```

---

### **Portfolio Data Schema**

```typescript
interface PortfolioData {
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  metadata: {
    lastUpdated: string;    // ISO date
    version: string;
  };
}
```

---

# PHẦN 7: ADVANCED

## 7.1. Custom deployment

### **Deploy to AWS Lambda**

**Prerequisites:**
- AWS account
- AWS CLI configured
- Serverless framework

**Setup:**

```bash
# Install Serverless
npm install -g serverless

# Create serverless.yml
```

**serverless.yml:**
```yaml
service: portfolio-mcp-server

provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1

functions:
  api:
    handler: dist/api.handler
    events:
      - http:
          path: /{proxy+}
          method: ANY
```

**Deploy:**
```bash
serverless deploy
```

---

### **Deploy to Google Cloud Run**

**Prerequisites:**
- Google Cloud account
- gcloud CLI

**Create Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist ./dist
COPY src/data ./src/data

EXPOSE 8080

CMD ["node", "dist/api.js"]
```

**Deploy:**
```bash
gcloud run deploy portfolio-mcp \
  --source . \
  --region us-central1 \
  --allow-unauthenticated
```

---

## 7.2. Security setup

### **Add API Key Authentication**

**Update api.ts:**

```typescript
const API_KEY = process.env.MCP_API_KEY;

// Middleware
app.use((req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || authHeader !== `Bearer ${API_KEY}`) {
    return res.status(401).json({ 
      error: 'Unauthorized' 
    });
  }
  
  next();
});
```

**Set environment variable:**
```bash
# Vercel
vercel env add MCP_API_KEY

# Railway
# Add in dashboard: Settings → Environment

# Render
# Add in dashboard: Environment → Add Variable
```

---

### **Configure CORS**

**For production:**

```typescript
import cors from 'cors';

app.use(cors({
  origin: [
    'https://claude.ai',
    'https://claude.anthropic.com',
    'https://your-portfolio-site.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

---

## 7.3. Database integration

### **Use PostgreSQL instead of JSON file**

**Install dependencies:**
```bash
npm install pg
npm install --save-dev @types/pg
```

**Setup database:**

```typescript
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Get projects from DB
export async function getProjects() {
  const result = await pool.query(
    'SELECT * FROM projects ORDER BY year DESC'
  );
  return result.rows;
}

// Add project to DB
export async function addProject(project: Project) {
  await pool.query(
    `INSERT INTO projects (id, title, category, year, ...)
     VALUES ($1, $2, $3, $4, ...)`,
    [project.id, project.title, ...]
  );
}
```

**Database schema:**

```sql
CREATE TABLE projects (
  id VARCHAR(10) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(50),
  year VARCHAR(4),
  brief TEXT,
  tech_stack TEXT[], -- PostgreSQL array
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE skills (
  id VARCHAR(20) PRIMARY KEY,
  category VARCHAR(100),
  name VARCHAR(255) NOT NULL,
  level VARCHAR(20),
  years_of_experience INTEGER
);

CREATE TABLE experiences (
  id VARCHAR(20) PRIMARY KEY,
  company VARCHAR(255) NOT NULL,
  position VARCHAR(255),
  start_date DATE,
  end_date DATE,
  current BOOLEAN DEFAULT false
);
```

---

## 7.4. Rate limiting

### **Install express-rate-limit:**

```bash
npm install express-rate-limit
```

### **Configure:**

```typescript
import rateLimit from 'express-rate-limit';

// Create limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // limit each IP to 100 requests per window
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply to all routes
app.use('/api/', limiter);

// Stricter limit for write operations
const writeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,                   // 10 writes per hour
});

app.post('/api/projects', writeLimiter, async (req, res) => {
  // Handle project creation
});
```

---

# PHẦN 8: FAQ & TIPS

## 8.1. Câu hỏi thường gặp

### **Q: Claude có CLI command không?**

**A:** KHÔNG. Claude Desktop là GUI application.
- ❌ Không thể chạy: `claude` trong terminal
- ✅ Phải mở từ: Start Menu / Desktop shortcut

---

### **Q: MCP có cần chạy riêng không?**

**A:** KHÔNG. MCP server được Claude Desktop tự động khởi động.
- ❌ KHÔNG cần: `node mcp-server/dist/index.js` thủ công
- ✅ Claude tự spawn: MCP process khi mở app

---

### **Q: Có thể dùng cả Local và Remote MCP?**

**A:** CÓ!
- Desktop: Dùng Local MCP (faster)
- Mobile: Dùng Remote MCP (via Claude.ai)
- Hai chế độ hoạt động độc lập

---

### **Q: Data có bị mất khi deploy không?**

**A:** KHÔNG nếu config đúng, nhưng:
- ✅ Backup `portfolio-data.json` thường xuyên
- ✅ Dùng database cho production
- ✅ Version control với Git

---

### **Q: Làm sao biết MCP đã connect?**

**A:** Test command:
```
User: "Show me all my portfolio projects"

✅ Success: Thấy danh sách 3 projects
❌ Failed: Error message hoặc không response
```

---

### **Q: Deploy lên cloud có tốn tiền không?**

**A:** Free tier available:
- **Vercel:** Free (hobby projects)
- **Railway:** $5 credit/month  
- **Render:** Free (có giới hạn)
- **Netlify:** Free tier

---

### **Q: Có thể dùng MCP với Notion/Google Drive không?**

**A:** CÓ, nhưng:
- Cần build custom MCP server
- Integrate API của Notion/Drive
- Deploy as Remote MCP
- Configure qua Claude.ai

---

## 8.2. Best practices

### **Development:**

1. **Always backup data:**
   ```bash
   # Backup before changes
   copy mcp-server\src\data\portfolio-data.json backup\
   ```

2 **Use Git:**
   ```bash
   git add mcp-server/src/data/portfolio-data.json
   git commit -m "Update portfolio data"
   ```

3. **Test before deploy:**
   ```bash
   npm run build
   node test-mcp.js
   ```

4. **Validate data schema:**
   ```bash
   # Ensure Zod validation passes
   node -e "require('./dist/types.js')"
   ```

---

### **Production:**

1. **Use environment variables:**
   ```bash
   # Never hardcode secrets
   API_KEY=xxx
   DATABASE_URL=xxx
   ```

2. **Enable CORS properly:**
   ```typescript
   // Whitelist specific domains
   origin: ['https://claude.ai']
   ```

3. **Add rate limiting:**
   ```typescript
   // Prevent abuse
   max: 100 requests per 15 min
   ```

4. **Monitor logs:**
   ```bash
   # Vercel
   vercel logs
   
   # Railway
   railway logs
   ```

5. **Set up alerts:**
   - Error rate > 5%
   - Response time > 2s
   - Downtime detection

---

### **Security:**

1. **Use HTTPS only** (auto on Vercel/Railway)

2. **Implement authentication:**
   ```bash
   Authorization: Bearer YOUR_SECRET_KEY
   ```

3. **Sanitize inputs:**
   ```typescript
   // Use Zod validation
   PortfolioDataSchema.parse(input)
   ```

4. **Limit file access:**
   ```typescript
   // Only allow read/write to data file
   // No arbitrary file access
   ```

---

## 8.3. Performance tips

### **Optimize data loading:**

```typescript
// Cache data in memory
private portfolioData: PortfolioData | null = null;

async loadPortfolioData() {
  if (this.portfolioData) {
    return this.portfolioData; // ← Cache hit
  }
  
  // Load from file only if cache miss
  this.portfolioData = await loadFromFile();
  return this.portfolioData;
}
```

---

### **Minimize builds:**

```bash
# Only rebuild when source changes
npm run build

# Use watch mode for development
npm run dev
```

---

### **Use CDN for static assets:**

```typescript
// Store images on Cloudinary/Imgur
url: "https://cloudinary.com/your-image.jpg"

// Not local paths
url: "/public/images/project.jpg" ❌
```

---

### **Database indexing:**

```sql
-- Index frequently queried fields
CREATE INDEX idx_projects_year ON projects(year);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_skills_category ON skills(category);
```

---

### **Enable compression:**

```typescript
import compression from 'compression';

app.use(compression());
```

---

### **Use pagination for large datasets:**

```typescript
// GET /api/projects?page=1&limit=10
app.get('/api/projects', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  
  const projects = allProjects.slice(offset, offset + limit);
  
  res.json({
    data: projects,
    page,
    total: allProjects.length
  });
});
```

---

## 🎊 KẾT LUẬN

**Bạn đã có hệ thống Portfolio MCP hoàn chỉnh!**

### **✅ Những gì đã setup:**

- [x] MCP Server (Local & Remote)
- [x] Claude Desktop integration
- [x] Mobile support (optional)
- [x] HTTP API endpoints
- [x] Data validation (Zod)
- [x] TypeScript typing
- [x] Deployment configs
- [x] Complete documentation

---

### **📚 Quick Reference:**

**Desktop Setup:**
1. Copy config to `%APPDATA%\Claude\`
2. Restart Claude Desktop
3. Test: "Show me all projects"

**Mobile Setup:**
1. Deploy to Vercel: `vercel --prod`
2. Configure on Claude.ai
3. Test on mobile app

**Troubleshooting:**
- Check [Part 4](#phần-4-troubleshooting)
- Run: `node test-mcp.js`
- View Claude logs

---

### **🚀 Next Steps:**

**Immediate:**
- [ ] Restart Claude Desktop để test
- [ ] Verify MCP connection works
- [ ] Try các commands khác nhau

**Optional:**
- [ ] Deploy to cloud (Vercel)
- [ ] Setup mobile access
- [ ] Add authentication
- [ ] Migrate to database

**Advanced:**
- [ ] Custom deployment (AWS/GCP)
- [ ] Rate limiting & monitoring
- [ ] Multi-user support
- [ ] API analytics

---

### **📞 Support:**

**Documentation:**
- This file: `MCP_COMPLETE_GUIDE.md`
- MCP Server README: `mcp-server/README.md`

**Testing:**
- Test script: `test-mcp.js`
- MCP Inspector: `npm run inspector`

**Community:**
- Claude Discord: https://discord.gg/anthropic
- MCP Docs: https://modelcontextprotocol.io/

---

**🎉 Chúc mừng! Bạn đã master Portfolio MCP Server!**

---

*Document version: 1.0.0*  
*Last updated: 2026-01-15*  
*Total sections: 8 parts, 40+ topics*  
*Estimated reading time: 45 minutes*
