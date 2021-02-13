import MainPage from './pages/mainPage/MainPage';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route
} from 'react-router-dom';
import { getFromStorage } from './storage';

function App() {
  const isLogin = getFromStorage('token') ? true : false;
  return (
    <Router>
      <Switch>
        <Route
          exact
          path='/'
          render={() => {
            return isLogin ? <Redirect to='/main' /> : <Redirect to='/login' />;
          }}
        />
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/signUp'>
          <SignUp />
        </Route>
        <Route path='/main'>
          <MainPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
