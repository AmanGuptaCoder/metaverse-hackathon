import React from "react";
import { Divider, Button, Container } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { Grid, Box, Typography, Stack } from "@mui/material";
import Home from "../components/Home";
import Upload from "../components/Upload";
import Gallery from "../components/Gallery";
import BigNumber from "bignumber.js";

type ListObject = {
  dateUploaded: BigNumber;
  downloadCount: BigNumber;
  uploader: string;
}

type IndexProps = {
  setpageIndex: (x:number) => void;
  currentPageIndex: number;
  setmessage: (x:string) => void;
  message: string;
}

function Index(props: IndexProps) {
  const [inProgress, setInProgress] = React.useState(false);
  const [isUploaded, setIsUploaded] = React.useState(false);
  const [currentPage, setPage] = React.useState(<></>);

  const { currentPageIndex, setpageIndex, setmessage, message} = props;
 
  const [poolList, updatePoolList] = React.useState(Array<ListObject>);

  React.useEffect(() => {
    return setPage(PAGES[currentPageIndex]);
  }, [currentPageIndex]);

  const setUploaded = (value: boolean) => setIsUploaded(value);
  const setinprogress = (value: boolean) => setInProgress(value);

  const PAGES = [
  <Home 
    setpageIndex={setpageIndex} 
    setmessage={setmessage} 
    setInProgress={setinprogress} 
    updatePoolList={updatePoolList}
  />, 
  <Upload
    isUploaded={isUploaded}
    setIsUploaded={setUploaded}
    setPageIndex={setpageIndex} 
    setMessage={setmessage} 
    currentPageIndex={currentPageIndex}
    setInProgress={setinprogress}
    message={message}
    inProgress={inProgress}
  />, 
  <Gallery 
    setInProgress={setinprogress} 
    setMessage={setmessage} 
    updatePoolList={updatePoolList} />
  ];

  return <main >{currentPage}</main>;
}

export default Index;
