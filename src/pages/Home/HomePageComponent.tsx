import React, { MouseEvent, useEffect, useState } from 'react';
import Card from '../../components/Card';

import './HomePageComponent.scss';
import heroImageSrc from '../../assets/hero-image.png';
import api from '../../api';
import { Chessboard } from 'react-chessboard';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowRight,
	faChess,
	faHandPointRight,
	faLongArrowAltRight,
} from '@fortawesome/free-solid-svg-icons';

const lorem =
	'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta omnis amet labore dolorum harum neque qui maxime eius eveniet sint. Omnis in magni non ducimus illum rerum dolores voluptas aliquid.';

type RepertoireCard = {
	pgnId: number;
	fen: string;
	title: string;
	statsResult: GameStats;
};

export const HomePageComponent = () => {
	const [items, setItems] = useState<Array<RepertoireCard>>([]);

	const HEADING =
		'Expand and refine your opening repertoire based on your adversaries';

	const SUBHEADING =
		'The primary objective of ChessPal is to serve as a resource designed to augment and perfect your opening strategies, with a particular emphasis on tailoring them to the tendencies and capabilities of your opponents.';

	useEffect(() => {
		if (items.length === 0) {
			api.get('/repertoire/')
				.then((res) => {
					const { data } = res;
					console.log(data);
					setItems(data);
				})
				.catch((err) => console.error(err));
		}
	}, [items]);

	const navigate = useNavigate();

	const handleItemClick = (
		e: MouseEvent<HTMLHeadingElement>,
		item: RepertoireCard
	) => {
		navigate(`/analysis/${item.pgnId}`);
	};

	return (
		<div className='home-page-container'>
			<section className='hero-section'>
				<h1>{HEADING}</h1>
				<p>{SUBHEADING}</p>
				<div className='buttons'>
					<Button onClick={() => navigate('/analysis')}>
						START NOW <FontAwesomeIcon icon={faArrowRight} />
					</Button>
					<Button variant='text' onClick={() => navigate('/play')}>
						PLAY ONLINE <FontAwesomeIcon icon={faChess} />
					</Button>
				</div>
				{/* <p>{SUBHEADING}</p> */}
				<div className='hero-image'>
					<img src={heroImageSrc} />
				</div>
			</section>
			<section className='cards-section'>
				{items &&
					items.map((item) => (
						<Card key={item.pgnId}>
							<div className='text'>
								<h6 onClick={(e) => handleItemClick(e, item)}>
									{item.title}
								</h6>
								<p>{JSON.stringify(item.statsResult)}</p>
							</div>
							<div className='chessBoard'>
								<Chessboard
									id={item.pgnId}
									boardWidth={150}
									position={item.fen}
								/>
							</div>
						</Card>
					))}
			</section>
		</div>
	);
};
