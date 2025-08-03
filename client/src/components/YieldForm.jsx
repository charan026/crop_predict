import React, { useState } from "react";
import { Box, Button, Grid, Paper, TextField, Typography, Alert, Collapse } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const fields = [
  { name: "N", label: "Nitrogen (N)" },
  { name: "P", label: "Phosphorus (P)" },
  { name: "K", label: "Potassium (K)" },
  { name: "temperature", label: "Temperature (°C)" },
  { name: "humidity", label: "Humidity (%)" },
  { name: "ph", label: "Soil pH" },
  { name: "rainfall", label: "Rainfall (mm)" }
];

export default function YieldForm({ setPredictionData }) {
  const [formData, setFormData] = useState({
    N: "", P: "", K: "", temperature: "", humidity: "", ph: "", rainfall: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const nav = useNavigate();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post("http://127.0.0.1:5000/api/predict_top_crops", formData);
      setPredictionData({
        predictedYield: res.data.predicted_yield,
        topCrops: res.data.top_crops,
      });
      nav("/results");
    } catch (err) {
      setError(err.response?.data?.error || "Prediction failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2, background: "background.paper" }}>
      <Typography variant="h5" align="center" sx={{ mb: 2, fontWeight: 600, color: "primary.main" }}>
        Crop Yield Prediction
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {fields.map(field => (
            <Grid item xs={12} sm={6} key={field.name}>
              <TextField
                label={field.label}
                name={field.name}
                type="number"
                value={formData[field.name]}
                onChange={handleChange}
                fullWidth
                size="small"
                variant="outlined"
                required
                InputProps={{
                  inputProps: { min: 0 },
                  style: { background: "#fff", color: "#222", borderRadius: 6 }
                }}
                InputLabelProps={{
                  style: { color: "#1976d2" }
                }}
              />
            </Grid>
          ))}
        </Grid>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ mt: 3, py: 1, fontWeight: 'bold', fontSize: 17 }}
          type="submit"
        >
          {loading ? "Predicting..." : "Get Recommendations"}
        </Button>
        <Collapse in={!!error} sx={{ mt: 2 }}>
          <Alert severity="error">{error}</Alert>
        </Collapse>
      </Box>
    </Paper>
  );
}




