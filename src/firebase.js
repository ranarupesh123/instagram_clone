import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyCMC44a55DIqrivZqzaNbET_mVH3VNTuo8",
        authDomain: "instagram-clone-c7549.firebaseapp.com",
        databaseURL: "https://instagram-clone-c7549.firebaseio.com",
        projectId: "instagram-clone-c7549",
        storageBucket: "instagram-clone-c7549.appspot.com",
        messagingSenderId: "511891882338",
        appId: "1:511891882338:web:d6151a81b4a7dbac1f2c3b",
        measurementId: "G-GGSGXM95JE"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db,auth,storage};