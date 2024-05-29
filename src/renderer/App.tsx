import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Board from './board';
import { Col, Divider, Row } from 'antd';
import BoardResult from './boardResult';
import { useEffect, useState } from 'react';
import { WordResult } from '../main/spellcast';

function Solver() {
    const [result, setResult] = useState<Map<number, WordResult>>(new Map())
    const [pathToShow, reflectPath] = useState<number | null>(null)

    useEffect(() => {
        reflectPath(null)
    }, [result])

    return (
        <Row id='solver'>
            <Col flex={2}><Board setResult={setResult} pathToShow={pathToShow} /></Col>
            <Divider type='vertical' className='divider' />
            <Col flex={2}><BoardResult result={result} reflectPath={reflectPath} /></Col>
        </Row>
    )
}

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Solver />} />
            </Routes>
        </Router>
    );
}
