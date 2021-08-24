import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const responsive = {
	// superLargeDesktop: {
	//   // the naming can be any, depends on you.
	//   breakpoint: { max: 4000, min: 3000 },
	//   items: 5
	// },
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 6,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 3,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 2,
	},
};

const Thumbs = ({ pictures, slug }) => {
	const { width } = useWindowDimensions();
	return (
		// <>
		// 	{!pictures ? (
		// 		'loading'
		// 	) : (
		<Wrapper
			responsive={responsive}
			deviceType={'mobile'}
			ssr
			infinite
			draggable={false}
			slidesToSlide={width < 464 ? 2 : 3}
			arrows={width < 768 ? false : true}
			centerMode={width < 768 ? true : false}
		>
			{pictures.map((url, index) => {
				return (
					<Thumbnail key={index} src={url} alt={`still frame from ${slug}`} />
				);
			})}
		</Wrapper>
		// )}
		// </>
	);
};

const Wrapper = styled(Carousel)`
	width: 100vw;
	& ul {
		height: 20vh;
	}
	& li {
		height: 100%;
		padding: 0 5px;
	}
`;

const Thumbnail = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;
Thumbs.propTypes = {
	pictures: PropTypes.array.isRequired,
	slug: PropTypes.string.isRequired,
};

export default Thumbs;
