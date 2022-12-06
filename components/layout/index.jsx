import React from 'react'
import Header from '../Header'
export default function Layout(props) {
  const {
    isAuthenticated,
    account,
    setMessage, 
    setaccount, 
    setPageIndex, 
    setIsAuthentication, 
    children } = props;
  return (
    <div>
        <div className='w-full'>
            <Header
              isAuthenticated={isAuthenticated}
              account={account}
              setMessage={setMessage} 
              setaccount={setaccount} 
              setPageIndex={setPageIndex} 
              setIsAuthentication={setIsAuthentication} 
              />
            <div>
                {children}
            </div>
        </div>

    </div>
  )
}
