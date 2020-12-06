const firebase = require("../firebase.js")
const sendNotification = require('../notification')
const db = firebase.db
const auth = firebase.auth
const domain = firebase.domain

let createTmp = async (snap, context) => {
  let data = snap.data()
  console.log("data", data)
}

// createTmp({
//   data: () =>  {
//     return {
//       createdBy: "oriyVzVbK8chk86dCMTnPSUeykR2",
//       trainer: "e8iTTq0nBfDSBZGgrYVb",
//       tmpURL: "https://test.test",
//       course:  "digital_learning",
//       lectureIndex: "1"
//     }
//   }
// })

let updateTmp = async (change, context) => {
  let Tmp = change.after.data()
}

// updateTmp({
//   after : {
//     data: () => {
//       return {
//         createdBy: "oriyVzVbK8chk86dCMTnPSUeykR2",
//         trainer: "e8iTTq0nBfDSBZGgrYVb",
//         tmpURL: "https://test.test",
//         course:  "digital_learning",
//         lectureIndex: "1",
//         status: "fail",
//         evaluation: "F"
//       }
//     }
//   }
// })

module.exports = { createTmp, updateTmp }