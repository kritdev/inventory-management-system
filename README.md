# inventory-management-system

## Running Project
#### 1. Prerequisite
- Checkout [main branch](https://github.com/kritdev/inventory-management-system).
- Install MySQL Database. And create an empty database (default name is ims). (The database configuration can be changed in app-server/src/main/resources/application.properties).

#### 2. app-server
- Update server configuration in app-server/src/main/resources/application.properties.
- Run application server in "app-server" folder. the application will create tables structure and default user (user:admin, password:admin) automatically.
- The appliation server can run with eclipse IDE or maven command as below: -
```
  mvnw spring-boot:run
```
- In order to add more users or change password, It need to insert or update in database manually.
- There are 2 lookup tables which need to insert data manually into database. Which are category and unit_of_measure tables. Example: -
```
  insert into ims.category(id, name, description) values(301, 'Chair', 'Chair Category');
  insert into ims.category(id, name, description) values(302, 'Table', 'Table Category');
  insert into ims.category(id, name, description) values(303, 'Decorating', 'Decorating Category');
```
```
  insert into ims.unit_of_measure(id, name, description) values(401, 'pcs', 'Pieces');
  insert into ims.unit_of_measure(id, name, description) values(402, 'boxes', 'Boxes');
  insert into ims.unit_of_measure(id, name, description) values(403, 'packs', 'Packages');
```

#### 3. app-client 
- Run application client by using commands: -
```
  npm install
  ng serve -o
```

## Deploy Project
1. Build Application (Spring boot and Angular)
	- app-server
		- cmd (app-server folder): mvnw package
	- app-client
		- cmd (app-client folder): ng build --prod

2. Deploy Application
	- Copy to file into production environment
```
/application folder
|-- rest-service-cors-0.0.1-SNAPSHOT.jar
|-- public
|   |-- index.html
|   |-- favicon.ico
|   |-- main.xxxxxxx.js
|   |-- polyfills.xxxxxxx.js
|   |-- runtime.xxxxxxx.js
|   |-- styles.xxxxxxx.css
```

3. Start Application
	- cmd (application folder): java -cp . -jar app-server-0.0.1-SNAPSHOT.jar  --spring.profiles.active=prod
	- browse to : http://[production ip or domain]:8080/

