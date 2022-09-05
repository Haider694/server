const express = require("express");
const schema= require("./schema/schema")
const mongoose = require("mongoose");
const {graphqlHTTP}= require("express-graphql");
const app=express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://khaider:haider@cluster0.kkguppr.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("haidata").collection("Author");
  console.log("error come")
  // perform actions on the collection object
  client.close();
});


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(5000,()=>{
    console.log("listenin port 5000")
})