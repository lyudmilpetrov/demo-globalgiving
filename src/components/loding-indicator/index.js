import React, {
    Fragment,
    useState,
    useEffect,
    useContext,
    useCallback,
  } from 'react';
  import { makeStyles } from '@mui/styles';
  import CircularProgress from '@mui/material/CircularProgress';
  import Backdrop from '@mui/material/Backdrop';
  import Box from '@mui/material/Box';
  import Modal from '@mui/material/Modal';
  import Fade from '@mui/material/Fade';
  import Typography from '@mui/material/Typography';
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > * + *": {
        // marginLeft: theme.spacing(2),
      },
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      padding: "10px",
      p: 4,
      bgcolor: 'background.paper',
    },
  }));
  const LoadingIndicator = ({ open }) => {
    const [openInner, setOpenInner] = useState(open);
    const handleOpen = () => setOpenInner(true);
    const handleClose = () => setOpenInner(false);
    const classes = useStyles();
    useEffect(() => {
      setOpenInner(open)
    }, [open]);
    return (
      <Fragment>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openInner}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.root}>
              <CircularProgress />
            </div>
          </Fade>
        </Modal>
      </Fragment>
    );
  };
  export default LoadingIndicator;
  