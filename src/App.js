import './App.css';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import PasswordReset from './components/PasswordReset';
import { Switch, Route } from 'react-router-dom';
import ProfilePage from './components/ProfilePage';
import PrivateRoute from './components/PrivateRoute';
import UpdateProfile from './components/UpdateProfile';

function App() {
	return (
		<Switch>
			<PrivateRoute exact path='/' component={Home} />
			<Route path='/signin' component={SignIn} />
			<Route path='/signup' component={SignUp} />
			<Route path='/forgotpassword' component={PasswordReset} />
			<PrivateRoute path='/profilepage' component={ProfilePage} />
			<PrivateRoute path='/updateprofile' component={UpdateProfile} />
		</Switch>
	);
}

export default App;
