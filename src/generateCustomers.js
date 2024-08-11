const fs = require('fs');

const customers = [];

for (let i = 1; i <= 1000; i++) {
  customers.push({
    id: i,
    name: `Customer ${i.toString().padStart(2, '0')}`,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  });
}

fs.writeFileSync('customers.json', JSON.stringify(customers, null, 2));

console.log('customers.json has been created with 1000 entries.');
