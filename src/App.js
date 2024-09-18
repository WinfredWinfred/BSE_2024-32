import './App.css';
import Login from './components/Login';
import {Route, Routes} from 'react-router-dom'
import Register from './components/Register';
import PasswordReset from './components/PasswordReset';
import PasswordResetForm from './components/PasswordResetForm';
import NotFound from './components/NotFound';
import Dashboard from './components/Dashboard';


function App() {
  return (
    <Routes>
      <Route path='' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/password-reset' element={<PasswordReset />}/>
      <Route path='/password-reset/:link' element={<PasswordResetForm />}/>
      <Route path='/dashboard' element={<Dashboard />}/>
      <Route path='*' element={<NotFound />}/>
    </Routes>
  );
}

export default App;
