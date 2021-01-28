import React, { useEffect, useState, useContext } from 'react';
import { auth, projectFirestore, provider } from '../firebase/config';
import { createContext } from 'react';

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}
export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	// signup function
	function signUp(email, password) {
		return auth.createUserWithEmailAndPassword(email, password);
	}
	// sign in function
	function signIn(email, password) {
		return auth.signInWithEmailAndPassword(email, password);
	}
	// logout function
	function logOut() {
		return auth.signOut();
	}
	// google sign in function
	function googleSignIn() {
		return auth.signInWithPopup(provider).then(result => {
			var credential = result.credential;
			console.log(credential);
		});
	}
	// set up name and pic function
	function setupNameAndPhoto(name, pic) {
		var user = auth.currentUser;
		user
			.updateProfile({
				displayName: `${name}`,
				photoURL: `${pic}`,
			})
			.then(function () {
				var user = auth.currentUser;
				var storageRef = projectFirestore.ref(
					`${user}  /profilePicture/profilePic.jpg`
				);
				var task = storageRef.put(pic);
				console.log(task);
				console.log('updated');

				// Update successful.
			})
			.catch(function (error) {
				console.log('unable to update');
			});
	}
	// reset function

	function resetPassword(email) {
		return auth.sendPasswordResetEmail(email);
	}
	// value
	const value = {
		googleSignIn,
		setupNameAndPhoto,
		resetPassword,
		logOut,
		signIn,
		signUp,
		currentUser,
	};
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setCurrentUser(user);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
// request.time < timestamp.date(2021, 1, 21)
