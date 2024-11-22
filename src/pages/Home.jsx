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
      red: 0,
      green: 0,
      blue: 0,
    };
    if (colors.red === 0 && colors.green === 0) {
      updatedColors.blue = colors.blue
    }
    else {
      updatedColors.red = colors.red;
      updatedColors.green = colors.green;
    }
    setNewColors(updatedColors);
    setColors(updatedColors)
    // setIsDisabled(true)
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
    console.log("Clicked button index",index+1);
    
    setClick((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];

      return newStates;
    });

    setButtonColors((prevColors) => {
      // const updatedColors = {...selectedBtnColors}
      // console.log();
      
      const updateColors = [...prevColors];
      updateColors[index] = getRandomColors();
      console.log("updateColors", updateColors[index]);
      setNewColors((prevNewColors) => {
        console.log("click[index]", click[index])
        const updatedNewColors = {...prevNewColors}
        if(updateColors[index] === "#071ab6"){
          updatedNewColors.blue = click[index] ?(updatedNewColors.blue +(index + 1)):(updatedNewColors.blue - (index+1))
        }
        else if (updateColors[index] === "#eb0b0b"){
          updatedNewColors.red = click[index] ?(updatedNewColors.red +(index+1)) :(updatedNewColors.red -(index+1))
        }
        else if (updateColors[index]=== "#32c10f"){
          updatedNewColors.green = click[index] ?(updatedNewColors.green +(index+1) ):(updatedNewColors.green -(index +1))
        }
        console.log("Updated New Colors", updatedNewColors);
        return updatedNewColors;
      })
      
      return updateColors;
      
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
