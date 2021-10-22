import React from 'react';
import useAppContext from '../../../hooks/useAppContext';
import Page from '../../../components/Page';
import Section from '../../../components/Section';
import styled from 'styled-components';
import Card from '../../../components/Card';
import SkillsForm from './SkillsForm';
import Loading from '../../../components/Loading';
import { useParams } from 'react-router';

const SkillsEditView = () => {
	const { siteSettings, home } = useAppContext();
	const { id } = useParams();

	const getSkill = (skills) => {
		const category = skills.find((item) =>
			item.skills.some((skill) => skill.id === id),
		);

		const skill = category.skills.find((skill) => skill.id === id);

		category.skill = {
			id: skill.id,
			name: skill.skill,
		};
		return category;
	};

	return (
		<Page
			title={`Dashboard -  Edit skill - ${
				siteSettings
					? siteSettings.siteTitle + ' - ' + siteSettings.siteSubtitle
					: 'Loading'
			}`}
			description={`Administration dashboard modify an existing skill `}
		>
			{home && home.skills ? (
				<Section
					flex
					flexDirection="column"
					justifyContent="start"
					alignItems="start"
					admin
				>
					<Title>Modify an existing skill</Title>
					<Card>
						<SkillsForm
							categories={home.skills.map((skill) => ({
								id: skill.category_id,
								name: skill.skill_group,
							}))}
							id={Number(id)}
							categoryId={getSkill(home.skills).category_id}
							skill={getSkill(home.skills).skill}
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

export default SkillsEditView;
