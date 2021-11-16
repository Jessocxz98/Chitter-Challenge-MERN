import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { SignupForm } from './authentication/signup_form';

function App() {
  return (
    <div className="area">
    <Router>
      <Routes>
        <Route path='/sign-up' element={<SignupForm />} />
      </Routes>
    </Router>
    </div>

  );
}

export default App;
