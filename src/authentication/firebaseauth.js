import firebase from 'firebase/app';

let email = document.querySelector('.email');
console.log(email);
const signUp = () => {
	firebase.auth.createUserWithEmailAndPassword(email.value, password.value);
};
