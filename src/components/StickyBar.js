import React from 'react';
import styled from 'styled-components';
import { FaUserCircle, FaHeart } from 'react-icons/fa';
import { HiHome } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import UploadForm from './UploadForm';

const StickyBar = () => {
	return (
		<BarWrapper>
			<div className='bar-icon'>
				<Link to='/'>
					{' '}
					<HiHome />
				</Link>
			</div>
			<div className='bar-icon'>
				<UploadForm />
			</div>
			<div className='bar-icon'>
				<Link to='/'>
					{' '}
					<FaHeart />
				</Link>
			</div>
			<div className='bar-icon'>
				<Link to='/profilepage'>
					{' '}
					<FaUserCircle />
				</Link>
			</div>
		</BarWrapper>
	);
};

export default StickyBar;

const BarWrapper = styled.div`
	width: 100%;
	height: 40px;
	background: #fff;
	position: fixed;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	border-top: 1px solid #ececec;

	.bar-icon {
		height: 100%;
		padding: 0.5rem 1rem;
	}
	a {
		color: black;
	}
`;
