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
    const numericValue = Number(value)
    setColors((prevColors) => ({
      ...prevColors,
      [name]: numericValue,
      ...(name === "blue" && numericValue > 0 ? {red:0, green:0}:{}),
      ...(name !== "blue" && numericValue > 0 ? {blue:0}:{})
    }));
  };

  const [newColors, setNewColors] = useState({
    red: "",
    green: "",
    blue: "",
  });
  const inputDisabled = colors.blue > 0;
  const blueInputDisabled = colors.red > 0 && colors.green > 0
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedColors = {
      red: colors.red > 0 ? colors.red : 0,
      green: colors.green > 0 ? colors.green : 0,
      blue: colors.red === 0 && colors.green === 0 ? colors.blue : 0,
    };
  
    setNewColors(updatedColors);
    setColors(updatedColors);
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
  const [selectedBtnColors, setSelectedBtnColors] = useState({
    red: 0,
    green: 0,
    blue: 0
  })

  const handleClick = (index) => {
    setClick((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
  
      setButtonColors((prevColors) => {
        const updatedColors = [...prevColors];
        const newColor = getRandomColors();
        const prevColor = prevColors[index]; // Get the previous color
        updatedColors[index] = newColor;
  
        // Update newColors based on the button's previous and new states
        setNewColors((prevNewColors) => {
          const updatedNewColors = { ...prevNewColors };
  
          // If the button was previously selected, subtract its contribution
          if (newStates[index] === false) {
            if (prevColor === "#071ab6") {
              updatedNewColors.blue += index + 1;
            } else if (prevColor === "#eb0b0b") {
              updatedNewColors.red += index + 1;
            } else if (prevColor === "#32c10f") {
              updatedNewColors.green += index + 1;
            }
          }
  
          // If the button is now selected, add its contribution
          if (newStates[index] === true) {
            if (newColor === "#071ab6") {
              updatedNewColors.blue -= index + 1;
            } else if (newColor === "#eb0b0b") {
              updatedNewColors.red -= index + 1;
            } else if (newColor === "#32c10f") {
              updatedNewColors.green -= index + 1;
            }
          }
  
          return updatedNewColors;
        });
  
        return updatedColors;
      });
  
      return newStates;
    });
  
    setSelectedBtnCount((prevCount) =>
      click[index] ? prevCount - 1 : prevCount + 1
    );
  };
  
  
  
  const [displaySelectBtns, setDisplaySelectBtns] = useState(false)
  const handleSelectButtons = () => {
    setDisplaySelectBtns(true)
  }
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
            value={inputDisabled ? 0 : colors.red}
            onChange={handleChange}
            disabled={inputDisabled}
          />
          <label>Green :</label>
          <Input
            type="number"
            name="green"
            value={inputDisabled ? 0 : colors.green}
            onChange={handleChange}
            disabled={inputDisabled}
          />
          <label>Blue :</label>
          <Input
            type="number"
            name="blue"
            value={blueInputDisabled ? 0 : colors.blue}
            onChange={handleChange}
            disabled={blueInputDisabled}
          />
          <Button type="submit" variant="contained" color="secondary" sx={{ width: "fit-content" }} onClick={handleSelectButtons}>
            Submit
          </Button>
        </Box>
      </form>

      <Box sx={{ display: displaySelectBtns ? "flex" : "none", flexDirection: "row", gap: 2, flexWrap: "wrap" }}>
        {click.map((clicked, i) => (
          <Button
            key={i}
            onClick={() => handleClick(i)}
            variant="contained"
            style={{ backgroundColor: clicked ? buttonColors[i] : "#6d1b7b" }}
          >
            {/* {clicked ? "selected" : "Click Me"} */}
            {i+1}
          </Button>
        ))}
      </Box>

      <Box sx={{ marginTop: "20px" }}>
        <Typography variant="h4" component="h4">
          No of buttons selected : {selectedBtnCount}
        </Typography>
        <Typography variant="h4" component="h4">
          Red : {newColors.red}
        </Typography>
        <Typography variant="h4" component="h4">
          Green : {newColors.green}
        </Typography>
        <Typography variant="h4" component="h4">
          Blue : {newColors.blue}
        </Typography>
      </Box>

      {/* <Box sx={{ marginTop: "20px" }}>
        <Typography variant="h4" component="h4">
          The magic number : {selectedBtnCount - newColors.blue}
        </Typography>
      </Box> */}
    </div>
  );
}

export default Home;
