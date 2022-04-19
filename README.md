# Repository for Empower Global web app code

## Installation

Run from **root** folder

`npm install`

## Run

`npm start`

## Commits

Run `npm run format` to format code end run linter

We use Husky https://www.npmjs.com/package/husky for prettier run on commit

## Submodules

### To clone repository with submodules run

`git clone --recurse-submodules https://github.com/TechSparq/eg_SFCC_FE_core.git`

This command will automatically initialize and update each submodule in the repository, including nested submodules if any of the submodules in the repository have submodules themselves.

If you already cloned the project and forgot --recurse-submodules run

`git submodule update --init --recursive`

### To pull all changes in the repo including changes in the submodules

`git pull --recurse-submodules`

### To pull all changes for the submodules

`git submodule update --remote`

See https://git-scm.com/book/en/v2/Git-Tools-Submodules for more information on working with submodules.
