import React from "react";
import useSWR, { mutate } from "swr";

export function showMessage(
  mensagem: string,
  titulo: string = "Mensagem do Sistema",
  func?: any
) {
  //Exibe uma mensagem na tela
  mutate("dialog", {
    open: true,
    message: mensagem,
    title: titulo,
    type: 0,
    func: func,
  });
}

export function showConfirm(
  mensagem: string,
  titulo: string = "Mensagem do Sistema",
  func: any
) {
  //Exibe uma mensagem na tela
  mutate("dialog", {
    open: true,
    message: mensagem,
    title: titulo,
    type: 1,
    func: func,
  });
}

export function showInputDialog(
  mensagem: string,
  titulo: string = "Insira o Valor",
  func: any,
  input: any
) {
  //Exibe uma mensagem na tela
  mutate("dialog", {
    open: true,
    message: mensagem,
    title: titulo,
    type: 2,
    func: func,
    inputProps: input,
  });
}

export function useDebounce(defaultValue: any) {
  const [debounce, setDebounce] = React.useState(null);
  const [_timeout, _setTimeout] = React.useState<any>(null);

  React.useEffect(() => {
    const later = () => {
      setDebounce(defaultValue);
    };
    if (_timeout) {
      clearTimeout(_timeout);
    }
    const timeId = setTimeout(later, 500); //a verificar limitação
    _setTimeout(timeId);
  }, [defaultValue]);

  return debounce;
}

export function useDialog() {
  return useSWR("dialog");
}

export function closeMessage() {
  //Close message Dialog
  mutate("dialog", (dg: any) => ({
    ...dg,
    open: false,
  }));
}

export function errorObjectConvert(err: any) {
  //Converte o erro em um Array com as entradas.
  let message = err.response
    ? typeof err.response.data === "object"
      ? Object.entries(err.response.data)
      : ""
    : err.response.data;

  return message.map((m: any) => m[0] + ": " + m[1][0]).join("\n");
}

export function toBRL(value: number): string {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return formatter.format(value);
}

export const handleChange = (e: any, setState: any, conditional: any) => {
  const { name, value } = e.target;
  setState((_v) => ({
    ..._v,
    [name]: conditional ? conditional({ name: name, value: value }) : value,
  }));
};
