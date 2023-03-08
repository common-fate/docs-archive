---
slug: handlers
---

# Handlers

#### What is a Handler

A Handler represents an instance of Provider, it stores information about the deployment and runtime.

Handlers have a health status which is checked every 30 seconds. When a Handler is healthy it means that it could be invoked, and all config validations are successful.
