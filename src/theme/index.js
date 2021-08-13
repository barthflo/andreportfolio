import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Hammersmith+One&family=Montserrat&family=Nunito:wght@200;600&family=Raleway:wght@300;600&display=swap');
body {
    margin : 0;
    padding : 0;
    box-sizing : border-box;
    background: #1D1E20;
}
a {
    text-decoration : none;
    color: unset;
}
ul, li {
    margin: 0;
    padding : 0;
    list-style-type: none;
}
`;
export default Global;

export const theme = {
	name: 'main',
	animated: {
		loader: 'https://media.giphy.com/media/SAHqdcXlBISVbes9nj/giphy.gif',
		menu: 'https://media.giphy.com/media/fuDoZKKdU3RaVHHmse/giphy.gif',
	},
	palette: {
		action: {
			hover: '#F0CC10',
			active: '#F0CC10',
		},
		background: {
			default: '#1D1E20',
			paper: '#E5E5E5',
			surface: {
				primary: '#2E2F31',
				secondary: '#F0CC10',
			},
			overlay: '#28292A',
			gradient:
				'radial-gradient(50% 50% at 50% 50%, #2F3137 0%, #1A1B1F 100%);',
		},
		text: {
			primary: '#F0CC10',
			secondary: {
				light: '#C4C4C4',
				dark: '#1D1E20',
			},
		},
		border: '#1D1E20',
	},
	typography: {
		opening: {
			title: 'Hammersmith One, sans-serif',
			subtitle: 'Nunito, sans-serif',
		},
		menu: {
			title: 'Montserrat, sans-serif',
			items: 'Nunito, sans-serif',
		},
		main: 'Raleway, sans-serif',
	},
	breakpoints: {
		sm: '768px',
		md: '1024px',
		lg: '1440px',
	},
	shadows: '0px 4px 4px rgba(0, 0, 0, 0.25)',
};
