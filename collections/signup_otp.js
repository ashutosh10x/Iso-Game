module.exports = (db, callback) => {
    db.createCollection("signup_otp", 
         {
            'validator': { '$and':
               [
                  { 'identifier': { '$type': "string" } },
                  { 'count': { '$type': "int" } },
                  { 'last_modified': { '$type':  "long" } },
                  {'otp_sent_at': { '$type': 'date' } },
                  { 'otp': { '$type': "string" } }
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