import React,{useState} from 'react'
import { useMoralis } from 'react-moralis';
import Button from "@mui/material/Button";
import Address from '../Address';

const ConnectAccount= () =>{

  const { 
    account,
      logout,
        authenticate,
          isWeb3Enabled, 
            isAuthenticated, 
              isAuthenticating, 
                isWeb3EnableLoading } = useMoralis();
  return(
    <div className='connect'>
      { 
        !isAuthenticated || !isWeb3Enabled? <Button 
          disabled={isAuthenticating}
          variant='text'
          disableElevation
          sx={{background: 'purple', "&:hover": { transition: '0.2sec ease-in-out', background: 'white', color: 'purple', fontWeight: "bold"}}}
          onClick={async()=> { 
            if(!isAuthenticated) {
              await authenticate({ provider: "wmetamask", signingMessage: "Connecting to DRythm"})
            } else {
              await logout();
            }
          }}
      >
        Connect Wallet 
        </Button> : <Address
          copyable
          display
          address={account || `0x${'0'.repeat(40)}`}
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