
# Using a third-party IdP with Cognito

This guide will walk you through configuring Cognito to use SAML authentication with a third-party IdP.

To do so you will need to use the following URL template:
```
https://${amazon_cognito_userpool_domain}/authorize?response_type=${code|token}&identity_provider=${your_saml_idp_name}&client_id=${your_client_id}&redirect_uri=${https://your_common_fate_deployment_url}
```

This has been taken from the [AWS documentation](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-SAML-session-initiation.html).


The following is a table explaining each of the url parameters:

| Parameter  | Explanation  |
|---|---|
| amazon_cognito_userpool_domain | The domain name of your Cognito user pool. This can be found in the Cognito console under `General settings`  |  
| code\|token | The response type. This can be either `code` or `token` and depends on your [authorize endpoint](https://docs.aws.amazon.com/cognito/latest/developerguide/authorization-endpoint.html)   |
| your_saml_idp_name | The name of your SAML IdP. This can be found in the Cognito console under `Federation`  |
| your_client_id | The client ID of your Cognito user pool. This can be found in the Cognito console under `App clients`  |
| https://your_common_fate_deployment_url | The URL of your Common Fate deployment. This can be found by running `gdeploy status`  |