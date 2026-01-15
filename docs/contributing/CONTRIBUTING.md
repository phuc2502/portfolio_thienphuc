# Contributing to Portfolio MCP Server

First off, thank you for considering contributing to Portfolio MCP Server! 🎉

It's people like you that make Portfolio MCP Server such a great tool. We welcome contributions from everyone, whether you're fixing a typo or implementing a major feature.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Testing](#testing)

---

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to project maintainers.

### Our Standards

**Examples of behavior that contributes to a positive environment:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Examples of unacceptable behavior:**
- Trolling, insulting/derogatory comments, and personal attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

---

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

**Bug Report Template:**

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Run command '....'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots/Logs**
If applicable, add screenshots or error logs.

**Environment:**
 - OS: [e.g., Windows 11, macOS 14]
 - Node.js version: [e.g., 18.17.0]
 - Claude Desktop version: [e.g., 1.0.0]
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

**Feature Request Template:**

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Any alternative solutions or features you've considered.

**Additional context**
Any other context or screenshots about the feature request.
```

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:
- `good first issue` - Good for newcomers
- `help wanted` - Need community help
- `documentation` - Documentation improvements

---

## 💻 Development Setup

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** 8.0 or higher
- **Git** 2.0 or higher
- Code editor (VS Code recommended)

### Setup Steps

1. **Fork the repository**

Click the "Fork" button at the top right of the repository page.

2. **Clone your fork**

```bash
git clone https://github.com/YOUR_USERNAME/portfolio_thienphuc.git
cd portfolio_thienphuc
```

3. **Add upstream remote**

```bash
git remote add upstream https://github.com/phuc2502/portfolio_thienphuc.git
```

4. **Install dependencies**

```bash
# MCP Server
cd mcp-server
npm install

# Frontend (if contributing to UI)
cd ..
npm install
```

5. **Build the project**

```bash
cd mcp-server
npm run build
```

6. **Run tests**

```bash
npm test
```

---

## 🔄 Pull Request Process

### Before You Submit

- [ ] Search existing PRs to avoid duplicates
- [ ] Follow the coding standards
- [ ] Write or update tests as needed
- [ ] Update documentation if needed
- [ ] Ensure all tests pass
- [ ] Follow commit message guidelines

### Creating a Pull Request

1. **Create a feature branch**

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

Branch naming convention:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Test additions/changes
- `chore/` - Maintenance tasks

2. **Make your changes**

Write clean, readable code following our standards.

3. **Commit your changes**

```bash
git add .
git commit -m "feat: add amazing feature"
```

See [Commit Guidelines](#commit-guidelines) for details.

4. **Push to your fork**

```bash
git push origin feature/your-feature-name
```

5. **Create Pull Request**

Go to GitHub and create a Pull Request from your fork.

**PR Title Format:**
```
type(scope): Brief description

Examples:
feat(api): add authentication endpoint
fix(mcp): resolve data loading issue
docs(readme): update installation guide
```

**PR Description Template:**

```markdown
## Description
Brief description of your changes.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## How Has This Been Tested?
Describe the tests you ran to verify your changes.

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where needed
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing unit tests pass locally
```

### Review Process

1. Maintainers will review your PR
2. Address any requested changes
3. Once approved, your PR will be merged
4. Your contribution will be included in the next release! 🎉

---

## 📐 Coding Standards

### TypeScript

**Use strict typing:**

```typescript
// ✅ Good
interface Project {
  id: string;
  title: string;
  year: string;
}

function addProject(project: Project): Promise<void> {
  // implementation
}

// ❌ Bad
function addProject(project: any) {
  // implementation
}
```

**Use const for immutable values:**

```typescript
// ✅ Good
const DATA_FILE = 'portfolio-data.json';

// ❌ Bad
let DATA_FILE = 'portfolio-data.json';
```

**Prefer async/await over callbacks:**

```typescript
// ✅ Good
async function loadData() {
  const data = await fs.readFile(path, 'utf-8');
  return JSON.parse(data);
}

// ❌ Bad
function loadData(callback) {
  fs.readFile(path, 'utf-8', (err, data) => {
    callback(JSON.parse(data));
  });
}
```

### Code Formatting

We use **Prettier** for code formatting. VS Code users can install the Prettier extension.

**Configuration:**
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

### Naming Conventions

```typescript
// Classes: PascalCase
class PortfolioMCPServer { }

// Functions/Variables: camelCase
function loadPortfolioData() { }
const serverPort = 3001;

// Constants: SCREAMING_SNAKE_CASE
const MAX_RETRY_ATTEMPTS = 3;

// Interfaces/Types: PascalCase with 'I' prefix (optional)
interface IProject { }
type PortfolioData = { };
```

### File Structure

```typescript
// 1. Imports
import { Server } from '@modelcontextprotocol/sdk';
import fs from 'fs/promises';

// 2. Types/Interfaces
interface Config {
  port: number;
}

// 3. Constants
const DEFAULT_PORT = 3001;

// 4. Main logic
class MyClass {
  // implementation
}

// 5. Exports
export { MyClass };
```

---

## 📝 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation only changes
- `style:` Code style changes (formatting, semicolons, etc.)
- `refactor:` Code change that neither fixes a bug nor adds a feature
- `perf:` Performance improvements
- `test:` Adding or updating tests
- `chore:` Maintenance tasks, dependency updates

### Scopes

- `api` - HTTP API server
- `mcp` - MCP server core
- `types` - TypeScript types/schemas
- `data` - Data handling
- `deploy` - Deployment configs
- `docs` - Documentation

### Examples

```bash
# Feature
git commit -m "feat(api): add authentication middleware"

# Bug fix
git commit -m "fix(mcp): resolve file path issue on Windows"

# Documentation
git commit -m "docs(readme): add mobile setup section"

# Refactoring
git commit -m "refactor(types): simplify schema validation"

# Breaking change
git commit -m "feat(api)!: change response format

BREAKING CHANGE: API responses now use camelCase instead of snake_case"
```

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run specific test
npm test -- test-name

# Run with coverage
npm run test:coverage
```

### Writing Tests

**Test file naming:** `*.test.ts` or `*.spec.ts`

**Example test:**

```typescript
import { describe, it, expect } from 'vitest';
import { addProject } from './server';

describe('addProject', () => {
  it('should add a new project successfully', async () => {
    const project = {
      id: '04',
      title: 'Test Project',
      // ...other fields
    };
    
    await addProject(project);
    
    const projects = await getAllProjects();
    expect(projects).toContainEqual(project);
  });

  it('should throw error for duplicate ID', async () => {
    const project = { id: '01', /* ... */ };
    
    await expect(addProject(project))
      .rejects
      .toThrow('Project with ID 01 already exists');
  });
});
```

### Test Coverage Goals

- **Minimum**: 70% overall coverage
- **Target**: 80%+ coverage
- **Critical paths**: 90%+ coverage

---

## 📚 Documentation

### Code Comments

**Use JSDoc for public APIs:**

```typescript
/**
 * Adds a new project to the portfolio
 * @param project - The project object to add
 * @returns Promise that resolves when project is added
 * @throws Error if project ID already exists
 */
async function addProject(project: Project): Promise<void> {
  // implementation
}
```

**Inline comments for complex logic:**

```typescript
// Calculate the exponential backoff delay
// Formula: min(maxDelay, baseDelay * 2^attempt)
const delay = Math.min(
  MAX_DELAY,
  BASE_DELAY * Math.pow(2, attempt)
);
```

### README Updates

When adding features, update relevant documentation:
- Main README.md
- MCP_COMPLETE_GUIDE.md
- mcp-server/README.md

---

## 🎨 PR Review Checklist

**For Reviewers:**

- [ ] Code follows project conventions
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No unnecessary dependencies added
- [ ] Performance impact considered
- [ ] Security implications reviewed
- [ ] Breaking changes noted

**For Contributors:**

- [ ] Self-reviewed the code
- [ ] Ran tests locally
- [ ] Updated documentation
- [ ] Followed commit guidelines
- [ ] Responded to review comments

---

## 🏆 Recognition

All contributors will be recognized in our:
- CONTRIBUTORS.md file
- Release notes
- README acknowledgments

Top contributors may receive:
- Special badge in GitHub
- Early access to new features
- Direct communication channel with maintainers

---

## 📞 Getting Help

Stuck? Need help? Here's how to reach us:

- 💬 **GitHub Discussions**: Ask questions, share ideas
- 🐛 **GitHub Issues**: Report bugs, request features
- 📧 **Email**: [your-email@example.com]
- 💻 **Discord**: [Join our server]

---

## 📖 Additional Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [MCP Documentation](https://modelcontextprotocol.io/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)

---

<div align="center">

**Thank you for contributing! 🙏**

Every contribution, no matter how small, makes a difference.

[Back to README](./README.md) • [View Issues](https://github.com/phuc2502/portfolio_thienphuc/issues) • [View PRs](https://github.com/phuc2502/portfolio_thienphuc/pulls)

</div>
