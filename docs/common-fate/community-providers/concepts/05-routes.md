---
slug: routes
---

# Routes

#### What is a Route

A Route links a Target Group to a Handler, and specifies the priority of the link as well as the Kind of target implemented by the Handler which shoudl be used to satisfy the Target Group requirements.

#### Linking a Target Group to a Handler

A Target Group must be linked with at least 1 healthy Handler to be able to serve requests.
If a Handler becomes unhealthy, all the routes for that handler become invalid.
When the handler becomes healthy again, the routes validity will be checked again.
When testing the validity of a route, the schema of the Handler and the Schema of the target group are compared to ensure they are compatible.

Routes are assigned a priority, ranging from 0 - 999, to disable a route, set it's priority to 0.

:::info
If a Route is incompatible with it's Target Group it will be marked invalid and will be assigned diagnostic logs explaining the issue.
:::
