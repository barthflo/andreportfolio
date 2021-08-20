import React from 'react';

const FilmographyDetailView = ({
	match: {
		params: { slug },
	},
}) => {
	return <div>Filmo Detail : {slug.split('-').join(' ').toUpperCase()}</div>;
};

export default FilmographyDetailView;
