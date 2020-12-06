const config = require("./config")
const admin = require("firebase-admin")
const FieldValue = admin.firestore.FieldValue
const domain = config.domain

admin.initializeApp(config.config)

// We can download service account key here
// https://console.cloud.google.com/iam-admin/serviceaccounts?project=setteicho-dev&folder=&organizationId=&supportedpurview=project

// const env = "prod"
// let domain, serviceAccount
// if (env === "dev") {
//   // Dev
//   // serviceAccount = require('./key-dev.json')
//   admin.initializeApp({
//     // credential: admin.credential.cert(serviceAccount),
//     apiKey: "AIzaSyCbzQbG634jk3Z8MWoTQCUqCrLX7vlCv6A",
//     authDomain: "fir-tmp-project.firebaseapp.com",
//     databaseURL: "https://fir-tmp-project.firebaseio.com",
//     projectId: "fir-tmp-project",
//     storageBucket: "fir-tmp-project.appspot.com",
//     messagingSenderId: "230309505883"
//   })
//   domain = "https://asc.habitfivepercent.com"
// } else if (env === "prod") {
//   // Prod
//   // serviceAccount = require('./key-prod.json')
//   admin.initializeApp({
//     // credential: admin.credential.cert(serviceAccount),
//     apiKey: "AIzaSyCbzQbG634jk3Z8MWoTQCUqCrLX7vlCv6A",
//     authDomain: "fir-tmp-project.firebaseapp.com",
//     databaseURL: "https://fir-tmp-project.firebaseio.com",
//     projectId: "fir-tmp-project",
//     storageBucket: "fir-tmp-project.appspot.com",
//     messagingSenderId: "230309505883"
//   })
//   domain = "https://asc.habitfivepercent.com"
// }

const db = admin.firestore()
const auth = admin.auth

db.settings({
  timestampsInSnapshots: true
})

module.exports = { db, auth, FieldValue, domain }