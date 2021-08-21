import React from 'react';

const FilmographyDetailView = ({
	match: {
		params: { slug },
	},
}) => {
	window.scrollTo(0, 0);
	return <div>Filmo Detail : {slug.split('-').join(' ').toUpperCase()}</div>;
};

export default FilmographyDetailView;
