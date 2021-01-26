import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthProvider';
import StickyBar from './StickyBar';

import { BsFillGearFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { projectStorage } from '../firebase/config';

const ProfilePage = () => {
	const [profilePic, setProfilePic] = useState();

	const { currentUser } = useAuth();

	useEffect(() => {
		let isSubscribed = true;
		async function getUrl() {
			try {
				if (isSubscribed) {
					var storageRef = projectStorage.ref();
					var userRef = storageRef.child('users_dp');

					var imageRef = userRef.child(`${currentUser.uid}/profile_pic.jpg`);

					const url = await imageRef.getDownloadURL();

					setProfilePic(url);
				}
			} catch {
				if (isSubscribed) {
					console.log('failed to get the file');
				}
			}
		}
		getUrl();

		return () => (isSubscribed = false);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<ProfileWrapper>
			<div className='profile'>
				{' '}
				Firegram{' '}
				<div className='icon-gear'>
					{' '}
					<Link to='/updateprofile'>
						{' '}
						<BsFillGearFill />
					</Link>
				</div>
			</div>
			<div className='grid'>
				<div className='img-container'>
					<img src={profilePic} alt='' />
				</div>
				<div className='username'>
					{' '}
					<strong> {currentUser.displayName}</strong>
				</div>
				<div className='follow-stuff'>
					<p>
						{' '}
						<strong> 8</strong> posts
					</p>
					<p>
						{' '}
						<strong> 24k</strong> Followers
					</p>
					<p>
						{' '}
						<strong> 120</strong> Following
					</p>
				</div>
				<div className='about'>
					MERN Stack Dev <br />
					Front End Dev
					<br />
					Passionate Coder
				</div>
			</div>
			<StickyBar />
		</ProfileWrapper>
	);
};

export default ProfilePage;

const ProfileWrapper = styled.div`
	width: 100%;
	height: 100%;

	// .btn-logout {
	// 	padding: 1rem;
	// 	background: rgba(40, 200, 255, 0.7);
	// 	border: 0;
	// }
	.profile {
		font-family: 'Billabong';
		font-size: 2rem;
		text-align: center;
		padding: 0.5rem;
		margin: 0;
		width: 100%;
		position: relative;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(3, 100px);
		grid-template-rows: repeat(6, 40px);
		grid-column-gap: 0.5rem;
		justify-content: flex-start;
		align-items: flex-start;
		padding: 0.5rem;
		background: rgba(248, 248, 248, 0.7);
		border: 1px solid #ececec;
	}

	.img-container {
		width: 100%;
		height: 100%;
		padding: 1rem 0.1rem;
	}
	.img-container > img {
		border-radius: 50%;
		height: 90px;
		width: 90px;
		border: 1px solid #ececec;
	}
	.follow-stuff {
		display: inline-flex;
		grid-column: 2/4;
		font-size: 0.7rem;
		text-align: left;
		grid-row: 3/4;
	}
	.follow-stuff p {
		text-align: center;
		margin: 0 0.5rem;
		margin-left: 0;
	}
	.about {
		grid-column: 2/4;
		padding: 0.5rem 0;
		font-size: 0.9rem;
		font-family: 'Open Sans';
		grid-row: 4/6;
	}
	.username {
		padding-top: 20%;
		grid-column: 2/4;
	}
	.icon-gear {
		position: absolute;
		right: 5px;
		top: 13px;
		font-size: 1.5rem;
		cursor: pointer;
	}
	.icon-gear a {
		color: black;
	}
`;
