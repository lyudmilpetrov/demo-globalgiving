import { grey, teal, indigo } from "@mui/material/colors";
import { blueGrey, lightBlue, deepOrange, blue, lightGreen } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const themeLight = createTheme({
    palette: {
        mode: "light",
        primary: blue,
        divider: blue[700],
        // background: {
        //     default: blue[900],
        //     paper: blue[900],
        // },
        text: {
            primary: '#000',
            secondary: grey[700],
        },
        secondary: {
            main: lightGreen[900],
            contrastText: lightGreen[100],
        },
    },
});
themeLight.props = {
    MuiButton: {
        fontWeight: 700,
    },
};
themeLight.overrides = {
    MuiButton: {
        root: {
            fontWeight: 200,
            color: lightBlue[500],
        },
        containedPrimary: {
            "&:hover": {
                backgroundColor: blueGrey[600],
                color: lightBlue[100],
            },
        },
    },
};

const themeDark = createTheme({
    palette: {
        mode: 'dark',
        // palette values for dark mode
        primary: blue,
        divider: blue[700],
        background: {
            default: blue[900],
            paper: blue[900],
        },
        text: {
            primary: '#fff',
            secondary: grey[500],
        },
        secondary: {
            main: lightGreen[100],
            contrastText: lightGreen[900],
        },
    },
});
themeDark.props = {
    MuiButton: {
        fontWeight: 700,
    },
};
themeDark.overrides = {
    MuiButton: {
        root: {
            fontWeight: 200,
            color: lightBlue[500],
        },
        containedPrimary: {
            "&:hover": {
                backgroundColor: blueGrey[600],
                color: lightBlue[100],
            },
        },
    },
};

const getDesignTokens = (mode) => {
    // // // console.log(mode);
    if (mode === "light") {
        return themeLight;
    } else {
        return themeDark;
    }
};

export default getDesignTokens;
