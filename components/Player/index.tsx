import React, { useState } from 'react';

import {BsFillPlayCircleFill, BsFillPauseCircleFill, BsFillSkipStartCircleFill, BsFillSkipEndCircleFill} from 'react-icons/bs';

export default function Player({songName}: any) {
  const [ playing, setPlaying ]=useState(false)
  return (
    <div>
        <div className='flex space-x-4'>
          {!playing && <img src={"/img.png"} alt="" className='w-56 h-56'/> }
          {playing && <img src={"/spinningdisc.gif"} alt="" className='w-56 h-56'/> }
           
            <main className='flex flex-col justify-center items-center space-y-2'>
                <h5>{songName}</h5>
             
                <div className='flex space-x-4'>
                    <BsFillSkipStartCircleFill className='text-2xl'/>
                    {playing===false&&
                        <BsFillPlayCircleFill className='text-2xl hover:text-3xl' onClick={()=>setPlaying(true)}/>
                    }
                     {playing===true&&
                        < BsFillPauseCircleFill className='text-2xl hover:text-3xl' onClick={()=>setPlaying(false)}/>
                    }
                  
                    <BsFillSkipEndCircleFill className='text-2xl'/>

                </div>
            </main>

        </div>
    </div>
  )
}
