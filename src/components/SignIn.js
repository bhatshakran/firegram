import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { AiFillFire } from 'react-icons/ai';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const SignIn = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { signIn, googleSignIn } = useAuth();
	const history = useHistory();
	let [isSubscribed, setIsSubscribed] = useState(true);
	useEffect(() => {
		return () => setIsSubscribed(false);
	}, []);

	// on submit handler
	async function onSubmitHandler(e) {
		e.preventDefault();

		if (isSubscribed) {
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
	}

	// google login
	async function onClickHandler(e) {
		e.preventDefault();
		if (isSubscribed) {
			try {
				setError('');
				setLoading(true);
				await googleSignIn();
				history.push('/');
			} catch {
				setError('Failed to Google Login');
			}
			setLoading(false);
		}
	}

	return (
		<FormWrapper>
			<form onSubmit={onSubmitHandler}>
				<p className='firegram'>
					Firegram <AiFillFire />
				</p>
				{error && <div className='error'>{error}</div>}
				<div className='grid'>
					<div className='form-control'>
						<input
							type='email'
							placeholder='Email'
							name='email'
							id='email'
							ref={emailRef}
						/>
					</div>
					<div className='form-control'>
						<input
							type='password'
							name='password'
							id='password'
							ref={passwordRef}
							placeholder='Password'
						/>
					</div>
					<button className='btn-signIn' disabled={loading}>
						Log In
					</button>
					<p className='or'> -----------OR------------</p>
					<a className='btn-signInWithGoogle' href='/' onClick={onClickHandler}>
						Log In with Google
					</a>
					<p className='forgot'>
						<Link to='/forgotpassword'>Forgot Password?</Link>
					</p>
				</div>
			</form>
			<div className='rest-part'>
				<p className='notAuser'>
					Dont have an account?
					<Link to='/signup'>Sign Up here</Link> <br />
				</p>
			</div>
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
	background:	rgba(248,248,248, 0.7);
	
	.error{
		color:rgba(255,0,0,0.6);
		border-radius:5px;
		width: 100%;
		padding: 0.8rem;
		position:absolute;
		top: 80px;
		left: 50%;
		transform:translateX(-50%);
		font-weight: 800;
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
	form{
		position:absolute;
		top: 40%;
		transform:translateY(-50%);
		width: calc(100% - 2rem);
		max-width: 350px;
		height: 380px;
		padding: 1rem 2rem;
		border: 1px solid #ececec;
		background: #fff;
		text-align:center;
	}
	.grid {
		margin-top: 3rem;
		display:grid;
		grid-template-columns: repeat(1, minmax(250px, 100%));
		grid-template-rows: repeat(auto-fill, 50px);
		align-items:center;
		justify-content:center;
		text-align: center;
		
	
	}
	.firegram{
		padding:0;
		margin-top: 0;
		font-size: 3rem;
		font-family: 'Billabong';
		font-weight:100;
		height: 51px;			
	}
	
	input{
		height: 40px;
		padding: 0 0.3rem;
		margin: 0.1rem 0;
		width: 100%;
		border: 1px solid #ececec;
		background:	rgba(248,248,248, 0.7);
		
	}

	.or{
		margin-top: 0.7rem;
		font-weight:800;
		color:darkgray;
	}

	button{
		padding: 0.4rem;
		border: 0;
		margin: 0.3rem auto;
		color:#fff;
		width: 100%;

	}
	
	.btn-signIn{
		background:#73c2fb;
		
	}
	.btn-signInWithGoogle, .forgot{
		margin-top: 1rem;
		color: 	#3b5998;
	
		
	}
	.forgot{
		font-size: 0.7rem;
	}
	.rest-part{
		border: 1px solid #ececec;
		position:absolute;
		top: 40%;
		transform:translateY(200px);
		background:#fff;
		max-width: 350px;
		padding: 0.5rem;
		width:calc(100% - 2rem);
		height:60px;
		display:flex;
		align-items:center;
		justify-content:center
	}
	.notAuser{
		
		font-size:0.8rem;
	}
	
	
	
`;
