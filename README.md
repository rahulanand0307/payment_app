# Payment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.22.

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






## About the project


Given a sample JSON data of payments consisting of :

PaymentId,OrderDate,MerchantId,CustomerEmail,Amount and PaymentStatus.


PaymentStatus could be one of these : ('Initiated','Failed','Dropped','Success','Refunded').

You need to build a UI for showing this data. Results should be shown in paginated way.


User can perform the following operations :-

1.      User can select how many results he wants to see per page. So the pagination will change accordingly.
2.      User should be able to navigate to first, previous, next and last page.
3.      Sorting on all columns in asc and dsc order.
4.      Searching on All text fields.
5.      Filtering on PaymentStatus, Date range.
6.      User can delete a specific/multiple payment object.
7.      User can edit and add a new payment information.
8.      User should be able to navigate to any page by entering page number.
9.      Make app data persistent using localstorage.. Reloading page should render UI in state which it was before reload.
