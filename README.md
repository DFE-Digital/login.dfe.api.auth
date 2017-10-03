# login.dfe.api.auth

Package to provide auth strategy for API projects

Reference as a package through GitHub

### To use

### Config

Your config requires a section called 'auth' which should look like the following for JWT

```
{
    auth: {
        type: 'secret'
    }
}
```

And for AzureActiveDirectory
```
{
    auth: {
        type: 'AAD',
        identityMetadata : 'Url for AAD metadata',
        clientID : 'AAD application id'
    }
}
```

An example of this is available on [GitHub](https://github.com/DFE-Digital/login.dfe.hot-config/blob/master/config/login.dfe.hot-config.dev.json)

### Usage
```
const auth = require('login.dfe.api.auth')
.
.
.

app.use(auth(app, config));
```