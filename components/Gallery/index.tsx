import React from 'react';
import { 
  Box,
  Grid, 
  Card, 
  Stack,
  Button, 
  CardMedia,
  Typography, 
  CardContent, } from '@mui/material';

import { useAppContext } from '../Storage';
import BigNumber from "bignumber.js"

import Link from 'next/link';
// import { useMoralis } from 'react-moralis';
import Web3 from 'web3';
import { contractAddress, abi } from "../abi";
import sendtransaction from "../apis";

// import { abi, address } from "../../backend/deployments/matic/DRythm.json";

type CollectionType = {
  artist : string;
  title: string;
  url: string;
}

type ListObject = {
  dateUploaded: BigNumber;
  downloadCount: BigNumber;
  uploader: string;
}

const Gallery = () => {
  const [ collections, setCollections ] = React.useState(IMAGES);
  const { sendTransaction, readData } = sendtransaction();
  const [poolList, updatePoolList] = React.useState(Array<ListObject>);

  const { setInProgress, setMessage } = useAppContext();

  React.useEffect(() => {
    const _fetchData = async() => {
      const result = await readData(
        {
          abi: abi,
          contractAddress: contractAddress,
          setmessage: setMessage,
        },
      );
      updatePoolList({...result});
    }
    _fetchData();
  }, [readData, setMessage]);

  async function handleClick (id: number) {
    const fileHash = Web3.utils.keccak256(IMAGES[id].url);
    await sendTransaction({
      abi: abi,
      contractAddress: contractAddress,
      functionName: 'download',
      setmessage: setMessage,
      setInProgress: setInProgress,
      fileHash: fileHash,
    })
  }

  return (
    <div className='team flex flex-col justify-center items-center py-12 px-16'>
      <Typography variant='h5' sx={{color:'purple', pb: 2}}>Gallery</Typography>
      <Grid container spacing={2}>
        {
          collections.map((items: CollectionType, id: number) => (
            <Grid item container xs={12} md={4} key={id}>
               <Box>
                <Card >
                  <Grid item container xs={12}>
                    <Grid item xs={5}>
                      <CardMedia component="img" sx={{p: 4, width: '100%', height: '100%' }} image={items.url} alt="random" className='rounded-full'/>
                    </Grid>
                    <Grid item xs={7} className='shadow-lg'>
                      <CardContent sx={{ flexGrow: 1, }} >
                        <Stack sx={{ }}>
                          <Typography gutterBottom variant="h5" className='text-sm text-purple-400'>{items.artist}</Typography>
                          <Typography variant='body1' gutterBottom className='text-lg font-semibold'>{items.title}</Typography>
                          <Typography className='text-xs'>Lorem ipsum, dolor sit amet </Typography>
                          <Button 
                            variant='text'
                            sx={{
                              '&:hover': {
                                background: 'purple',
                                color: 'white',
                                padding: 2,
                                fontWeight: 'bold'
                              }
                            }}
                            onClick={() => handleClick(id)}
                          
                          >Download</Button>
                        </Stack>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Box>
            </Grid>
          ))
        }

      </Grid>

    </div>
  )
}

export default Gallery

const IMAGES: Array<CollectionType> = [
  { artist: 'Ed-Sheeran',
    title: 'Equality',
    url: '/Ed-Sheeran-Equals.webp',
  },
  { artist: 'Celindion',
    title: 'girlListening',
    url: '/girlListening.jpg',
  },
  { artist: 'Craig David',
    title: 'Walk away',
    url: '/guysinging.jpg',
  },
  { artist: 'Chris brown',
    title: '4 years old',
    url: '/ironman.jpg',
  },
  { artist: 'Tope Alabi',
    title: 'Agbara Olorun',
    url: '/gadgets.jpg',
  },
  { artist: 'Edward prince',
    title: 'God is great',
    url: '/noMusic.jpg',
  },
  { artist: 'Wizkid',
    title: 'Holla at your boi',
    url: '/jocker.jpg',
  },
  { artist: 'Danny',
    title: 'Hustling',
    url: '/img1.png',
  },
  { artist: 'Khalifa',
    title: 'Hello',
    url: '/mic.jpg',
  },
  { artist: 'Micheal Jackson',
    title: 'Beat it',
    url: '/img5.png'
  },
  { artist: 'Khate henky',
    title: 'Hello',
    url: '/mic.jpg',
  },
  { artist: 'Micheal Jackson',
    title: 'Frame it',
    url: '/img4.png'
  },
]