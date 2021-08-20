import React, { useEffect, useState } from 'react';
import useAppContext from '../../hooks/useAppContext';

const About = () => {
	const [loading, setLoading] = useState(true);
	const {
		siteSettings,
		home: { about },
	} = useAppContext();

	useEffect(() => {
		if (siteSettings) {
			setLoading(false);
		}
	}, [siteSettings]);

	return (
		<div style={{ paddingTop: 70, paddingBottom: 70 }}>
			<h2>About</h2>

			{!loading && (
				<div style={{ display: 'flex' }}>
					<img
						src={about.profilePic}
						alt={`Portrait of ${siteSettings.userName} `}
						style={{ width: 200, height: 400, objectFit: 'cover' }}
					/>
					<p>{about.content}</p>
				</div>
			)}
		</div>
	);
};

export default About;
