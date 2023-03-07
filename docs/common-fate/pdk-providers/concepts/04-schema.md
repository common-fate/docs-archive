---
slug: schema
---

# Schema 
The schema of the Provider describes the different element of a Provider.

You can query the schema for a provider by running: 

```
curl https://api.registry.commonfate.io/v1alpha1/providers/common-fate/aws/v0.2.0 | jq .schema
```

This will output  

```
{
  "$id": "https://registry.commonfate.io/schema/common-fate/aws/v1",
  "$schema": "https://schema.commonfate.io/provider/v1alpha1",
  "config": {
    "AdditionalProperties": {
      "description": "",
      "secret": false,
      "type": ""
    }
  },
  "meta": {
    "framework": "0.4.0"
  },
  "resources": {
    "loaders": {
      "AdditionalProperties": {
        "title": ""
      }
    },
    "types": {
      "AdditionalProperties": {
        "data": {
          "id": ""
        },
        "type": ""
      }
    }
  },
  "targets": {
    "AdditionalProperties": {
      "properties": null,
      "type": ""
    }
  }
}     
```

### Config 
Config Field contains all the configuration keys necessary to setup a Provider. When deploying a cloudformation stack, config fields as passed as cloud formation parameters and are passed as environment variables to the lambda handler.

Config Field can either be a plain text value or path to AWS System Manager Parameter store. The secret config value are indicated by `secret: true` key value pair for that config object.

### Targets 
Targets are the things that Access Providers grants access to. For example, for AWS SSO Provider PermissionSets & Accounts are __Targets__ that AWS SSO grants access to.

### Meta 
Meta contains all the metadata information related to the Provider such has what version of commonfate provider python framework was used to package and upload the Provider. 

### Resources 
Resources are the list of options that user can choose from.