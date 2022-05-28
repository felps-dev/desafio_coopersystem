import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Fab, IconButton } from "@mui/material";
import React from "react";
import { Table } from "src/components";
import { ProdutoModel } from "src/data";
import { errorObjectConvert, showConfirm, showMessage, toBRL } from "src/utils";

import ProductForm from "./form";

const initial_state = {
  id: undefined,
  name: "",
  quantity: "",
  un_price: 0,
};

export default function ProductList() {
  const [page, setPage] = React.useState(1);
  const { data: products, mutate: refresh } = ProdutoModel.useModel({
    page: page,
  });
  const [fopen, setFopen] = React.useState(false);
  const [formState, setFormState] = React.useState(initial_state);

  const open_add_product = () => {
    setFormState(initial_state);
    setFopen(true);
  };

  const open_edit_product = (data) => {
    setFormState(data);
    setFopen(true);
  };

  const on_save_product = () => {
    // eslint-disable-next-line no-unused-vars
    const { actions, ...data } = formState;
    ProdutoModel.save(data)
      .then(() => {
        setFopen(false);
        refresh();
      })
      .catch((err) => {
        showMessage(
          errorObjectConvert(err),
          "Erro ao salvar produto, verifique os dados. "
        );
      });
  };

  const getActions = (row) => (
    <IconButton
      size="small"
      onClick={(e) => {
        e.stopPropagation();
        showConfirm(
          "Tem certeza que deseja deletar o produto " + row.name + "?",
          "Mensagem de Confirmação",
          () => {
            ProdutoModel.delete(row.id)
              .then(() => {
                refresh();
              })
              .catch((err) => {
                showMessage(
                  errorObjectConvert(err),
                  "Erro ao excluir produto, verifique os dados. "
                );
              });
          }
        );
      }}
    >
      <DeleteIcon />
    </IconButton>
  );

  return (
    <>
      <Box sx={{ height: "100%", position: "relative" }}>
        <ProductForm
          open={fopen}
          onClose={() => setFopen(false)}
          state={formState}
          setState={setFormState}
          onSave={on_save_product}
        />
        <Table
          sx={{ pb: 5 }}
          noPaper
          columns={[
            { label: "Código", accessor: "id" },
            { label: "Nome", accessor: "name" },
            { label: "Quantidade", accessor: "quantity" },
            { label: "Preço Un.", accessor: (row) => toBRL(row.un_price) },
            { label: "", accessor: "actions" },
          ]}
          rows={products?.results.map((r) => ({
            ...r,
            actions: getActions(r),
          }))}
          page={page}
          setPage={setPage}
          pageCount={products?.count}
          onRowClick={open_edit_product}
        />
      </Box>
      <Fab
        color="primary"
        sx={{ position: "absolute", right: 10, bottom: 10 }}
        onClick={open_add_product}
      >
        <AddIcon />
      </Fab>
    </>
  );
}
