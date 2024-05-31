import { Routes, Route, HashRouter } from 'react-router-dom';
import './App.css';
import SpellcastSolver from './spellcastSolver';
import About from './about';
import { ConfigProvider, theme } from 'antd';
import { useEffect, useState } from 'react';
import { allThemes, defaultTheme } from '../main/themes';



export default function App() {
    const initThemeName = localStorage.getItem("appTheme")
    const initTheme = allThemes.find(v => v.name == initThemeName) ?? defaultTheme
    const [appTheme, setAppTheme] = useState(initTheme)

    useEffect(() => {
        window.electron?.ipcRenderer?.on("change-theme", arg => {
            const themeName = arg as string
            const found = allThemes.find(v => v.name == themeName) ?? defaultTheme
            console.log(found)
            setAppTheme(found)
            localStorage.setItem("appTheme", themeName)
        })
    }, [window.electron])

    useEffect(() => {
        document.body.style.backgroundColor = appTheme.backgroundColor
    }, [appTheme])

    return (
        <HashRouter>
            <ConfigProvider theme={{algorithm: appTheme.isDark ? theme.darkAlgorithm : theme.defaultAlgorithm}}>
            <Routes>
                <Route path="/" element={<SpellcastSolver theme={appTheme} />} />
                <Route path="/about" element={<About theme={appTheme} />} />
            </Routes>
            </ConfigProvider>
        </HashRouter>
    );
}
