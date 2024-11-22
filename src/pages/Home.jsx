import { Box, Button, Input, Typography } from "@mui/material";
import React, { useState } from "react";

function Home() {
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
    red: "",
    green: "",
    blue: "",
  });
  const [isDisabled, setIsDisabled] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedColors = {
      red: 0,
      green: 0,
      blue: 0,
    };
    if (colors.red > 0 || colors.green > 0) {
      updatedColors.red = colors.red;
      updatedColors.green = colors.green;
      updatedColors.blue = 0;
    } else {
      updatedColors.red = 0;
      updatedColors.green = 0;
      updatedColors.blue = colors.blue;
    }
    setNewColors(updatedColors);
    setColors(updatedColors)
    setIsDisabled(true)
  };
  console.log("newColors", newColors);
  

  const [click, setClick] = useState(Array(10).fill(false));
  const [buttonColors, setButtonColors] = useState(Array(10).fill("secondary"));

  // Updated getRandomColors function with custom hex color codes
  const getRandomColors = () => {
    const colorOptions = ["#eb0b0b", "#071ab6", "#32c10f"]; // Custom hex color codes
    return colorOptions[Math.floor(Math.random() * colorOptions.length)];
  };

  const [selectedBtnCount, setSelectedBtnCount] = useState(0);

  const handleClick = (index) => {
    setClick((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      
      return newStates;
    });

    setButtonColors((prevColors) => {
      
      const newColors = [...prevColors];
      newColors[index] = getRandomColors();
      console.log("newColors", newColors);
       
      return newColors;
    });

    setSelectedBtnCount((prevCount) =>
      click[index] ? prevCount - 1 : prevCount + 1 
    );
  };

  return (
    <div>
      <Typography variant="h3" component="h3"> When Red and Green both are 0 the Blue is 1 else 0</Typography>
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
          The magic number : {selectedBtnCount - newColors.blue}
        </Typography>
      </Box>
    </div>
  );
}

export default Home;
