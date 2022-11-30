import React,{useState} from 'react'
// import Modal from "../modal"
// import {AiOutlineCloseCircle} from "react-icons/ai"
// import { AccountState } from '../../utility/recoilState/globalState';
// import {useRecoilState} from "recoil"
import { useMoralis } from 'react-moralis';
import Button from "@mui/material/Button";

// const reach = loadStdlib('ALGO');
const ConnectAccount= () =>{
  const [trigger,setTrigger] = useState(false)
  // const [account,setAccount] = useRecoilState( AccountState)
  // const [address,setAddress] = useState("")

  const { 
    account,
      authenticate,
        isWeb3Enabled, 
          isAuthenticated, 
            isAuthenticating, 
              isWeb3EnableLoading } = useMoralis();
  return(
    <div className='connect'>
      { 
        !isAuthenticated? <Button 
          variant='contained'
          disableElevation
          sx={{background: 'purple', "&:hover": { transition: '0.2sec ease-in-out', background: 'white', color: 'purple', fontWeight: "bold"}}}
          onClick={async()=> { await authenticate({ provider: "walletconnect", signingMessage: "Connecting to m"})}}
      >
        Connect Wallet 
      </Button> : <Button variant='contained' className='py-1 px-4 text-sm border border-slate-400 rounded-full hover:bg-rose-400 hover:border-0'
          disabled
        >
            {account?.slice(0,9)+"..."}
        </Button>}
    </div>
  )  
  
}

export default ConnectAccount  