import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginForm } from './authentication/login_form';
import { SignupForm } from './authentication/signup_form';

function App() {
  return (
    <div className="area">
    <Router>
      <Routes>
        <Route path='/sign-up' element={<SignupForm />} />
        <Route path='/login' element={<LoginForm />} />
      </Routes>
    </Router>
    </div>

  );
}

export default App;
