import './App.css';
import Home from './components/Home';
import AuthForm from './components/AuthForm';
import { Switch, Route } from 'react-router-dom';
function App() {
	return (
		<div className='App'>
			<Switch>
				<Route exact path='/' component={AuthForm} />
				<Route exact path='/home' component={Home} />
			</Switch>
		</div>
	);
}

export default App;
