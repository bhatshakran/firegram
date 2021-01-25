import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { AiFillFire } from 'react-icons/ai';
import doodle from '../images/364.jpg';
import { useAuth } from '../context/AuthProvider';

const SignUp = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { signUp } = useAuth();
	const history = useHistory();
	async function onSubmitHandler(e) {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError('Passwords do not match');
		}

		try {
			setError('');
			setLoading(true);
			await signUp(emailRef.current.value, passwordRef.current.value);

			history.push('/');
		} catch {
			setError('Failed to create an account');
		}
		setLoading(false);
	}

	return (
		<SignUpWrapper>
			<h1>
				FIREGRAM <AiFillFire />
			</h1>

			<form onSubmit={onSubmitHandler}>
				<h3>Sign Up Form</h3>
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
				<div className='form-control'>
					<label htmlFor='password'>Password:</label>
					<input
						type='password'
						name='password'
						id='password'
						ref={passwordRef}
						placeholder='Password'
					/>
				</div>
				<div className='form-control'>
					<label htmlFor='confirmpass'>Confirm Password:</label>
					<input
						type='password'
						placeholder='confirm password'
						name='confirmpass'
						id='confirmpass'
						ref={passwordConfirmRef}
					/>
				</div>

				<div className='form-control buttons'>
					<button className='btn-signUp' disabled={loading}>
						Sign Up
					</button>
					<button className='btn-signInWithGoogle'>Sign In with Google</button>
				</div>
				<p className='alreadyAuser'>
					Already have an account?
					<Link to='/signin'>Sign In here</Link> <br />
				</p>
			</form>
		</SignUpWrapper>
	);
};

export default SignUp;

const SignUpWrapper = styled.section`
width: 100%;
	height: 100%;
	margin 0 auto;
	font-family: 'Raleway', sans-serif;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align:center;
	background: url(${doodle});
	background-size:cover;
	background-position:center;
h1{
	
	font-family: 'Comfortaa';
	color: #fff;
	padding:1rem;
	background:linear-gradient(to right,#4b6cb7, #182848 );
	width: 100%;
	border-bottom: 5px solid #82b74b;
	font-size: 2rem;
	letter-spacing: 5px;
}
.error{
	background:rgba(255,0,0,0.6);
	border-radius:5px;
	width: 100%;
	padding: 0.8rem;
	color:#fff;
	font-family: arial;
}
.pic-icon{
	margin: 0 auto;
	text-align:Center;
	padding:1rem;
	font-size:2.5rem;
}

	h3 {
		font-family: 'Raleway', sans-serif;
		margin: 1rem 0;
		font-size: 2rem;
		color:#fff;
		background: #034f84;
		width: 100%;
		padding: 1rem 0;
		border-radius: 20px;
	}

	form {
		margin: 2rem 0;
		width: calc(100vw - 1rem);
		box-shadow: 12px 4px 16px  0 rgba(0, 0, 0, 0.25),
		-8px -8px 12px  rgba(0, 0, 0, 0.1);
		padding: 2rem 0.5rem;
		display:grid;
		grid-template-columns: repeat(1, minmax(250px, 600px));
		grid-template-rows: repeat(4, 100px);
		align-items:Center;
		justify-content:flex-start;
		text-align: center;
		background:  #fff;
		background-size:cover;
		border-radius: 40px; 
	
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
		border: 1px solid black;
		background:rgba(255,255,255,0.9);
		
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
		padding: 1rem;
		border: 0;
		margin: 0.3rem auto;
		color:#fff;
		font-family: arial;
		width: 100%;
		border-radius: 12px;
		
	}
	.btn-signUp{
		background:#6b5b95;
	
		
	}
	.btn-signInWithGoogle{
		background:  #d64161;
	
	}
	.alreadyAuser{
		margin: 2rem 0;

	}
	// ipad
	@media screen and (min-width: 700px){
	height: 100%;
		form{
			width: 700px;
			margin: 2rem 0;
			
			grid-template-columns: repeat(1, minmax(250px, 1fr));
			grid-template-rows: repeat(4, 1fr);
			padding: 2rem 4rem 4rem 4rem;
		}
		h1{
			font-size: 3rem;
			padding:3rem;
		}
		button{
			width: 120px;
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
`;
