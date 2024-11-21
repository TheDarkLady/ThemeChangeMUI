import { useState } from 'react'

import { Button, IconButton, Typography } from '@mui/material'
import { darkTheme, lightTheme } from './Themes/theme'
import { ThemeProvider , CssBaseline} from '@mui/material'
import { Brightness7, Brightness4 } from '@mui/icons-material'
// import { darkTheme, lightTheme } from './Themes/theme'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  const toogleTheme =() =>{
    setDarkMode(!darkMode)
  }
  return (
    <>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <div sx={{padding: '1rem'}}>
          <IconButton onClick = {toogleTheme} >
            {darkMode ? '🌙' : '☀️'}
            {/* {darkMode ? <Brightness7></Brightness7> : <Brightness4></Brightness4>} */}
          </IconButton>
        </div>
      <Typography variant="h1" component="h1">
        Hello world
      </Typography>
      <Button variant='contained' color='primary'>Primary</Button>
      <Button variant='contained' color='secondary'>Secondary</Button>
    </ThemeProvider >
    </>
      
  )
}

export default App
