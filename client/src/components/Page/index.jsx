import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const Page = ({ title, description, children }) => {
	return (
		<>
			<Helmet>
				<title>{title}</title>
				<meta name="description" content={description} />
			</Helmet>
			{children}
		</>
	);
};

Page.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

export default Page;
