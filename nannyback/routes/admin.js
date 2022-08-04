var express = require('express');
var router = express.Router();
const firebase=require('../db');
const nanny=require('../models/nanny')
const Parent=require('../models/Parent')
const firebaseAuth = require('../middleware/firebase-auth');
const firestore=firebase.firestore();
/* GET home page. */


router.post('/login',async function(req, res, next) {
    
    const {email, password} = req.body;
    console.log("sdgb",req.body)
firebase.auth().signInWithEmailAndPassword(email, password)
.then((userCredential) => {
    console.log("geloo")
var user = userCredential.user;
    console.log("logged in",userCredential.email)
    res.send(userCredential.email)

})

.catch((error) => {

var errorCode = error.code;
var errorMessage = error.message;
console.log(error)
});

 });

 router.get('/auth',firebaseAuth, function(req , res){
    
    });


router.get('/allparents',firebaseAuth,async function(req, res, next) {
   try {
    const users=await firestore.collection('parent');
    const data=await users.get();
    const usersArray=[];
    if(data.empty){
        res.status(404).send('No record found');
    }
    else{
        data.forEach(doc=>{
            const obj={data:doc.data(),id:doc.id}
            usersArray.push(obj);
        });
        res.send(usersArray);
    }
   } catch (error) {
    res.status(400).send(error.message)
   }
});

router.get('/allnannies',firebaseAuth,async function(req, res, next) {
    try {
     const users=await firestore.collection('nanny');
     const data=await users.get();
     const usersArray=[];
     if(data.empty){
         res.status(404).send('No record found');
     }
     else{
         data.forEach(doc=>{
             const obj={data:doc.data(),id:doc.id}
             usersArray.push(obj);
         });
         res.send(usersArray);
     }
    } catch (error) {
     res.status(400).send(error.message)
    }
 });

 router.delete('/deleteparent/:nid',firebaseAuth,async function(req, res, next) {
    try {
     const users=await firestore.collection('parent').doc(req.params.nid);
     const data=await users.get();   
     if(data.empty){
         res.status(404).send('No record found');
     }
     else{
        users.doc(req.params.nid).delete();   
     }
    } catch (error) {
     res.status(400).send(error.message)
    }
 });

 router.delete('/deletenanny/:nid',firebaseAuth,async function(req, res, next) {
    try {
     const users=await firestore.collection('nanny').doc(req.params.nid);
     const data=await users.get();   
     if(data.empty){
         res.status(404).send('No record found');
     }
     else{
        users.doc(req.params.nid).delete();   
     }
    } catch (error) {
     res.status(400).send(error.message)
    }
 });

 router.get('/logout', function(req , res){
    firebase.auth().signOut().then(() => {
        res.send("logged out")
    }).catch((error) => {
    // An error happened.
    });
    });

module.exports = router;
