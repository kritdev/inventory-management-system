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

#### 3. app-client 
- Run application client by using commands: -
```
  npm install
  ng serve -o
```
<br><br>
## Usage
1. Create "Category" and "Unit of Measure" lookup table
- In navbar, click Gear icon, and click category.
- In category screen, click add button.
- Fill in the details and click save button.
- Repeat the steps for "Unit of Measure".
2. Create new product
- In navbar, click Gear icon, and click new product.
- In product screen, enter product information, and click save button.
- (Optional) Add product image and save.
3. Create new transaction
- In home, click product card.
- In Inventory Change Log section, click add button.
- In New Inventory Transaction, enter transaction information. For Item Count field, positive value is add item in stock. The nagative value is remove item from stock.

<br><br>
## Deploy Project
1. Update SQL Server setting for production environment in app-server. (app-server/src/main/resources/application-prod.properties).
```
  spring.jpa.hibernate.ddl-auto=update
  spring.datasource.url=jdbc:mysql://${MYSQL_HOST:localhost}:3306/ims
  spring.datasource.username=xxx
  spring.datasource.password=xxx
```
Note. If these properties are not set, it will use setting from development environment (application.properties).

2. Build Application (Spring boot and Angular)
	- app-server
		- cmd (app-server folder): mvnw package
	- app-client
		- cmd (app-client folder): ng build --prod

3. Deploy Application
	- Copy to file into production environment
```
/application folder
|-- app-server-0.0.3-SNAPSHOT.jar
|-- public
|   |-- bootstrap-icons.xxxxxxx.woff
|   |-- bootstrap-icons.xxxxxxx.woff2
|   |-- favicon.ico
|   |-- index.html
|   |-- main.xxxxxxx.js
|   |-- polyfills.xxxxxxx.js
|   |-- runtime.xxxxxxx.js
|   |-- styles.xxxxxxx.css
```

4. Start Application
	- cmd (application folder): java -cp . -jar app-server-0.0.3-SNAPSHOT.jar  --spring.profiles.active=prod
	- browse to : http://[production ip or domain]:8080/

<br><br>
## Version 0.0.3
### Improvements
- Create reusable template-driven form for Category and Unit-of-Measure editing page.
- Improve product editing page by saving both product and image entity in one transaction.
- add css for valid/invalid form control
