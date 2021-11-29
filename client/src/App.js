import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthForms } from "./authentication/auth_forms.js"

function App() {
  return (
    <div className="area">
    <Router>
      <Routes>
        <Route path='/sign-up-or-login' element={<AuthForms />} />
      </Routes>
    </Router>
    </div>

  );
}

export default App;
