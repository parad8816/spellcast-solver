import { Routes, Route, HashRouter } from 'react-router-dom';
import './App.css';
import SpellcastSolver from './spellcastSolver';
import About from './about';

export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<SpellcastSolver />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </HashRouter>
    );
}
