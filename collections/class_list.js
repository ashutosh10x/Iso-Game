module.exports = (db, callback) => {
    db.createCollection("class_list", 
         {
            'validator': { '$and':
               [
                  { '_id': { '$type': "int" } },
                  { 'name': { '$type': "string" } }
               ]
            }
         },
      function(err, results) {
        console.log("Collection created.");
        if(callback)
            callback();
      }
    );
  };