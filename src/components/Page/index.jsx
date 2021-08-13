import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const Page = ({ title, description, children }) => {
	return (
		<div>
			<Helmet>
				<title>{title}</title>
				<meta name="description" content={description} />
			</Helmet>
			{children}
		</div>
	);
};

Page.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

export default Page;
