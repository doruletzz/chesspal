import { useEffect, useState } from 'react';
import Card from '../../components/Card';

import './PractisePageComponent.scss';
import Button from '../../components/Button';
import LineChessBoard from '../../components/LineChessBoard';
import api from '../../api';
import { API_ROUTE, PAGE_ROUTE } from '../../constants';
import { setVariant, useGameContext } from '../../contexts/GameContext';
import { useNavigate } from 'react-router-dom';

type Practise = {
	name?: string;
	id: string;
	moves: Array<string>;
};

const mockPractise = ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5'];

export const PractisePageComponent = () => {
	const {
		state: { gameId, variant, isFetching, error },
		dispatch,
	} = useGameContext();

	const navigate = useNavigate();
	const [data, setData] = useState<Practise[]>();

	useEffect(() => {
		if (!data) {
			api.get<Practise>(API_ROUTE.PRACTISE)
				.then((res) => setData([res.data]))
				.catch((err) => console.error(err));
		}
	}, [data]);

	const handleSelectPractice = (practice: Practise) => {
		dispatch(setVariant('engine'));
		navigate(PAGE_ROUTE.PLAY);
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
