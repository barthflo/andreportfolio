import React from 'react';
import Card from '../../../components/Card';
import Page from '../../../components/Page';
import Section from '../../../components/Section';
import FilmoForm from './FilmoForm';
import useAppContext from '../../../hooks/useAppContext';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import styled from 'styled-components';

const FilmographyCreateView = () => {
	const { height } = useWindowDimensions();
	const { siteSettings } = useAppContext();

	return (
		<Page
			title={`Dashboard - Filmography create form - ${
				siteSettings
					? siteSettings.siteTitle + ' - ' + siteSettings.siteSubtitle
					: 'Loading'
			}`}
			description="Administration dashboard filmography create page "
		>
			<Section
				minHeight={(height - 70).toString() + 'px'}
				flex
				flexDirection="column"
				justifyContent="start"
				alignItems="start"
				admin
			>
				<Title>Add a new film</Title>
				<Card>
					<FilmoForm />
				</Card>
			</Section>
		</Page>
	);
};

const Title = styled.h1`
	font-size: 2em;
	margin-bottom: 20px;
	text-transform: capitalize;
`;

export default FilmographyCreateView;
