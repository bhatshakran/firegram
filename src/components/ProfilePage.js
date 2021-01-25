import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthProvider';
import StickyBar from './StickyBar';
import { IoIosAddCircle } from 'react-icons/io';
import { projectFirestore, projectStorage } from '../firebase/config';

const ProfilePage = () => {
	const usernameRef = useRef();
	const picRef = useRef();
	const [displayName, setDisplayName] = useState();
	const [url, setUrl] = useState(window.localStorage.getItem('url'));

	const [error, setError] = useState('');
	const { logOut, currentUser } = useAuth();
	// console.log(currentUser);

	// on change handler
	function onChangeHandler(e) {
		console.log(e);
		setDisplayName(usernameRef.current.value);
	}
	// handle profile pic
	function handleProfilePic(e, uid) {
		// const storageRef = projectStorage.ref(file.name);
		// const collectionRef = projectFirestore.collection('users');
		// collectionRef.doc(uid).update({ photoUrl: e.target.files[0] });
		try {
			var storageRef = projectStorage.ref();
			var userRef = storageRef.child('users_dp');
			var imageRef = userRef.child(`${uid}/profile_pic.jpg`);
			imageRef.put(e.target.files[0]).then(async () => {
				const url = await imageRef.getDownloadURL();

				// console.log(url);
				window.localStorage.setItem('url', url);
				setUrl(window.localStorage.getItem('url'));
			});
		} catch {
			setError('Error, couldnt change profile pic.');
			alert(error);
		}
	}
	// handle the update

	function handleUpdate() {
		if (displayName) {
			currentUser
				.updateProfile({
					displayName: displayName,
				})
				.then(() => console.log('update username and photo'))
				.catch(error => console.log(error));
		}
		generateUserDocument(currentUser);
	}

	const generateUserDocument = async user => {
		if (!user) return;
		const userRef = projectFirestore.doc(`users/${user.uid}`);

		// if (!snapshot.exists) {
		const { email, displayName } = user;
		try {
			await userRef.set({
				displayName,
				email,
				profilePic: url,
			});
			console.log('document created');
		} catch (error) {
			console.log('Error creating user document', error);
		}
		// }
		return getUserDocument(user.uid);
	};
	//   get user document
	const getUserDocument = async uid => {
		if (!uid) return null;
		try {
			const userDocument = await projectFirestore.doc(`users/${uid}`).get();
			return {
				uid,
				...userDocument.data(),
			};
		} catch (error) {
			console.error('Error fetching user', error);
		}
	};
	// use effect

	useEffect(() => {
		window.localStorage.getItem('url');
	}, []);

	return (
		<ProfileWrapper>
			My Profile
			<div>
				<a href='/signin'>
					<button className='btn-logout' onClick={logOut}>
						Logout
					</button>
				</a>

				{currentUser.displayName}
				<img src={url} alt='' style={{ width: '150px', height: '150px' }} />
				{/* {photo && <img src={photo} alt='profile_pic' />} */}
				<div className='form-control'>
					<label htmlFor='username'>Username:</label>
					<input
						type='username'
						placeholder='username'
						name='username'
						id='username'
						ref={usernameRef}
						onChange={onChangeHandler}
					/>
				</div>
				<div
					className='form-control '
					style={{
						fontFamily: 'sans-serif',
						padding: '0.5rem 0',
						letterSpacing: '1px',
					}}>
					<p>Add Profile Page:</p>
					<label className='pic-icon'>
						<IoIosAddCircle />

						<input
							type='file'
							id='img'
							name='img'
							accept='image/*'
							ref={picRef}
							onChange={e => handleProfilePic(e, currentUser.uid)}
						/>
					</label>
				</div>

				<button className='btn-update' onClick={handleUpdate}>
					Update
				</button>
			</div>
			<StickyBar />
		</ProfileWrapper>
	);
};

export default ProfilePage;

const ProfileWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.btn-logout {
		padding: 1rem;
		background: rgba(40, 200, 255, 0.7);
		border: 0;
	}
`;
