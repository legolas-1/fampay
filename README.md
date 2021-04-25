# fampay

## Prerequisite
    a. node version 10.23.1 or above
    b. npm 6.14.10 or above
    c. docker(optional)
    
## Run the project

### 1. locally
    a. npm install && npm start
    
### 2. with docker
    a. docker run -p 3000:3000 --env-file .env spookygandalf/fampay:latest
    
## Test API
    a. curl --request GET 'http://localhost:3000/videos/?page=13'
    b. curl --request GET 'http://localhost:3000/videos/?search=music'
