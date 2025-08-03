import React, { useState } from 'react';
import { Container, AppBar, Toolbar, Typography, IconButton, Tooltip } from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Routes, Route } from "react-router-dom";
import YieldForm from "./components/YieldForm";
import PredictionResults from "./components/PredictionResults";

export default function App({ mode, setMode }) {
  const [predictionData, setPredictionData] = useState({ predictedYield: null, topCrops: [] });

  return (
    <>
      <AppBar position="static" color="primary" elevation={2}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, userSelect: "none" }}>
            Crop Yield Recommendation
          </Typography>
          <Tooltip title={mode === "dark" ? "Switch to Light" : "Switch to Dark"}>
            <IconButton color="inherit" onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 6, mb: 4 }}>
        <Routes>
          <Route path="/" element={<YieldForm setPredictionData={setPredictionData} />} />
          <Route
            path="/results"
            element={
              <PredictionResults
                predictedYield={predictionData.predictedYield}
                topCrops={predictionData.topCrops}
              />
            }
          />
        </Routes>
      </Container>
    </>
  );
}









