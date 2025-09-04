import React from 'react'
import ItemRow from './ItemRow.jsx'

export default function ItemList({ items, onDelete, onEdit, currency, allItems }) {
  return (
    <div role="list">
      {items.map(item => (
        <ItemRow
          key={item.id}
          item={item}
          onDelete={() => onDelete(item.id)}
          onEdit={(data) => onEdit(item.id, data)}
          currency={currency}
          allItems={allItems}
        />
      ))}
    </div>
  )
}
