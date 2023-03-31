import React, { FormEvent, MouseEvent, useEffect, useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { loginSuccess, useAuthContext } from '../../contexts/AuthContext';

import './LoginPageComponent.scss';

export const LoginPageComponent = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	const {
		state: { sessionId, user, error },
		dispatch,
	} = useAuthContext();

	useEffect(() => {
		console.log(sessionId);
	}, [sessionId]);

	const handleLogin = (e: MouseEvent<HTMLButtonElement>) => {
		dispatch(
			loginSuccess('123', {
				id: '1',
				username: 'mock-user',
			})
		);
	};

	return (
		<div className='login-page-container'>
			<form className='login-form' onSubmit={handleSubmit}>
				<h4 className='title'>Log in</h4>
				<Input
					required
					value={username}
					setValue={setUsername}
					label='username'
				/>
				<Input
					required
					value={password}
					setValue={setPassword}
					label='password'
					type='password'
				/>
				<Button className='helper' variant='text'>
					Having trouble signing in?
				</Button>
				<Button
					className='register'
					variant='text'
					onClick={() => alert('register')}
				>
					Don't have an account?
				</Button>
				<Button
					className='login'
					variant='primary'
					onClick={handleLogin}
				>
					Log In
				</Button>
			</form>
		</div>
	);
};
