import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import InputMask from "react-input-mask";
import IntlCurrencyInput from "react-intl-currency-input";

export default function NewTextField(props) {
  const {
    children,
    label,
    value,
    onChange,
    name,
    id,
    mask,
    maskChar,
    disabled,
    normalize,
    inputRef,
    readOnly,
    decimals,
  } = props;

  let inputProps = props.perc
    ? {
        startAdornment: <InputAdornment position="start"> % </InputAdornment>,
      }
    : {
        startAdornment: <InputAdornment position="start"> R$ </InputAdornment>,
      };

  const currencyConfig = {
    locale: "pt-BR",
    formats: {
      number: {
        BRL: {
          style: "decimal",
          currency: "BRL",
          minimumFractionDigits: 2,
          maximumFractionDigits: decimals ? decimals : 2,
        },
      },
    },
  };

  if (props.money || props.perc) {
    return (
      <TextField
        {...props}
        InputProps={{
          separator: ".",
          inputComponent: IntlCurrencyInput,
          readOnly: readOnly ? true : false,
          ...inputProps,
        }}
        inputProps={{
          currency: "BRL",
          config: currencyConfig,
        }}
        onChange={(e, v) =>
          props.onChange({
            target: {
              name: props.name,
              value: v,
            },
          })
        }
        variant="standard"
        fullWidth
        id={props.name}
      />
    );
  } else {
    if (mask) {
      return (
        <InputMask
          onChange={(e) =>
            normalize
              ? onChange({
                  target: {
                    name: e.target.name,
                    value: e.target.value.replaceAll(normalize, ""),
                  },
                })
              : onChange(e)
          }
          mask={mask}
          maskChar={maskChar ? maskChar : ""}
          disabled={disabled ? true : false}
          value={value}
        >
          {() => (
            <TextField
              inputRef={inputRef}
              label={label || children}
              disabled={disabled ? true : false}
              fullWidth
              name={name}
              variant={props.variant ? props.variant : "standard"}
              id={id || "custom-text-field"}
              value={value}
              InputProps={{
                readOnly: readOnly ? true : false,
              }}
            />
          )}
        </InputMask>
      );
    } else {
      return (
        <TextField
          InputProps={{
            readOnly: readOnly ? true : false,
            ...props.InputProps,
          }}
          {...props}
          variant={props.variant ? props.variant : "standard"}
          fullWidth
          id={props.name}
        />
      );
    }
  }
}
