import {
	faDownload,
	faFileImport,
	faFloppyDisk,
	faO,
	faSave,
	faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import Button from '../Button';

import './ImportPgnFormComponent.scss';

type ImportPgnFormComponentProps = {
	setPgn: Dispatch<SetStateAction<string>>;
};

export const ImportPgnFormComponent = ({
	setPgn,
}: ImportPgnFormComponentProps) => {
	const [pgnTextArea, setPgnTextArea] = useState<string>('');

	const handleImportFromFile = (e: MouseEvent<HTMLButtonElement>) => {
		alert('here we will import...');
	};

	const handleSubmitForm = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setPgn(pgnTextArea);
	};

	return (
		<div className='import-pgn-container'>
			<form className='form-container'>
				<textarea
					id='import-pgn-text-area'
					className='text-area'
					value={pgnTextArea}
					onChange={(e) => setPgnTextArea(e.currentTarget.value)}
				/>
				<Button onClick={handleSubmitForm}>
					<FontAwesomeIcon icon={faFloppyDisk} /> Add Game(s)
				</Button>
			</form>
			<p className='or'>OR</p>
			<Button className='import-file' onClick={handleImportFromFile}>
				<FontAwesomeIcon icon={faDownload} /> Import from File
			</Button>
		</div>
	);
};
