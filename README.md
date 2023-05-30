# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Styleguide

Check out [STYLEGUIDE.md](./STYLEGUIDE.md) for writing tips when contributing to our documentation.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

By default, you won't be able to see images while running the docs locally. This is because they're stored in Github LFS (Large File Storage). To see images locally, you'll need to run:

```
brew install git-lfs
git lfs install
```

And then:

```
git lfs pull --include=[filename.png]
```

Or if you feel like taking a really long coffee break, skip the `include` flag to pull everything.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Generate Provider Registry Docs

We use some templating to generate provider registry docs from the definitions in github.com/common-fate/common-fate/accesshandler/providerregistry

#### Run an update of provider docs

Update Common Fate repo dependency

```
go get github.com/common-fate/common-fate@<tag>
```

Generate the docs

```
go run cmd/docscli/main.go generate --version=<latest approvals version>
```

Make a PR with the generate files

## Docs versioning

Read the guide here: https://docusaurus.io/docs/versioning. We implement versioning on the Common Fate documentation only (not Granted).

By default, changes made to the main docs directory are considered to be 'unreleased' and are available at https://docs.commonfate.io/common-fate/next/introduction.

Version snapshots of our documentation should be created during a new release of Common Fate. To create a version snapshot:

```
yarn docusaurus docs:version:common-fate 0.14
```

Replace `0.14` with the version number you're releasing. We don't need to release new docs versions for patch releases, unless there is a major documentation change.
