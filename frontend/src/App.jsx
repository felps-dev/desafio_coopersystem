import "./App.css";

import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Dialog } from "./components";
import DefaultTheme from "./theme.js";
import { closeMessage, useDialog } from "./utils";
import Internal from "./views/internal";
import Login from "./views/login";

const StyledContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.main,
  height: "100vh",
}));

function App() {
  const theme = React.useMemo(() => createTheme(DefaultTheme));
  const { data: dialog } = useDialog();
  return (
    <StyledEngineProvider>
      <ThemeProvider theme={theme}>
        <StyledContainer>
          <BrowserRouter>
            <Routes>
              <Route path="/auth/*" element={<Login />} />
              <Route path="/internal/*" element={<Internal />} />
              <Route path="*" element={<Navigate to="/auth/" />} />
            </Routes>
            <Dialog
              message={dialog?.message}
              title={dialog?.title}
              open={dialog?.open}
              handleClose={closeMessage}
              setConfirm={dialog?.func}
              type={dialog?.type}
              inputProps={dialog?.inputProps}
            />
          </BrowserRouter>
        </StyledContainer>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
