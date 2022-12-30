import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loading() {
  return (
    <Box className={`m-auto h-7 w-7 my-10`}>
      <CircularProgress className="text-blue-600" />
    </Box>
  );
}
