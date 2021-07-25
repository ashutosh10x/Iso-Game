const express = require('express');
const router = express.Router();
var otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt')
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

router.post('/', (req, res)=>{
    let {password, identifier, otp} = req.body
    let {device_id = 1, device_info} = req.headers
    let db = req.app.locals.db

    findDocuments(db, "users", {'$or': [{"phone": identifier}, {"email": identifier} ]}, {}, (result)=>{
        //if account exists
        if(result.length){
            
            let login_details = result[0].login_details || []
            let total_active_devices = 0
            for(let i=0;i<login_details.length;i++){
                if(login_details[i].is_active){
                    total_active_devices++
                }
            }
            //check if maximum device limit reached
            if(total_active_devices>=process.env.MAXIMUM_DEVICES){
                res.status(400).send({error: `You can only login through ${process.env.MAXIMUM_DEVICES} devices at a time`})
            }
            else{
                //if login via password
                if(password){
                    bcrypt.compare(password, result[0].password, function(err, matched) {
                        console.log("PASSWORD MATCHED------", matched)
                    if(matched){  
                        uidgen.generate()
                        .then(uid => {
                            let was_device_used = false
                            let device_index, new_device_id
                            for(let i=0;i<login_details.length;i++){
                                if(login_details[i].device_id==device_id){
                                    was_device_used = true
                                    device_index=i
                                    break
                                }
                            }
                            if(was_device_used){
                                new_device_id=device_id
                                let new_login_details = login_details
                                new_login_details[device_index].session_token = uid
                                new_login_details[device_index].is_active = 1
                                updateDocument(db, "users", {user_id: result[0].user_id},{
                                    login_details: new_login_details
                                })
                            }
                            else{
                                new_device_id = login_details.length + 1
                                let new_login_details = login_details
                                new_login_details.push({
                                    session_token: uid,
                                    is_active: 1,
                                    device_id: login_details.length + 1,
                                    device_info
                                })
                                updateDocument(db, "users", {user_id: result[0].user_id},{
                                    login_details: new_login_details
                                })
                            }
                            res.send({
                                user_id: result[0].user_id,
                                session_token: uid,
                                device_id: new_device_id
                            })
                        })
                    }
                    else{
                        res.status(400).send({error: "Password didn't match"})
                    }
                });
        }
    //if login via otp
    if(otp){
        findDocuments(db, "signup_otp", {identifier}, {}, (otp_result)=>{
            if(otp_result.length){
              if(otp_result[0].otp==otp){
                uidgen.generate()
                .then(uid => {
                    let was_device_used = false
                    let device_index
                    let new_device_id
                    for(let i=0;i<login_details.length;i++){
                        if(login_details[i].device_id==device_id){
                            was_device_used = true
                            device_index=i
                            break
                        }
                    }
                    if(was_device_used){
                        new_device_id = device_id
                        let new_login_details = login_details
                        new_login_details[device_index].session_token = uid
                        new_login_details[device_index].is_active = 1
                        updateDocument(db, "users", {user_id: result[0].user_id},{
                            login_details: new_login_details
                        })
                    }
                    else{
                        new_device_id = login_details.length + 1
                        let new_login_details = login_details
                        new_login_details.push({
                            session_token: uid,
                            is_active: 1,
                            device_id: login_details.length + 1,
                            device_info
                        })
                        updateDocument(db, "users", {user_id: result[0].user_id},{
                            login_details: new_login_details
                        })
                    }
                    res.send({
                        user_id: result[0].user_id,
                        session_token: uid,
                        device_id: new_device_id
                    })
                })
              }
              else{
                  res.status(400).send({error: "Invalid OTP"})
              }
            }
            else{
                res.status(400).send({error: "Account does not exist"})
            }
        })  
      }
    }
    }
    //if account doesn't exist
    else{
        res.status(400).send({error: "Account doesn't exist"})
    }
    })
 
})

router.post("/send-otp", (req, res)=>{
    let db = req.app.locals.db
    let {identifier} = req.body
    findDocuments(db, "users", {'$or': [{"phone": identifier}, {"email": identifier} ] }, {}, (result)=>{
        console.log(result[0].otp_details)
        if(result[0].otp_details){
            console.log("Existing User")
            console.log(Date.now()-result[0].otp_details.last_sent)
        if(Date.now()-result[0].otp_details.last_sent<300000){
            console.log("Within 5 minutes")
            if(result[0].otp_details.count==3){
                console.log("Count reached 3")
                res.send({timer: Math.round((result[0].last_modified + 480000- Date.now())/1000)})
            }
            else{
                console.log("Count less than 3")
                let otp_details = {
                    count: result[0].count + 1,
                    last_sent: Date.now(),
                    identifier
                }
            updateDocument(db, "users", {user_id: result[0].user_id}, {
                otp_details
            })
            res.send({otp: result[0].otp_details.otp})
        }
        }
        else{
            console.log("After 5 minutes")
            let random = otpGenerator.generate(4, { alphabets: false, upperCase: false, specialChars: false })
            let otp_details = {
                "otp": random,
                "last_sent": Date.now(),
                "count": 0,
                identifier
            }
            updateDocument(db, "users", {user_id: result[0].user_id}, 
                { 
                   otp_details 
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
        let otp_details = {
            "otp": random,
            "last_sent": Date.now(),
            "count": 0,
            identifier
        }
        updateDocument(db, "users", {user_id: result[0].user_id}, [
            {
                otp_details
            }
        ])
        res.send({otp: random})
        console.log("-------------RANDOM--------------")
        console.log(random)  
    }
    })
})

module.exports = router