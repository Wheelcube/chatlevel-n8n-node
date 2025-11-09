"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatLevelApi = void 0;
class ChatLevelApi {
    constructor() {
        this.name = 'chatLevelApi';
        this.displayName = 'ChatLevel API';
        this.documentationUrl = 'https://docs.chatlevel.io';
        this.properties = [
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                default: '',
                required: true,
                description: 'Your ChatLevel API key',
            },
            {
                displayName: 'Base URL',
                name: 'baseUrl',
                type: 'string',
                default: 'https://api.chatlevel.io/v1',
                description: 'Base URL for the ChatLevel API',
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    Authorization: '=Bearer {{$credentials.apiKey}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: '={{$credentials.baseUrl || "https://api.chatlevel.io/v1"}}',
                url: '/me',
                method: 'GET',
            },
        };
    }
}
exports.ChatLevelApi = ChatLevelApi;
