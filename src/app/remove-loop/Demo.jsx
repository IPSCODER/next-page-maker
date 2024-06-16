

import React, { useState } from 'react';

const ObjectStateExample = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Apple', category: 'Fruit' },
    { id: 2, name: 'Carrot', category: 'Vegetable' },
    { id: 3, name: 'Bread', category: 'Bakery' },
    { id: 4, name: 'Mango', category: 'Fruit' }
  ]);


  const removeItem = (idToRemove) => {
    const updatedItems = items.filter(item => item.id !== idToRemove);
    setItems(updatedItems);
  };

  console.log(items);

  const handleSubmit = () =>{
//     {items.map(item => {
//       removeItem(item.id)
//       if (item.id !== 2 ) {
//       }
//       console.log(item);
// })}

for(let arr of items){
  removeItem(arr.id)
  console.log(arr);
}
  }

  console.log(items);

  const handleNestedLoop = () => {
    const updatedItems = [...items]; // Create a copy of the state array
    for (let i = 0; i < updatedItems.length; i++) {
      for (let j = 0; j < updatedItems.length; j++) {
        // Example: Manipulate each item in some way
        updatedItems[i].name += j;
      }
    }
    setItems(updatedItems); // Update state with the modified array
  };

  return (
    <div>
      <h2>List of Items</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - {item.category}
          </li>
        ))}
      </ul>
      <button onClick={handleNestedLoop}>
        Perform Nested Loop Operation
      </button>
    </div>
  );
};

export default ObjectStateExample;
