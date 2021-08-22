import React from 'react';
import useAppContext from '../../hooks/useAppContext';
import styled from 'styled-components';
import { RiStarSFill } from 'react-icons/ri';
import Button from '../../components/Button';

const Skills = () => {
	const {
		home: { skills, cv },
	} = useAppContext();

	const renderSkills = (skills) => {
		return skills.map((item) => {
			const { skill, id } = item;
			return (
				<p key={id} style={{ marginBottom: 5 }}>
					{skill}
				</p>
			);
		});
	};

	console.log(skills);

	return (
		<Wrapper>
			<StarContainer>
				<Star />
			</StarContainer>
			<h2>Skills</h2>
			{skills.map((skill, index) => {
				const { skill_group, skills } = skill;
				return (
					<FlexContainer key={index}>
						<Title as="p">{skill_group}</Title>
						<SkillsContainer>{renderSkills(skills)}</SkillsContainer>
					</FlexContainer>
				);
			})}
			<Button label="Download CV" as="a" target={cv} download />
			<StarContainer bottom>
				<Star />
			</StarContainer>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	padding: 10vh 0;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-weight: 300;
	& h2 {
		font-weight: 600;
		margin-bottom: 25px;
		font-style: capitalize;
		font-size: 36px;
		@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
			font-size: 48px;
		}
		@media (min-width: ${(props) => props.theme.breakpoints.md}) {
			font-size: 56px;
		}
	}
`;

const StarContainer = styled.div`
	position: absolute;
	top: ${(props) => !props.bottom && 0};
	bottom: ${(props) => props.bottom && 0};
	left: 0;
	width: 100%;
	height: 10vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Star = styled(RiStarSFill)`
	font-size: 20px;
	@media (min-width: ${(props) => props.theme.breakpoints.xs}) {
		font-size: 25px;
	}
	@media (min-width: ${(props) => props.theme.breakpoints.md}) {
		font-size: 36px;
	}
`;

const FlexContainer = styled.div`
	display: flex;
	width: 100%;
	margin-bottom: 15px;
	text-transform: lowercase;
`;

const Title = styled.div`
	width: 45%;
	text-align: right;
	padding-right: 20px;
`;

const SkillsContainer = styled.div`
	width: 55%;
	padding-left: 20px;
	& > p {
		margin-bottom: 5px;
	}
`;

export default Skills;
