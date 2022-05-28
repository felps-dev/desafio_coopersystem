import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";

import PaginationComponent from "./pagination";

const BFTable = (props) => {
  // const classes = useStyles();
  const {
    onRowClick,
    columns,
    rows,
    noPaper,
    child,
    checkbox,
    cellStyle,
    headerStyle,
    father,
    pageCount,
    page,
    setPage,
  } = props;
  const [expanded, setExpanded] = useState([]);
  const checkBoxState = checkbox?.state || [];

  function isExpanded(index) {
    return expanded?.find((w) => w === Number(index)) >= 0 ? true : false;
  }

  function toggleExpanded(index) {
    if (isExpanded(index)) {
      setExpanded(expanded.filter((w) => w !== index));
    } else {
      setExpanded([...(expanded || []), index]);
    }
  }

  const isSelected = (id) =>
    checkBoxState.find((x) => x.id === id) ? true : false;

  const onSelectAllClick = (event) => {
    if (event.target.checked) {
      const _temp = [...checkBoxState];
      const newSelecteds = rows.map((n) => n);
      const _temp2 = [..._temp, ...newSelecteds].filter(
        (v, i, a) =>
          a.findIndex(
            (t) =>
              t[checkbox.key ? checkbox.key : "id"] ===
              v[checkbox.key ? checkbox.key : "id"]
          ) === i
      );
      checkbox.setState(_temp2);
      return;
    }
    checkbox.setState([]);
  };
  const handleCheck = (event, row) => {
    const _temp = [...checkBoxState];
    let index = _temp.findIndex(
      (x) =>
        x[checkbox.key ? checkbox.key : "id"] ===
        row[checkbox.key ? checkbox.key : "id"]
    );
    if (index !== -1) {
      _temp.splice(index, 1);
    } else {
      _temp.push(row);
    }
    checkbox.setState([..._temp]);
  };

  return (
    <Box sx={props.sx}>
      <TableContainer
        component={noPaper ? "div" : Paper}
        style={{
          paddingLeft: (props.childLevel || 0) * 60,
          backgroundColor: props.childLevel > 0 ? "#F5F5F5" : undefined,
        }}
      >
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              {child && <TableCell />}
              {checkbox ? (
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      checkBoxState.length > 0 &&
                      checkBoxState.length < rows.length
                    }
                    checked={
                      rows.length > 0 && checkBoxState.length === rows.length
                    }
                    onChange={onSelectAllClick}
                  />
                </TableCell>
              ) : null}
              {columns?.map((col, k) => {
                if (col.renderHeader) return col.renderHeader(col);
                return (
                  <TableCell
                    key={k}
                    style={{
                      ...headerStyle,
                      ...col.hstyle,
                      width: col.width,
                    }}
                  >
                    {col.label || col.Header}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rows || []).map((row, krow) => {
              const isItemSelected = isSelected(row.id);
              const isSingleSelected = props.singleSelected === krow;
              return (
                <>
                  <TableRow
                    hover
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onRowClick) onRowClick(row, krow);
                    }}
                    key={krow}
                    sx={
                      isSingleSelected
                        ? (theme) => ({
                            bgcolor: theme.palette.paper[theme.palette.mode],
                          })
                        : {}
                    }
                  >
                    {child && (
                      <TableCell style={{ borderBottom: "none", width: 5 }}>
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpanded(krow);
                          }}
                          style={{ magin: 0, padding: 5 }}
                          size="large"
                        >
                          {isExpanded(krow) ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                      </TableCell>
                    )}

                    {checkbox ? (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onChange={(event) => handleCheck(event, row)}
                        />
                      </TableCell>
                    ) : null}
                    {columns.map((col, kcol) => (
                      <TableCell
                        key={kcol}
                        style={{
                          ...cellStyle,
                          ...col.style,
                          maxWidth: col.maxWidth,
                          borderBottomStyle: child ? "none" : "solid",
                        }}
                        width={col.width}
                        align={col.align}
                        sx={
                          isSingleSelected
                            ? (theme) => ({
                                color:
                                  theme.palette.secondary[theme.palette.mode],
                                fontWeight: "bold",
                              })
                            : {}
                        }
                      >
                        {col.input
                          ? typeof col.input.showInput === "function" &&
                            !col.input?.showInput(row) &&
                            (typeof col.accessor === "function"
                              ? col.accessor(row, kcol, krow)
                              : row[col.accessor])
                          : typeof col.accessor === "function"
                          ? col.accessor(row, kcol, krow, father)
                          : row[col.accessor]}
                      </TableCell>
                    ))}
                  </TableRow>
                  {child && (
                    <TableRow>
                      <TableCell
                        colSpan={String(columns.length + 1)}
                        style={{ padding: 0 }}
                      >
                        <Collapse in={isExpanded(krow)}>
                          <BFTable
                            {...child}
                            rows={
                              child?.field ? row[child?.field] : child.rows(row)
                            }
                            father={row}
                            childLevel={(props.childLevel || 0) + 1}
                            columns={child?.columns}
                            noPaper
                          />
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {page ? (
        <Box
          display="flex"
          mt={1}
          style={{ width: "100%", justifyContent: "center" }}
        >
          <PaginationComponent
            setPage={setPage}
            page={page}
            count={pageCount}
            pageSize={10}
          />
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

BFTable.propTypes = {
  onRowClick: PropTypes.func,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  setRows: PropTypes.func,
  MobileComponent: PropTypes.elementType,
  noPaper: PropTypes.bool,
  child: PropTypes.shape({
    field: PropTypes.string,
    rows: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.object),
      PropTypes.func,
    ]),
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
  father: PropTypes.object,
  checkbox: PropTypes.shape({
    key: PropTypes.string,
    setState: PropTypes.func,
    state: PropTypes.array,
  }),
  singleSelected: PropTypes.number,
  cellStyle: PropTypes.object,
  headerStyle: PropTypes.object,
  childLevel: PropTypes.number,
  page: PropTypes.number,
  pageCount: PropTypes.number,
  setPage: PropTypes.func,
};

export default BFTable;
