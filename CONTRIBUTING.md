# Contributing

The aim of this project is to allow developers to *make every static website as fast as possible, with just one command: `fastatic`*. Fastatic must work-out-of-box with zero configuration required. If a new feature does require configuration it must be on opt-in basis.

Contributions should be aimed towards this and / or improve the development workflow.

## Guidelines

### Pull Requests

For new additions or changes to the modules, create a branch and submit a Pull Request.
Keep changes as small as possible. Only add/change 1 feature/fix per Pull Request.


### Commit message format

Each commit message must have a *header* and optionally a *body*. The header has a special format that includes a type, a scope and a summary:

```
<type>(<scope>): <summary>
<BLANK LINE>
<body>
```

Note: you can use `npm run commit`, prompting you to fill out the git commit message step-by-step.

#### Type
Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **test**: Adding missing tests
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation
  generation

#### Scope
The scope could be anything specifying place of the commit change. The scope is optional.

In case of a feature or fix, it would typically be the name of the file/module, e.g. `fix(parse-css):`.

#### Summary
The summary contains succinct description of the change. Keep it clear, but short. Put the rest in the body.

#### Body
The body should include the motivation for the change and contrast this with previous behavior.

Note: the commit message format guidelines are based on [Angular's Git Commit Guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines).


## Scripts

Development requires [Node.js](http://nodejs.org/) and [npm](https://npmjs.org/).

After installing dependencies (run `npm install`) the following scripts are available:

`npm run ...` | Description
---|---
`changelog` | Generate the changelog based on commits
`commit` | Make a commit using the project configuration for contribution.
`version` | Bumps the version, tags and generates changelog
`test` | Check all Fastatic script files for format and syntax errors.
`fastatic:help` | Test if help text is displayed on console.
`fastatic:version` | Test if current version is displayed on console.
`fastatic:boostrap` | Test Fastatic on `examples/bootstrap-gh-pages/`.
`fastatic:microsoft` | Test Fastatic on `examples/microsoft.github.io-master/`.
`fastatic:react` | Test Fastatic on `examples/react-gh-pages/`.
`start` | Starts a  local server to view `examples/` on `http://localhost:3278` ("fast" in T9).
`ngrok` | Creates a proxy to your local server with [ngrok](ngrok https://www.npmjs.com/package/ngrok) to test the `examples/` with online tools like [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/).
