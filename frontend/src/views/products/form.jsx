import { Box, Dialog } from "@mui/material";
import React from "react";
import { Button, Paper, TextField, Typography } from "src/components";
import { handleChange } from "src/utils";

export default function ProductForm(props) {
  const { state, setState } = props;

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
            Produto
          </Typography>
        </Typography>
        <TextField
          name="name"
          value={state?.name}
          onChange={(e) => handleChange(e, setState)}
          label="Nome do Produto"
        />
        <TextField
          name="un_price"
          sx={{ mt: 2 }}
          money
          value={state?.un_price}
          onChange={(e) => handleChange(e, setState)}
          label="Preço"
        />
        <TextField
          type="number"
          name="quantity"
          value={state?.quantity}
          sx={{ mt: 2 }}
          onChange={(e) => handleChange(e, setState)}
          label="Quantidade em estoque"
        />
        <TextField
          name="status"
          sx={{ mt: 2, mb: 3 }}
          value={state?.status === 0 ? "Indisponível" : "Disponível"}
          label="Status"
          disabled
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button label="CANCELAR" variant="text" onClick={props.onClose} />
          <Button label="SALVAR" onClick={props.onSave} />
        </Box>
      </Paper>
    </Dialog>
  );
}
