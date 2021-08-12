import styled from 'styled-components';

const H1 = styled.h1`
	color: ${(props) => props.theme.palette.action.active};
	font-family: ${(props) => props.theme.typography.opening.title};
	font-size: 6vw;
`;

function App() {
	return (
		<div className="App">
			<H1>Hello World</H1>
		</div>
	);
}

export default App;
