import React, { FormEvent, MouseEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import api from '../../api';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { REGISTER_API_PATH } from '../../constants';
import { loginFail, useAuthContext } from '../../contexts/AuthContext';

import './RegisterPageComponent.scss';

export const RegisterPageComponent = () => {
	const navigate = useNavigate();

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const {
		state: { sessionId },
		dispatch,
	} = useAuthContext();

	const handleRegister = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		api.post(REGISTER_API_PATH, {
			userName: username,
			email: email,
			password: password,
		})
			.then((res) => {
				const STATUS = res.data;

				if (STATUS === 'OK') navigate('/login');
			})
			.catch((err) => {
				dispatch(loginFail(err));
			});
	};

	if (sessionId) return <Navigate to='/matchmaking' />;

	return (
		<div className='register-page-container'>
			<form className='login-form'>
				<h4 className='title'>Join Us</h4>
				<Input
					required
					value={email}
					setValue={setEmail}
					label='email'
				/>
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
				<Button
					className='register'
					variant='text'
					onClick={() => alert('register')}
				>
					Already have an account?
				</Button>
				<Button
					className='login'
					variant='primary'
					onClick={handleRegister}
				>
					Register
				</Button>
			</form>
		</div>
	);
};
