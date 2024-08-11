import React, { useState } from 'react';
import CustomerList from './components/CustomerList/CustomerList';
import customerList from './customers.json'
import './App.css';
import CustomerMain from './components/CustomerMain/CustomerMain';

type Customer = {
  id: number;
  name: string;
  description: string;
};

function App() {

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <div className='App'>
      <CustomerList customers={customerList} onCustomerClick={handleCustomerClick} />{/* Pass the customer data as a prop */}
      {(selectedCustomer && <CustomerMain customer={selectedCustomer} />) || <div className='customerContainer'><h3>Click on a customer to view details</h3></div>}
    </div>
  );
}

export default App;
