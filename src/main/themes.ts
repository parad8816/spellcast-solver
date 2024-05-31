type Theme = {
    name: string,
    backgroundColor: string,
    isDark: boolean,
    boardPathColor: string,
}

const allThemes: Theme[] = [
    {
        name: "Light",
        backgroundColor: "#E6E6E6",
        isDark: false,
        boardPathColor: "#FFF499",
    },
    {
        name: "Dark",
        backgroundColor: "#282828",
        isDark: true,
        boardPathColor: "#75D144",
    },
]

const defaultTheme = () => {
    return allThemes[0]
}

export { 
    Theme, 
    allThemes,
    defaultTheme,
}