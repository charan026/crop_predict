import { Table, TableBody, TableRow, TableCell, TableHead, Paper, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

export default function PredictionResults({ predictedYield, topCrops }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper elevation={2} sx={{
        mx: "auto", mt: 2, mb: 3, p: 4, borderRadius: 2, background: "background.paper"
      }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: "primary.main", textAlign: 'center' }}>
          Prediction Summary
        </Typography>
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography sx={{ fontSize: 20, color: "#1976d2", fontWeight: "bold" }}>
            Estimated Yield: {predictedYield ? `${predictedYield.toFixed(2)} tonnes/ha` : "N/A"}
          </Typography>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: "#222" }}>Rank</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#222" }}>Crop</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#222" }}>Confidence (%)</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#222" }}>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topCrops && topCrops.length > 0 ? (
              topCrops.map((crop, idx) => (
                <TableRow key={crop.name} sx={{ background: idx % 2 ? "#f5fafd" : "#fff" }}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#1976d2" }}>
                    {crop.name.charAt(0).toUpperCase() + crop.name.slice(1)}
                  </TableCell>
                  <TableCell>{(crop.probability * 100).toFixed(1)}</TableCell>
                  <TableCell>{crop.description}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No crop recommendations available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </motion.div>
  );
}




