import React,{useState} from 'react'
import { useMoralis } from 'react-moralis';
import Button from "@mui/material/Button";
import Address from '../Address';
import { useDRythm } from "../DRythmDappProvider/useDRythm";
import { useAppContext } from '../Storage';

const defaultAccount = '0xA7B2387bF4C259e188751B46859fcA7E2043FEFD'

const ConnectAccount = ({  }) =>{
  const [ chainId, setChainId ] = React.useState(false);
  const [ isAuthenticating, setIsAuthenticating ] = React.useState(false);
  const [ address, setAccount ] = React.useState("");
  const { isAuthenticated, account,  } = useAppContext();

  const { 
    enableWeb3,
      chainMenu,
        authenticate,
          switchNetwork } = useDRythm();

  return(
    <div className='connect'>
      { 
        address === "" ? <Button 
          disabled={isAuthenticating}
          variant='text'
          disableElevation
          sx={{background: 'purple', "&:hover": { transition: '0.2sec ease-in-out', background: 'white', color: 'purple', fontWeight: "bold"}}}
          onClick={async()=> { 
            const res = await authenticate();
            setAccount(res);

        }}
      >
        Connect Wallet 
        </Button> : <Address
          copyable
          display
          address={address || defaultAccount}
          size={6}
          style={{
            fontWeight: 'bold',
            color: 'purple',
            display: 'flex',
            fontSize: '18px'
          }}
        />
      }
    </div>
  )  
  
}

export default ConnectAccount  