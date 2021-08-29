import React from 'react';

const Home = () => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: 'inherit',
			}}
		>
			<h1 style={{ fontSize: '6em', color: '#c4c4c4', width: '40%' }}>
				Welcome Andre!
			</h1>
			<div style={{ width: '50%' }}></div>
		</div>
	);
};

export default Home;
