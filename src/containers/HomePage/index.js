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
import { exportCSVFile, getBrowserName } from "app-helpers";
import * as api from "app-apis";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Skeleton from "@mui/material/Skeleton";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import Container from "@mui/material/Container";
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
  const [browser, setBrowser] = useState('');
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
  const [pulledResultsIDsCards, setPulledResultsIDsCards] = useState([]);
  // Searchables
  const [countries, setCountries] = useState([]);
  const [themeNames, setThemeNames] = useState([]);
  const [valueCountries, setValueCountries] = useState('');
  const [valueThemeNames, setValueThemeNames] = useState('');
  const [inputValueCountries, setInputValueCountries] = useState('');
  const [inputValueThemeNames, setInputValueThemeNames] = useState('');
  //  Table
  const [datasetsTableGeneric, setDatasetsTableGeneric] = useState([]);
  const [datasetsTableLoaded, setDatasetsTableLoaded] = useState([]);
  const [datasetsTableGenericRowClicked, setDatasetsTableGenericRowClicked] =
    useState(null);
  const [showSearching, setShowSearching] = useState(false);
  useEffect(() => {
    // disable autofill
    let tagArr = document.getElementsByTagName("input");
    let brsw = getBrowserName().toLowerCase();
    setBrowser(brsw);
    for (let i = 0; i < tagArr.length; i++) {
      tagArr[i].autocomplete = brsw + '-off';
    }
  }, [])
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
    // initial update UI
    if (lastIds / maxIds - 1 === counterCalls) {
      structureTable(pulledResultsIDs);
      structureSelectables(pulledResultsIDs);
    }
  }, [counterCalls]);
  useEffect(() => {
    setTheme(context?.theme ?? {});
  }, [context?.theme]);
  const structureTable = (sourceForTable) => {
    let dtT = [];
    sourceForTable.map((x) => {
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
    setPulledResultsIDsCards(pulledResultsIDs);
  }
  const structureSelectables = (sourceForTable) => {
    let arrCountries = pulledResultsIDs.map((x) => x.countries.country[0].name);
    let arrThemeNames = pulledResultsIDs.map((x) => x.themeName);
    let arrCountriesSorted = Array.from(new Set(arrCountries.sort((a, b) => {
      return (a > b ? 1 : -1);
    })));
    let arrThemeNamesSorted = Array.from(new Set(arrThemeNames.sort((a, b) => {
      return (a > b ? 1 : -1);
    })));
    setCountries(arrCountriesSorted);
    setThemeNames(arrThemeNamesSorted);
  }
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
            return b?.id - a?.id;
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
    if (link === true) {

    }
  });
  const handleSearchClick = useCallback((data) => {
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

  });
  const handleExcelExportClick = useCallback(() => {
    var fileTitle = "Projects";
    exportCSVFile(pulledResultsIDs, fileTitle);
  });
  const clearSections = () => {
    setValueCountries('');
    setInputValueCountries('');
    setPulledResultsIDsCards(pulledResultsIDs);
  };
  const searchCached = () => {
    if (((valueCountries?.length ?? 0) > 0) && ((valueThemeNames?.length ?? 0) === 0)) {
      let filtered = pulledResultsIDs.filter(x => x.country === valueCountries);
      setPulledResultsIDsCards(filtered);
    }
    if (((valueThemeNames?.length ?? 0) > 0) && ((valueCountries?.length ?? 0) === 0)) {
      let filtered = pulledResultsIDs.filter(x => x.themeName === valueThemeNames);
      setPulledResultsIDsCards(filtered);
    }
    if (((valueThemeNames?.length ?? 0) > 0) && ((valueCountries?.length ?? 0) > 0)) {
      let filtered = pulledResultsIDs.filter(x => ((x.themeName === valueThemeNames) && (x.country === valueCountries)));
      setPulledResultsIDsCards(filtered);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <LoadingIndicator open={openLoading} />
      <CustomAppBar />
      <Toolbar id="back-to-top-anchor" />
      <Container maxWidth="xl" sx={{ marginTop: "100px", backgroundColor: theme?.palette?.background?.default }}>
        <Grid
          container
          spacing={1}
          align="center"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} md={6} lg={3}>
            <Box pt={4} sx={{ justifyContent: "flex-start" }}>
              {(countries.length > 0) ? (
                <Autocomplete
                  freeSolo
                  value={valueCountries}
                  onChange={(event, newValue) => {
                    setValueCountries(newValue);
                  }}
                  inputValue={inputValueCountries}
                  onInputChange={(event, newInputValue) => {
                    setInputValueCountries(newInputValue);
                  }}
                  id="id-countries"
                  options={countries}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Countries" variant="standard" />}
                />
              ) : (
                <Skeleton animation="wave" />
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Box pt={4} sx={{ justifyContent: "flex-start" }}>
              {(themeNames.length > 0) ? (
                <Autocomplete
                  freeSolo
                  value={valueThemeNames}
                  onChange={(event, newValue) => {
                    setValueThemeNames(newValue);
                  }}
                  inputValue={inputValueThemeNames}
                  onInputChange={(event, newInputValue) => {
                    setInputValueThemeNames(newInputValue);
                  }}
                  id="id-theme-names"
                  options={themeNames}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Themes" variant="standard" />}
                />
              ) : (
                <Skeleton animation="wave" />
              )}
            </Box>
          </Grid>
          <Grid item xs={6} md={3} lg={3}>
            <Box pt={4}>
              <Button
                variant="outlined"
                color="success"
                startIcon={<ClearSharpIcon />}
                onClick={clearSections}
              >
                Clear
              </Button>
            </Box>
          </Grid>
          <Grid item xs={6} md={3} lg={3}>
            <Box pt={4} sx={{ justifyContent: 'flex-start' }}>
              {!showSearching ? (
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<SearchSharpIcon />}
                  onClick={searchCached}
                >
                  Search
                </Button>
              ) : (
                <Skeleton animation="wave" />
              )}
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
              browser={browser}
            />
          </Grid>
          {pulledResultsIDsCards.map((x, i) => (
            <Grid item xs={12} md={12} lg={12} key={"grid" + i}>
              <Card elevation={24} sx={{ maxWidth: "80vw" }} key={"card" + i}>
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
      </Container>
    </ThemeProvider>
  );
};
const HomePage = () => {
  return <HomeContent />;
};
export default HomePage;
