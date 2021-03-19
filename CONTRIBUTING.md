# Contributing

-   [Setting up the repository](#setting-up-the-repository)
-   [Local Development](#local-development)
-   [Writing Documentation](#writing-documentation)
-   [Releasing a New Version](#releasing-a-new-version)

## Setting up the repository

After forking and cloning the repo, run `yarn` to install the dependencies.

> The dependencies have to be managed with Yarn, because we need it's
> [`resolutions`](https://classic.yarnpkg.com/en/docs/selective-version-resolutions/)
> feature.

## Local Development

We use [Storybook](https://storybook.js.org/) for local development of the
package. You can start your local Storybook development environment by running

```bash
yarn storybook
```

A browser window should be opened with Storybook already open, if not, open
http://localhost:6006/.

## Writing Documentation

We write the main documentation directly within Storybook. The docs live right
inside the code, via JSDoc comments.

The deployment of the documentation is fully automated. Just push to the
`main`-branch and a new version of the documentation will be published
automatically.

## Releasing a New Version

A GitHub is set up to publish a new version to NPM after creating a GitHub
Release.

So to publish a new version,

1. Create a tag using `npm version patch|minor|major`. Refer to the
   [semantic versioning specification](https://semver.org/).
2. Push the tag to GitHub.
3. [Create](https://github.com/TobitSoftware/chayns-emoji-picker/releases/new) a
   GitHub release for that tag.

A GitHub Action will pick up the fresh release and build and publish the new
version to NPM.
