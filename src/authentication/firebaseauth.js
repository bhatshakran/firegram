import firebase from 'firebase/app';

const singUp = () => {
	firebase.auth.createUserWithEmailAndPassword(email.value, password.value);
};
