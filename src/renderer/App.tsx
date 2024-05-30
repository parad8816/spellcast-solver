import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SpellcastSolver from './spellcastSolver';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SpellcastSolver />} />
            </Routes>
        </Router>
    );
}
