# Biergit Frontend

[![Build Status](https://dev.azure.com/lucahost/biergit-frontend/_apis/build/status/biergit-ch.biergit-frontend?branchName=master)](https://dev.azure.com/lucahost/biergit-frontend/_build/latest?definitionId=3&branchName=master)

## Introduction

_Frontend of the **biergit** app_

[Marvel App](https://marvelapp.com/project/3375774/)

## Setup

1. Install the latest version of [Yarn]
2. Run the build or development server commands listed below

[yarn]: https://yarnpkg.com

## Commands

### Development Server

`yarn dev` runs `yarn api` and `yarn start` in paralell

`yarn api` runs the fake api on port 8080

`yarn start` builds the frontend and starts a development server (on [localhost:3000](http://localhost:3000/) by default).
When files change, they are rebuilt and the browser is reloaded.

### Build

`yarn build` builds to frontend and stores the build artifacts in the `.dist` directory. The contents of this directory are cleared before every build.

### Lint

`yarn lint` runs ESLint and Prettier over all `*.{js,ts,tsx}` source files for code style checking and fixes potentially fixable errors and warnings.

## About

Biergit was founded and developed by 4 friends in Zurich Switzerland.
