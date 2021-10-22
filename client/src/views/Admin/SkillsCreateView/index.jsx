import React from 'react';
import useAppContext from '../../../hooks/useAppContext';
import Page from '../../../components/Page';
import Section from '../../../components/Section';
import styled from 'styled-components';
import Card from '../../../components/Card';
import SkillsForm from './SkillsForm';
import Loading from '../../../components/Loading';

const SkillsCreateView = () => {
	const { siteSettings, home } = useAppContext();

	return (
		<Page
			title={`Dashboard - Create a new skill - ${
				siteSettings
					? siteSettings.siteTitle + ' - ' + siteSettings.siteSubtitle
					: 'Loading'
			}`}
			description={`Administration dashboard add a new skill `}
		>
			{home && home.skills ? (
				<Section
					flex
					flexDirection="column"
					justifyContent="start"
					alignItems="start"
					admin
				>
					<Title>Add a new skill</Title>
					<Card>
						<SkillsForm
							categories={home.skills.map((skill) => ({
								id: skill.category_id,
								name: skill.skill_group,
							}))}
						/>
					</Card>
				</Section>
			) : (
				<LoadingWrapper>
					<Loading />
				</LoadingWrapper>
			)}
		</Page>
	);
};

const Title = styled.h1`
	font-size: 2em;
	margin-bottom: 20px;
	text-transform: capitalize;
`;

const LoadingWrapper = styled.div`
	z-index: -1;
`;

export default SkillsCreateView;
