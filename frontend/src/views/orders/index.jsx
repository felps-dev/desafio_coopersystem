import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Fab, IconButton } from "@mui/material";
import React from "react";
import { Table } from "src/components";
import { OrderModel } from "src/data";
import { errorObjectConvert, showConfirm, showMessage, toBRL } from "src/utils";

import OrderForm from "./form";

const initial_state = {
  quantity: 1,
  un_price: 0,
  requester: "",
  postal_code: "",
  uf: "",
  city: "",
  district: "",
  address: "",
  number: "",
  dispatcher: "",
  status: 0,
};

export default function OrderList() {
  const [page, setPage] = React.useState(1);
  const { data: orders, mutate: refresh } = OrderModel.useModel({
    page: page,
  });
  const [fopen, setFopen] = React.useState(false);
  const [formState, setFormState] = React.useState(initial_state);

  const open_add_order = () => {
    setFormState(initial_state);
    setFopen(true);
  };

  const open_edit_order = (data) => {
    setFormState(data);
    setFopen(true);
  };

  const on_save_order = () => {
    // eslint-disable-next-line no-unused-vars
    const { actions, ...data } = formState;
    OrderModel.save(data)
      .then(() => {
        setFopen(false);
        refresh();
      })
      .catch((err) => {
        showMessage(
          errorObjectConvert(err),
          "Erro ao salvar pedido, verifique os dados. "
        );
      });
  };

  const getActions = (row) => (
    <IconButton
      size="small"
      onClick={(e) => {
        e.stopPropagation();
        showConfirm(
          "Tem certeza que deseja deletar o pedido " + row.name + "?",
          "Mensagem de Confirmação",
          () => {
            OrderModel.delete(row.id)
              .then(() => {
                refresh();
              })
              .catch((err) => {
                showMessage(
                  errorObjectConvert(err),
                  "Erro ao excluir pedido, verifique os dados. "
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
        <OrderForm
          open={fopen}
          onClose={() => setFopen(false)}
          state={formState}
          setState={setFormState}
          onSave={on_save_order}
        />
        <Table
          sx={{ pb: 5 }}
          noPaper
          columns={[
            { label: "Código", accessor: "id" },
            { label: "Solicitante", accessor: "requester" },
            { label: "Produto", accessor: "product_name" },
            { label: "Quantidade", accessor: "quantity" },
            {
              label: "Status",
              accessor: (accessor) => {
                switch (accessor.status) {
                  case 0:
                    return "Pendente";
                  case 1:
                    return "Enviado";
                  case 2:
                    return "Recebido";
                  default:
                    return "Sem Status";
                }
              },
            },
            {
              label: "Total",
              accessor: (row) =>
                toBRL(Number(row.quantity) * Number(row.un_price)),
            },
            { label: "", accessor: "actions" },
          ]}
          rows={orders?.results.map((r) => ({
            ...r,
            actions: getActions(r),
          }))}
          page={page}
          setPage={setPage}
          pageCount={orders?.count}
          onRowClick={open_edit_order}
        />
      </Box>
      <Fab
        color="primary"
        sx={{ position: "absolute", right: 10, bottom: 10 }}
        onClick={open_add_order}
      >
        <AddIcon />
      </Fab>
    </>
  );
}
