Recipes Service (Spring Boot + React)

Goal: Orchestration API that loads data from the external dataset https://dummyjson.com/recipes into an in-memory H2 DB, then exposes REST endpoints to:

Search recipes by free text on name and cuisine.

Get a recipe by id.

Admin endpoint to (re)load data from the external API into H2.

Includes: clean layering, logging, exception handling, validation, Resilience (retry/backoff + timeout), optimized paging fetch, config externalization, unit tests, and a React UI.

Getting Started with This React App

Step 1: Install Dependencies

Before running anything, install the project dependencies:

npm install


This will create the node_modules folder your project needs.

Available Scripts

In the project directory, you can run:

npm start

Runs the app in development mode.
Open http://localhost:5005
 to see it in your browser.
The page will reload automatically when you make changes.
Check the console for any warnings or errors.

npm test

Starts the test runner in watch mode so you can run your tests continuously.

npm run build

Creates a production-ready build in the build folder.
It optimizes your app for performance, minifies the code, and adds hashes to filenames.
Your app is then ready to be deployed.

npm run eject
