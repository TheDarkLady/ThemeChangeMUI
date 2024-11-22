import { Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { Box, Input, Button } from '@mui/material';

function About() {
  const [colors, setColors] = useState({
    red: "",
    green: "",
    blue: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setColors((prevColors) => ({
      ...prevColors,
      [name]: Number(value),
    }));
  };

  const [newColors, setNewColors] = useState({
    red: 0,
    green: 0,
    blue: 0,
  });
  const [isDisabled, setIsDisabled] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault();
    setNewColors({red:colors.red, green:colors.green, blue:colors.blue});
    setIsDisabled(true)
  };

  const [click, setClick] = useState(Array(10).fill(false));
  const [buttonColors, setButtonColors] = useState(Array(10).fill("secondary"));
  let [selectedBtnCount, setSelectedBtnCount] = useState(0);
  const [selectedButtonColors, setSelectedButtonColors] = useState({
    red: 0,
    green: 0,
    blue: 0
  })

  const getRandomColors = () => {
    const colorOptions = ["#eb0b0b", "#071ab6", "#32c10f"]; 
    return colorOptions[Math.floor(Math.random() * colorOptions.length)];
  };


  const handleClick = (index) => {
    const isButtonSelected = click[index];
    
    setClick((prevStates) => {
      const newStates = [...prevStates];
      
      newStates[index] = !newStates[index];
      console.log(newStates);
      return newStates;
    });
  
    if (!isButtonSelected) {
      const newColor = getRandomColors();
      const updatedColor = { ...selectedButtonColors };
      console.log("updatedColor",updatedColor);
      
      if (newColor === '#071ab6') {
        updatedColor.blue += 1;
      } else if (newColor === '#eb0b0b') {
        updatedColor.red += 1;
      } else {
        updatedColor.green += 1;
      }
  
      setButtonColors((prevColors) => {
        const newColors = [...prevColors];
        newColors[index] = newColor;
        console.log("newColors", newColors);
        
        return newColors;
      });
  
      setSelectedButtonColors(updatedColor);
      setSelectedBtnCount((prevCount) => prevCount + 1)
    } else {
      const currentColor = buttonColors[index];
      const updatedColor = { ...selectedButtonColors };
  
      if (currentColor === '#071ab6') {
        updatedColor.blue -= 1;
      } else if (currentColor === '#eb0b0b') {
        updatedColor.red -= 1;
      } else {
        updatedColor.green -= 1;
      }
  
      setSelectedButtonColors(updatedColor);
      setSelectedBtnCount((prevCount) => prevCount - 1)
    }
    
  };
  console.log("selectedButtonColors", selectedButtonColors);
  console.log("selectedBtnCount", selectedBtnCount);
  

  return (
    <div>
      <Typography variant="h3" component="h3"> Red Green and Blue </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItem: "flex-start",
            width: "50%",
            padding: "10px 20px",
          }}
        >
          <label>Red :</label>
          <Input
            type="number"
            name="red"
            value={colors.red}
            onChange={handleChange}
            disabled={isDisabled}
          />
          <label>Green :</label>
          <Input
            type="number"
            name="green"
            value={colors.green}
            onChange={handleChange}
            disabled={isDisabled}
          />
          <label>Blue :</label>
          <Input
            type="number"
            name="blue"
            value={colors.blue}
            onChange={handleChange}
            disabled={isDisabled}
          />
          <Button type="submit" variant="contained" color="secondary" sx={{ width: "fit-content" }}>
            Submit
          </Button>
        </Box>
      </form>

      <Box sx={{ display: "flex", flexDirection: "row", gap: 2, flexWrap: "wrap" }}>
        {click.map((clicked, i) => (
          <Button
            key={i}
            onClick={() => handleClick(i)}
            variant="contained"
            style={{ backgroundColor: clicked ? buttonColors[i] : "#6d1b7b" }}
          >
            {clicked ? "selected" : "Click Me"}
          </Button>
        ))}
      </Box>

      <Box sx={{ marginTop: "20px" }}>
        <Typography variant="h4" component="h4">
          No of buttons selected : {selectedBtnCount}
        </Typography>
      </Box>

      <Box sx={{ marginTop: "20px" }}>
        <Typography variant="h4" component="h4">
          The magic number Red : {selectedButtonColors.red - newColors.red}
        </Typography>
        <Typography variant="h4" component="h4">
          The magic number Green : {selectedButtonColors.green - newColors.green}
        </Typography>
        <Typography variant="h4" component="h4">
          The magic number Blue : {selectedButtonColors.blue - newColors.blue}
        </Typography>
      </Box>
    </div>
  );
}

export default About
