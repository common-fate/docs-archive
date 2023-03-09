---
slug: kinds
---

# Kinds

Each Provider will have one or more Kinds of target, the Kind of the target is the thing that Common Fate can grant access to.
Kinds allow one provider codebase to implement multiple functions. One of teh benefits is that you may deploy one instance of a provider and have it serve may different Kinds of access requests.

### Example

With AWS we grant access to an Account (kind=Account), with EKS we might grant access to a Namespace (kind=Namespace) or to a Role (kind=Role).
