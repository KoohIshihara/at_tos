const functions = require("firebase-functions")
const cors = require("cors")({ origin: true })
const firebase = require("./firebase")
const db = firebase.db
const domain = firebase.domain
const FieldValue = firebase.FieldValue

const tmp = require("./tmp")

exports.tmp = functions.https.onRequest((req, res) => {
  res.set("Access-Control-Allow-Origin", "*")
  res.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST")
  res.set("Access-Control-Allow-Headers", "Content-Type")
  cors(req, res, async () => {
    tmp.tmp(req.body)
    res.status(200).send({ result: "succeeded" }).end()
  }) // cors
})

// exports.createTmp = functions.firestore
//   .document('TMP/{tmpId}')
//   .onCreate(triggerTmp.createTmp)