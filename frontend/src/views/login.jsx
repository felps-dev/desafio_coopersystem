import { Box, Grid, styled } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import { Button, Paper, PassField, TextField, Typography } from "../components";
import api from "../data/api";
import { handleChange, showMessage } from "../utils";

const StyledContainer = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  textAlign: "center",
}));

export default function Login() {
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    username: "",
    password: "",
  });

  const do_login = () => {
    api()
      .post("/login/", state)
      .then((res) => {
        localStorage.setItem("api_token", res.data.token);
        navigate("/internal/");
      })
      .catch(() => {
        showMessage(
          "Verifique suas credenciais e tente novamente.",
          "Erro ao fazer login"
        );
      });
  };

  return (
    <StyledContainer>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={3} xl={2}>
          <Paper sx={{ pl: 8, pr: 8, pt: 3, pb: 3 }}>
            <Typography
              bold
              variant="h3"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Bem{" "}
              <Typography variant="h3" color="primary" bold sx={{ ml: 1 }}>
                Vindo
              </Typography>
            </Typography>
            <Box sx={{ mt: 0, mb: 3 }}>
              <TextField
                name="username"
                value={state.username}
                onChange={(e) => handleChange(e, setState)}
                label="Usuário"
              />
              <PassField
                value={state.password}
                onChange={(e) => handleChange(e, setState)}
                name="password"
                sx={{ mt: 2 }}
                label="Senha"
              />
            </Box>
            <Button
              onClick={() => do_login()}
              label="LOGIN"
              sx={{ width: "100%", mb: 2 }}
            />
          </Paper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}
