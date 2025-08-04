# Yomali Coding Exam

## Database
Reading through the brief about the database. I decided for the sake of simplicity
I'd only create a single table for all the data about a visitor of the website.
![traffic.png](php-backend/images/traffic.png)

If there was more data that was captured during the website visit I would've normalised
the database to separate all the data.
ALong with the `traffic` table I also created a `users` table that just has a `name` and
`token` field so I could some basic security to my PHP API endpoint.

## Implementation
While I would have preferred to dockerize everything, I am currently using windows with WSL
I regrettably couldn't get it running. The backend consists of a PHP API using Symfony has my framework.
The frontend consists of a Javascript using Next.js.

* My implementation of the javascript tracker is in `traffic-checker/public/js/traffic-checker.js`

## Instructions
This start the application please follow these steps:

Go to the `env` file and fill in `DATABASE_URL` with your database credentials eg. 
`DATABASE_URL="mysql://root:pass@127.0.0.1:3306/test"`
```
php bin/console doctrine:migrations:migrate
```
This will run a migration in `php-backend/migrations` to insert some fixture data to the `users` table for a simple token `12345` used for the api.

Then within `/php-backend` you can run:
```
symfony serve
```
This will start the symfony server.

Then within `/traffic-checker` you can run:
```
npm run dev
```
This will run the front end.

From there both the applications will be ready to use.

 