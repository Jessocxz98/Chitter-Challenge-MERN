import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthForms } from "./authentication/auth_forms.js"
import { PeepForm } from './peeps/peep_form.js';



function App() {
  return (
    <div className="area">
    <Router>
      <Routes>
        <Route path='/signup-or-login' element={<AuthForms />} />
        <Route path='/' element={<PeepForm />} />
      </Routes>
    </Router>
    </div>

  );
}

export default App;
