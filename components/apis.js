import { ethers } from "ethers";

function displayErrorMessage(error, setmessage) {
  let msg = "";
  if (error?.data?.message === "Cannot read properties of undefined (reading 'match')") {
    msg = "Internet unstable.";
  } else if (error?.data?.message === "execution reverted") {
    msg = "File does not exist";
  } else if (error?.data?.code === 3) {
    msg = "Not enough fund in wallet";
  } else {
    console.log("ERRor", error);
    msg = error?.data?.message || error?.message;
    if (msg.length > 150) msg = "Could not complete task";
  }
  return setmessage(msg);
}

function sendtransaction() {
  return {
    sendTransaction: async function(options) {
      const { 
        abi,
          fileHash,
            setmessage,
              functionName,
                setInProgress,
                  contractAddress, } = options;

      let success;
        let isRunning = true;
          const provider = new ethers.providers.Web3Provider(window.ethereum);

      if (!provider) { return ;}
      try {
        const isUnlocked = await window.ethereum._metamask.isUnlocked();
        if (!isUnlocked) {
          return setmessage("Please unlock wallet");
        }
        setmessage("Transaction processing...");
        setInProgress(10);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contractInstance = new ethers.Contract(contractAddress, abi, provider);
        const signer = provider.getSigner();
        const connectedSigner = contractInstance.connect(signer);
        while (isRunning) {
          setmessage("Transaction sent");
          setInProgress(60);
          switch (functionName?.toLowerCase()) {
            case 'upload':
              console.log("options",options);
              await connectedSigner.upload(fileHash)
                .then((r) => r? success = true : success = false);
              break;
            
            case 'download':
              await connectedSigner.download(fileHash)
              .then((r) => r? success = true : success = false);
              break;

            default:
              await connectedSigner.removeFile(fileHash).then((r) => r? success = true : success = false);
              break;
          }

          if(success) {
            setInProgress(100);
            setmessage("Transaction finalized");
            isRunning = false;
            break;
          }
        }
      } catch (error) {
        success = false;
        return displayErrorMessage(error, setmessage);
      }
      return success;
    },

    readData: async function (options) {
      const { 
        abi,
          setmessage,
            contractAddress, } = options;

      let result = null;
      if (!contractAddress) return result;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      if (!provider) {
        return setmessage("Connection not ready ...");
      }
      const contractInstance = new ethers.Contract(contractAddress, abi, provider);
      return await contractInstance.getFiles();
    },
   
  };
}

export default sendtransaction;