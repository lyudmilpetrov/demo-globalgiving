import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef
} from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { StateContext } from 'app-state';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomAppBar from "app-bar";
import LoadingIndicator from "app-loader-indicator"
import * as api from "app-apis";
const HomeContent = () => {
  const [openLoading, setOpenLoading] = useState(true);
  const maxIds = 10;
  const lastIds = 50;
  const [context, dispatch] = useContext(StateContext);
  const [activeIDs, setActiveIDs] = useState([]);
  const [lastIDs, setLastIDs] = useState([]);
  const [pulledIDs, setPulledIDs] = useState([]);
  const [pulledResultsIDs, setPulledResultsIDs] = useState([]);
  const [dateFromToControl, setDateFromToControl] = useState(0);
  let navigate = useNavigate();
  const [theme, setTheme] = useState(context?.theme ?? {});
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
      lastIDs.map(ids => {
        pullLastIDs(ids);
      });
    }
  }, [lastIDs]);
  useEffect(() => {
    setTheme(context?.theme ?? {});
  }, [context]);

  const handleChangeDateFromToControl = (event) => {

  };
  const ceedActiveIDs = () => {
    if (activeIDs.length === 0) {
      fetch('./cached/all-active.json'
        , {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((ids) => {
          let arr = (ids?.projects?.project ?? []);
          arr.sort((a, b) => {
            return +b?.id - +a?.id;
          });
          // // // console.log(arr);
          setActiveIDs(ids?.projects?.project ?? []);
          let arrnew = [];
          if (arr.length > lastIds) {
            let iCMax = 0;
            let newArr = [];
            for (let i = 0; i < lastIds / maxIds; i++) {
              iCMax = ((i * maxIds) + maxIds) - 1;
              let iCMin = (iCMax + 1) - maxIds;
              let ids = arr.slice(iCMin, iCMax + 1).map(x => x.id);
              arrnew.push(ids.join(','));
              // // // console.log(arrnew);
            }
            setLastIDs(arrnew);
          }
        });
    }
  };
  const pullLastIDs = (ids) => {
    if (typeof pulledIDs.find(e => e === ids) === 'undefined') {
      let x = pulledIDs;
      x.push(ids);
      setPulledIDs(x);
      api
        .getByIdsFullInfo(
          context?.key ?? "",
          ids
        )
        .then(
          (response) => {
            if (typeof response?.data?.projects !== 'undefined') {
              if (typeof response?.data?.projects?.project !== 'undefined') {
                setOpenLoading(false);
                let arrX = [...pulledResultsIDs];
                response?.data?.projects?.project.map(y => {
                  arrX.push(y);
                });
                console.log(arrX);
                setPulledResultsIDs(arrX);
              }
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  };
  useEffect(() => {
    console.log(pulledResultsIDs);
  }, [pulledResultsIDs]);
  return (
    <ThemeProvider theme={theme}>
      <LoadingIndicator open={openLoading} />
      <CustomAppBar />
      <Grid
        container
        spacing={1}
        align="center"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={3} lg={3}>
          <Box pt={4} sx={{ justifyContent: 'flex-start' }}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
              <InputLabel>Time period</InputLabel>
              <Select
                value={dateFromToControl}
                onChange={handleChangeDateFromToControl}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={-14}>Last 14 Days</MenuItem>
                <MenuItem value={-7}>Last 7 Days</MenuItem>
                <MenuItem value={-1}>Yesterday</MenuItem>
                <MenuItem value={0}>Today</MenuItem>
                <MenuItem value={1}>Tomorrow</MenuItem>
                <MenuItem value={7}>Coming 7 Days</MenuItem>
                <MenuItem value={14}>Coming 14 Days</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <Box pt={4} sx={{ justifyContent: 'flex-start' }}>
            {/* <DatePickerModule
              onClick={handleClickAppointmentDateFrom}
              text="Appointment Date From"
              date={dateOfAppointmentFrom}
            /> */}
          </Box>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <Box pt={4} sx={{ justifyContent: 'flex-start' }}>
            {/* <DatePickerModule
              onClick={handleClickAppointmentDateTo}
              text="Appointment Date To"
              date={dateOfAppointmentTo}
            /> */}
          </Box>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <Box pt={4} sx={{ justifyContent: 'flex-start' }}>
            <FormControl
              variant="outlined"
            >
              <TextField
                inputRef={refAppointmentId}
                onFocus={onFocusInput}
                onBlur={onBlurInput}
                id="AppointmentId"
                multiline={false}
                name="AppointmentId"
                label="Appointment ID"
                defaultValue=""
                variant="filled"
                size="small"
              />
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
        {pulledResultsIDs.map((x, i) => (
          <Grid item xs={12} md={12} lg={12}>
            <Card sx={{ maxWidth: "50vw" }}>
              <CardMedia
                component="img"
                height="140"
                image={x?.image?.imagelink[5]?.url ?? ""}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {x?.title ?? ""}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
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
    </ThemeProvider>
  );
}

const HomePage = () => {
  return <HomeContent />;
}

export default HomePage;