
const uploadFile = async (req, res, next) => {
  const { originalname: name, mimetype } = req.file;        
  fs.readFile(req.file.path, async (err, buffer) => { 
     const data = Array.from(Buffer.from(buffer, “binary”));
     const file = new Moralis.File(name, data, mimetype);
     await file.saveIPFS({ useMasterKey: true });
     return file.ipfs();
  });
}
// ------------------------------------------
// You will get a response of ipfs url like below:
// https://ipfs.moralis.io:2053/ipfs/QmdPcF1r86v28PeJMxdxHbKQA17qBhW3W5s6DHGvxukdPv


const uploadJson = async (req, res, next) => {
  const jsonMetadata = {
      name: "Female Bust",
      description: "Female Bust 3D model",
      image:  
"https://ipfs.moralis.io:2053/ipfs/QmdPcF1r86v28PeJMxdxHbKQA17qBhW3W5s6DHGvxukdPv"
}
 const toBtoa =      
     Buffer.from(JSON.stringify(jsonMetadata)).toString("base64"); 
 const file = new Moralis.File("FemaleBust.json", 
              { base64: toBtoa });
 await file.saveIPFS({ useMasterKey: true });
 return file.ipfs();
}
// ------------------------------------------
// You will get a response of ipfs url like below:
// https://ipfs.moralis.io:2053/ipfs/QmdPcF1r86v28PeJMxdxHbKQA17qBhW3W5s6DHGvxukdPv


