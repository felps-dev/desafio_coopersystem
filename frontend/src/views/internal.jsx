import { Box, Grid, styled, Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../assets/logo.png";
import { Button, Paper, Typography } from "../components";
import OrderList from "./orders";
import ProductList from "./products";

const StyledContainer = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  textAlign: "center",
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ height: "100%", width: "100%" }}
    >
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Internal() {
  const [tab, setTab] = React.useState(0);
  const navigate = useNavigate();

  const do_logout = () => {
    localStorage.removeItem("api_token");
    navigate("/");
  };

  return (
    <StyledContainer>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={8} lg={6} xl={5}>
          <img src={Logo} alt="Logo" />
          <Typography
            bold
            sx={{ mt: 2, mb: 2 }}
            variant="h5"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Desafio{" "}
            <Typography variant="h5" color="primary" bold sx={{ ml: 1 }}>
              Coopersystem
            </Typography>
          </Typography>
          <Paper sx={{ minHeight: 300, position: "relative" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={tab}
                onChange={(e, v) => setTab(v)}
                variant="fullWidth"
              >
                <Tab label="PRODUTOS" {...a11yProps(0)} />
                <Tab label="PEDIDOS" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={tab} index={0}>
              <ProductList />
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <OrderList />
            </TabPanel>
          </Paper>
          <Box>
            <Button
              sx={{ mt: 2 }}
              label="SAIR / LOGOUT"
              onClick={() => do_logout()}
            />
          </Box>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}
