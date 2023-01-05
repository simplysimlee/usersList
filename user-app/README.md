# UserApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.

This project is a Single Page Application to display USER details using angular 15. Native CSS and HTML is used to build the web pages.
For responsivness, CSS grid is used. 

On the home page/landing page, user sees the List of User present in the System along with a search bar on the top. User list is retirved from users.json in asset folder and then this is stroed in the local storage.

User can Search about different users persent in the system by their Id or Name. 
The search bar filters data by ID, given name and display name. This is implemented using a custom pipe know as user-filter.

User can view more details and edit the details by clicking on view more button. On clciking view more, a pop over screen comes which is made using reusable angular directive called components. Inside view detail component, reactive form is used display the form data. Form validations such as required field check is also applied to the form.

If user makes any changes to the form and form is in valid state (with no error), we patch the data inside the local storage. And using event emitters we refresh the data in the home page.






## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
