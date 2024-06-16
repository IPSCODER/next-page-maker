"use client"
import React, { useEffect, useState } from 'react';

const ObjectStateExample = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Apple', category: 'Fruit' },
    { id: 2, name: 'Carrot', category: 'Vegetable' },
    { id: 3, name: 'Bread', category: 'Bakery' }
  ]);

  const [visible,setVisble] = useState(false)

  const removeItem = (idToRemove) => {
    const updatedItems = items.filter(item => item.id !== idToRemove);
    setItems(updatedItems);
  };


  const conditionalFun = visible && items.map(item => {
    if (item.id !== 2 ) {
      removeItem(item.id)
    }
    // console.log(item);
return <React.Fragment key={item.id} ></React.Fragment>
})

  useEffect(() =>{
    setVisble(false)
  },[visible])
  
  const add = () => {
    setItems([...items,{id:items[items.length - 1].id+1,name:"demo",category:"demo"}])
  }
  console.log(items,"items");
  return (
    <div>
      <h2>List of Items</h2>
      {conditionalFun}
      
    <button onClick={add} >add</button>
      <ul>
        {items.map(item => {        
    return <li key={item.id}>
            {item.name} - {item.category}
          </li>
})}
      </ul>
      <button onClick={() => setVisble(true)} >Remove Arrays</button>
    </div>
  );
};

export default ObjectStateExample;
