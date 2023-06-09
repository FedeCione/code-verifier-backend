# code-verifier-backend



## Getting started

To make it easy for you to get started with GitHub, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

```
cd existing_repo
git remote add origin https://github.com/FedeCione/code-verifier-backend.git
git branch -M master
git push -u origin master
```

# Editing this README

When you're ready to make this README your own, just edit this file and use the handy template below (or feel free to structure it however you want - this is just a starting point!). Thank you to [makeareadme.com](https://www.makeareadme.com/) for this template.

## Dependencies

- __Express__: Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

- __Typescript__: TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

- __Swagger__: Swagger helps users build, document, test and consume RESTful web services.

- __Mongoose__: Mongoose acts as a front end to MongoDB, an open source NoSQL database that uses a document-oriented data model. A "collection" of "documents" in a MongoDB database is analogous to a "table" of "rows" in a relational database.

- __Dotenv__: Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.

- __Concurrently__: Run multiple commands concurrently. Like npm run watch-js & npm run watch-less but better.

- __Eslint__: ESLint is a static code analysis tool for identifying problematic patterns found in JavaScript code. It was created by Nicholas C. Zakas in 2013. Rules in ESLint are configurable, and customized rules can be defined and loaded.

- __Jest__: Jest is a JavaScript testing framework designed to ensure correctness of any JavaScript codebase. It allows you to write tests with an approachable, familiar and feature-rich API that gives you results quickly.

- __Nodemon__: Nodemon is a popular tool that is used for the development of applications based on node. js. It simply restarts the node application whenever it observes the changes in the file present in the working directory of your project.

- __Webpack__: Webpack is a static module bundler for JavaScript applications — it takes all the code from your application and makes it usable in a web browser. Modules are reusable chunks of code built from your app's JavaScript, node_modules, images, and the CSS styles which are packaged to be easily used in your website.

- __Cors__: Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served.

- __Helmet__: Helmet is a useful Node.js module that helps you secure HTTP headers returned by your Express apps.

## NPM Scripts

- __"build": "npx tsc"__ - Transpile the code using tsconfig.json

- __"start": "node dist/index.js"__ - Run the transpiled code

- __"dev": "concurrently \"npx tsc --watch\" \"nodemon -q dist/index.js\""__ - Transpiles the code and executes it when it detects changes

- __"test": "jest"__ - Jest test

- __"serve:coverage": "npm run test && cd coverage/lcov-report/ && npx serve"__ - Run the Jest test and it shows you the coverage
