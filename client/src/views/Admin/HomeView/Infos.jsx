import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import styled from 'styled-components';
import Card from '../../../components/Card';

const Infos = () => {
	const [quote, setQuote] = useState('');

	const getQuote = useCallback(async () => {
		try {
			const res = await axios.get('https://type.fit/api/quotes');
			const { data } = res;
			const quotes = data
				.map((value) => ({ value, sort: Math.random() }))
				.sort((a, b) => a.sort - b.sort)
				.map(({ value }) => value);
			setQuote(quotes[0]);
		} catch (err) {
			console.error(err);
		}
	}, []);

	useEffect(() => {
		getQuote();
	}, [getQuote]);

	return (
		<Card>
			<Text>
				Modify your site settings{' '}
				<Link to="/admin/settings" title="Link to settings" color="true">
					here
				</Link>
			</Text>
			<Text>OR</Text>
			<Text>Start adding and editing content :</Text>
			<List>
				<ListItem>
					<Link to="/admin/filmography">Filmography</Link>
				</ListItem>
				<ListItem>
					<Link to="/admin/skills">Skills</Link>
				</ListItem>
				<ListItem>
					<Link to="/admin/cv">CV</Link>
				</ListItem>
			</List>

			{quote && (
				<QuoteContainer>
					<Quote>{quote.text} </Quote>
					<Quote as="span">{quote.author}</Quote>
				</QuoteContainer>
			)}
		</Card>
	);
};

const Text = styled.p`
	margin-bottom: 10px;
`;

const List = styled.ul`
	margin-top: 5px;
	list-style-position: inside;
	margin-bottom: 10px;
`;

const ListItem = styled.li`
	list-style-type: circle;
`;

const Link = styled(HashLink)`
	font-style: italic;
	transition: 0.2s ease-in-out;
	color: ${(props) => props.color && props.theme.palette.action.hover};
	&:hover {
		color: ${(props) => props.theme.palette.action.hover};
		transition: 0.2s ease-in-out;
	}
`;

const QuoteContainer = styled.div`
	width: 100%;
	margin-top: 20px;
	align-self: flex-end;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
`;

const Quote = styled.p`
	font-size: 12px !important;
	font-style: italic;
	text-align: justify;
`;

export default Infos;
