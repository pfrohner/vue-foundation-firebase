## vue.js + foundation + firebase

Boilerplate using a vue-cli 3 project with Foundation and Firebase API.
Personalized eslint rules and enhanced console output. (Use webpack instead of friendly-errors-plugin to see bundle sizes)

Possibilty to signup, login, and read the news which are coming from the Firebase database.


## Install

 1. Checkout the repository.
 2. Run the following command:

 ```
 npm install
 ```

## Get an API key from firebase

Visit https://console.firebase.google.com/, start a new project, copy the api config to main.js

Data structure is in '/data.json', create database on firebase in the same format.

## Development

```
npm run serve
```

## Production

The following script builds the production ready code:

```
npm run build
```

Output is in '/dist', contents of that folder should be deployed, and to start the server and handle dynamic routes on the webserver:

```
node server.js
```

## Todo
 * Add unit and e2e tests
 * Remove unused Foundation plugins