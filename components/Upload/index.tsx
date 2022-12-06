import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Player from "../Player"
import styles from "../../styles/Home.module.css";
import { contractAddress, abi } from "../abi";
import Web3 from "web3";
import sendtransaction from "../apis"
import BoxesLoader from "../loaders/BoxesLoader"

const styled = {
  border: "none",
  background: "white",
  borderRadius: "8px",
  opacity: "50%"
};

const theme = createTheme();

type UploadProps = {
  setPageIndex: (x:number) => void;
  setMessage: (x:string) => void;
  currentPageIndex: number;
}

export default function Upload(props: UploadProps) {
  const [trigger, setTrigger] = React.useState(false);
  const [id, setId] = React.useState(0);
  const [artist, setArtist] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [inProgress, setInProgress] = React.useState(false);
  const [isUploaded, setIsUploaded] = React.useState(false);

  const { setPageIndex,  currentPageIndex,  setMessage } = props;

  const { sendTransaction } = sendtransaction();

  React.useEffect(() => {
    if (isUploaded) {
      setTimeout(() => {
        setIsUploaded(false);
      }, 50000);
    }
  }, [trigger]);

  const handleId = (e: {target : {value: string}}) => {
    setId(Number(e.target.value));
  };

  const handleArtist = (e: {target : {value: string}}) => {
    setArtist(e.target.value);
  };

  const handleTitle = (e: {target : {value: string}}) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async () => {
    if (!artist) alert("Please set Artist name");
    if (!title) alert("Please set title");
    setInProgress(true);
    setIsUploaded(false);
    const fileHash = Web3.utils.keccak256(IMAGES[id].url);

    console.log("data", {
      author: artist,
      title: title,
      id: id,
      fileHash: Web3.utils.keccak256(IMAGES[id].url)
    });

    const result = await sendTransaction({
      abi: abi,
      contractAddress: contractAddress,
      functionName: "upload",
      setmessage: setMessage,
      setInProgress: setInProgress,
      fileHash: fileHash
    });

    setIsUploaded(true);
    setInProgress(false);
    setTrigger(!trigger);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2}>
        {!inProgress && (
          <Grid item xs={12} md={isUploaded ? 6 : 12}>
            <Container
              component="main"
              maxWidth="xs"
              sx={{
                border: "0.1em solid purple",
                marginTop: 4,
                borderRadius: "22px"
              }}
            >
              <CssBaseline />
              <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Box>
                  <Typography component="h1" variant="h5" sx={{ color: "purple" }}>
                    Submit Audio Details
                  </Typography>

                  <Button variant="text" onClick={() => setPageIndex(currentPageIndex - 1)}>Back</Button>

                </Box>
                
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 3, mb: 2 }}>
                    <TextField required fullWidth id="id" label="File index" name="id" autoComplete="id" type="number" onChange={e => handleId(e)} sx={styled} />
                    <TextField required fullWidth id="title" label="Song title" name="title" autoComplete="song-title" onChange={e => handleTitle(e)} sx={styled} />
                  </Box>
                </Grid>
                <TextField required fullWidth id="author" label="Artist Name" name="author" autoComplete="author" onChange={e => handleArtist(e)} sx={styled} />
                <Box sx={{ width: "100%", length: "100%", display: "flex", justifyContent: "center", alignItems: "center", mt: 3, mb: 2 }}>
                  <Button onClick={() => {}} fullWidth variant="text">
                    Choose category
                  </Button>
                  <Button onClick={() => {}} fullWidth variant="text">
                    Select file
                  </Button>
                </Box>
                <Button
                  onClick={handleSubmit}
                  fullWidth
                  variant="contained"
                  sx={{
                    mb: 4,
                    "&:hover": {
                      background: "purple",
                      color: "white",
                      padding: "10px",
                      transition: "2sec ease-in-out"
                    }
                  }}
                >
                  Upload
                </Button>
              </Box>
            </Container>
          </Grid>
        )}

        {isUploaded && (
          <Grid item xs={12} md={6}>
            <Container
              component="main"
              maxWidth="xs"
              sx={{
                marginTop: 14,
                borderRadius: "22px"
              }}
            >
              <Box>
                <Player />
              </Box>
            </Container>
          </Grid>
        )}
        {!isUploaded && inProgress && (
          <BoxesLoader
            className={styles.boxloader}
            boxColor="purple"
            shadowColor="gray"
            // desktopSize={'50%'}
          />
        )}
      </Grid>
    </ThemeProvider>
  );
}

const IMAGES = [
  { artist: "Ed-Sheeran", title: "Equality", url: "/Ed-Sheeran-Equals.webp" },
  { artist: "Celindion", title: "girlListening", url: "/girlListening.jpg" },
  { artist: "Craig David", title: "Walk away", url: "/guysinging.jpg" },
  { artist: "Chris brown", title: "4 years old", url: "/ironman.jpg" },
  { artist: "Tope Alabi", title: "Agbara Olorun", url: "/gadgets.jpg" },
  { artist: "Edward prince", title: "God is great", url: "/noMusic.jpg" },
  { artist: "Wizkid", title: "Holla at your boi", url: "/jocker.jpg" },
  { artist: "Danny", title: "Hustling", url: "/img1.png" },
  { artist: "Khalifa", title: "Hello", url: "/mic.jpg" },
  { artist: "Micheal Jackson", title: "Beat it", url: "/img5.png" }
];
