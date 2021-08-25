import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Lightbox from 'react-awesome-lightbox';
import 'react-awesome-lightbox/build/style.css';
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
	const deviceType = () => {
		if (width < 464) return 'mobile';
		if (width >= 464 && width < 1024) return 'tablet';
		return 'desktop';
	};

	const [selectedIndex, setSelectedIndex] = useState(0);
	const [showLightbox, setShowLightbox] = useState(false);

	const toggleLightbox = (selectedIndex = 0) => {
		setSelectedIndex(selectedIndex);
		setShowLightbox(!showLightbox);
	};
	return (
		<>
			<Wrapper
				responsive={responsive}
				deviceType={deviceType}
				ssr
				infinite
				draggable={width > 1024 ? false : true}
				slidesToSlide={width < 464 ? 2 : 3}
				removeArrowOnDeviceType={['mobile', 'tablet']}
				arrows
				centerMode={width < 1024 ? true : false}
			>
				{pictures.map((url, index) => {
					return (
						<Thumbnail
							key={index}
							src={url}
							alt={`still frame from ${slug}`}
							onClick={() => toggleLightbox(index)}
						/>
					);
				})}
			</Wrapper>
			{showLightbox && (
				<Lightbox
					images={pictures}
					allowRotate={false}
					allowZoom={false}
					startIndex={selectedIndex}
					onClose={() => toggleLightbox()}
				/>
			)}
		</>
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
	cursor: pointer;
`;

Thumbs.propTypes = {
	pictures: PropTypes.array.isRequired,
	slug: PropTypes.string.isRequired,
};

export default Thumbs;
