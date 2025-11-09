# n8n-nodes-chatlevel

This is an n8n community node that lets you use ChatLevel WhatsApp API in your n8n workflows.

ChatLevel is a WhatsApp integration partner that provides a simple and straightforward API for sending and receiving WhatsApp messages.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Nodes (Recommended)

1. Go to **Settings > Community Nodes** in your n8n instance
2. Select **Install**
3. Enter `n8n-nodes-chatlevel` in **Enter npm package name**
4. Agree to the risks and select **Install**

### Manual Installation

To install the node manually:

```bash
npm install n8n-nodes-chatlevel
```

For Docker installations:

```bash
docker exec -it <container_id> npm install -g n8n-nodes-chatlevel
```

## Operations

### Message
- **Send Text** - Send a text message to a WhatsApp number
- **Send Media** - Send media (image, video, document, audio) to a WhatsApp number
- **Send Template** - Send a WhatsApp template message
- **Get** - Get details of a specific message
- **Get Many** - Retrieve multiple messages with filters

### Contact
- **Create** - Create a new contact
- **Get** - Get details of a specific contact
- **Get Many** - Retrieve multiple contacts
- **Update** - Update a contact's information
- **Delete** - Delete a contact

### Media
- **Upload** - Upload a media file to ChatLevel
- **Get** - Get media details
- **Download** - Download media file

### Template
- **Get** - Get details of a specific template
- **Get Many** - List all available templates

### Webhook
- **Create** - Create a new webhook
- **Get** - Get webhook details
- **Update** - Update webhook configuration
- **Delete** - Delete a webhook

## Credentials

To use this node, you need to set up ChatLevel API credentials:

1. Get your API key from your ChatLevel dashboard
2. In n8n, create new credentials of type **ChatLevel API**
3. Enter your API key
4. (Optional) Modify the base URL if using a different endpoint

## Compatibility

This node has been tested with:
- n8n version 1.0.0 and above

## Usage

### Sending a Text Message

1. Add the ChatLevel node to your workflow
2. Select **Message** as the resource
3. Select **Send Text** as the operation
4. Enter the recipient's phone number (with country code, no + or spaces)
5. Enter your message text
6. Connect your credentials
7. Execute the node

### Sending Media

1. Add the ChatLevel node to your workflow
2. Select **Message** as the resource
3. Select **Send Media** as the operation
4. Choose the media type (image, video, document, audio)
5. Enter the media URL or use binary data from a previous node
6. Add an optional caption
7. Execute the node

### Using Templates

1. First, use **Template > Get Many** to see available templates
2. Then use **Message > Send Template** to send
3. Enter the template name and language code
4. Provide parameters as a JSON array if the template requires them

### Setting up Webhooks

1. Use **Webhook > Create** to register your webhook URL
2. Select which events you want to receive
3. Configure your n8n workflow to listen to webhook events

## Example Workflows

### Simple Text Message Flow
```
Trigger → ChatLevel (Send Text) → Respond to webhook
```

### Automated Customer Support
```
Webhook (Receive Message) → ChatLevel (Get Contact) → AI Response → ChatLevel (Send Text)
```

### Media Broadcasting
```
Schedule → Read Files → ChatLevel (Upload Media) → ChatLevel (Send Media to Multiple)
```

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [ChatLevel API documentation](https://docs.chatlevel.io)
* [ChatLevel website](https://chatlevel.io)

## Development

### Prerequisites
- Node.js >= 18.10
- npm >= 8.0

### Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/n8n-nodes-chatlevel.git
cd n8n-nodes-chatlevel

# Install dependencies
npm install

# Build the node
npm run build

# Link for local development
npm link

# In your n8n installation directory
npm link n8n-nodes-chatlevel
```

### Testing
```bash
# Format code
npm run format

# Lint code
npm run lint

# Fix linting issues
npm run lintfix
```

## License

[MIT](LICENSE.md)

## Support

For issues with this node, please open an issue on [GitHub](https://github.com/yourusername/n8n-nodes-chatlevel/issues).

For ChatLevel API support, visit [ChatLevel Documentation](https://docs.chatlevel.io) or contact their support team.
