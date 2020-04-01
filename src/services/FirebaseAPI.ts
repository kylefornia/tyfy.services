import * as firebase from 'firebase/app';
import "firebase/analytics";
import "firebase/firestore";

import { Letter } from '../components/NewLetter';


class FirebaseAPI {

  static init() {
    const firebaseConfig = {
      apiKey: "AIzaSyBIgU2xef7EtjnvEgGeip-LLUtz07IMfq0",
      authDomain: "tyfyservices.firebaseapp.com",
      databaseURL: "https://tyfyservices.firebaseio.com",
      projectId: "tyfyservices",
      storageBucket: "tyfyservices.appspot.com",
      messagingSenderId: "264448586516",
      appId: "1:264448586516:web:d3743e3d1b6c369af9c801",
      measurementId: "G-5ZNVFGTXGK"
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }
  }

  static addNewLetter({ name, message, location }: Letter) {
    firebase.firestore().collection('letters').add({
      name: name,
      message: message,
      location: location,
      date: firebase.firestore.Timestamp.now(),

    })
  }

  static getAllLetters() {
    return firebase.firestore().collection('letters')
  }
}

export default FirebaseAPI;