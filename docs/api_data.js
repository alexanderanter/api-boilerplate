define({
  api: [
    {
      type: 'post',
      url: '/auth/email',
      title: 'First step of passwordless authentication with email',
      name: 'EmailAuth',
      group: 'Auth',
      success: {
        fields: {
          'Success 200': [
            {
              group: 'Success 200',
              type: 'String',
              optional: false,
              field: 'message:',
              description:
                '<p>Success message telling the user to check their email</p>',
            },
          ],
        },
        examples: [
          {
            title: 'Success-Response:',
            content:
              '{\n  "message": "Success! Check your email for the login link"\n}',
            type: 'JSON',
          },
        ],
      },
      version: '0.0.0',
      filename: 'work/reftoken/api/routes/auth.js',
      groupTitle: 'Auth',
    },
    {
      type: 'post',
      url: '/auth/email/token',
      title: 'Second step of passwordless email authentication',
      name: 'EmailAuthToken',
      group: 'Auth',
      success: {
        fields: {
          'Success 200': [
            {
              group: 'Success 200',
              type: 'String',
              optional: false,
              field: 'token',
              description: '<p>JSON Web Token</p>',
            },
            {
              group: 'Success 200',
              type: 'String',
              optional: false,
              field: 'email',
              description: "<p>User's email address</p>",
            },
            {
              group: 'Success 200',
              type: 'String',
              optional: false,
              field: 'firstName',
              description: "<p>User's first name</p>",
            },
            {
              group: 'Success 200',
              type: 'String',
              optional: false,
              field: 'lastName',
              description: "<p>User's first name</p>",
            },
            {
              group: 'Success 200',
              type: 'String',
              optional: false,
              field: 'picture',
              description: "<p>User's profile picture</p>",
            },
          ],
        },
        examples: [
          {
            title: 'Success-Response:',
            content:
              '{\n  "token": "long-random-string",\n  "user": {\n    "email": "name@domain.com",\n    "firstName": "Mr",\n    "lastName": "Man",\n    "picture": "path/to/picture",\n  }\n}',
            type: 'JSON',
          },
        ],
      },
      version: '0.0.0',
      filename: 'work/reftoken/api/routes/auth.js',
      groupTitle: 'Auth',
    },
    {
      type: 'post',
      url: '/auth/facebook',
      title:
        'Authenticate with Facebook authentication token. Exchange for JWT',
      name: 'FacebookAuth',
      group: 'Auth',
      success: {
        fields: {
          'Success 200': [
            {
              group: 'Success 200',
              type: 'String',
              optional: false,
              field: 'token',
              description: '<p>JSON Web Token</p>',
            },
            {
              group: 'Success 200',
              type: 'String',
              optional: false,
              field: 'email',
              description: "<p>User's email address</p>",
            },
            {
              group: 'Success 200',
              type: 'String',
              optional: false,
              field: 'firstName',
              description: "<p>User's first name</p>",
            },
            {
              group: 'Success 200',
              type: 'String',
              optional: false,
              field: 'lastName',
              description: "<p>User's first name</p>",
            },
            {
              group: 'Success 200',
              type: 'String',
              optional: false,
              field: 'picture',
              description: "<p>User's profile picture</p>",
            },
          ],
        },
        examples: [
          {
            title: 'Success-Response:',
            content:
              '{\n  "token": "long-random-string",\n  "user": {\n    "email": "name@domain.com",\n    "firstName": "Mr",\n    "lastName": "Man",\n    "picture": "path/to/picture",\n  }\n}',
            type: 'JSON',
          },
        ],
      },
      version: '0.0.0',
      filename: 'work/reftoken/api/routes/auth.js',
      groupTitle: 'Auth',
    },
    {
      type: 'post',
      url: '/auth/google',
      title:
        'Request JSON Web Token by passing Google Authentication Token to the API',
      name: 'GoogleAuth',
      group: 'Auth',
      success: {
        fields: {
          'Success 200': [
            {
              group: 'Success 200',
              type: 'String',
              optional: false,
              field: 'token',
              description: '<p>JSON Web Token</p>',
            },
            {
              group: 'Success 200',
              type: 'String',
              optional: false,
              field: 'email',
              description: "<p>User's email address</p>",
            },
            {
              group: 'Success 200',
              type: 'String',
              optional: false,
              field: 'firstName',
              description: "<p>User's first name</p>",
            },
            {
              group: 'Success 200',
              type: 'String',
              optional: false,
              field: 'lastName',
              description: "<p>User's first name</p>",
            },
            {
              group: 'Success 200',
              type: 'String',
              optional: false,
              field: 'picture',
              description: "<p>User's profile picture</p>",
            },
          ],
        },
        examples: [
          {
            title: 'Success-Response:',
            content:
              '{\n  "token": "long-random-string",\n  "user": {\n    "email": "name@domain.com",\n    "firstName": "Mr",\n    "lastName": "Man",\n    "picture": "path/to/picture",\n  }\n}',
            type: 'JSON',
          },
        ],
      },
      version: '0.0.0',
      filename: 'work/reftoken/api/routes/auth.js',
      groupTitle: 'Auth',
    },
    {
      type: 'post',
      url: '/auth/token',
      title: 'Decode the token and return the user',
      name: 'TokenAuth',
      group: 'Auth',
      success: {
        fields: {
          'Success 200': [
            {
              group: 'Success 200',
              type: 'String',
              optional: false,
              field: 'email',
              description: "<p>User's email address</p>",
            },
            {
              group: 'Success 200',
              type: 'String',
              optional: false,
              field: 'firstName',
              description: "<p>User's first name</p>",
            },
            {
              group: 'Success 200',
              type: 'String',
              optional: false,
              field: 'lastName',
              description: "<p>User's first name</p>",
            },
            {
              group: 'Success 200',
              type: 'String',
              optional: false,
              field: 'picture',
              description: "<p>User's profile picture</p>",
            },
          ],
        },
        examples: [
          {
            title: 'Success-Response:',
            content:
              '{\n  "user": {\n    "email": "name@domain.com",\n    "firstName": "Mr",\n    "lastName": "Man",\n    "picture": "path/to/picture",\n  }\n}',
            type: 'JSON',
          },
        ],
      },
      version: '0.0.0',
      filename: 'work/reftoken/api/routes/auth.js',
      groupTitle: 'Auth',
    },
    {
      type: 'get',
      url: '/ping',
      title: 'Ping',
      name: 'Ping',
      group: 'Ping',
      success: {
        fields: {
          '200': [
            {
              group: '200',
              type: 'String',
              optional: false,
              field: 'message',
              description: '<p>Pong response</p>',
            },
          ],
        },
        examples: [
          {
            title: 'Success-Response:',
            content: '{\n    "message": "Pong!"\n}',
            type: 'JSON',
          },
        ],
      },
      version: '0.0.0',
      filename: 'work/reftoken/api/routes/ping.js',
      groupTitle: 'Ping',
    },
  ],
});
