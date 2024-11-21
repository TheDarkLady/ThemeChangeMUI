import { Input } from '@mui/material'
import { blue } from '@mui/material/colors'
import React, { useState } from 'react'

function Home() {
  const [colors, setColors] = useState({
    red: "",
    green: "",
    blue:''
  })
  return (
    <div>
      <label>Red :</label>
      <Input type='number' name='red' value={colors.red} onChange={(e)=> {
        console.log(e.target.value)
        
      }
      }/>
      <label>Green :</label>
      <Input type='number'/>
      <label>Blue :</label>
      <Input type='number'/>
    </div>
  )
}

export default Home