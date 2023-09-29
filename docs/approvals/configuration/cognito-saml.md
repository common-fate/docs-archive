# Get a sign in link when using SAML SSO

In some cases your SAML users won't be able to login from their dashboard like Azure AD or Okta. Use this command to generate the correct sign in URL and/or add it to your documentation.

1. Run the following command

   ```bash
   gdeploy identity saml-login-url
   ```

1. Copy the URL

   You'll now be able to use this URL to sign in to Glide, or bookmark it for your team to use.

---

### Explanation

The command above will output a URL that you can use to sign in to Glide. This has been taken from the [AWS documentation](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-SAML-session-initiation.html).

```
https://${amazon_cognito_userpool_domain}/authorize?response_type=${code|token}&identity_provider=${your_saml_idp_name}&client_id=${your_client_id}&redirect_uri=${https://your_common_fate_deployment_url}
```

The following is a table explaining each of the url parameters:

| Parameter                               | Explanation                                                                                                                                                                             |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| amazon_cognito_userpool_domain          | The domain name of your Cognito user pool. This can be found in the Cognito console under `General settings`                                                                            |
| code\|token                             | The response type. This can be either `code` or `token` and depends on your [authorize endpoint](https://docs.aws.amazon.com/cognito/latest/developerguide/authorization-endpoint.html) |
| your_saml_idp_name                      | The name of your SAML IdP. This can be found in the Cognito console under `Federation`                                                                                                  |
| your_client_id                          | The client ID of your Cognito user pool. This can be found in the Cognito console under `App clients`                                                                                   |
| https://your_common_fate_deployment_url | The URL of your Glide deployment. This can be found by running `gdeploy status`                                                                                                         |
