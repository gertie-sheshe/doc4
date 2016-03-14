######Circle CI : [![Circle CI](https://circleci.com/gh/andela-gnyenyeshi/doc4.svg?style=svg)](https://circleci.com/gh/andela-gnyenyeshi/doc4)

[![Coverage Status](https://coveralls.io/repos/github/andela-gnyenyeshi/doc4/badge.svg?branch=develop)](https://coveralls.io/github/andela-gnyenyeshi/doc4?branch=develop)

[![codecov.io](https://codecov.io/github/andela-gnyenyeshi/doc4/coverage.svg?branch=master)](https://codecov.io/github/andela-gnyenyeshi/doc4?branch=master)


DOCUMENT MANAGEMENT SYSTEM
==========================

Document Management System is an application that helps users manage their documents in an organized way. A User can be able to upload a document, edit it and share it with other users. Aside from enabling users to properly document their work with regard to category, the application permits users to work collaboratively on documents.

Development
===========

Back End
--------
This application has been created using Nodejs environment and implementing [**Express**](http://expressjs.com/) as the routing framework and [**Mongoose**](http://mongoosejs.com/), an object modeling package, to interact with MongoDB. Authentication has been implemented using [**Passport**](http://passportjs.org/). For this version, only local strategy has been used. [**JWT tokens**](https://jwt.io/) have also been used to authenticate routes.

Front End
---------
The Front-End of this application has been implemented using ReactJs and the Material Design Framework, Material Design Lite.

Testing
=======

Back-End.
--------
The Back-End of this application has been tested using [**supertest**](https://www.npmjs.com/package/supertest), which is a Super-agent driven library for testing Node.js HTTP servers using a fluent API and [**Mocha**](https://mochajs.org), which is a feature-rich JavaScript test framework running on Node.js and the browser, making asynchronous testing simple and fun.

Code-coverage has been implemented using JScoverage.

Front-End.
----------
The Front-End has been tested using Mocha, sinon, enzyme and chai.

Code-coverage has been implemented using BlanketJS.

Installation.
-------------
1. Install [**Nodejs**](www.nodejs.org) and [**MongoDB**](www.mongodb.org)
2. Clone this repo or download the zipped file.
3. Navigate to the master branch.
4. Run
    ```
    npm i

    ```
    This will install the required dependencies.
5. Run
  ```
  npm test

  ```
  to run the tests.
6. Run
  ```
  gulp

  ```
  Use [**Postman**](https://www.getpostman.com/) to consume the API.
7. Well...enjoy.
