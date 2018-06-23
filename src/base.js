import Rebase from 're-base'
import firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAzVch8P8rxE4HtdbgOkzXtyeQdEletOMo",
  authDomain: "app-ifms.firebaseapp.com",
  databaseURL: "https://app-ifms.firebaseio.com",
  projectId: "app-ifms",
  storageBucket: "app-ifms.appspot.com",
  messagingSenderId: "549761160711"
};
const app = firebase.initializeApp(config);

const base = Rebase.createClass( app.database() )

const auth = firebase.auth()

export { auth, base }