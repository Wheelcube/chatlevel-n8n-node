# Contributing to n8n-nodes-chatlevel

First off, thank you for considering contributing to n8n-nodes-chatlevel! 

## Code of Conduct

This project and everyone participating in it is governed by respect and professionalism. Please be kind and courteous to other contributors.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps to reproduce the problem**
* **Provide specific examples** - Include n8n workflow JSON if possible
* **Describe the behavior you observed and what you expected**
* **Include screenshots if relevant**
* **Note your environment**: n8n version, Node.js version, OS

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

* **Use a clear and descriptive title**
* **Provide a detailed description of the suggested enhancement**
* **Explain why this enhancement would be useful**
* **List any similar features in other n8n nodes**

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code, add tests
3. Ensure your code follows the existing style
4. Update documentation as needed
5. Write a clear commit message

## Development Setup

### Prerequisites

* Node.js >= 18.10
* npm >= 8.0
* Git

### Setup Instructions

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/n8n-nodes-chatlevel.git
cd n8n-nodes-chatlevel

# Install dependencies
npm install

# Build the project
npm run build

# Link for local development
npm link

# In your n8n installation directory
cd /path/to/n8n
npm link n8n-nodes-chatlevel
```

### Project Structure

```
n8n-nodes-chatlevel/
├── nodes/
│   └── ChatLevel/
│       ├── ChatLevel.node.ts       # Main node implementation
│       └── chatlevel.svg           # Node icon
├── credentials/
│   └── ChatLevelApi.credentials.ts # Credentials definition
├── examples/
│   └── workflow-example.json       # Example workflows
├── dist/                           # Compiled output (git-ignored)
├── package.json
├── tsconfig.json
├── gulpfile.js
└── README.md
```

### Development Workflow

1. **Make changes** to the TypeScript files in `nodes/` or `credentials/`
2. **Build** the project: `npm run build`
3. **Test** in n8n by creating a workflow
4. **Format** your code: `npm run format`
5. **Lint** your code: `npm run lint`
6. **Fix** linting issues: `npm run lintfix`

### Coding Standards

* Use TypeScript
* Follow the existing code style
* Use meaningful variable and function names
* Add comments for complex logic
* Keep functions small and focused
* Use async/await instead of callbacks
* Handle errors appropriately

### TypeScript Style Guide

```typescript
// Good
const phoneNumber = this.getNodeParameter('phoneNumber', i) as string;

// Bad
const phone = this.getNodeParameter('phoneNumber', i);

// Good - Clear error messages
throw new NodeOperationError(
  this.getNode(),
  `Failed to send message: ${error.message}`
);

// Bad - Unclear error
throw new Error('Error');
```

### Adding New Operations

When adding a new operation:

1. Add the operation to the appropriate resource in `ChatLevel.node.ts`
2. Define the operation parameters
3. Implement the operation logic in the `execute()` method
4. Add appropriate error handling
5. Update the README with the new operation
6. Add an example to the workflow examples
7. Update the CHANGELOG

### Testing

Before submitting a PR:

1. Test all modified operations in n8n
2. Test with valid and invalid inputs
3. Test error scenarios
4. Verify credentials work correctly
5. Check that binary data handling works (for media operations)

### Documentation

* Update README.md for user-facing changes
* Update CHANGELOG.md following Keep a Changelog format
* Add JSDoc comments to new functions
* Include examples for new features

### Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters
* Reference issues and pull requests after the first line

Examples:
```
Add support for group messaging

Implements group messaging functionality including:
- Create groups
- Add/remove members
- Send group messages

Fixes #123
```

### Release Process

Maintainers will handle releases:

1. Update version in `package.json`
2. Update CHANGELOG.md
3. Create a git tag
4. Publish to npm

## Questions?

Feel free to open an issue with the "question" label.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
