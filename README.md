# AppServerSide

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

## Using Server-Side Rendering (SSR)

To utilize server-side rendering (SSR) for your application, you can use the commands defined in the `package.json` file. Below are the steps:

### Start SSR with Watch Mode
To start the SSR server in watch mode, run:
```bash
npm run watch
```

### Start SSR with PM2
To start the SSR server using PM2, run:
```bash
npm run pm2:start
```

### View PM2 Logs
To view the logs for the SSR server managed by PM2, run:
```bash
npm run pm2:logs
```

These commands ensure efficient management and monitoring of your SSR application.
