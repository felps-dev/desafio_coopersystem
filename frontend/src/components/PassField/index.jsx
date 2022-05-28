import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const PREFIX = "InputPass";

const classes = {
  root: `${PREFIX}-root`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled("div")(() => ({}));

function InputPass(props) {
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Root>
      <TextField
        variant="standard"
        fullWidth
        id={`standard-adornment-password-${props.id}`}
        type={values.showPassword ? "text" : "password"}
        InputProps={{
          classes,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? (
                  <Visibility color="primary" />
                ) : (
                  <VisibilityOff color="primary" />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...props}
      />
    </Root>
  );
}

export default InputPass;
