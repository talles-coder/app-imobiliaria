import firebase from 'firebase';

let config = {
  apiKey: 'AIzaSyCqCOUKMydYWz2c_zjUzFCfhtPgl3ka-Vo',
  authDomain: 'teste-function-one.firebaseapp.com',
  databaseURL: 'https://teste-function-one.firebaseio.com',
  projectId: 'teste-function-one',
  storageBucket: 'teste-function-one.appspot.com',
  messagingSenderId: '448979729590',
  appId: '1:448979729590:android:2e5523fa2d54dde062ba17',
};

export const firebaseApp = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

