# Portfolio MCP Server - Quick Reference

**📚 Main Documentation:** [MCP_COMPLETE_GUIDE.md](./MCP_COMPLETE_GUIDE.md)

---

## 🚀 Quick Start (30 giây)

### Desktop MCP:
```bash
# 1. Copy config
Copy-Item "claude_desktop_config.json" "$env:APPDATA\Claude\"

# 2. Restart Claude Desktop
# Task Manager → End Task → Reopen

# 3. Test
# "Show me all my portfolio projects"
```

### Mobile MCP:
```bash
# 1. Deploy
cd mcp-server && vercel --prod

# 2. Configure
# https://claude.ai/ → Settings → Connectors

# 3. Test on mobile app
```

---

## 📖 Documentation

| Need | Read |
|------|------|
| **Everything** | `MCP_COMPLETE_GUIDE.md` ⭐ (Master doc) |
| Server API | `mcp-server/README.md` |
| Test | `node test-mcp.js` |

---

## 🗂️ Archived Files

Các file documentation cũ đã được gộp vào `MCP_COMPLETE_GUIDE.md`:

**Moved to archive:**
- ~~MCP_QUICKSTART.md~~ → Part 2
- ~~MCP_INTEGRATION_GUIDE.md~~ → Part 3
- ~~MCP_CHECKLIST.md~~ → Part 3
- ~~MCP_SETUP_COMPLETE.md~~ → Part 1
- ~~MCP_SUMMARY.md~~ → Part 1
- ~~MCP_FIX_GUIDE.md~~ → Part 4
- ~~MCP_CONNECTION_TEST.md~~ → Part 2 & 4
- ~~MCP_QUICK_FIX.md~~ → Part 2
- ~~MCP_MOBILE_SETUP.md~~ → Part 5
- ~~MCP_MOBILE_SUMMARY.md~~ → Part 5
- ~~MCP_ERROR_FIXED.md~~ → Part 4

**Keep:**
- ✅ `MCP_COMPLETE_GUIDE.md` - Master documentation
- ✅ `mcp-server/README.md` - Server-specific docs
- ✅ `test-mcp.js` - Test script
- ✅ `claude_desktop_config.json` - Config template
- ✅ `README.md` - This file

---

## ⚡ Common Commands

```bash
# Build MCP server
cd mcp-server && npm run build

# Test MCP
node test-mcp.js

# Start API server (for mobile)
cd mcp-server && npm run start:api

# Deploy to Vercel
cd mcp-server && vercel --prod
```

---

## 🐛 Troubleshooting

**Error:** Cannot find file
```bash
# Rebuild MCP server
cd mcp-server && npm run build
# Restart Claude Desktop
```

**Error:** Unable to connect
```bash
# Check config
Get-Content "$env:APPDATA\Claude\claude_desktop_config.json"
# Verify Node.js
node --version
```

**Full troubleshooting:** See [MCP_COMPLETE_GUIDE.md - Part 4](./MCP_COMPLETE_GUIDE.md#phần-4-troubleshooting)

---

## 📊 Current Status

```
✅ MCP Server built
✅ Data file ready (3 projects, 5 skills, 2 experiences)
✅ Config template available
✅ Test script works
✅ Documentation complete
⚠️ Need: Restart Claude Desktop to connect
```

---

## 🎯 Next Steps

**Now:**
1. Read: [MCP_COMPLETE_GUIDE.md - Part 2](./MCP_COMPLETE_GUIDE.md#phần-2-quick-start-5-phút)
2. Setup Desktop MCP (5 min)
3. Test connection

**Later:**
- Deploy for mobile (Part 5)
- Advanced features (Part 7)

---

**📚 Full Guide:** [MCP_COMPLETE_GUIDE.md](./MCP_COMPLETE_GUIDE.md) (200+ pages, 8 parts, mục lục chi tiết)
