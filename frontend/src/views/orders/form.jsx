import { Box, Dialog, Grid } from "@mui/material";
import React from "react";
import {
  AutoComplete,
  Button,
  Paper,
  Select,
  TextField,
  Typography,
} from "src/components";
import { ProdutoModel } from "src/data";
import { handleChange } from "src/utils";

export default function OrderForm(props) {
  const { state, setState } = props;

  const [max, setMax] = React.useState(0);

  return (
    <Dialog open={props.open} onClose={props.onClose} PaperComponent="div">
      <Paper sx={{ p: 2, pl: 5, pr: 5 }}>
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
          {!state.id ? "Adicionando" : "Atualizando"}
          <Typography variant="h5" color="primary" bold sx={{ ml: 1 }}>
            Pedido
          </Typography>
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {" "}
            <AutoComplete
              getOptionLabel={"name"}
              valueKey="id"
              label="Produto"
              name="product"
              value={Number(state?.product)}
              onChange={(e, o) => {
                handleChange(e, setState);
                if (o) {
                  setState((old) => ({ ...old, un_price: o.un_price }));
                  setMax(Number(o.quantity));
                }
              }}
              model={ProdutoModel}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              type="number"
              name="quantity"
              disabled={max === 0}
              inputProps={{ max: max, min: 1 }}
              value={state?.quantity}
              onChange={(e) => handleChange(e, setState)}
              label="Quantidade"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="un_price"
              money
              disabled
              value={state?.un_price}
              onChange={(e) => handleChange(e, setState)}
              label="Preço"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              money
              disabled
              value={Number(state?.un_price) * Number(state?.quantity)}
              label="Preço Total"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="requester"
              value={state?.requester}
              onChange={(e) => handleChange(e, setState)}
              label="Solicitante"
            />
          </Grid>
          <Grid item xs={12} sm={9}>
            <TextField
              name="address"
              value={state?.address}
              onChange={(e) => handleChange(e, setState)}
              label="Rua"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              name="number"
              value={state?.number}
              onChange={(e) => handleChange(e, setState)}
              label="Número"
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              name="postal_code"
              value={state?.postal_code}
              onChange={(e) => handleChange(e, setState)}
              label="CEP"
              mask="99999999"
            />
          </Grid>
          <Grid item xs={12} sm={1}>
            <TextField
              name="uf"
              value={state?.uf}
              mask="aa"
              onChange={(e) => handleChange(e, setState)}
              label="UF"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="city"
              value={state?.city}
              onChange={(e) => handleChange(e, setState)}
              label="Município"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="district"
              value={state?.district}
              onChange={(e) => handleChange(e, setState)}
              label="Bairro"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="dispatcher"
              value={state?.dispatcher}
              onChange={(e) => handleChange(e, setState)}
              label="Solicitante"
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              name="status"
              value={state.status}
              onChange={(e) => handleChange(e, setState)}
              label="Status"
              options={[
                { label: "Pendente", value: 0 },
                { label: "Enviado", value: 1 },
                { label: "Recebido", value: 2 },
              ]}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button label="CANCELAR" variant="text" onClick={props.onClose} />
          <Button label="SALVAR" disabled={max === 0} onClick={props.onSave} />
        </Box>
      </Paper>
    </Dialog>
  );
}
