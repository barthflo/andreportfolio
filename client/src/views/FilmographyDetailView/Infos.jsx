import React from 'react';
import PropTypes from 'prop-types';
import { HashLink } from 'react-router-hash-link';
import styled from 'styled-components';

const Infos = ({ film: { date, synopsis, production, distributor, role } }) => {
	return (
		<Section>
			<InfoContainer>
				<Info>
					<Title>Date :</Title>
					{date}
				</Info>
				<Info>
					<Title>Synopsis :</Title>
					{synopsis}
				</Info>
				{production && (
					<Info>
						<Title>Production :</Title>
						{production}
					</Info>
				)}
				{distributor && (
					<Info>
						<Title>Distributor :</Title>
						{distributor}
					</Info>
				)}
				<Info>
					<Title>My role :</Title>
					{role}
				</Info>
			</InfoContainer>
			<Link to="/filmography">Back to filmography</Link>
		</Section>
	);
};

const Section = styled.section`
	margin-top: 20px;
	display: flex;
	flex-direction: column;
`;

const InfoContainer = styled.div`
	width: 100%;
	padding: 10px;
	margin-bottom: 20px;
	background: ${(props) => props.theme.palette.background.surface.primary};
	box-shadow: ${(props) => props.theme.shadows.bottom};
	@media (min-width: ${(props) => props.theme.breakpoints.xs}) {
		padding: 10px 20px;
	}
	@media (min-width: ${(props) => props.theme.breakpoints.lg}) {
		& > p {
			font-size: 20px;
		}
	}
`;

const Title = styled.span`
	padding-right: 5px;
	font-weight: 600;
`;

const Info = styled.p`
	margin-bottom: 10px;
	text-align: justify;
`;

const Link = styled(HashLink)`
	min-width: 100%;
	padding: 7px;
	color: ${(props) => props.theme.palette.text.secondary.dark};
	background: ${(props) => props.theme.palette.background.surface.secondary};
	border: 1px solid ${(props) => props.theme.palette.border};
	box-shadow: ${(props) => props.theme.shadows.bottom};
	text-align: center;
	text-transform: capitalize;
	@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
		min-width: 230px;
		align-self: flex-end;
	}
`;

Infos.propTypes = {
	date: PropTypes.string.isRequired,
	synopsis: PropTypes.string.isRequired,
	production: PropTypes.string,
	distributor: PropTypes.string,
	role: PropTypes.string.isRequired,
};

Infos.defaultProps = {
	date: '',
	synopsis: '',
	role: '',
};

export default Infos;
