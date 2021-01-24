import React, { useEffect, useState, useContext } from 'react';
import { auth } from '../firebase/config';
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
	// reset function

	function resetPassword(email) {
		console.log('clicled');
		return auth.sendPasswordResetEmail(email);
	}
	// value
	const value = {
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
