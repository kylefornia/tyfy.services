import * as firebase from 'firebase/app';
import "firebase/analytics";
import "firebase/firestore";

import { Letter } from '../components/NewLetter';


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

class FirebaseAPI {

  public static init() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }
  }

  public static addNewLetter({ name, message, location }: Letter) {
    const lettersRef = firebase.firestore().collection('letters')
    const newLetterRef = lettersRef.doc()
    const increment = firebase.firestore.FieldValue.increment(1);
    const letterCountRef = firebase.firestore().collection('counters').doc('letterCount')

    const batch = firebase.firestore().batch();

    batch.set(newLetterRef, {
      name: name,
      message: message,
      location: location,
      date: firebase.firestore.Timestamp.now(),
    })

    batch.update(letterCountRef, { totalLetters: increment })


    return batch.commit()


  }

  public static getAllLetters() {
    return firebase.firestore().collection('letters')
  }

  public static getLetterCount() {
    return firebase.firestore().collection('counters').doc('letterCount')
  }
}

export default FirebaseAPI;