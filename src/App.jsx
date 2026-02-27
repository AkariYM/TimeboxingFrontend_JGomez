import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Planner from './components/Planner';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"          element={<Login />}     />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/planner"   element={<Planner />}   />
      </Routes>
    </Router>
  );
}

export default App;