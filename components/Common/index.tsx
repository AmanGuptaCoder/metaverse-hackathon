import React from "react";
import Link from "next/link";
import { Grid, Container, Stack, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from "next/image"

type CommonProps = {
  imgsrc: string;
  visit: string;
}

function Common(props: CommonProps) {
  const { imgsrc, visit } = props;

  return (
    // bgcolor:'background.paper', 
    <>
      <Grid container sx={{background: ''}}>
        <Grid item xs={12} md={6} >
          <Box sx={{bgcolor:'background.paper', pt: 8, pb: 6,}}className='bgImage'>
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                // color="text.primary"z\
                gutterBottom
                fontWeight='bold'
                color='purple'
              >
              {/* &apos; */}
              Audio NFT Marketplace
            </Typography>
            <Typography variant="h5" align="center" sx={{color:"black"}}>A marketplace built for your need.</Typography>
            <Typography variant="body1" align="center" paragraph>
              Create, share, transfer, sell and buy and monetize any form of Audio work: Music, tutorials etc with a click
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" sx={{
                height: '58px', 
                background: 'purple',
                "&:hover" : {
                  transition: '0.2s ease-in-out',
                  zIndex: '1',
                  color: 'black',
                  background: 'white'
                }
              }}>
                <Link href={visit}>Explore Audio Gallery</Link></Button>
            </Stack>
          </Container>
          </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{p: 6,}}>
              <Image src={imgsrc} alt="Image" />
            </Box>
          </Grid>
        </Grid> 
      </>
  );
}

export default Common;
