import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Hammersmith+One&family=Montserrat&family=Nunito:wght@200;400;600&family=Raleway:wght@300;600&display=swap');

* {
    margin : 0;
    padding : 0;
    box-sizing : border-box;
	scroll-behavior : smooth;
}
body{
	background: #1D1E20;
	color: white;
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
textarea {
	resize: vertical;
}
button:focus-visible, a:focus-visible, figure:focus-visible , img:focus-visible{
	outline : auto;
	padding: 5px;
}
input:focus-visible, textarea:focus-visible {
	outline : auto;
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 30px #2E2F31 inset !important;
	-webkit-text-fill-color : #C4C4C4 !important
}

@media (max-width : 600px){
	.lb-img{
		max-height: unset !important;
		max-width: unset !important;
	}
}
`;
export default Global;

export const theme = {
	name: 'main',
	animated: {
		loader: 'https://media.giphy.com/media/SAHqdcXlBISVbes9nj/giphy.gif',
		// menu: 'https://media.giphy.com/media/fuDoZKKdU3RaVHHmse/giphy.gif',
		menu: process.env.PUBLIC_URL + '/clappergif.gif',
	},
	palette: {
		action: {
			hover: '#8429B5',
			active: '#F0CC10',
			warning: '#b52637',
		},
		background: {
			default: '#1D1E20',
			paper: '#E5E5E5',
			surface: {
				primary: '#2E2F31',
				secondary: '#F0CC10',
			},
			overlay: '#2d2f30',
			gradient:
				'radial-gradient(50% 50% at 50% 50%, #2F3137 0%, #1A1B1F 100%);',
			transparent: '#2d2f3073',
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
		xs: '500px',
		sm: '768px',
		md: '1024px',
		lg: '1441px',
	},
	shadows: {
		bottom: '0px 4px 4px rgba(0, 0, 0, 0.25)',
		top: '0px -4px 4px rgba(0, 0, 0, 0.25)',
	},
};
