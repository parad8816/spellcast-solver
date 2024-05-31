import { Routes, Route, HashRouter } from 'react-router-dom';
import './App.css';
import SpellcastSolver from './spellcastSolver';
import About from './about';
import { ConfigProvider, theme } from 'antd';
import { useEffect, useState } from 'react';
import { Theme, allThemes, defaultTheme } from '../main/themes';

const colorConfig = (thm: Theme) => {
    const map = new Map<string, string>()
    const {
        colorPrimary,
        colorBgContainer,
        colorBorder,
        colorLink,
        colorText,
    } = thm
    if (colorPrimary) map.set("colorPrimary", colorPrimary)
    if (colorBgContainer) map.set("colorBgContainer", colorBgContainer)
    if (colorBorder) map.set("colorBorder", colorBorder)
    if (colorLink) map.set("colorLink", colorLink)
    if (colorText) map.set("colorText", colorText)
    return Object.fromEntries(map.entries())
}

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
            <ConfigProvider 
                theme={{
                    algorithm: appTheme.isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
                    token: colorConfig(appTheme)
                }}
            >
            <Routes>
                <Route path="/" element={<SpellcastSolver theme={appTheme} />} />
                <Route path="/about" element={<About theme={appTheme} />} />
            </Routes>
            </ConfigProvider>
        </HashRouter>
    );
}
