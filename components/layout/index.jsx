import React from 'react'
import Header from '../Header'
export default function Layout(props) {
  const { setaccount, setMessage, setPageIndex, setIsAuthentication, children} = props;
  return (
    <div>
        <div className='w-full'>
            <Header setaccount={setaccount} setMessage={setMessage} setPageIndex={setPageIndex} setIsAuthentication={setIsAuthentication} />
            <div>
                {children}
            </div>
        </div>

    </div>
  )
}
