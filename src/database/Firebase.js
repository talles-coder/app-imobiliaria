import { Alert } from "react-native";
import { firebaseApp } from "./Config";
import 'react-native-get-random-values';
import  {  v4  as  uuidv4 } from  'uuid' ;
import { version as uuidVersion } from 'uuid';
import { validate as uuidValidate } from 'uuid';

function uuidValidateV4(uuid) {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}

export var db = firebaseApp.firestore();

//Efetuar o log off
export function signout(callback) {
  firebaseApp.auth().signOut()
    .catch((err) => callback(err, null))
};


//criar usuário com e-mail e senha

export function emailSignUp({ email, password }, callback) {
  firebaseApp.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => callback(null, user))
    .catch((err) => callback(err, null))
};

//Efetuar login com e-mail e senha

export function emailSignIn({ email, password }, callback) {
  firebaseApp.auth().signInWithEmailAndPassword(email, password)
    .then((user) => callback(null, user))
    .catch((err) => callback(err, null))
};


// Solicitar dados do usuário

export function getUserData(email, callback) {
  var userRef = db.collection('Usuarios').doc(email);
  userRef.get()
    .then((data) => callback(data, null))
    .catch((error) => callback(null, error))
};

export function getImageFromFirebase(imagem, callback) {
  var ref = firebaseApp.storage().ref('uploads/' + imagem);
  ref.getDownloadURL()
    .then((url) => callback(url, null))
    .catch((error) => callback(null, error))
};


export async function crateTemporaryToken() {
  // Cria campo no banco de dados

  let vari = Math.floor(100000 + Math.random() * 900000)
  let uuidd = uuidv4()

  const data = {
    name: 'Los Angeles',
    state: 'CA',
    country: 'USA'
  };

  const res = db.collection('cities').doc(`${vari}`).set(data);

  //----------------------------------

  // Pesquisa valor no banco de dados

  // const citiesRef = db.collection('cities');

  // // Create a query against the collection
  // const snapshot = await citiesRef.where('capital', '==', false).get();
  
  // if (snapshot.empty) {
  //   console.log('No matching documents.');
  //   return;
  // }
  // snapshot.forEach(doc => {
  //   console.log(doc.id);
  // });

  
}

export async function deleteTemporaryToken(value) {
  // Pesquisa valor no banco de dados

  const citiesRef = db.collection('cities');
  
  const snapshot = await citiesRef.where( 'name', '==', value).get();
  
  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }
  snapshot.forEach(doc => {
    db.collection('cities').doc(doc.id).delete();
  });
}

export async function UpdateTemporaryToken(value, wher) {
  // Pesquisa valor no banco de dados

  const citiesRef = db.collection('cities');
  
  const snapshot = await citiesRef.where( 'name', '==', value).get();
  
  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }
  snapshot.forEach(doc => {
    db.collection('cities').doc(doc.id).update({
      country : wher
    });;
  });
}


export function addNewUserData({ email, userData }, callback) {
  var userRef = db.collection('Usuarios').doc(email);

  userRef.set(userData)
    .then((docRef) => callback(docRef, null))
    .catch((error) => callback(null, error))
};

export function addItem(item, tabel) {
  firebaseApp.database().ref(tabel).push(item);
};

export function uploadImageToFirebase(blob, nomeImagem) {
  return new Promise((resolve, reject) => {
    var storageRef = firebaseApp.storage().ref();

    storageRef.child('uploads/' + nomeImagem).put(blob, {
      contentType: 'image/jpeg'
    }).then((snapshot) => {
      blob.close();

      resolve(snapshot);

    }).catch((error) => {
      reject(error);
    });
  });
};

export function uploadDocumentToFirebase(blob, nomeDocumento) {
  return new Promise((resolve, reject) => {
    var storageRef = firebaseApp.storage().ref();

    storageRef.child('uploads/' + nomeDocumento).put(blob, {
      contentType: 'application/pdf'
    }).then((document) => {
      blob.close();

      resolve(document);

    }).catch((error) => {
      reject(error);
    });
  });
};

export function forgotPassword(email) {
  firebaseApp.auth().sendPasswordResetEmail(email)
    .then(function (user) {
      Alert.alert('Email confirmando reset de senha enviado!')
    }).catch(function (e) {
      console.log(e)
    })
}