import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Card } from './components/card/card'
import './App.scss';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Card />} />
      </Routes>
    </Router>
  );
}
