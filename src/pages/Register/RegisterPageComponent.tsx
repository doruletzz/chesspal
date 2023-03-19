import React, { FormEvent, useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';

import './RegisterPageComponent.scss';

export const RegisterPageComponent = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<div className='register-page-container'>
			<form className='login-form' onSubmit={handleSubmit}>
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
					onClick={() => alert('login')}
				>
					Register
				</Button>
			</form>
		</div>
	);
};
