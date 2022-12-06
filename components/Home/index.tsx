import React from 'react';
import {
  Box, 
    Grid, 
      Stack, 
        Divider, 
          Button,
            Container, 
              Typography, } from "@mui/material";

import Gallery from "../Gallery";

type HomeProp = {
  setpageIndex: (x:number) => void;
  setmessage: (x:string) => void;
  setInProgress: (x:boolean) => void;
  updatePoolList:Function;
}

const Home = (props: HomeProp) => {
  const { setpageIndex, setmessage, setInProgress, updatePoolList } = props;

  return (
    <div>
       <Grid container>
        <Grid item xs={12} md={6}>
          <Stack>
            <Container maxWidth="sm">
              <Typography variant="h3" gutterBottom fontWeight="bold" color="purple" sx={{ mt: 4 }}>
                {" "}
                Decentralized Music gallery powered by Polygon{" "}
              </Typography>
              <Typography paragraph sx={{ fontSize: "16px", fontWeight: "bold" }}>
                Access and download old and latest music of your choice.
              </Typography>
              <div className="container">
                <ul>
                  <Typography>No credit card hassle</Typography>
                  <Typography>Secure download and file integrity</Typography>
                  <Typography>Earn each time your music is downloaded</Typography>
                  <Typography>Access high quality music at extremely cheaper fee</Typography>
                </ul>
              </div>
              <Divider />
              <Button
                onClick={() => setpageIndex(1)}
                variant="outlined"
                sx={{
                  height: "58px",
                  width: "50%",
                  mt: 2,
                  background: "none",
                  borderColor: "purple",
                  "&:hover": {
                    transition: "0.2s ease-in-out",
                    zIndex: "1",
                    color: "purple",
                    background: "stone"
                  }
                }}
              >
                Upload
              </Button>
            </Container>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <img className="h-full w-full object-cover" width={"100%"} height={"100%"} src="https://user-images.githubusercontent.com/1500684/157774694-99820c51-8165-4908-a031-34fc371ac0d6.jpg" alt="Sonic Youth On Stage" />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Gallery 
            setInProgress={setInProgress}
            setMessage={setmessage} 
            updatePoolList={updatePoolList}
             />
        </Grid>
      </Grid>
    </div>
  )
}

export default Home;