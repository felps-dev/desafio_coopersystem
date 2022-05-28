import { Box, styled } from "@mui/material";
import React from "react";

const StyledContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.paper.light,
  borderRadius: 20,
}));

export default function Paper({ children, ...props }) {
  return <StyledContainer {...props}>{children}</StyledContainer>;
}
