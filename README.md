# node-typescript-template
Template project for a [NodeJS](https://nodejs.org/) service using [TypeScript](https://www.typescriptlang.org/) and [Yarn](https://yarnpkg.com/).  Use this as a starting point when creating new services.

## Branches

- `master`: The base template, an empty NodeJS project with typescript build support

- `nestjs`: Adds basic NestJS support

## Pre-requisites

- `nvm`: [Node Version Manager](https://github.com/nvm-sh/nvm)

## Initial setup

- `nvm install`: Ensure the current verison of node is installed

- `nvm use`: Activate the correct version of node

- `npm install -g yarn`: Make sure yarn is installed

## Commands

- To configure node within the current shell: `nvm use`

- Install all runtime and development dependencies: `yarn install`

- Install only runtime dependencies: `yarn install --production`

- Add a new development dependency: `yarn add --dev <package>`

- Add a new runtime dependency: `yarn add <package>`

- Start development version: `yarn dev`

- Start production version (after building): `yarn start`

## Scripts

Scripts are located in `/scripts` and run via `yarn script`.

- `build [full]`: Build the production version

- `clean`: Delete build artifacts

- `format <check | write>`: Verify or correct code formatting

- `uninstall`: Delete downloaded dependencies (the opposite of `yarn install`)
