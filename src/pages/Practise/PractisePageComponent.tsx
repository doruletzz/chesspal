import { useEffect, useState } from 'react';
import Card from '../../components/Card';

import './PractisePageComponent.scss';
import Button from '../../components/Button';
import LineChessBoard from '../../components/LineChessBoard';
import api from '../../api';
import { API_ROUTE } from '../../constants';

type Practise = {
	name?: string;
	id: string;
	moves: Array<string>;
};

const mockPractise = ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5'];

export const PractisePageComponent = () => {
	const [data, setData] = useState<Practise[]>();

	useEffect(() => {
		if (!data) {
			api.get<Practise>(API_ROUTE.PRACTISE)
				.then((res) => setData([res.data]))
				.catch((err) => console.error(err));
		}
	}, [data]);

	const handleSelectPractice = (practice: Practise) => {
		alert({ practice });
	};

	return (
		<div className='practise-container'>
			{data?.map((practice) => (
				<Card>
					<div className='lhs'>
						<div className='board'>
							<LineChessBoard moves={practice.moves} />
						</div>
					</div>
					<div className='rhs'>
						{practice.name && (
							<h4 className='title'>{practice.name}</h4>
						)}
						<p className='text'>{practice.moves.join(' ')}</p>
						<Button
							variant='text'
							onClick={() => handleSelectPractice(practice)}
						>
							Play
						</Button>
					</div>
				</Card>
			))}
		</div>
	);
};
