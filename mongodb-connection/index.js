var mongodb = require('mongodb'); //npm install mongodb

var uri = 'mongodb://localhost:27017/example'; //use of the example db
//MongoClient helper creates a connection to MongoDB
mongodb.MongoClient.connect(uri, function(error, db) { 
  if (error) {
    console.log(error);
    process.exit(1);
  }

  //insert document
  db.collection('sample').insert({ x: 1 }, function(error, result) {
    if (error) {
      console.log(error);
      process.exit(1);
    }

    //query for a document
    //toArray: returns an array of documents in the call back
    db.collection('sample').find().toArray(function(error, docs) {
      if (error) {
        console.log(error);
        process.exit(1);
      }

      console.log('Found docs:');
      docs.forEach(function(doc) {
        console.log(JSON.stringify(doc));
      });
      process.exit(0);
    });
  });
});