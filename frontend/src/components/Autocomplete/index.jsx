/* eslint-disable no-prototype-builtins */
/* eslint-disable react/display-name */
import { CircularProgress } from "@mui/material";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import ListSubheader from "@mui/material/ListSubheader";
import Popper from "@mui/material/Popper";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";
import * as React from "react";
import { VariableSizeList } from "react-window";
import { TextField } from "src/components";
import { useDebounce } from "src/utils";

const StyledAutoComplete = styled(Autocomplete)(() => ({
  "& .MuiAutocomplete-input": {
    padding: "6.5px 4px 2.5px 6px !important",
  },
}));

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: style.top + LISTBOX_PADDING,
  };

  if (dataSet.hasOwnProperty("group")) {
    return (
      <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    );
  }

  return (
    <Typography component="li" {...dataSet[0]} noWrap style={inlineStyle}>
      {dataSet[0].key}
    </Typography>
  );
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(
  props,
  ref
) {
  const { children, ...other } = props;
  const itemData = [];
  children.forEach((item) => {
    itemData.push(item);
    itemData.push(...(item.children || []));
  });

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
    noSsr: true,
  });

  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child) => {
    if (child.hasOwnProperty("group")) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

ListboxComponent.propTypes = {
  children: PropTypes.node,
};

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
});

export default function Virtualize({
  filter,
  model,
  value,
  params,
  getOptionLabel,
  valueKey,
  onChange,
  name,
  onInputChange,
  label,
  search_by,
  ...rest
}) {
  const [inputValue, setInputValue] = React.useState("");
  const [internalValue, setInternalValue] = React.useState(null);
  const debounce = useDebounce(inputValue);

  const { data: apiOptions } = model.useModel({
    id: value ? value : undefined,
    ...params,
    search: value ? undefined : debounce,
    page_size: 50,
  });

  React.useEffect(() => {
    if (apiOptions?.results) {
      apiOptions?.results.map((item) => {
        if (item[valueKey] === value) {
          setInputValue(item[getOptionLabel]);
          setInternalValue(item[getOptionLabel]);
        }
        /**
         * Isso é caso a gnt queira setar o valor do autocomplete automaticamente,
         * mas tem dado tanto bug que prefiro deixar como está e depois refazer,
         * vai ser mais fácil
         */
        // else if (value === 0) {
        //   setInputValue("");
        //   setInternalValue("");
        // }
        return null;
      });
    }
    // eslint-disable-next-line
  }, [value, apiOptions?.results]);

  const options =
    (filter ? apiOptions?.results?.filter(filter) : apiOptions?.results) || [];

  const memoUtil = React.useMemo(
    () => (
      <StyledAutoComplete
        id="virtualize-autocomplete"
        loading={!apiOptions}
        value={internalValue}
        inputValue={inputValue}
        fullWidth
        disableListWrap
        PopperComponent={StyledPopper}
        ListboxComponent={ListboxComponent}
        options={options}
        onChange={(event, value) => {
          setInternalValue(value ? value[getOptionLabel] : null);
          return onChange
            ? onChange(
                {
                  target: {
                    name: name,
                    value: value ? value[valueKey] : null,
                  },
                },
                value
              )
            : null;
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          if (onInputChange) {
            onInputChange(event, newInputValue);
          }
        }}
        getOptionLabel={(option) =>
          option === inputValue ? inputValue : option[getOptionLabel]
        }
        filterOptions={(options) => {
          if (search_by) {
            return options.filter((o) => {
              //If hit ok on any string on search_by, return true, else false.
              for (const s of search_by) {
                const reg = new RegExp(s, "i");
                if (String(o[s]).match(reg)) {
                  return true;
                }
              }
              return false;
            });
          } else {
            return options;
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            InputProps={{
              ...params.InputProps,
              // readOnly: readOnly ? readOnly : false,
              endAdornment: (
                <React.Fragment>
                  {!apiOptions ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
            {...rest}
          />
        )}
        renderOption={(props, option) => [
          props,
          { ...option, getOptionLabel: getOptionLabel },
        ]}
        isOptionEqualToValue={(option, value) =>
          option[getOptionLabel] === value
        }
        {...rest}
      />
    ),
    [options, value, model, inputValue, debounce, options.length]
  );

  return memoUtil;
}
