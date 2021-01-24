import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './context/AuthProvider';

import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
	<Router>
		<AuthProvider>
			<App />
		</AuthProvider>
	</Router>,
	document.getElementById('root')
);
