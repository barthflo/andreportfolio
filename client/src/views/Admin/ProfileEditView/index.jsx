import React from 'react';
import Card from '../../../components/Card';
import Page from '../../../components/Page';
import Section from '../../../components/Section';
import ProfileForm from './ProfileForm';
import useAppContext from '../../../hooks/useAppContext';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import styled from 'styled-components';
import useAuth from '../../../hooks/useAuth';

const ProfileEditView = () => {
	const { height } = useWindowDimensions();
	const { siteSettings } = useAppContext();
	const { user, dispatch } = useAuth();

	return (
		<Page
			title={`Dashboard - Profile - ${
				siteSettings
					? siteSettings.siteTitle + ' - ' + siteSettings.siteSubtitle
					: 'Loading'
			}`}
			description="Administration dashboard user settings page "
		>
			<Section
				minHeight={(height - 70).toString() + 'px'}
				flex
				flexDirection="column"
				justifyContent="start"
				alignItems="start"
				admin
			>
				<Title>User Settings</Title>
				{user && (
					<Card>
						<ProfileForm user={user} dispatch={dispatch} />
					</Card>
				)}
			</Section>
		</Page>
	);
};

const Title = styled.h1`
	font-size: 2em;
	margin-bottom: 20px;
`;

export default ProfileEditView;
