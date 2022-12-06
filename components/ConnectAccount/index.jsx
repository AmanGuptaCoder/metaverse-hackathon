import React,{useState} from 'react'
import { useMoralis } from 'react-moralis';
import Button from "@mui/material/Button";
import Address from '../Address';
import { useDRythm } from "../DRythmDappProvider/useDRythm";

const defaultAccount = '0xA7B2387bF4C259e188751B46859fcA7E2043FEFD'

const ConnectAccount = (props) =>{
  const [ chainId, setChainId ] = React.useState(false);
  const [ isAuthenticating, setIsAuthenticating ] = React.useState(false);
  const { isAuthenticated, setMessage, account, setAccount, setIsAuthentication } = props;

  const { 
    enableWeb3,
      chainMenu,
        authenticate,
          switchNetwork } = useDRythm();

  return(
    <div className='connect'>
      { 
        !isAuthenticated ? <Button 
          disabled={isAuthenticated}
          variant='text'
          disableElevation
          sx={{background: 'purple', "&:hover": { transition: '0.2sec ease-in-out', background: 'white', color: 'purple', fontWeight: "bold"}}}
          onClick={async()=> { 
            await authenticate(setAccount, setMessage, setIsAuthentication);

        }}
      >
        {!isAuthenticated ? "Connect Wallet" : "Mumbai"}
        </Button> : <Address
          copyable
          display
          address={account || defaultAccount}
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