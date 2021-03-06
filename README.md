FRONT END README

For backend, see https://github.com/MauriceChiu7/crypto-commerce-backend

Author: Hari Kuduva, Maurice Chiu, Aayush Shah

PREREQUISITES FOR RUNNING FRONT END
  1) Download node js https://nodejs.org/en/
  2) Download node package manager (NPM).
  3) Download angular command line interface (Angular CLI) from https://cli.angular.io/

HOW TO RUN THE FRONT END
  1) Need to have a working copy of the front end. Can clone from https://github.com/sriharikuduva/TCSS445_CryptoCommerce.git
      If your looking at this document you shouldn't need to clone though.
  2) After cloning cd into the location where you cloned the project
  3) Type in the command ng serve
  4) IF you get a '@angular-devkit/build-angular' run the command: npm install --save-dev @angular-devkit/build-angular
  5) Look at picture 'error_devkit.png' for more details regarding this error
  6) If you ran the steps above the front end should be live on http://localhost:4200/
  7) If an error is persisting please don't hesistate to contact me with your concerns at harikuduva7@gmail.com

FRONT END THINGS TO BE AWARE OF
  1) Since we are using heroku for our backend, and we are using the free verison our backend will fall asleep
      every 15 minutes of inactivity.
  2) This means that if you ping the server through our front end, there will be a chance that data will not show up initially,
      especcially if the server is asleep.
  3) After a breif momemnt data should populate. After the server is active you will not see delays.
  4) So if you don't see data, either wait or refresh the page and use our front end again

  5) You will see that angular is very modular. Every webpage is broken down into components.
  6) Most of the outbound http requests are made in the global service class.

PART BELOW GENERATED BY ANGULAR CLI
_____________________________
# TCSS445FrontEnd

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
