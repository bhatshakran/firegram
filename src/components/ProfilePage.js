import React, { useContext } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthProvider';
import StickyBar from './StickyBar';

const ProfilePage = () => {
	const { logOut } = useAuth();
	return (
		<ProfileWrapper>
			My Profile
			<div>
				<a href='/signin'>
					<button className='btn-logout' onClick={logOut}>
						Logout
					</button>
				</a>
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
