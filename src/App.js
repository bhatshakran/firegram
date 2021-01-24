import './App.css';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import PasswordReset from './components/PasswordReset';
import { Switch, Route } from 'react-router-dom';
import ProfilePage from './components/ProfilePage';
import PrivateRoute from './components/PrivateRoute';
function App() {
	return (
		<Switch>
			<PrivateRoute exact path='/' component={Home} />
			<Route exact path='/signin' component={SignIn} />
			<Route exact path='/signup' component={SignUp} />
			<Route exact path='/forgotpassword' component={PasswordReset} />
			<PrivateRoute path='/profilepage' component={ProfilePage} />
		</Switch>
	);
}

export default App;
