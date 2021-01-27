import React, { useRef, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { AiFillFire } from 'react-icons/ai';
import { useAuth } from '../context/AuthProvider';

const SignUp = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	let [isSubscribed, setIsSubscribed] = useState(true);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { signUp } = useAuth();
	const history = useHistory();
	async function onSubmitHandler(e) {
		e.preventDefault();
		if (isSubscribed) {
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
		}

		setLoading(false);
	}
	useEffect(() => {
		return () => setIsSubscribed(false);
	}, []);
	return (
		<SignUpWrapper>
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
					<div className='form-control'>
						<input
							type='password'
							placeholder='confirm password'
							name='confirmpass'
							id='confirmpass'
							ref={passwordConfirmRef}
						/>
					</div>
					<button className='btn-signUp' disabled={loading}>
						Sign Up
					</button>
					<Link to='/' className='btn-signInWithGoogle'>
						Sign In with Google
					</Link>
				</div>
			</form>
			<div className='rest-part'>
				<p className='alreadyAuser'>
					Already have an account?
					<Link to='/signin'>Sign In here</Link> <br />
				</p>
			</div>
		</SignUpWrapper>
	);
};

export default SignUp;

const SignUpWrapper = styled.section`
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
		width: 100%;
		color:rgba(255,0,0,0.6);
		font-family: arial;
		margin-top: 1.5rem;
		position:absolute;
		left:50%;
		transform:translateX(-50%);
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
		grid-row-gap:0.2rem;	
	
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
		height: 45px;
		padding: 0 0.3rem;
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
	
	.btn-signUp{
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
