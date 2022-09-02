---
sidebar_position: 7
---

# Flask

Granted Approvals has support for audited access into an ECS Cluster. This can be completed using the interactive provider setup from within your cloud deployment.


## Configuring your Flask Deployment

You will now need to configure your Flask Deployment for Granted Approvals. 

You will need to install [`granted-flask`](https://pypi.org/project/granted-flask/) from pypi

If you have your own way of installing a pip dependency, you will need to do this.

An example using poetry can be found in [github.com/common-fate/granted-flask](https://github.com/common-fate/granted-flask)
```bash
poetry install
poetry shell
pip install -e ./granted_flask/ # this installs the granted_flask package which overrides the 'flask shell' command
flask shell
```

If you are using a Dockerfile you will want to add this to the install script. Ensure that you pass the `GRANTED_WEBHOOK_URL` variable to the environment.
