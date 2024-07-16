import React from 'react';

const Item = ({ id, name, description, onDelete }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
};

export default Item;