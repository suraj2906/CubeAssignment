import React from 'react';
import './CustomerMain.css'
import PhotoGrid from '../PhotoGrid/PhotoGrid';

type Customer = {
  id: number;
  name: string;
  description: string;
};

type Props = {
  customer: Customer;
};

const CustomerMain = ({customer}: Props) => {
  return (
    <div className='customerContainer'>
      <h2>{customer.name} details here</h2>
      <p  style={{width: '40vw'}}>{customer.description}</p>
      <PhotoGrid/>
    </div>
  );
};

export default CustomerMain;
