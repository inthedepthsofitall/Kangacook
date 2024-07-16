import React, { useState, useEffect } from 'react';
import Item from './item';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');

  useEffect(() => {
    fetch('/api/items')
     .then(response => response.json())
     .then(data => setItems(data));
  }, []);

  const handleAddItem = () => {
    fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newItemName, description: newItemDescription }),
    })
     .then(response => response.json())
     .then(data => setItems([...items, data]));
    setNewItemName('');
    setNewItemDescription('');
  };

  const handleDeleteItem = id => {
    fetch(`/api/items/${id}`, { method: 'DELETE' })
     .then(response => response.json())
     .then(() => setItems(items.filter(item => item.id!== id)));
  };

  return (
    <div>
      <h1>Item List</h1>
      <form>
        <input
          type="text"
          value={newItemName}
          onChange={e => setNewItemName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={newItemDescription}
          onChange={e => setNewItemDescription(e.target.value)}
          placeholder="Description"
        />
        <button onClick={handleAddItem}>Add Item</button>
      </form>
      <ul>
        {items.map(item => (
          <Item key={item.id} {...item} onDelete={handleDeleteItem} />
        ))}
      </ul>
    </div>
  );
};

export default ItemList;