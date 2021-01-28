import React, { useRef, useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { AiFillFire } from 'react-icons/ai';
import { useAuth } from '../context/AuthProvider';
import { projectFirestore, projectStorage } from '../firebase/config';
import StickyBar from './StickyBar';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const UpdateProfile = () => {
	const history = useHistory();
	const usernameRef = useRef();
	const picRef = useRef();
	const bioRef = useRef();
	const websiteRef = useRef();
	const changeEmailRef = useRef();
	const [displayName, setDisplayName] = useState();
	const [bio, setBio] = useState();
	const [website, setWebsite] = useState();
	const [url, setUrl] = useState();

	const [error, setError] = useState('');
	const [updating, setUpdate] = useState(false);
	const { logOut, currentUser } = useAuth();
	// on change handler
	function onChangeHandler() {
		if (usernameRef.current.value) {
			setDisplayName(usernameRef.current.value);
		}

		if (bioRef.current.value) {
			setBio(bioRef.current.value);
		}

		if (websiteRef.current.value) {
			setWebsite(websiteRef.current.value);
		}
	}
	// handle profile pic
	function handleProfilePic(e, uid) {
		try {
			setUpdate(true);
			var storageRef = projectStorage.ref();
			var userRef = storageRef.child('users_dp');
			var imageRef = userRef.child(`${uid}/profile_pic.jpg`);
			imageRef.put(e.target.files[0]).then(async snap => {
				let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
				console.log(percentage);
				const url = await imageRef.getDownloadURL();

				setUrl(url);
				setUpdate(false);
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
				.then(() => console.log('update username'))
				.catch(error => console.log(error));
		}

		generateUserDocument(currentUser);
	}

	const generateUserDocument = async user => {
		if (!user) return;
		const userRef = projectFirestore.doc(`users/${user.uid}`);
		const snapshot = await userRef.get();
		const { email } = user;

		if (!snapshot.exists) {
			try {
				await userRef.set({
					email: email,
					displayName: displayName,
					website: website,
					bio: bio,
					profilePic: url,
				});
				console.log('brand new document generated');
				history.push('/profilepage');
			} catch (error) {
				console.log('couldnt generate document', error);
			}
		} else if (snapshot.exists) {
			try {
				if (url) {
					await userRef.update({
						profilePic: url,
					});
				}
				if (displayName) {
					await userRef.update({
						displayName: displayName,
					});
				}
				if (email) {
					await userRef.update({
						email: email,
					});
				}

				if (bio) {
					await userRef.update({
						bio: bio,
					});
				}
				if (website) {
					await userRef.update({
						website: website,
					});
				}

				console.log('document updated');
				history.push('/profilepage');
			} catch (error) {
				console.log('Error updating user document', error);
			}
		}
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
	if (updating) {
		return <div>Updating</div>;
	} else if (!updating) {
		return (
			<UpdateWrapper>
				<StickyBar />
				<div className='header'>
					<AiFillFire />
					<div className='firegram'>Firegram</div>
				</div>
				<div className='update-details'>
					<div>
						<label className='pic-icon'>
							<p>Update Profile Picture</p>
							<div>
								{' '}
								<IoIosAddCircle />
							</div>
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

					<div className='form-control'>
						<label htmlFor='username'>Username:</label>
						<input
							type='text'
							placeholder='username'
							name='username'
							id='username'
							ref={usernameRef}
							onChange={onChangeHandler}
						/>
					</div>
					<div className='form-control'>
						<label htmlFor='bio'>Add bio:</label>

						<input
							type='text'
							placeholder='bio'
							name='bio'
							id='bio'
							ref={bioRef}
							onChange={onChangeHandler}
						/>
					</div>
					<div className='form-control'>
						<label htmlFor='website'>Website:</label>
						<input
							type='text'
							placeholder='website'
							name='website'
							id='website'
							ref={websiteRef}
							onChange={onChangeHandler}
						/>
					</div>
					<div className='form-control'>
						<label htmlFor='changeEmail'> Email:</label>
						<input
							type='text'
							placeholder='changeEmail'
							name='changeEmail'
							id='changeEmail'
							ref={changeEmailRef}
						/>
					</div>
					<div className='form-control '>
						<a href='/signin' className='log-out'>
							<button className='btn-logout' onClick={logOut}>
								Logout
							</button>
						</a>
					</div>
					<div className='form-control'>
						<button className='btn-update' onClick={handleUpdate}>
							Update
						</button>
					</div>
				</div>
			</UpdateWrapper>
		);
	}
};

export default UpdateProfile;

const UpdateWrapper = styled.div`
	.header {
		width: 100%;
		display: inline-flex;
		padding: 1rem;
		border-bottom: 1px solid #ececec;
		font-size: 2rem;
		font-family: 'Billabong';
	}
	.firegram {
		margin-left: 1.5rem;
		padding: 0 1.5rem;
		border-left: 2px solid black;
		font-family: 'Billabong';
	}
	.update-details {
		display: grid;
		grid-template-columns: repeat(1, minmax(300px, 1fr));
		grid-row-gap: 0.8rem;
		margin: 1rem 0;
		padding: 0 0.5rem;
	}
	input {
		width: 70%;
		height: 30px;
		margin-left: 0.2rem;
		border-radius: 0;
		border: 1px solid #ececec;
		padding: 0.2rem;
	}
	.btn-logout,
	.btn-update {
		background: #73c2fb;
		padding: 0.4rem 0;
		border: 1px solid #ececec;
		width: 100%;
		color: #fff;
		margin: 0;
	}
	.btn-update {
		background: #1fcecb;
	}
	.log-out {
		margin: 0;
	}
`;
