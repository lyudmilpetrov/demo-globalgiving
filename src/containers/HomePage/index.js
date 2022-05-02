import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { StateContext } from "app-state";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Toolbar from "@mui/material/Toolbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EnhancedTable from "app-table";
import CustomAppBar from "app-bar";
import LoadingIndicator from "app-loader-indicator";
import { exportCSVFile } from "app-helpers";
import * as api from "app-apis";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import useScrollTrigger from "@mui/material/useScrollTrigger";
const ScrollTop = (props) => {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });
  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };
  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
};
const HomeContent = (props) => {
  const maxIds = 10;
  const lastIds = 50;
  const [counterCalls, setCounterCalls] = useState(0);
  const [context, dispatch] = useContext(StateContext);
  const [theme, setTheme] = useState(context?.theme ?? {});
  const [openLoading, setOpenLoading] = useState(true);
  const buttonLabel = "";
  const [activeIDs, setActiveIDs] = useState([]);
  const [lastIDs, setLastIDs] = useState([]);
  const [pulledIDs, setPulledIDs] = useState([]);
  const [pulledResultsIDs, setPulledResultsIDs] = useState([]);
  // Searchables
  const [countries, setCountries] = useState([]);
  //  Table
  const [datasetsTableGeneric, setDatasetsTableGeneric] = useState([]);
  const [datasetsTableLoaded, setDatasetsTableLoaded] = useState([]);

  const [datasetsTableGenericRowClicked, setDatasetsTableGenericRowClicked] =
    useState(null);
  const [dateFromToControl, setDateFromToControl] = useState(0);
  const [inFocus, setInFocus] = useState(false);
  const refAppointmentId = useRef();
  const onFocusInput = useCallback(() => {
    setInFocus(true);
  }, [inFocus]);
  const onBlurInput = useCallback(() => {
    setInFocus(false);
  });
  useEffect(() => {
    if (activeIDs.length === 0) {
      ceedActiveIDs();
    }
  }, [activeIDs]);
  useEffect(() => {
    if (lastIDs.length > 0) {
      lastIDs.map((ids, i) => {
        pullLastIDs(ids, i);
      });
    }
  }, [lastIDs]);
  useEffect(() => {
    setTheme(context?.theme ?? {});
  }, [context]);
  useEffect(() => {
    if (lastIds / maxIds - 1 === counterCalls) {
      let dtT = [];
      pulledResultsIDs.map((x) => {
        console.log(x);
        let sampleObj = {};
        sampleObj.idr = x?.id;
        sampleObj["Region"] = x?.region ?? "";
        sampleObj["Country"] = x?.country ?? "";
        sampleObj["Title"] = x?.title ?? "";
        sampleObj["Theme Name"] = x?.themeName ?? "";
        dtT.push(sampleObj);
      });
      setDatasetsTableGeneric(dtT);
      setDatasetsTableLoaded(dtT);
      let x = [...new Set(pulledResultsIDs.map((x) => x.countries))];
      console.log(x);
    }
  }, [counterCalls]);
  const handleChangeDateFromToControl = (event) => {};
  const ceedActiveIDs = () => {
    if (activeIDs.length === 0) {
      fetch("./cached/all-active.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((ids) => {
          let arr = ids?.projects?.project ?? [];
          arr.sort((a, b) => {
            return +b?.id - +a?.id;
          });
          setActiveIDs(ids?.projects?.project ?? []);
          let arrnew = [];
          if (arr.length > lastIds) {
            let iCMax = 0;
            for (let i = 0; i < lastIds / maxIds; i++) {
              iCMax = i * maxIds + maxIds - 1;
              let iCMin = iCMax + 1 - maxIds;
              let ids = arr.slice(iCMin, iCMax + 1).map((x) => x.id);
              arrnew.push(ids.join(","));
            }
            setLastIDs(arrnew);
          }
        });
    }
  };
  const pullLastIDs = (ids, i) => {
    if (typeof pulledIDs.find((e) => e === ids) === "undefined") {
      let x = pulledIDs;
      x.push(ids);
      setPulledIDs(x);
      api.getByIdsFullInfo(context?.key ?? "", ids).then(
        (response) => {
          setCounterCalls(i);
          if (typeof response?.data?.projects !== "undefined") {
            if (typeof response?.data?.projects?.project !== "undefined") {
              setOpenLoading(false);
              response?.data?.projects?.project.map((y) => {
                pulledResultsIDs.push(y);
              });
            }
          }
        },
        (error) => {
          counterCalls++;
        }
      );
    }
  };
  const handleTableRowClick = useCallback((row, event, link, item) => {
    console.log([row, event, link, item]);
    if (link === true) {
      // if (linkoption === 'PatientID') {
      //  pulledResultsIDs.map((x) => {
      //    if (x.id === row["Patient ID"].id) {
      //      x.cannRxId = row["cannRx ID"].id;
      //      setPatient(x);
      //      context.Patient = x;
      //    }
      //  });
      // if (typeof item.url === "undefined") {
      //   let tel = "tel:" + item.tel;
      //   window.open(tel);
      // } else {
      //   let url = item.url;
      //   window.open(url);
      // }
    }
  });
  const handleSearchClick = useCallback((data) => {
    console.log(data);
    if (datasetsTableGeneric.length > 1) {
      let dT = [];
      datasetsTableGeneric.map((x) => {
        let addIt = false;
        Object.entries(data).forEach(([key, value]) => {
          if (typeof x[key] !== "object") {
            if (
              x[key]
                .toString()
                .toLowerCase()
                .includes(value.toString().toLowerCase())
            ) {
              addIt = true;
            } else {
              addIt = false;
            }
          } else {
            if (typeof x[key].id !== "undefined") {
              if (
                x[key].id
                  .toString()
                  .toLowerCase()
                  .includes(value.toString().toLowerCase())
              ) {
                addIt = true;
              } else {
                addIt = false;
              }
            }
          }
        });
        if (addIt) {
          dT.push(x);
        }
      });
      if (dT.length >= 1) {
        setDatasetsTableGeneric(dT);
      } else {
        let sampleObj = {};
        sampleObj.idr = 1;
        sampleObj.FullName = "";
        sampleObj.InstanceName = "";
        sampleObj.FirstName = "";
        sampleObj.LastName = "";
        sampleObj.Age = "";
        sampleObj.DOB = "";
        sampleObj.Phone = "";
        sampleObj.Id = "";
        dT.push(sampleObj);
        setDatasetsTableGeneric(dT);
      }
    }
  });
  const handleRefreshClick = useCallback(() => {
    setDatasetsTableGeneric(datasetsTableLoaded);
  });
  const handleButtonClick = useCallback((row) => {
    console.log(row);
  });
  const handleExcelExportClick = useCallback(() => {
    var fileTitle = "Projects";
    exportCSVFile(pulledResultsIDs, fileTitle);
  });
  return (
    <ThemeProvider theme={theme}>
      <LoadingIndicator open={openLoading} />
      <CustomAppBar />
      <Toolbar id="back-to-top-anchor" />
      <Grid
        container
        spacing={1}
        align="center"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={6} md={3} lg={3}>
          <Box pt={4} sx={{ justifyContent: "flex-start" }}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
              <InputLabel>Location</InputLabel>
              <Select
                value={dateFromToControl}
                onChange={handleChangeDateFromToControl}
              >
                {/* <MenuItem value={-14}>Last 14 Days</MenuItem>
                <MenuItem value={-7}>Last 7 Days</MenuItem>
                <MenuItem value={-1}>Yesterday</MenuItem>
                <MenuItem value={0}>Today</MenuItem>
                <MenuItem value={1}>Tomorrow</MenuItem>
                <MenuItem value={7}>Coming 7 Days</MenuItem>
                <MenuItem value={14}>Coming 14 Days</MenuItem> */}
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        align="center"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={12} lg={12} zeroMinWidth>
          <EnhancedTable
            sx={{
              minWidth: "100%",
              boxShadow: 6,
              borderRadius: 4,
              marginTop: "40px",
              p: 2,
            }}
            data={datasetsTableGeneric}
            rowId="idr"
            title={"Pulling latest projects"}
            onRowClick={handleTableRowClick}
            onSearchClick={handleSearchClick}
            onRefreshClick={handleRefreshClick}
            onButtonClick={handleButtonClick}
            onExcelExportClick={handleExcelExportClick}
            onButtonClickLable={buttonLabel}
            onButtonClickObject={datasetsTableGenericRowClicked}
            theme={theme}
          />
        </Grid>
        {pulledResultsIDs.map((x, i) => (
          <Grid item xs={12} md={12} lg={12} key={"grid" + i}>
            <Card sx={{ maxWidth: "80vw" }} key={"card" + i}>
              <CardMedia
                component="img"
                image={x?.image?.imagelink[5]?.url ?? ""}
                alt={x?.image?.title ?? ""}
              />
              <CardContent>
                <Typography gutterBottom variant="h3" component="div">
                  {x?.title ?? ""}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {x?.activities ?? ""}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </ThemeProvider>
  );
};
const HomePage = () => {
  return <HomeContent />;
};
export default HomePage;
