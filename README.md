# chatlevel-n8n

This is an n8n community node for the ChatLevel WhatsApp API.

ChatLevel is a WhatsApp integration platform that provides a simple API for managing WhatsApp accounts programmatically.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Usage](#usage)  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Nodes (Recommended)

1. Go to **Settings > Community Nodes** in your n8n instance
2. Select **Install**
3. Enter `chatlevel-n8n` in **Enter npm package name**
4. Agree to the risks and select **Install**

### Manual Installation

```bash
npm install chatlevel-n8n
```

For Docker installations:

```bash
docker exec -it <container_id> npm install -g chatlevel-n8n
```

## Operations

This package includes two nodes:

### ChatLevel Node (Actions)

**Device Operations:**
- **Create** - Create a new WhatsApp device
- **Get** - Get a specific device
- **Get Many** - List all devices
- **Update** - Update device settings (name, webhook, subscription status)
- **Delete** - Delete a device
- **Disconnect** - Disconnect a device from WhatsApp
- **Restart** - Restart a device session

**Message Operations:**
- **Send Text** - Send a text message
- **Send Media** - Send media (image only: PNG, JPEG, GIF, WebP, max 10MB) via URL or Base64

### ChatLevel Trigger Node (Webhook)

Receives real-time events from ChatLevel:
- **connection.open** - Connection opened
- **connection.closed** - Connection closed
- **connection.auth** - Device authentication occurred
- **connection.timeout** - Connection timed out
- **connection.logout** - Device logged out
- **message.received** - Incoming message received
- **message.sent** - Outgoing message sent
- **message.updated** - Message status updated
- **message.deleted** - Message deleted
- **call** - Call received

## Credentials

To use this node, you need ChatLevel API credentials:

1. Sign up at [ChatLevel](https://chatlevel.io)
2. Get your API key from the developers section
3. In n8n, create new credentials of type **ChatLevel API**
4. Enter your API key
5. (Optional) Modify the base URL if needed

## Usage

### Setting up a Device

1. Use **ChatLevel > Device > Create** to create a new device
2. The response will include a QR code (base64 data URL) if status is 'qr'
3. Scan the QR code with WhatsApp to link the device
4. Alternatively, provide a phone number to receive a pairing code

### Sending Messages

1. Add **ChatLevel** node to workflow
2. Select **Message** resource
3. Choose **Send Text** or **Send Media**
4. Enter the Device ID (from your device list)
5. Enter recipient phone number (digits only, with country code)
6. Enter your message or media URL/Base64

**Note:** Media messages only support images (PNG, JPEG, GIF, WebP) with a maximum file size of 10MB.

### Receiving Messages (Webhook Trigger)

1. Add **ChatLevel Trigger** node to workflow
2. Copy the webhook URL shown in n8n
3. In ChatLevel dashboard, go to your device settings
4. Add the webhook URL and select the events you want to receive
5. Your workflow will now trigger automatically when events occur

## Example Workflows

### Auto-Reply to Incoming Messages
```
ChatLevel Trigger (message.received) → ChatLevel (Send Text)
```

### Send Message from Form
```
Webhook → ChatLevel (Send Text)
```

### Forward Messages to Email
```
ChatLevel Trigger (message.received) → Gmail (Send Email)
```

### Broadcast to Multiple Numbers
```
Schedule → Read Spreadsheet → Loop → ChatLevel (Send Text)
```

### Monitor Connection Status
```
ChatLevel Trigger (connection.closed) → Slack (Send Notification)
```

## Webhook Events Payload Examples

### message.received
```json
{
  "event": "message.received",
  "deviceId": 12345,
  "message": {
    "id": "msg_id",
    "from": "31612345678",
    "body": "Hello!",
    "timestamp": 1234567890
  }
}
```

### connection.open
```json
{
  "event": "connection.open",
  "deviceId": 12345,
  "timestamp": 1234567890
}
```

### call
```json
{
  "event": "call",
  "deviceId": 12345,
  "from": "31612345678",
  "timestamp": 1234567890
}
```

## API Response Examples

### Device Created Successfully
```json
{
  "device": {
    "id": 12345,
    "name": "My Device",
    "status": "qr",
    "qr": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "webhookUrl": "https://example.com/webhook",
    "webhookEvents": ["message.received", "message.sent"],
    "messagesSent": 0,
    "subscription_status": "active",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "status": {
    "code": 200,
    "message": "Device created successfully"
  }
}
```

### Message Sent Successfully
```json
{
  "status": "success",
  "messageId": "3EB0C1F0B2F0A1D5E8F4"
}
```

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [ChatLevel API documentation](https://docs.chatlevel.io)
* [ChatLevel website](https://chatlevel.io)

## Support

For issues with this node, please open an issue on the [GitHub repository](https://github.com/Wheelcube/chatlevel-n8n-node/issues).

For ChatLevel API support, visit [ChatLevel Documentation](https://docs.chatlevel.io) or contact the support team.

## License

[MIT](LICENSE.md)
