Install dependences:
====================
Install all dependences with Bower and NPM:

**npm install** (You need to have globally node & npm installed)
**bower install** (You need to have globally bower installed)

Use Gulp tasks:
===============
After install all dependencies run the project with the next commands:

**gulp** or **gulp build** to build an optimized version of your application in /dist.<br />
**gulp serve** to launch a browser sync server on your source files.<br />
**gulp serve:dist** to launch a server on your optimized application.<br />
**gulp test** to launch your unit tests with Karma.<br />
**gulp test:auto** to launch your unit tests with Karma in watch mode.<br />
**gulp protractor** to launch your e2e tests with Protractor.<br />
**gulp protractor:dist** to launch your e2e tests with Protractor on the dist files.<br />

Json server task:
=================
JSON server is used to run or simulate a backend API from .json file

Run **json-server --watch db.json -p 4000**