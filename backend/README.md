# Starter
This is the starter for the backend application.

### Installed Prerequisites
In order to launch the application the following items must be installed:
* [Java 17](https://adoptopenjdk.net/)
* [Maven](https://maven.apache.org/download.cgi)
* [MySQL Community Server + Workbench](https://dev.mysql.com/downloads/installer/)
* [Git](https://git-scm.com/downloads)

### Reference Documentation
For further reference, please consider the following sections:

* [Official Apache Maven documentation](https://maven.apache.org/guides/index.html)
* [Spring Boot Maven Plugin Reference Guide](https://docs.spring.io/spring-boot/docs/2.4.0-SNAPSHOT/maven-plugin/reference/html/)
* [Create an OCI image](https://docs.spring.io/spring-boot/docs/2.4.0-SNAPSHOT/maven-plugin/reference/html/#build-image)
* [Spring Web](https://docs.spring.io/spring-boot/docs/2.7.6/reference/htmlsingle/#boot-features-developing-web-applications)
* [Spring Data JPA](https://docs.spring.io/spring-boot/docs/2.7.6/reference/htmlsingle/#boot-features-jpa-and-spring-data)
* [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/2.7.6/reference/htmlsingle/#production-ready)
* [Spring Boot DevTools](https://docs.spring.io/spring-boot/docs/2.7.6/reference/htmlsingle/#using-boot-devtools)
* [Spring Boot Configuration Processor](https://docs.spring.io/spring-boot/docs/2.7.6/reference/htmlsingle/#features.external-config.typesafe-configuration-properties)
* [Validation](https://docs.spring.io/spring-boot/docs/2.7.6/reference/htmlsingle/#io.validation)

### Guides
The following guides illustrate how to use some features concretely:

* [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)
* [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
* [Building REST services with Spring](https://spring.io/guides/tutorials/bookmarks/)
* [Accessing Data with JPA](https://spring.io/guides/gs/accessing-data-jpa/)
* [Building a RESTful Web Service with Spring Boot Actuator](https://spring.io/guides/gs/actuator-service/)

### AWS setup
1. Go to Elastic Bean Stalk
2. Create new environment
3. Create new application
4. Choose Java 11 and MySQL database.
5. System parameters to set:
```
RDS_DB_NAME ebdb //this is default db name created automatically with the application
RDS_HOSTNAME something similar to this: aa16my1gs1126vw.czyphws3wq6b.eu-central-1.rds.amazonaws.com
RDS_PASSWORD MySQL password set during the creation
RDS_PORT 3306 //MySQL server port
RDS_USERNAME root //database user
SERVER_PORT 5000 //it must be 5000 and it is defined in the application.properties
CORS_URLS urls of the frontend and backends for the bookly
SPRING_PROFILES_ACTIVE prod-aws-mysql
or
SPRING_PROFILES_ACTIVE prod-aws-mysql,jwt
JWT_SECRET some secret value best if generated randommly
```
6. IMPORTANT: Add inbound rule to the db security group to allow access all inbound ips. Mysql/Aurora anywhere.

### Azure
Assumption: The subscription has been configured properly, and it is active. 
1. Go to [Quickstart Center](https://portal.azure.com/?quickstart=true#blade/Microsoft_Azure_Resources/QuickstartCenterBlade)
2. Create a web app under new resource group.
3. Create new application
4. Choose Java 17 and create.
5. Under the same resource group create MySQL database engine 8. Create db schema in Workbench
6. Environment parameters set under Configuration of Web App:
```
MYSQL_DB_NAME this is default db name created automatically with the application
MYSQL_HOSTNAME something similar to this: aa16my1gs1126vw.czyphws3wq6b.eu-central-1.rds.amazonaws.com
MYSQL_PASSWORD MySQL password set during the creation
MYSQL_PORT 3306 //MySQL server port
MYSQL_USERNAME root //database user
CORS urls of the frontend and backends for the bookly
SPRING_PROFILES_ACTIVE prod-azure-mysql
or
SPRING_PROFILES_ACTIVE prod-azure-mysql,jwt
TOKEN_SECRET some secret value best if generated randommly
```
7. IMPORTANT: In order to have access to the MySQL database, one have to change `Allow access to Azure services
   ` to `Yes` and add `Firewall rule` to access the database from specific IP (like home).
### Additional help:
- create AWS account
- [create IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html)
- copy and paste the api key and secret api key
- [install aws cli](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
- [create VPC](https://docs.aws.amazon.com/vpc/latest/userguide/default-vpc.html#create-default-vpc)
- [Install EB CLI](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install-windows.html)
- [configure the EB CLI](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-configuration.html)
- [save configuration](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-savedconfig.html)
- [Azure Idea plugin](https://docs.microsoft.com/en-us/azure/developer/java/toolkit-for-intellij/create-hello-world-web-app)
- [Azure Toolkit plugin - Sign in instructions](https://learn.microsoft.com/en-us/azure/developer/java/toolkit-for-intellij/sign-in-instructions)
- Swagger url: [http://localhost:8080/swagger-ui/index.html]()