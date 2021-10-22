import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from '../../../components/Card';
import styled from 'styled-components';
import Button from '../../../components/Button';
import Overlay from '../../../components/Overlay';
import useAppContext from '../../../hooks/useAppContext';
import axios from 'axios';
import { HashLink as Link } from 'react-router-hash-link';

const SkillsTable = ({ category, skills, setNotif }) => {
	const [confirmDelete, setConfirmDelete] = useState(false);
	const { dispatch, actions } = useAppContext();

	const deleteSkill = async () => {
		try {
			const {
				data: { info },
			} = await axios.delete(`/api/skills/${confirmDelete}`);
			actions.getHomePageDatas(dispatch);
			setConfirmDelete(false);
			console.log(info);
			setNotif({
				display: true,
				content: info,
				status: 'success',
			});
		} catch (err) {
			console.error(err);
			dispatch({
				type: 'ERROR',
				payload: err.response,
			});
		}
	};

	return (
		<>
			{confirmDelete && (
				<Overlay
					title="Are you sure you want to delete this item?"
					description={`This action will permanently erase this skill. \n\n Press confirm to continue or cancel to come back.`}
					actionLabel="Confirm"
					validate={deleteSkill}
					close={() => setConfirmDelete(false)}
				/>
			)}
			<Card justifyContent="stretch">
				<Table>
					<TableHeader>
						<Row>
							<Header>{category}</Header>
						</Row>
					</TableHeader>
					<TableBody>
						{skills.map((item) => {
							const { id, skill } = item;
							return (
								<Row key={id} margin="5px">
									<Cell>#</Cell>
									<Cell grow="1">{skill}</Cell>
									<Cell>
										<ButtonLink to={`/admin/skills/edit/${id}`}>
											Edit
										</ButtonLink>
									</Cell>
									<Cell>
										<Button
											label="Delete"
											onClick={() => setConfirmDelete(id)}
											dark
											minWidth="fit-content"
											variant="warning"
										/>
									</Cell>
								</Row>
							);
						})}
					</TableBody>
				</Table>
			</Card>
		</>
	);
};

const Table = styled.table`
	width: 100%;
`;

const TableHeader = styled.thead`
	text-transform: capitalize;
	font-size: 1.4em;
`;

const TableBody = styled.tbody`
	font-weight: 100;
`;

const Row = styled.tr`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: ${(props) => props.margin};
	border-bottom: 1px solid
		${(props) => props.theme.palette.text.secondary.light};
`;

const Header = styled.th`
	margin-bottom: 10px;
`;

const Cell = styled.td`
	padding: 5px;
	margin-bottom: 5px;
	flex-grow: ${(props) => props.grow};
`;

const ButtonLink = styled(Link)`
	min-width: fit-content;
	padding: 7px;
	color: ${(props) => props.theme.palette.text.secondary.dark};
	background: ${(props) => props.theme.palette.background.surface.secondary};
	border: 1px solid ${(props) => props.theme.palette.border};
	box-shadow: ${(props) => props.theme.shadows.bottom};
	text-align: center;
	text-transform: capitalize;
`;

SkillsTable.propTypes = {
	category: PropTypes.string.isRequired,
	skills: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
	setNotif: PropTypes.func.isRequired,
};

export default SkillsTable;
