# ChatLevel n8n Community Node - Quick Start Guide

## What's Included

This package contains a complete n8n community node implementation for the ChatLevel WhatsApp API. 

### 📦 Package Contents

```
chatlevel-n8n/
├── nodes/ChatLevel/
│   ├── ChatLevel.node.ts       # Main node implementation (1000+ lines)
│   └── chatlevel.svg           # WhatsApp-style icon
├── credentials/
│   └── ChatLevelApi.credentials.ts
├── examples/
│   └── workflow-example.json
├── package.json
├── tsconfig.json
├── gulpfile.js
├── .eslintrc.js
├── .prettierrc.js
├── .gitignore
├── README.md
├── LICENSE.md
├── CHANGELOG.md
└── CONTRIBUTING.md
```

## 🚀 Quick Installation

### Method 1: n8n Community Nodes (Recommended)

1. Open your n8n instance
2. Go to **Settings > Community Nodes**
3. Click **Install**
4. Enter: `n8n-nodes-chatlevel`
5. Click **Install**

### Method 2: Manual Installation

```bash
# For local n8n installation
npm install n8n-nodes-chatlevel

# For Docker
docker exec -it <container_id> npm install -g n8n-nodes-chatlevel
```

### Method 3: Development Setup

```bash
# Clone/download this package
cd chatlevel-n8n

# Install dependencies
npm install

# Build
npm run build

# Link locally
npm link

# In n8n directory
npm link n8n-nodes-chatlevel
```

## 🔑 Setup Credentials

1. In n8n, go to **Credentials > New**
2. Search for "ChatLevel API"
3. Enter your ChatLevel API key
4. (Optional) Modify base URL if needed
5. Test and save

## 💡 Usage Examples

### Send a Text Message

```
Trigger → ChatLevel Node
```

Settings:
- Resource: **Message**
- Operation: **Send Text**
- Phone Number: `5511999999999`
- Message: `Hello from n8n!`

### Send an Image with Caption

Settings:
- Resource: **Message**
- Operation: **Send Media**
- Media Type: **Image**
- Media URL: `https://example.com/image.jpg`
- Caption: `Check this out!`

### Create a Contact

Settings:
- Resource: **Contact**
- Operation: **Create**
- Phone Number: `5511999999999`
- Name: `John Doe`
- Email: `john@example.com`
- Tags: `customer, vip`

## 📋 Available Resources & Operations

### Message
- ✉️ Send Text
- 📷 Send Media (image, video, document, audio)
- 📝 Send Template
- 🔍 Get Message
- 📊 Get Many Messages

### Contact
- ➕ Create
- 🔍 Get
- 📊 Get Many
- ✏️ Update
- 🗑️ Delete

### Media
- ⬆️ Upload
- 🔍 Get
- ⬇️ Download

### Template
- 🔍 Get
- 📊 Get Many

### Webhook
- ➕ Create
- 🔍 Get
- ✏️ Update
- 🗑️ Delete

## 🔧 Build & Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Development mode (watch)
npm run dev

# Format code
npm run format

# Lint
npm run lint

# Fix linting issues
npm run lintfix
```

## 📝 Key Features

✅ **Type-safe** - Written in TypeScript  
✅ **Comprehensive** - Supports all major ChatLevel API operations  
✅ **Well-documented** - Extensive inline documentation  
✅ **Error handling** - Proper error messages and handling  
✅ **Follows n8n conventions** - Compatible with n8n best practices  
✅ **Binary data support** - Handle media uploads/downloads  
✅ **Pagination** - Support for listing resources  
✅ **Filtering** - Advanced filtering options  
✅ **Continue on fail** - Graceful error handling in workflows  

## 🔐 API Authentication

The node uses Bearer token authentication. Your API key is:
- Stored securely in n8n credentials
- Never exposed in workflows
- Sent with every API request

## 🌐 API Endpoints

All requests go to: `https://api.chatlevel.io/v1`

You can customize the base URL in credentials if needed.

## 📖 Documentation

- [ChatLevel API Docs](https://docs.chatlevel.io)
- [n8n Community Nodes](https://docs.n8n.io/integrations/community-nodes/)
- [n8n Node Development](https://docs.n8n.io/integrations/creating-nodes/)

## 🤝 Contributing

See CONTRIBUTING.md for development guidelines.

## 📄 License

MIT License - See LICENSE.md

## 🐛 Issues & Support

- **Node Issues**: Open an issue on GitHub
- **ChatLevel API**: Visit docs.chatlevel.io
- **n8n Issues**: Visit n8n community forum

## 🎉 Next Steps

1. ✅ Install the node
2. ✅ Configure credentials
3. ✅ Create your first workflow
4. ✅ Test sending a message
5. ✅ Explore advanced features

Happy automating! 🚀
