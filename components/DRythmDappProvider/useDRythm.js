import React from "react";

async function connect(setAccount, setMessage) {
  let account;
  window.document.getElementById("connectButton", connect);
  await window.ethereum
    .request({ method: "eth_requestAccounts" })
    .then(newAccounts => {
      account = newAccounts[0];
      if (wallet !== newAccounts[0]) {
        setAccount(newAccounts[0]);
        setMessage(`Selected account:${newAccounts[0]}`)
      }
    })
    .catch(error => {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        setMessage("Please connect to MetaMask.")
      } else {
        console.error(error);
      }
    });
}
export function useDRythm() {
  return {
      authenticate: async function requestPermissions(
        setAccount, 
        setMessage, 
        setIsAuthenticated
        ) 
      {
        let account;
        await window.ethereum
          .request({
            method: "wallet_requestPermissions",
            params: [{ eth_accounts: {} }]
          })
          .then(async permissions => {
           
            const accountsPermission = permissions.find(permission => permission.parentCapability === "eth_accounts");
            if (accountsPermission) {
              await window.ethereum._metamask.isUnlocked().then(isUnlocked => setIsAuthenticated(isUnlocked));
              await window.ethereum
              .request({ method: "eth_requestAccounts" })
              .then(newAccounts => {
                account = newAccounts[0];
                setAccount(newAccounts[0]);
                setMessage(`Selected account:${newAccounts[0]}`)
              })
              .catch(error => {
                if (error.code === 4001) {
                  // EIP-1193 userRejectedRequest error
                  setMessage("Please connect to MetaMask.")
                } else {
                  console.error(error);
                }
              });
    
              setMessage('Permission granted!')
              
            } else {
              account = await connect(setAccount, setMessage);
            }

          })
          .catch(error => {
            // if (error.code === 4001) {
            setIsAuthenticated(false);
            // EIP-1193 userRejectedRequest error
            setMessage("Permissions needed to continue.");
            console.error(error);
          });
        return account;
      },
      enableWeb3: async function connect(setAccount, setMessage) {
        window.document.getElementById("connectButton", connect);
        await window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then(newAccounts => {
            if (wallet !== newAccounts[0]) {
              setAccount(newAccounts[0]);
              setMessage(`Selected account:${newAccounts[0]}`)
            }
          })
          .catch(error => {
            if (error.code === 4001) {
              // EIP-1193 userRejectedRequest error
              setMessage("Please connect to MetaMask.")
            } else {
              console.error(error);
            }
          });
      },
      switchNetwork: async function switchNetwork(chainid = String) {
        let done = false;
        try {
          await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: chainid }]
          });
          done = true;
        } catch (switchError) {
          // This error code indicates that the chain has not been added to MetaMask.
          if (switchError) {
            console.log(`SwitchError: ${switchError}`);
            try {
              await ethereum.request({
                method: "wallet_addEthereumChain",
                params: [chainMenu[chainid]]
              });
              done = true;
            } catch (addError) {
              console.log("Could not add network");
            }
          }
        }
        return done;
      },
      connect,

  }

}
