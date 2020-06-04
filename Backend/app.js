try{
    var express = require('express');
    var bodyParser = require('body-parser');
    var cors = require('cors');
  
  }catch(error){
    console.error("ERROR are all the Dependencies installed?");
    console.log(error);
    process.exit(1);
  }
  
  // Config
  var port = 9000;
  
  
  var app = express(); // Define our app
  
  app.use(cors())
  ;
  // Configure app to use bodyParser()
  // This will let us get data from a POST
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  
  var sign_s3 = require('./controllers/sign_s3');
  
  app.use('/sign_s3', sign_s3.sign_s3);
  
  app.listen(port);
  
  console.log("Server Started make a request to localhost:" + port )



// const express = require('express');
// const app = express();
// const AWS = require('aws-sdk');
// const fs = require('fs');
// const fileType = require('file-type');
// const bluebird = require('bluebird');
// const multiparty = require('multiparty');
// const dotenv = require('dotenv').config();
// var cors = require("cors");

// // configure the keys for accessing AWS
// AWS.config.update({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// });

// // configure AWS to work with promises
// AWS.config.setPromisesDependency(bluebird);

// // create S3 instance
// const s3 = new AWS.S3();

// // abstracts function to upload a file returning a promise
// const uploadFile = (buffer, name, type) => {
//   const params = {
//     ACL: 'public-read',
//     Body: buffer,
//     Bucket: process.env.S3_BUCKET,
//     Bucket: "inncrewin-test1",
//     ContentType: type.mime,
//     Key: `${name}.${type.ext}`
//   };
//   return s3.upload(params).promise();
// };

// app.use(cors());

// // Define POST route
// app.post('/test-upload', (request, response) => {
//     console.log("post api got hit")
//   const form = new multiparty.Form();
//     form.parse(request, async (error, fields, files) => {
//       if (error) {
//         throw new Error(error);
//         // console.log(error)
//       };
//       try {
//         const path = files.file[0].path;
//         // console.log(path);
//         const buffer = fs.readFileSync(path);
//         console.log(buffer);
//         let type = await fileType(buffer);
//         console.log(type);
//         const timestamp = Date.now().toString();
//         const fileName = `bucketFolder/${timestamp}-lg`;
//         const data = await uploadFile(buffer, fileName, type);
//         console.log("in api try");
//         return response.status(200).send(data);
//       } catch (error) {
//         console.log(error);
//         return response.status(400).send(error);
//       }
//     });
// });


// app.listen(process.env.PORT || 9000);
// // console.log(process.env.AWS_ACCESS_KEY_ID)
// // console.log(process.env.AWS_SECRET_ACCESS_KEY)
// console.log('Server up and running...');