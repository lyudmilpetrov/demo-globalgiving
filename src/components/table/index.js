import React, {
  memo,
  useState,
  useEffect,
  Fragment,
  useCallback,
  useReducer,
} from "react";
import { ThemeProvider, styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";
import TableSortLabel from "@mui/material/TableSortLabel";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import Button from "@mui/material/Button";
import { isObjectEmpty } from "app-helpers";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import Link from "@mui/material/Link";
import UndoIcon from "@mui/icons-material/Undo";
import Autocomplete from "@mui/material/Autocomplete";
import FilterListIcon from "@mui/icons-material/FilterList";
import FileDownloadSharpIcon from "@mui/icons-material/FileDownloadSharp";
import Stack from "@mui/material/Stack";
import { visuallyHidden } from "@mui/utils";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const descendingComparator = (a, b, orderBy) => {
  if (orderBy === "") {
    return 0;
  } else {
    if (typeof a[orderBy] !== "object") {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
    } else {
      if (b[orderBy]?.id < a[orderBy]?.id) {
        return -1;
      }
      if (b[orderBy]?.id > a[orderBy]?.id) {
        return 1;
      }
      return 0;
    }
  }
};
const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};
const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};
const EnhancedTableToolbar = (props) => {
  return (
    <Toolbar sx={{ justifyContent: "flex-end" }}>
      {props.excelDownload ? (
        <Stack direction="row" spacing={3} sx={{ flexGrow: 1 }}>
          <Tooltip title="Export to excel">
            <Button
              sx={{
                marginRight: "10px",
                align: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
              size="small"
              variant="outlined"
              color="primary"
              startIcon={<FileDownloadSharpIcon />}
              onClick={() => {
                props.onExcelExport();
              }}
            ></Button>
          </Tooltip>
        </Stack>
      ) : (
        <span></span>
      )}
      <Stack direction="row" spacing={3} sx={{ justifyContent: "flex-end" }}>
        <Tooltip title="Clear">
          <Button
            sx={{
              marginRight: "10px",
              align: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
            size="small"
            variant="outlined"
            color="primary"
            startIcon={<ClearSharpIcon />}
            onClick={() => {
              props.onClearClick();
            }}
          ></Button>
        </Tooltip>
        <Tooltip title="Referesh" sx={{ marginRight: "10px" }}>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            align="left"
            startIcon={<UndoIcon />}
            onClick={() => {
              props.onRefreshClick();
            }}
          ></Button>
        </Tooltip>
        <Tooltip title="Search">
          <Button
            size="small"
            variant="outlined"
            color="primary"
            startIcon={<SearchSharpIcon />}
            onClick={() => {
              props.onSearchClick();
            }}
          ></Button>
        </Tooltip>
      </Stack>
    </Toolbar>
  );
};
const EnhancedTableHead = (props) => {
  const {
    order,
    orderBy,
    onRequestSort,
    headersData,
    onButtonClickLable,
    counter,
    browser,
  } = props;
  const objRefs = {};
  const objVals = {};
  let tagArr = document.getElementsByTagName("input");
  for (let i = 0; i < tagArr.length; i++) {
    tagArr[i].autocomplete = browser + "-off";
  }
  const [value0, setValue0] = useState(null);
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);
  const [value4, setValue4] = useState(null);
  const [value5, setValue5] = useState(null);
  const [value6, setValue6] = useState(null);
  const [value7, setValue7] = useState(null);
  const [value8, setValue8] = useState(null);
  const [value9, setValue9] = useState(null);
  const [value10, setValue10] = useState(null);
  const [value11, setValue11] = useState(null);
  const [value12, setValue12] = useState(null);
  const [value13, setValue13] = useState(null);
  const [value14, setValue14] = useState(null);
  const [value15, setValue15] = useState(null);
  const [value16, setValue16] = useState(null);
  const [inputValue0, setInputValue0] = useState("");
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputValue3, setInputValue3] = useState("");
  const [inputValue4, setInputValue4] = useState("");
  const [inputValue5, setInputValue5] = useState("");
  const [inputValue6, setInputValue6] = useState("");
  const [inputValue7, setInputValue7] = useState("");
  const [inputValue8, setInputValue8] = useState("");
  const [inputValue9, setInputValue9] = useState("");
  const [inputValue10, setInputValue10] = useState("");
  const [inputValue11, setInputValue11] = useState("");
  const [inputValue12, setInputValue12] = useState("");
  const [inputValue13, setInputValue13] = useState("");
  const [inputValue14, setInputValue14] = useState("");
  const [inputValue15, setInputValue15] = useState("");
  const [inputValue16, setInputValue16] = useState("");

  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const getUniqueValues = (key, data) => {
    let unique;
    if (typeof data[0][key] !== "object") {
      unique = [...new Set(data.map((item) => item[key]))];
    } else {
      unique = [...new Set(data.map((item) => item[key]?.id))];
    }
    const filteredArr = unique.filter(function (elem) {
      return elem !== undefined && elem !== "";
    });
    return filteredArr;
  };
  useEffect(() => {
    forceUpdate();
  }, [props]);
  useEffect(() => {
    clearSections();
  }, [counter]);
  const clearSections = () => {
    headersData.map((x, i) => {
      switch (i) {
        case 0:
          setValue0(null);
          setInputValue0("");
          break;
        case 1:
          setValue1(null);
          setInputValue1("");
          break;
        case 2:
          setValue2(null);
          setInputValue2("");
          break;
        case 3:
          setValue3(null);
          setInputValue3("");
          break;
        case 4:
          setValue4(null);
          setInputValue4("");
          break;
        case 5:
          setValue5(null);
          setInputValue5("");
          break;
        case 6:
          setValue6(null);
          setInputValue6("");
          break;
        case 7:
          setValue7(null);
          setInputValue7("");
          break;
        case 8:
          setValue8(null);
          setInputValue8("");
          break;
        case 9:
          setValue9(null);
          setInputValue9("");
          break;
        case 10:
          setValue10(null);
          setInputValue10("");
          break;
        case 11:
          setValue11(null);
          setInputValue11("");
          break;
        case 12:
          setValue12(null);
          setInputValue12("");
          break;
        case 13:
          setValue13(null);
          setInputValue13("");
          break;
        case 14:
          setValue14(null);
          setInputValue14("");
          break;
        case 15:
          setValue15(null);
          setInputValue15("");
          break;
        case 16:
          setValue16(null);
          setInputValue16("");
          break;
        default:
      }
    });
  };
  const setValue = (v, i) => {
    switch (+i) {
      case 0:
        setValue0(v);
        break;
      case 1:
        setValue1(v);
        break;
      case 2:
        setValue2(v);
        break;
      case 3:
        setValue3(v);
        break;
      case 4:
        setValue4(v);
        break;
      case 5:
        setValue5(v);
        break;
      case 6:
        setValue6(v);
        break;
      case 7:
        setValue7(v);
        break;
      case 8:
        setValue8(v);
        break;
      case 9:
        setValue9(v);
        break;
      case 10:
        setValue10(v);
        break;
      case 11:
        setValue11(v);
        break;
      case 12:
        setValue12(v);
        break;
      case 13:
        setValue13(v);
        break;
      case 14:
        setValue14(v);
        break;
      case 15:
        setValue15(v);
        break;
      case 16:
        setValue16(v);
        break;
      default:
        break;
    }
  };
  const setInputValue = (v, i, id) => {
    props.onChangeInSearch(v, id);
    switch (+i) {
      case 0:
        setInputValue0(v);
        break;
      case 1:
        setInputValue1(v);
        break;
      case 2:
        setInputValue2(v);
        break;
      case 3:
        setInputValue3(v);
        break;
      case 4:
        setInputValue4(v);
        break;
      case 5:
        setInputValue5(v);
        break;
      case 6:
        setInputValue6(v);
        break;
      case 7:
        setInputValue7(v);
        break;
      case 8:
        setInputValue8(v);
        break;
      case 9:
        setInputValue9(v);
        break;
      case 10:
        setInputValue10(v);
        break;
      case 11:
        setInputValue11(v);
        break;
      case 12:
        setInputValue12(v);
        break;
      case 13:
        setInputValue13(v);
        break;
      case 14:
        setInputValue14(v);
        break;
      case 15:
        setInputValue15(v);
        break;
      case 16:
        setInputValue16(v);
        break;
      default:
        break;
    }
  };
  const getValue = (i) => {
    switch (+i) {
      case 0:
        return value0;
      case 1:
        return value1;
      case 2:
        return value2;
      case 3:
        return value3;
      case 4:
        return value4;
      case 5:
        return value5;
      case 6:
        return value6;
      case 7:
        return value7;
      case 8:
        return value8;
      case 9:
        return value9;
      case 10:
        return value10;
      case 11:
        return value11;
      case 12:
        return value12;
      case 13:
        return value13;
      case 14:
        return value14;
      case 15:
        return value15;
      case 16:
        return value16;
      default:
    }
  };
  const getInputValue = (i) => {
    switch (+i) {
      case 0:
        return inputValue0;
      case 1:
        return inputValue1;
      case 2:
        return inputValue2;
      case 3:
        return inputValue3;
      case 4:
        return inputValue4;
      case 5:
        return inputValue5;
      case 6:
        return inputValue6;
      case 7:
        return inputValue7;
      case 8:
        return inputValue8;
      case 9:
        return inputValue9;
      case 10:
        return inputValue10;
      case 11:
        return inputValue11;
      case 12:
        return inputValue12;
      case 13:
        return inputValue13;
      case 14:
        return inputValue14;
      case 15:
        return inputValue15;
      case 16:
        return inputValue16;
      default:
    }
  };
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        <TableCell style={{ width: "0%" }}></TableCell>
        {headersData.map((headCell, i) => (
          <TableCell key={headCell.id}>
            <Autocomplete
              freeSolo
              selectOnFocus={true}
              clearOnBlur={true}
              autoComplete={true}
              autoHighlight={true}
              fullWidth={true}
              value={getValue(i)}
              onChange={(event, newValue) => {
                setValue(newValue, i);
              }}
              inputValue={getInputValue(i)}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue, i, headCell?.id);
              }}
              id={"search1" + headCell.id}
              options={getUniqueValues(headCell?.id, props?.rows)}
              sx={{ width: 120 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  id={"search2" + headCell?.id}
                  variant="outlined"
                  fullWidth={true}
                  margin="dense"
                  size="small"
                  label={headCell?.id}
                />
              )}
            />
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        {onButtonClickLable.length >= 1 ? (
          <TableCell style={{ width: "0%" }}></TableCell>
        ) : (
          <TableCell style={{ width: "0%" }}></TableCell>
        )}
        {headersData.map((headCell, index) => (
          <TableCell
            sx={{ fontWeight: 600 }}
            variant="head"
            key={headCell.id.toString() + index.toString()}
            align={headCell.numeric ? "right" : "left"}
            padding={"normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
const EnhancedTable = (props) => {
  const [clearCounter, setClearCounter] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [rowIDClicked, setRowIDClicked] = useState(null);
  const [selected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [showExcelDownload, setShowExcelDownload] = useState(false);
  const [denseLable, setDenseLable] = useState("Spread");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // Injected info
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  const [rowSearch, setRowSearch] = useState(null);
  const [rowId, setRowId] = useState("idr");
  const [title, setTitle] = useState("Title not provided");
  const [searchClicked, setSearchClicked] = useState(false);
  const [onButtonClickLable, setOnButtonClickLable] = useState("");
  const [numSelected, setNumSelected] = useState(-1);
  const [rowCount, setRowCount] = useState(-1);

  useEffect(() => {
    if (props.onButtonClickLable !== undefined) {
      setOnButtonClickLable(props.onButtonClickLable);
    }
    if (typeof props.onExcelExportClick !== "undefined") {
      setShowExcelDownload(true);
    }
  }, []);
  const handleRequestSort = useCallback((event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  });
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  });
  const handleChangeDense = useCallback((event) => {
    setDense(event.target.checked);
    if (!dense) {
      setDenseLable("Spread");
    } else {
      setDenseLable("Dense");
    }
  });
  const isSelected = (name) => selected.indexOf(name) !== -1;
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const handleChangeInSearch = async (value, key) => {
    let x = { ...rowSearch };
    x[key] = value;
    setRowSearch(x);
  };
  const handleSearchClick = () => {
    if (isObjectEmpty(rowSearch) !== true) {
      setSearchClicked(true);
      props.onSearchClick(rowSearch);
    }
  };
  const handleRefreshClick = () => {
    setRowSearch({});
    props.onRefreshClick();
  };
  const handleClearClick = () => {
    let x = clearCounter + 1;
    setClearCounter(x);
  };
  const handleExcelExportClick = () => {
    if (showExcelDownload) {
      props.onExcelExportClick();
    }
  };
  useEffect(() => {
    setPage(0);
    // Some initialization logic here
    if (props.rowId !== undefined) {
      if (props.rowId.length >= 1) {
        setRowId(props.rowId);
      }
    }
    if (props.data !== undefined) {
      if (props.data.length > 0) {
        let keys = Object.keys(props.data[0]);
        let newKeys = keys
          .filter((value) => {
            return value !== rowId;
          })
          .filter((value) => {
            return value !== "isSelected";
          });
        let newHeaders = [];
        newKeys.map((v) => {
          let objHeader = {
            id: v,
            numeric: false,
            disablePadding: true,
            label: v,
          };
          newHeaders.push(objHeader);
          return v;
        });
        // if(props.onButtonClick !== null){
        //   newHeaders.push(props.onButtonClickLable);
        // }
        setHeaders(newHeaders);
        setRows(props.data);
        setRowCount(props.data.length);
        //setRowSearch(props.data[0]);
      }
    }
    if (props.title !== undefined) {
      if (props.title.length >= 1) {
        if (props.title !== title) {
          setRowSearch({});
        }
        setTitle(props.title);
      }
    }
    setSearchClicked(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data, props.rowId, props.title, rowId]);
  useEffect(() => {
    setRowIDClicked(+props?.onButtonClickObject?.Id ?? null);
  }, [props.onButtonClickObject]);
  const handleButtonFunctionalityClick = useCallback(
    (row, event) => {
      isSelected(row.idr);
      if (typeof row.isSelected !== "undefined") {
        if (row.isSelected) {
          row.isSelected = false;
        } else {
          row.isSelected = true;
        }
      }
    },
    [rowIDClicked]
  );
  if (props.data !== undefined) {
    if (rows.length > 0 && props.data.length > 0) {
      return (
        <Fragment>
          <Paper
            elevation={12}
            sx={{ overflow: "hidden", width: "100%", marginTop: "10px" }}
          >
            <EnhancedTableToolbar
              numSelected={selected.length}
              title={title}
              onSearchClick={handleSearchClick}
              onRefreshClick={handleRefreshClick}
              onClearClick={handleClearClick}
              onExcelExport={handleExcelExportClick}
              excelDownload={showExcelDownload}
              theme={props?.theme}
            />
            <TableContainer sx={{ minWidth: "100%" }}>
              <Table
                stickyHeader
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
                aria-label="enhanced table"
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                  headersData={headers}
                  onChangeInSearch={handleChangeInSearch}
                  onButtonClickLable={onButtonClickLable}
                  theme={props?.theme}
                  counter={clearCounter}
                  rows={rows}
                  browser={props?.browser}
                />
                {!searchClicked ? (
                  <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.idr);
                        return (
                          <StyledTableRow
                            hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.idr.toString() + index.toString() + "r"}
                            selected={isItemSelected}
                          >
                            {onButtonClickLable.length >= 1 ? (
                              onButtonClickLable.includes("Add ") === false ? (
                                <StyledTableCell
                                  key={row.idr + headers.length + "rcF"}
                                  align="right"
                                >
                                  {+rowIDClicked !== +row?.id ? (
                                    <Button
                                      size="small"
                                      variant="outlined"
                                      color="primary"
                                      onClick={(event) => {
                                        props.onButtonClick(row, event);
                                        handleButtonFunctionalityClick(
                                          row,
                                          event
                                        );
                                      }}
                                    >
                                      {props?.onButtonClickLable}
                                    </Button>
                                  ) : (
                                    <Skeleton animation="wave" />
                                  )}
                                </StyledTableCell>
                              ) : (
                                <TableCell padding="checkbox">
                                  <Checkbox
                                    color="primary"
                                    // checked={row.isSelected}
                                    inputProps={{
                                      "aria-labelledby": "Add",
                                    }}
                                    onClick={(event) => {
                                      handleButtonFunctionalityClick(
                                        row,
                                        event
                                      );
                                      props.onButtonClick(row, event);
                                    }}
                                  />
                                </TableCell>
                              )
                            ) : (
                              <StyledTableCell
                                style={{ width: "0%" }}
                              ></StyledTableCell>
                            )}
                            {headers.map((x, i) => {
                              let v = row[x.id];
                              if (
                                Object.prototype.toString.call(v) !==
                                "[object Object]"
                              ) {
                                return (
                                  <StyledTableCell
                                    onClick={(event) => {
                                      props.onRowClick(row, event, false, v);
                                    }}
                                    key={
                                      row.idr.toString() + i.toString() + "rc"
                                    }
                                    align={x.align}
                                  >
                                    {v}
                                  </StyledTableCell>
                                );
                              } else {
                                return (
                                  <StyledTableCell
                                    onClick={(event) => {
                                      props.onRowClick(row, event, true, v);
                                    }}
                                    key={
                                      row.idr.toString() + i.toString() + "rc"
                                    }
                                    align={x.align}
                                  >
                                    <Link variant="body2">{v.id}</Link>
                                  </StyledTableCell>
                                );
                              }
                            })}
                          </StyledTableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <StyledTableRow
                        style={{ height: (dense ? 33 : 53) * emptyRows }}
                      >
                        <StyledTableCell colSpan={6} />
                      </StyledTableRow>
                    )}
                  </TableBody>
                ) : (
                  <TableBody>
                    <StyledTableRow key="SearchingID1">
                      <StyledTableCell
                        colSpan={headers.length}
                        // variant="head"
                        size="medium"
                        align="center"
                      >
                        Searching for {title}
                        <Skeleton animation="wave" />
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15, 20, 25, 50]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={(event, newPage) =>
                handleChangeRowsPerPage(event, newPage)
              }
            />
          </Paper>
          <FormControlLabel
            control={
              <Switch
                checked={dense}
                onChange={(event) => handleChangeDense(event)}
              />
            }
            label={denseLable}
          />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Waiting on data for {title} to be loaded
          </Typography>
          <Skeleton animation="wave" />
        </Fragment>
      );
    }
  } else {
    <Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Please provide the data!
      </Typography>
      <Skeleton animation="wave" />
    </Fragment>;
  }
};
export default memo(EnhancedTable);
