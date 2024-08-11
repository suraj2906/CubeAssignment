import React, { useState, useEffect, useRef } from 'react';
import './CustomerList.css';

type Customer = {
  id: number;
  name: string;
  description: string;
};

type Props = {
  customers: Customer[];
  onCustomerClick: (customer: Customer) => void;
};

const CustomerList: React.FC<Props> = ({ customers, onCustomerClick }) => {
  const [visibleCustomers, setVisibleCustomers] = useState<Customer[]>([]);
  const [loadCount, setLoadCount] = useState(20); // Number of customers to load initially
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisibleCustomers(customers.slice(0, loadCount));
  }, [customers, loadCount]);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && loadCount < customers.length) {
        setLoadCount((prev) => prev + 20); // Load 20 more customers when the user scrolls down
      }
    });

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadCount, customers.length]);

  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomerId(customer.id);
    onCustomerClick(customer); 

  }

  return (
    <div style={{ height: '100vh', overflowY: 'scroll', width: '30vw' }}>
      {visibleCustomers.map((customer) => (
        <div
          key={customer.id}
          className={`customerDetails ${selectedCustomerId === customer.id ? 'selected' : ''}`}
          onClick={() => handleCustomerClick(customer)}
        >
          <div>
            <h3 style={{ fontWeight: 300 }}>{customer.name}</h3>
            <p className='customerDescription'>{customer.description}</p>
          </div>
        </div>
      ))}
      <div ref={loadMoreRef} style={{ height: '1px' }} />
    </div>
  );
};

export default CustomerList;
