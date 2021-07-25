module.exports = (db, callback) => {
    db.createCollection("users", 
         {
            'validator': { '$and':
               [
                  { 'phone': { '$type': "string" } },
                  { 'email': { '$regex': /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ } },
                  { 'status': { '$in': [ "active", "inactive" ] } },
                  { 'created_at': { '$type':  "date" } },
                  { 'last_modified': { '$type':  "date" } },
                  { 'password': { '$type': "string" } }
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