import React, { FormEvent, MouseEvent, useEffect, useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {
	loginFail,
	loginSuccess,
	useAuthContext,
} from '../../contexts/AuthContext';

import { API_ROUTE } from '../../constants/';

import api from '../../api/index';

import './LoginPageComponent.scss';
import { Navigate } from 'react-router-dom';
import {
	deleteTokenFromLocalStorage,
	getTokenFromLocalStorage,
	setTokenToLocalStorage,
} from '../../utils/auth';

export const LoginPageComponent = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const {
		state: { sessionId, user, error },
		dispatch,
	} = useAuthContext();

	const handleLogin = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		api.post(API_ROUTE.LOGIN, {
			userName: username,
			password: password,
		})
			.then((res) => {
				const { token, userId } = res.data;
				dispatch(loginSuccess(token, { userId, username }));
				setTokenToLocalStorage(token);
			})
			.catch((err) => {
				dispatch(loginFail(err));
				deleteTokenFromLocalStorage();
			});
	};

	if (sessionId) return <Navigate to='/matchmaking' />;

	return (
		<div className='login-page-container'>
			<form className='login-form' onSubmit={(e) => e.preventDefault()}>
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
