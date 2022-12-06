import * as React from "react";
  
const defaultAccount = `0xA7B2387bF4C259e188751B46859fcA7E2043FEFD`;

  const Context = React.createContext({
    message: "",
    setMessage: (value) => {},
    account : `0x${'0'.repeat(40)}`,
    setAccount: (value) => {},
    isAuthenticated: false,
    setIsAuthenticated: (value) => {},
    setInProgress: (value) => {},
  });

function Provider (props) {
  const { children } = props;
  const [ account, setAccount] = React.useState(defaultAccount);
  const [ isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [ message, setMessage ] = React.useState('');
  const [ inProgress, setInProgress ] = React.useState(false);

  return <Context.Provider value={
    {
      account,
      message,
      setMessage,
      setAccount,
      isAuthenticated,
      setIsAuthenticated,
      setInProgress,
      inProgress,
    }
  }>{ children }</Context.Provider>
}

// Context.displayName = Storage;
export const useAppContext = () => React.useContext(Context);
export const withProvider = (Component) => {
  return (props) => {
    return (
      <Provider>
        <Component {...props}/>
      </Provider>
    )
  }
} 