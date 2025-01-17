const lightBackgroundColor = "#E6E6E6"
const darkBackgroundColor = "#282828"

type Theme = {
    name: string,
    backgroundColor: string,
    isDark: boolean,
    boardPathColor: string,
    colorDivider: string,
    colorPrimary?: string,
    colorPrimaryBg?: string,
    colorBgContainer?: string,
    colorBorder?: string,
    colorLink?: string,
    colorText?: string,
    colorTextButton?: string,
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
        colorDivider: "#429D90",
        colorPrimary: "#56BFE9",
        colorPrimaryBg: "#275B6F",
        colorBgContainer: "#30584F",
        colorLink: "#FFB174"
    },
    {
        name: "Dynamic",
        backgroundColor: "#FFDC00",
        isDark: false,
        boardPathColor: "#00CC19",
        colorDivider: "black",
        colorPrimary: "#FF2323",
        colorPrimaryBg: "#FF232380",
        colorBgContainer: "#FFAE00",
        colorBorder: "black",
        colorLink: "#002DE2",
        colorText: "black",
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
        colorLink: "#9B2CF1",
        colorText: "#7A4B1C",
    },
    {
        name: "Red Blue",
        backgroundColor: "#234A6A",
        isDark: true,
        boardPathColor: "#F84545",
        colorDivider: "#3A6B93",
        colorPrimary: "#E03F3F",
        colorPrimaryBg: "#0E304D",
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
        colorDivider: "#A5C5C5",
        colorPrimary: "#04C1A4",
        colorPrimaryBg: "#BAF8EE",
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
        colorDivider: "#3260CA",
        colorPrimary: "#DCB103",
        colorPrimaryBg: "#82610A",
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
        colorDivider: "#B5C6EC",
        colorPrimary: "#F99FC3",
        colorPrimaryBg: "#F99FC380",
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