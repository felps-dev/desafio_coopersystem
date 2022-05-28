import HelpIcon from "@mui/icons-material/Help";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  Tooltip,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const SelectStyled = styled(Select)(() => ({
  "& .MuiInputBase-input": {
    padding: "15px 14px !important",
  },
}));

const DefaultSelect = (props) => {
  const {
    onChange,
    label,
    options,
    value,
    name,
    disabled,
    variant,
    optVar,
    optVal,
    conditional,
    ...rest
  } = props;
  return (
    <Box>
      {/* <InputLabel sx={{ mb: 0.5 }}>{label}</InputLabel> */}
      <FormControl fullWidth variant={variant || "outlined"}>
        <InputLabel>{label}</InputLabel>
        <SelectStyled
          disabled={disabled}
          // MenuProps={{
          //   getContentAnchorEl: null,
          //   anchorOrigin: {
          //     vertical: 'bottom',
          //     horizontal: 'left',
          //   },
          // }}
          value={value}
          onChange={onChange}
          inputProps={{ name: name }}
          label={label}
          size="small"
          {...rest}
        >
          {options.map((option, index) =>
            option ? (
              option.tooltip ? (
                conditional ? (
                  conditional(option) ? (
                    <MenuItem
                      value={option[optVal ? optVal : "value"]}
                      key={index}
                    >
                      <Tooltip title={option.tooltip} arrow>
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {option[optVar ? optVar : "label"]}{" "}
                          <HelpIcon
                            style={{
                              fontSize: 16,
                              color: "rgba(0,0,0,0.75)",
                              marginLeft: 6,
                            }}
                          />
                        </div>
                      </Tooltip>
                    </MenuItem>
                  ) : null
                ) : (
                  <MenuItem
                    value={option[optVal ? optVal : "value"]}
                    key={index}
                  >
                    <Tooltip title={option.tooltip} arrow>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {option[optVar ? optVar : "label"]}{" "}
                        <HelpIcon
                          style={{
                            fontSize: 16,
                            color: "rgba(0,0,0,0.75)",
                            marginLeft: 6,
                          }}
                        />
                      </div>
                    </Tooltip>
                  </MenuItem>
                )
              ) : conditional ? (
                conditional(option) ? (
                  <MenuItem
                    value={option[optVal ? optVal : "value"]}
                    key={index}
                  >
                    {option[optVar ? optVar : "label"]}
                  </MenuItem>
                ) : null
              ) : (
                <MenuItem value={option[optVal ? optVal : "value"]} key={index}>
                  {option[optVar ? optVar : "label"]}
                </MenuItem>
              )
            ) : null
          )}
        </SelectStyled>
      </FormControl>
    </Box>
  );
};

DefaultSelect.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
};

export default DefaultSelect;
