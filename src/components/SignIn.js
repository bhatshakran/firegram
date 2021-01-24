import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import doodle from '../images/364.jpg';
import { AiFillFire } from 'react-icons/ai';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const SignIn = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { signIn } = useAuth();
	const history = useHistory();
	async function onSubmitHandler(e) {
		e.preventDefault();

		try {
			setError('');
			setLoading(true);
			await signIn(emailRef.current.value, passwordRef.current.value);
			history.push('/');
		} catch {
			setError('Failed to Sign in');
		}
		setLoading(false);
	}

	return (
		<FormWrapper>
			<h1>
				FIREGRAM <AiFillFire />
			</h1>

			<form onSubmit={onSubmitHandler}>
				<h3>Sign In </h3>
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

				<div className='form-control buttons'>
					<button className='btn-signIn' disabled={loading}>
						Sign In
					</button>
					<button className='btn-signInWithGoogle'>Sign In with Google</button>
				</div>
				<p>Forgot Password?</p>
				<Link to='/forgotpassword'>Reset Password</Link>
				<p className='notAuser'>
					Dont have an account?
					<Link to='/signup'>Sign Up here</Link> <br />
				</p>
			</form>
		</FormWrapper>
	);
};

export default SignIn;

const FormWrapper = styled.section`
	width: 100%;
	height: 100vh;
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
		margin-top:rem;
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
		margin: 2rem 1rem;
		width: calc(100% - 2rem);
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
	.btn-signIn{
		background:#6b5b95;
	
		
	}
	.btn-signInWithGoogle{
		background:  #d64161;
	
	}
	.signupandforget{
		margin: 2rem 0;

	}
	.notAuser{
		margin: 1rem;
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
	
	}
`;
