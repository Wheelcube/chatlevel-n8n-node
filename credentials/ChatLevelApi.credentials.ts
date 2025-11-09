import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ChatLevelApi implements ICredentialType {
	name = 'chatLevelApi';
	displayName = 'ChatLevel API';
	documentationUrl = 'https://docs.chatlevel.io';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'API key authentication. You can create an API key in Chatlevel under Integrations -> Add integration -> n8n',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.chatlevel.io/v1',
			url: '/devices',
			method: 'GET',
		},
	};
}
