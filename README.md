# `notification-to-highlights`

[![Deployment status (Site Deployment workflow status)](https://img.shields.io/github/actions/workflow/status/ScratchAddons/notification-to-highlights/deploy.yml?label=deploy&style=flat-square)](https://github.com/ScratchAddons/website-v2/actions/workflows/deploy.yml) 
[![Website: scratchaddons.github.io/notification-to-highlights](https://img.shields.io/badge/website-/notification--to--highlights-ff7b26.svg?style=flat-square)](https://scratchaddons.github.io/notification-to-highlights/) 
[![License](https://img.shields.io/github/license/ScratchAddons/website-v2?style=flat-square)](https://github.com/ScratchAddons/notification-to-highlights/blob/master/LICENSE)

This tool assists translators on copying "Scratch Addons extension update" notification to the website as a version highlights.

## Guide

### Add highlights translation using the tool

1. Pick the version and the language.
2. Compare both notifications. The first one would be the English and the second one would be the translated one.
3. On Transifex, translate with the reference of both notifications, by copying the translated paragraph so it takes the same form as the original string on Transifex.
4. Switch to other version and start over. 

### Adding new versions

1. Open the main repository.
2. Using the tag, switch to the target version that you want to add.
3. Open the website repository.
4. Inside `src/pages`, copy one of the version that is already made.
5. Replace the `_locales` folder that is already present with the `_locales` folder from main repository.
7. Replace all the version numbers (e.g. `v1.33.2`) to the correct version (e.g. `v1.0.0`).
8. Copy the `showBanner` function from `content-scripts/cs.js`.
9. Replace `export const showBanner = () => {` with `export const showBanner = chrome => {`.
10. Replace `style: {...}` inside the `notifInnerBody` (see the first 10 lines of `notifBanner.js`) with `style: notifStyle`.
11. Replace `document.body.appendChild(notifOuterBody)` with `return notifInnerBody`.

## Astro commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:3000`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
