import './App.css';
import { Component } from 'react';
import {
  NavLink,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import FormControlled from './components/FormControlled/FormControlled.tsx';
import FormUncontrolled from './components/FormUncontrolled/FormUncontrolled.tsx';
import Main from './components/Main/Main.tsx';

export default class App extends Component<object> {
  render() {
    return (
      <>
        <Router>
          <nav className={'tabs'}>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              Main
            </NavLink>
            <NavLink
              to="/form-uncontrolled"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              Uncontrolled Form
            </NavLink>
            <NavLink
              to="/form-controlled"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              Controlled Form
            </NavLink>
          </nav>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/form-uncontrolled" element={<FormUncontrolled />} />
            <Route path="/form-controlled" element={<FormControlled />} />
          </Routes>
        </Router>
      </>
    );
  }
}
