import React, { useEffect } from 'react';
import Card from '../../../components/Card';
import Page from '../../../components/Page';
import Section from '../../../components/Section';
import SiteSettingsForm from './SiteSettingsForm';
import useAppContext from '../../../hooks/useAppContext';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import Loading from '../../../components/Loading';
import styled from 'styled-components';

const SiteSettingsEditView = () => {
	const { height } = useWindowDimensions();
	const { siteSettings, home, actions, dispatch } = useAppContext();

	useEffect(() => {
		if (!home) actions.getHomePageDatas(dispatch);
	}, [home, actions, dispatch]);

	if (!home)
		return (
			<LoadingWrapper>
				<Loading />
			</LoadingWrapper>
		);

	return (
		<Page
			title={`Dashboard - General Settings - ${
				siteSettings
					? siteSettings.siteTitle + ' - ' + siteSettings.siteSubtitle
					: 'Loading'
			}`}
			description="Administration dashboard site settings page "
		>
			<Section
				minHeight={(height - 70).toString() + 'px'}
				flex
				flexDirection="column"
				justifyContent="start"
				alignItems="start"
				admin
			>
				<Title>General Settings</Title>
				<Card>
					<SiteSettingsForm siteSettings={siteSettings} video={home.video} />
				</Card>
			</Section>
		</Page>
	);
};

const Title = styled.h1`
	font-size: 2em;
	margin-bottom: 20px;
`;

const LoadingWrapper = styled.div`
	z-index: -1;
`;

export default SiteSettingsEditView;
