import { Typography } from "@mui/material";
import React from "react";

export default function Text({ ...props }) {
  const { children } = props;
  return (
    <Typography
      {...props}
      sx={{
        ...props.sx,
        fontWeight: props.bold ? "bold" : props.sx?.fontWeight || "normal",
      }}
    >
      {children}
    </Typography>
  );
}
