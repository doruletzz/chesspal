import { text } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {
	ChangeEvent,
	Dispatch,
	EventHandler,
	ReactNode,
	SetStateAction,
	useState,
} from 'react';
import Button from '../Button';

import './InputComponent.scss';

type InputComponentProps = {
	type?: 'text' | 'password';
	required?: boolean;
	label?: string;
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
};

export const InputComponent = ({
	type = 'text',
	required = false,
	value,
	setValue,
	label,
}: InputComponentProps) => {
	const [showPassword, setShowPassword] = useState(true);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setValue(value);
	};

	return (
		<div
			className={`input${!value ? ' empty' : ''}${
				required ? ' required' : ''
			}`}
		>
			{label && <label htmlFor='input-field'>{label} </label>}
			<input
				id='input-field'
				type={showPassword ? type : 'text'}
				value={value}
				onChange={handleChange}
			/>
			{type === 'password' && (
				<Button
					onClick={() => setShowPassword((prev) => !prev)}
					className='adornment-right'
					variant='text'
				>
					<FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
				</Button>
			)}
		</div>
	);
};
