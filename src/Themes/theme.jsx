import { createTheme } from "@mui/material";
import { blueGrey, purple, red, yellow } from "@mui/material/colors";

export const lightTheme = createTheme(
    {
        palette: {
            mode: 'light',
            primary: {
               main: red[900]
            },
            secondary: {
                main: purple[500]
            }
        }
    }
)
export const darkTheme = createTheme(
    {
        palette: {
            mode: 'dark',
            primary: {
               main: purple[700]
            },
            secondary: {
                main: yellow[500]
            }
        }
    }
)