import React from 'react';
import { loader } from '../assets';


const Error = () => (
  <div className='w-full flex justify-center items-center'>
    <h1 className='font-bold text-2xl text-white mt-2'>Something went wrong. Please try again.</h1>
  </div>
);

const Loader = ({ title }) => (
  <div className='w-full flex justify-center items-center flex-col'>
    <img  src={loader} alt='loader' className='w-32 h-32 object-contain'/>
    <h1 className='font-bold text-2xl text-white mt-2'>{title || "Loading..."}</h1>
  </div>
);

export {Loader, Error};

