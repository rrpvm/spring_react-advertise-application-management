# Installation and launch process
## 1. You need to have:

###     - [![Node.js](https://img.shields.io/badge/Node.js-16.50.0%20LTS%20-brightgreen?style=for-the-badge&logo=Node.js&color=red&labelColor=252525)](https://nodejs.org/dist/v16.15.0/node-v16.15.0-x64.msi)
###     - [![Java Runtime Enviroment](https://img.shields.io/badge/JRE-18-brightgreen?style=for-the-badge&logo=Java&color=red&labelColor=252525)](https://www.oracle.com/java/technologies/downloads/)
###     - [![Apache Maven](https://img.shields.io/badge/Maven-3.8.5-brightgreen?style=for-the-badge&logo=ApacheMaven&color=red&labelColor=252525)](https://maven.apache.org/download.cgi)
## 2. Setup Windows path:
##### - press `win+r` then type `sysdm.cpl` => switch to advanced
- !['Advanced window image](https://www.poftut.com/wp-content/uploads/2019/05/img_5ce7fea9e56d0.png)
- !['Path Window image](https://www.poftut.com/wp-content/uploads/2019/05/img_5ce7fed4ad154.png)
##### - press `new` -> add Variable `Java Home` -> value = JRE installation folder

##### - `Path` -> add Value = `Maven` installation folder

##### - `Path` -> add Value = `Node.js` installation folder

## 2. Build and launching

### Client installation and launching

#### 1. execute `npm install` - install the dependencies
#### 2. `npm run build` - build the project
#### 3. `npm install -g serve` - install serve dependency
#### 4. `serve -s build` - run client application
#### 5. to run client application  `serve -s build` or `npm start`

### Backend installation and launching

#### 1. open `backend` folder
#### 2. `mvn package` to build server application
#### 3. `java -jar target/backend-0.0.1-SNAPSHOT.jar`

## 3. Resume
#### after launching process open [client app]('http://localhost:3000')
#### Admin data : `{login : rrpvm, password : 12345}`