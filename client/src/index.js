import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Global, { theme } from './theme';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import AppProvider from './contexts/AppContext';
import AuthProvider from './contexts/AuthContext';

ReactDOM.render(
	<Router>
		<Global />
		<ThemeProvider theme={theme}>
			<AppProvider>
				<AuthProvider>
					<App />
				</AuthProvider>
			</AppProvider>
		</ThemeProvider>
	</Router>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
