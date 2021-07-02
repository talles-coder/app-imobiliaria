import firebase from 'firebase';

let config = {
  apiKey: 'AIzaSyBAcAY2yjdfSBjOrQ9JIYm_KKz3kRlbFzE',
  authDomain: 'imobi-app-ale.firebaseapp.com',
  databaseURL: 'https://imobi-app-ale-default-rtdb.firebaseio.com/',
  projectId: 'imobi-app-ale',
  storageBucket: 'gs://imobi-app-ale.appspot.com/',
  messagingSenderId: '77465153317',
  appId: '1:77465153317:android:92606fa7fc73002f1434cc',
};

export const firebaseApp = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
export const adminField = firebase.firestore.FieldValue

