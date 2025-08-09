# web-base-structures-api

## Prerequisites
node: v20.11.0  
npm: 10.2.4
mysql: 8.0.35-0ubuntu0.20.04.1  
postgres: 15.3


## Project Structure
```
├── src                             
│   ├── start.ts                    // Entry point of the project., Setup reset server and database connection.
│   ├── assets                      // Assets folder contains all the assets of the project that can not be compiled.
│   │   ├── locales                 // Locales folder contains all multi language files for i18n.
│   │   ├── server                  // (ex. AJV Validator json schema)
│   │   └── templates               // Templates folder contains all the templates of the project. (ex. Email templates)
│   ├── common                      // Common folder contains all the common files that can be used in the project.
│   │   ├── constants               // Constants folder contains all the constants of the project.
│   │   ├── enums                   // Enums folder contains all the enums of the project.
│   │   ├── errors                  // Errors folder contains all the errors of the project.
│   │   ├── responses               // Responses folder contains all the responses of the project.
│   │   ├── scripts                 // Scripts folder contains all the scripts of the project.
│   │   ├── utils                   // Utils folder contains all the utils of the project.
│   │   └── validators              // validators folder contains all the validators of the project. (ex. AJV Validator)
│   ├── config
│   │   └── database                // Database folder contains all the database configuration of the project.
│   ├── middlewares                 // Middleware of request
│   ├── server                      // ex. Rest server, socket server
│   │   └── rest                    // Rest server
│   │       ├── RestServer.ts       // RestServer.ts start express server.
│   │       └── v1                  // Rest server version 1
│   │           ├── routes          // routes folder contains all the routes of the project.
│   │           ├── controllers     // controllers folder contains all the controllers of the project.
│   │           └── validators      // validators folder contains all the request validators of the project.
│   └── storage                     // Storage folder contains all migrations, models, seeders of the project.
│       ├── config
│       ├── migrations
│       ├── models
│       └── seeders
├── types                           // Types folder contains all request and response types of the project
├── package.json                    // Package.json file contains all the dependencies of the project.   
├── tsconfig.json                   // Tsconfig.json file contains all the typescript configuration of the project.
├── .env                            // .env file contains all the environment variables of the project. 
├── README.md                       // Readme file contains all the information of the project.
```


## How to start

Git clone the project with the following command:

```
git clone git@github.com:Task/project.git
```

Install the dependencies with the following command:
```
npm install
```


With empty database you need to run the following command:

```
npm run migrate
```

With sample data you need to run the following command:

```
npm run migrate
npm run seed
```

How to run the project:

```
npm run start
```
