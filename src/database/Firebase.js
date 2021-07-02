import { Alert } from "react-native";
import { firebaseApp, adminField } from "./Config";
import 'react-native-get-random-values';
import Global from "../global/Global";


export var db = firebaseApp.firestore();
const increment = adminField.increment(+1);
const decrement = adminField.increment(-1);


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

export function getUserCodigo(codigo, callback) {
  var codigoRef = db.collection('codigos').doc(codigo);
  codigoRef.get()
    .then((data) => callback(data, null))
    .catch((error) => callback(null, error))
};

export function uploadImageToFirebase(blob, nomeImagem) {
  return new Promise((resolve, reject) => {
    var storageRef = firebaseApp.storage().ref();

    storageRef.child('profileImages/' + nomeImagem).put(blob, {
      contentType: 'image/*'
    }).then((snapshot) => {
      blob.close();

      resolve(snapshot);

    }).catch((error) => {
      reject(error);
    });
  });
};

export function getImageFromFirebase(imagem, callback) {
  var ref = firebaseApp.storage().ref('profileImages/' + imagem);
  ref.getDownloadURL()
  .then((url) => callback(url, null))
  .catch((error) => callback(null, error))
};

export function uploadMapsSnapshotToFirebase(blob, nomeImagem) {
  return new Promise((resolve, reject) => {
    var storageRef = firebaseApp.storage().ref();
    
    storageRef.child('mapsSnapshots/' + nomeImagem).put(blob, {
      contentType: 'image/png'
    })
    
    .then((snapshot) => {blob.close();
      resolve(snapshot);
    })
    
    .catch((error) => {
      reject(error);
    });
  });
};

export function getMapsSnapshotFromFirebase(imagem, callback) {
  var ref = firebaseApp.storage().ref('mapsSnapshots/' + imagem);
  ref.getDownloadURL()
  .then((url) => callback(url, null))
  .catch((error) => callback(null, error))
};

export function uploadPlantaToFirebase(blob, nomeDocumento) {
  return new Promise((resolve, reject) => {
    var storageRef = firebaseApp.storage().ref();

    storageRef.child('plantas/' + nomeDocumento).put(blob, {
      contentType: 'image/jpeg'
    }).then((document) => {
      blob.close();

      resolve(document);

    }).catch((error) => {
      reject(error);
    });
  });
};

export function getPlantaFromFirebase(imagem, callback) {
  var ref = firebaseApp.storage().ref('plantas/' + imagem);
  ref.getDownloadURL()
  .then((url) => callback(url, null))
  .catch((error) => callback(null, error))
};

// export async function TemporaryToken() {
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

  
// }

export async function deleteTemporaryToken(value) {
  db.collection('codigos').doc(value).delete();
}

export function CreateTemporaryToken(value) {
  let code = Math.floor(Math.pow(10, 8-1) + Math.random() * (Math.pow(10, 8) - Math.pow(10, 8-1) - 1));
  db.collection('codigos').doc(String(code)).set({      
    tipo : value,
    startTime : new Date()
    })
  return code
}


export function addNewLoteamento(nome, loteamentoData) {
  db.collection('loteamentos').doc(nome).set(loteamentoData)
};

export async function getLoteamentosData() {
  let array = []
  const loteamentoRef = db.collection('loteamentos');
  const dados = await loteamentoRef.get();
  dados.forEach(doc => {
      const object = doc.data()
      object.id = doc.id
      array.push(object)
    }
  );
  
  return array
};

export function reservarLote(id, index, quadra, usuario) {
  const query = `csvObject.content.${index}.${quadra}.`
  const data = {}
  data[query + 'status'] = "reservado"
  data[query + 'corretor'] = usuario 
  data[query + 'data'] = adminField.serverTimestamp()
  db.collection("Usuarios").doc(Global.EMAIL).update({
    'dashboard.realizadasHoje' : increment
  })
  return db.collection("loteamentos").doc(id).update(data)
}

export async function liberarReservaLote (id, index, quadra, corretor) {
  const query = `csvObject.content.${index}.${quadra}.`
  const data = {}
  data[query + 'status'] = "disponivel"
  data[query + 'corretor'] = "" 
  data[query + 'data'] = new Date(0)
  const doc = await db.collection("Usuarios").where('nome', '==', corretor).get()
  doc.forEach(doc => {
    console.log(Object.values(doc));
  })
  return db.collection("loteamentos").doc(id).update(data)
}

export function venderLote(id, index, quadra, corretor, gestor) {
  const query = `csvObject.content.${index}.${quadra}.`
  const data = {}
  data[query + 'status'] = "vendido"
  data[query + 'data'] = new Date()
  data[query + 'corretor'] = corretor
  data[query + 'gestor'] = gestor
  return db.collection("loteamentos").doc(id).update(data)
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


export function forgotPassword(email) {
  firebaseApp.auth().sendPasswordResetEmail(email)
    .then(function (user) {
      Alert.alert('Email confirmando reset de senha enviado!')
    }).catch(function (e) {
      console.log(e)
    })
}