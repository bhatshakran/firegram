// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

var firebaseConfig = {
	apiKey: 'AIzaSyB_tYaEN8pETCV4j2fuyRPwCwigTtDQL2Y',
	authDomain: 'images-app-d0fb0.firebaseapp.com',
	projectId: 'images-app-d0fb0',
	storageBucket: 'images-app-d0fb0.appspot.com',
	messagingSenderId: '810955644548',
	appId: '1:810955644548:web:4a7be74b88dfcc4001acd1',
	measurementId: 'G-MT4QF4CL1R',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };
