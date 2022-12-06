import { useEffect, useState } from "react";
import { Menu, Dropdown } from "antd";
import { useMoralis, useChain} from "react-moralis";
// import styles from "../../styles/local/components/navbar.module.css";
import { Button } from "@mui/material";
import { networkIndex }  from "../networks"

const styling = {
  item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "var(--transparent-deep-fir-green)",
    height: "3em",
    padding: "6px",
    color: "var(--white)"
  },
  darkItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "var(--grey)",
    height: "3em",
    padding: "6px",
    color: "var(--orange)"
  },
  menuItem: {
    background: "var(--transparent-dark-mode1)",
    borderRadius: "0.4em",
    color: "var(--grey)"
  },
  darkMenu: {
    background: "var(--grey)",
    borderRadius: "0.4em"
  },
  button: {
    borderRadius: "0.4em"
  },
  darkmode: {
    background: "var(--shadow-green)",
    color: "var(--orange)"
  }
};


function Chains(props) {
  const { isWeb3Enabled, enableWeb3} = useMoralis();
  const { setNetworkObject,  currentNetwork, setPageRef, setmessage} = props;
  const { chainId, switchNetwork } = useChain();

  useEffect(() => {
    if (chainId) {
      const filterItem = networkIndex.filter(item => item.name === chainId);
      // setNetworkObject(filterItem[0]);
    }
  });

  const handleMenuClick = async e => {
    let msg;
    let _selected;
    let pageTo = 0;
    if (networkIndex[e.key].name === chainId) {
      if (isWeb3Enabled) {
        msg = `Already connected to ${networkIndex[e.key].chainName}`;
        pageTo = 1;
        _selected = networkIndex[e.key];
        console.log("CHAINIS", _selected)
      } else {
        _selected = currentNetwork;
        msg = "Please connect wallet first";
      }
    }
    if (networkIndex[e.key].name !== chainId) {
      if (!isWeb3Enabled) await enableWeb3();

      await switchNetwork(networkIndex[e.key].name).then(() => {
        _selected = networkIndex[e.key];
        msg = `Switched to ${networkIndex[e.key].chainName}`;
      });
    }

    setNetworkObject(_selected);
    // setmessage(msg);
    setPageRef(pageTo);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {networkIndex.map(items => (
        <Menu.Item key={items.key} icon={items.icon}>
          <div className="flex justify-around ml-3 text-orange-400">{items?.chainName}</div>
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <>
      <div>
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button variant="text" key={currentNetwork?.key} icon={currentNetwork?.icon}
            sx={{display:'flex', gap: 1}}
          >
            <span>{currentNetwork?.icon}</span>
            <span className=" text-orange-500 font-bold">{
              currentNetwork?.chainName? currentNetwork.chainName : "SelectNetwork"
            }</span>
          </Button>
        </Dropdown>
      </div>
    </>
  );
}

export default Chains;