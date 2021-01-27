import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AiFillFire } from 'react-icons/ai';
import styled from 'styled-components';

import { useAuth } from '../context/AuthProvider';

const PasswordReset = () => {
	const emailRef = useRef();

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { resetPassword } = useAuth();
	const history = useHistory();

	async function onClickHandler(e) {
		e.preventDefault();

		try {
			setError('');
			setLoading(true);
			await resetPassword(emailRef.current.value);
			history.push('/signin');
		} catch {
			setError('Failed to Reset Password');
		}
		setLoading(false);
	}

	return (
		<FormWrapper>
			<h1>
				Firegram <AiFillFire />
			</h1>

			<form>
				<h3>Reset Password </h3>
				{error && <div className='error'>{error}</div>}
				<div className='form-control'>
					<label htmlFor='email'>Email:</label>
					<input
						type='email'
						placeholder='Email'
						name='email'
						id='email'
						ref={emailRef}
					/>
				</div>

				<div className='form-control buttons'>
					<button
						className='btn-reset'
						disabled={loading}
						onClick={onClickHandler}>
						Reset Password
					</button>
				</div>
			</form>

			<p className='notAuser'>
				Dont have an account?
				<Link to='/signup'>Sign Up here</Link> <br />
			</p>
		</FormWrapper>
	);
};

export default PasswordReset;

const FormWrapper = styled.div`
width: 100%;
	height: 100vh;
	margin 0 auto;
	font-family: 'Raleway', sans-serif;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align:center;
	background:	rgba(248,248,248, 0.7);

	h1{
		margin-top:rem;
		
		border-bottom: 1px solid #ececec;
		padding:1rem;
		font-family:'Billabong';
		width: 100%;
		font-weight:lighter;
		font-size: 2rem;

	}
	.error{
		background:rgba(255,0,0,0.6);
		border-radius:5px;
		width: 100%;
		padding: 0.8rem;
		color:#fff;
		font-family: arial;
	}
	h3 {
		font-family: 'Open Sans';
		margin: 1rem 0;
		font-size: 2rem;
		width: 100%;
		padding: 1rem 0;
		font-weight:lighter;
	}

	form {
		margin: 2rem 1rem;
		width: calc(100% - 2rem);
		max-width: 380px;
		max-height: 350px;
		padding: 2rem 0.5rem;
		display:grid;
		grid-template-columns: repeat(1, minmax(250px, 600px));
		grid-template-rows: repeat(4, 100px);
		align-items:flex-start;
		justify-content:flex-start;
		text-align: center;
		border: 1px solid #ececec;	
		background:#fff;
	
	}
.form-control{
	display: flex;
	flex-direction: column;
	width: 100%;
	
}
	input{
		height: 40px;
		padding: 0 0.3rem;
		margin: 0.3rem 0;
		width: 100%;
		border: 1px solid #ececec;
		background:rgba(255,255,255,0.9);
		background:	rgba(248,248,248, 0.7);
		
	}

	label{	
		margin-right: 0 auto;
		padding: 0.5rem 0;
		font-family: sans-serif;
		letter-spacing: 1px;
		color: black;
		position:relative;
		color:black;
		font-weight:500;
		
	}

	button{
		padding: 0.5rem;
		border: 0;
		color:#fff;
		font-family: arial;
		width: 100%;

		
	}
	.btn-reset{
		background: #c83349;
	
		
	}
	
	
	.notAuser{
		border: 1px solid #ececec;
		max-width: 380px;
		width: calc(100%- 2rem);
		margin: 0 1rem;
		padding: 0 4rem;
		background:#fff;
	}
	// ipad
	@media screen and (min-width: 700px){
	
		form{
			width: 700px;
			margin: 5rem 0;
			grid-template-columns: repeat(1, minmax(250px, 1fr));
			grid-template-rows: repeat(4, 1fr);
			padding: 2rem 4rem 4rem 4rem;
		}
		h1{
			font-size: 3rem;
			padding:3rem;
		}
		button{
			max-width: 150px;
			 margin: 0 1rem;
			 border-radius: 0;
		}
		.buttons{
			display:flex;
			flex-direction:row;
			justify-content: center;
			align-items:center;
		}
	}
	a{
		color:black;
	
	}`;
