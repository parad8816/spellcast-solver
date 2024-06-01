const lightBackgroundColor = "#E6E6E6"
const darkBackgroundColor = "#282828"

type Theme = {
    name: string,
    backgroundColor: string,
    isDark: boolean,
    boardPathColor: string,
    colorDivider: string,
    colorPrimary?: string,
    colorBgContainer?: string,
    colorBorder?: string,
    colorLink?: string,
    colorText?: string,
}

const allThemes: Theme[] = [
    {
        name: "Light",
        backgroundColor: lightBackgroundColor,
        isDark: false,
        boardPathColor: "#FFF499",
        colorDivider: "#B4B4B4",
    },
    {
        name: "Dark",
        backgroundColor: darkBackgroundColor,
        isDark: true,
        boardPathColor: "#75D144",
        colorDivider: "#464646",
    },
    {
        name: "Oceanic",
        backgroundColor: "#2C6960",
        isDark: true,
        boardPathColor: "#4CC7B8",
        colorDivider: "#AAFFEA",
        colorPrimary: "#56BFE9",
        colorBgContainer: "#30584F",
        colorLink: "#FFB174"
    },
    {
        name: "Dynamic",
        backgroundColor: darkBackgroundColor,
        isDark: true,
        boardPathColor: "#2053FF",
        colorDivider: "#464646",
        colorPrimary: "#FC8704",
        colorBorder: "#3F4D80",
        colorLink: "#4BFA17",
        colorText: "#FFFAB2",
    },
    {
        name: "Cyber",
        backgroundColor: "#1E1E1E",
        isDark: true,
        boardPathColor: "#2FDB13",
        colorDivider: "#464646",
        colorPrimary: "#2FDB13",
        colorBorder: "#2EFF0D",
        colorLink: "#55D430",
        colorText: "#B6FF89",
    },
    {
        name: "Candy",
        backgroundColor: "#FFE2F8",
        isDark: false,
        boardPathColor: "#FFBB5F",
        colorDivider: "#FCA9E8",
        colorPrimary: "#AA63E6",
        colorText: "#7A4B1C",
    },
    {
        name: "Red Blue",
        backgroundColor: "#234A6A",
        isDark: true,
        boardPathColor: "#F84545",
        colorDivider: "#8EC3E5",
        colorPrimary: "#E03F3F",
        colorBgContainer: "#193D5B",
        colorBorder: "#2E70A7",
        colorLink: "#FF8989",
        colorText: "#FFD7D7",
    },
    {
        name: "Sky",
        backgroundColor: "#CCE1E1",
        isDark: false,
        boardPathColor: "#FFFFFF",
        colorDivider: "black",
        colorPrimary: "#04C1A4",
        colorBgContainer: "#B7CDCD",
        colorBorder: "#2C9CA4",
        colorLink: "#EF5022",
        colorText: "#653A2D",
    },
    {
        name: "Pink",
        backgroundColor: darkBackgroundColor,
        isDark: true,
        boardPathColor: "#F967BD",
        colorDivider: "#464646",
        colorPrimary: "#FF36AD",
        colorLink: "#FF45B3",
        colorText: "#FFC8E9"
    },
    {
        name: "Stardust",
        backgroundColor: "#1E3E87",
        isDark: true,
        boardPathColor: "#5D82D5",
        colorDivider: "#8DA8E6",
        colorPrimary: "#DCB103",
        colorBgContainer: "#142A5D",
        colorBorder: "#4464AC",
        colorText: "#FFF758",
        colorLink: "white",
    },
    {
        name: "Fade",
        backgroundColor: "#E8EFFF",
        isDark: false,
        boardPathColor: "#F9D1E1",
        colorDivider: "#3567DA",
        colorPrimary: "#F99FC3",
        colorBgContainer: "#CDDBFA",
        colorBorder: "#A9B3F1",
        colorText: "#9B6EB6",
        colorLink: "#F598E2",
    },
]

const defaultTheme = () => {
    return allThemes[0]
}

export { 
    Theme, 
    allThemes,
    defaultTheme,
    lightBackgroundColor,
    darkBackgroundColor,
}