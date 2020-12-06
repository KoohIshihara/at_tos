import { config, api } from "./config"
import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"
import "firebase/auth"

const firebaseApp = firebase.initializeApp(config)

const strage = firebaseApp.storage()
const auth = firebaseApp.auth()
const firestore = firebaseApp.firestore()

export default firebaseApp.firestore()
export { firestore, firebase, strage, auth, api }