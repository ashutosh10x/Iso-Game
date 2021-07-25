
const express = require('express');
const router = express.Router();
var otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10;
const UIDGenerator = require('uid-generator');
const uidgen = new UIDGenerator();

const findDocuments = function(db, collection_name, row_filter, column_filter, callback) {
    // Get the documents collection
    const collection = db.collection(collection_name);
    // Find some documents
    collection.find(row_filter, column_filter).toArray(function(err, docs) {
      console.log("Found the following records");
      console.log(docs)
      if(callback)
        callback(docs);
    });
  }

const insertDocuments = function(db, collection_name, document_array, callback) {
    // Get the documents collection
    const collection = db.collection(collection_name);
    // Insert some documents
    collection.insertMany(document_array, function(err, result) {
      if(err){
        console.log("-------------Document insertion failed---------------")
        console.log(err)
      }
      console.log("--------------Inserted documents into the collection-------------");
      if(callback)
        callback(result);
    });
  }

  const updateDocument = function(db, collection_name,query, update, callback) {
    // Get the documents collection
    const collection = db.collection(collection_name);
    // Update document where a is 2, set b equal to 1
    collection.updateOne(query
      , { $set: update }, function(err, result) {
          if(err)
            console.log(err)
      console.log("Updated the document");
      if(callback)
        callback(result);
    });
  }


    // findDocuments("signup_otp", {identifier: 2}, {}, (result)=>{
    //     console.log(result.length)
    //     if(result.length){
    //         console.log("Existing User")
    //         console.log(Date.now()-result[0].last_modified)
    //     if(Date.now()-result[0].last_modified<300000){
    //         console.log("Within 5 minutes")
    //         if(result[0].count==3){
    //             console.log("Count reached 3")
    //             console.log({timer: Math.round((result[0].last_modified + 480000- Date.now())/1000)})
    //         }
    //         else{
    //             console.log("Count less than 3")
    //         updateDocument("signup_otp", {identifier: 2}, {
    //             count: result[0].count + 1,
    //             last_modified: Date.now()
    //         })
    //         console.log({otp: result[0].otp})
    //     }
    //     }
    //     else{
    //         console.log("After 5 minutes")
    //         let random = otpGenerator.generate(4, { alphabets: false, upperCase: false, specialChars: false })
    //         updateDocument("signup_otp", {identifier: 2}, 
    //             { 
    //                 otp: random,
    //                 last_modified: Date.now(),
    //                 count: 1
    //             }
    //         )
    //         console.log({otp: random})
    //         console.log("---------------RANDOM----------------")
    //         console.log(random)
    //     }
    // }
    // else{
    //     console.log("Non-existing user")
    //     let random = otpGenerator.generate(4, { alphabets: false, upperCase: false, specialChars: false })
    //     insertDocuments("signup_otp", [
    //         {
    //             identifier: 2,
    //             otp: random,
    //             last_modified: Date.now(),
    //             count: 1
    //         }
    //     ])
    //     console.log({otp: random})
    //     console.log("----------------RANDOM---------------")
    //     console.log(random)  
    // }
    // })

    // bcrypt.genSalt(SALT_WORK_FACTOR, function(gen_salt_err, salt) {
    //     if (gen_salt_err) res.send(gen_salt_err);

    //     // hash the password along with our new salt
    //     bcrypt.hash("Abhi@16019", salt, function(hash_err, hash) {
    //         if (hash_err) console.log(hash_err);
    //         insertDocuments("users", [{
    //             "status": "active",
    //             "created_at": new Date(),
    //             "last_modified": new Date(),
    //             "email": "abhishek@logiqids.com",
    //             "phone": "9869173475",
    //             "password": hash,
    //             "name": "Abhishek"
    //         }], (result)=>{
    //             if(result)
    //             console.log(result)
    //         })
    //     })
    // })


router.post("/check-if-account-exists", (req, res)=>{
    let db = req.app.locals.db
    console.log(db)
    let {phone, email} = req.body
    let email_exists = false
    let phone_exists = false
    findDocuments(db, "users", {'$or': [{"phone": phone}, {"email": email} ]}, {}, (result)=>{
        if(result.length){
            if(result[0].email==email){
                email_exists = true
            }
            if(result[0].phone==phone){
                phone_exists = true
            }
        }
        res.send({
            email_exists,
            phone_exists
        })
    })
})

router.post("/add-parent", (req, res)=>{
    let db = req.app.locals.db
    let {email, phone, name, password} = req.body
    bcrypt.genSalt(SALT_WORK_FACTOR, function(gen_salt_err, salt) {
        if (gen_salt_err) res.send(gen_salt_err);

        findDocuments(db, "users", {}, {}, (result)=>{
            let user_id = result.length+1;

            // uidgen.generate()
            //     .then(uid => {
                    // hash the password along with our new salt
        bcrypt.hash(password, salt, function(hash_err, hash) {
            if (hash_err) res.send(hash_err);
            insertDocuments(db, "users", [{
                "status": "active",
                "created_at": new Date(),
                "last_modified": new Date(),
                "email": email,
                "phone": phone,
                "password": hash,
                "name": name,
                "user_id": user_id,
                // "login_details": [{
                //     device_id: 1,
                //     session_token: uid,
                //     device_info: JSON.parse(req.headers.device_info),
                //     is_active: 1
                // }]
            }], (result)=>{
                if(result)
                res.send({message: "Account created"})
            })
        })
                //})

            
        })

        
    })

})

router.post("/send-otp", (req, res)=>{
    let db = req.app.locals.db
    let {identifier, activity} = req.body
    findDocuments(db, "signup_otp", { "identifier": identifier}, {}, (result)=>{
        console.log(result.length)
        if(result.length){
            console.log("Existing User")
            console.log(Date.now()-result[0].last_modified)
        if(Date.now()-result[0].last_modified<300000){
            console.log("Within 5 minutes")
            if(result[0].count==3){
                console.log("Count reached 3")
                res.send({timer: Math.round((result[0].last_modified + 480000- Date.now())/1000)})
            }
            else{
                console.log("Count less than 3")
            updateDocument(db, "signup_otp", {identifier: identifier}, {
                count: result[0].count + 1,
                last_modified: Date.now(),
                activity
            })
            res.send({otp: result[0].otp})
        }
        }
        else{
            console.log("After 5 minutes")
            let random = otpGenerator.generate(4, { alphabets: false, upperCase: false, specialChars: false })
            updateDocument(db, "signup_otp", {"identifier": identifier}, 
                { 
                    "otp": random,
                    "last_modified": Date.now(),
                    "count": 0,
                    activity
                }
            )
            res.send({otp: random})
            console.log("-------------RANDOM--------------")
            console.log(random)
        }
    }
    else{
        console.log("Non-existing user")
        let random = otpGenerator.generate(4, { alphabets: false, upperCase: false, specialChars: false })
        insertDocuments(db, "signup_otp", [
            {
                "identifier": identifier,
                "otp": random,
                "last_modified": Date.now(),
                "count": 0,
                activity
            }
        ])
        res.send({otp: random})
        console.log("-------------RANDOM--------------")
        console.log(random)  
    }
    })
})

router.post("/verify-otp", (req, res)=>{
    let db = req.app.locals.db
    let {identifier} = req.body
    findDocuments(db, "signup_otp", {"identifier": identifier}, {}, (result)=>{
            if(Date.now()-result[0].last_modified>300000){
                res.status(400).send({error: "Invalid OTP"})
            }
            else{
                if(result[0].otp==req.body.otp){
                    res.send({
                        message: "Verified"
                    })
                }
                else{
                    res.status(400).send({
                        error: "Invalid OTP"
                    })
                }
            }
        }
    )  
})

module.exports = router



