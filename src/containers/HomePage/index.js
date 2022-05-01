import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef
} from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { StateContext } from 'app-state';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import CustomAppBar from '../../components/app-bar/app-bar';
import * as api from "app-apis";
const HomeContent = () => {
  const maxIds = 10;
  const lastIds = 50;
  const [context, dispatch] = useContext(StateContext);
  const [activeIDs, setActiveIDs] = useState([]);
  const [lastIDs, setLastIDs] = useState([]);
  const [pullingNow, setPullingNow] = useState(false);
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
    setPullingNow(true);
    if (activeIDs.length === 0) {
      ceedActiveIDs();
    }
  }, [activeIDs]);
  useEffect(() => {
    // if (pullingNow === false) {
    //   console.log(lastIDs);
    // }
    if (lastIDs.length > 0) {
      pullLastIDs(lastIDs[0]);
    }
  }, [lastIDs]);
  useEffect(() => {
    // console.log(context);
    setTheme(context?.theme ?? {});
  }, [context]);
  const handleKeyPress = (e) => {
    // if (e.key === "Enter" && inFocus === true) {
    //   searchAppointments();
    // }
  };
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
    api
      .getByIdsFullInfo(
        context?.key ?? "",
        ids
      )
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );

  };
  return (
    <ThemeProvider theme={theme}>
      <CustomAppBar />
      <Grid
        container
        spacing={1}
        align="center"
        justifyContent="center"
        alignItems="center"
        onKeyPress={handleKeyPress}
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
    </ThemeProvider>
  );
}

const HomePage = () => {
  return <HomeContent />;
}

export default HomePage;