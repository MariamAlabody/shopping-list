import React, { useState } from 'react'

const priceClass = (price) => {
  // Task bonus rules (with precedence): < 20 => green; 10..50 => orange; > 50 => red
  if (price < 20) return 'green'
  if (price >= 10 && price <= 50) return 'orange'
  if (price > 50) return 'red'
  return ''
}

const normalizeName = (v) => v.trim().toLowerCase()

export default function ItemRow({ item, onDelete, onEdit, currency, allItems }) {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(item.name)
  const [price, setPrice] = useState(item.price)

  const handleSave = () => {
    const n = name.trim()
    const p = Number(price)
    if (!n) return alert('Name cannot be empty')
    if (Number.isNaN(p) || p < 0) return alert('Invalid price')

    // Duplicate prevention (case-insensitive) when renaming
    const exists = allItems.some(i => i.id !== item.id && normalizeName(i.name) === normalizeName(n))
    if (exists) return alert('Another item already has this name')

    onEdit({ name: n, price: p })
    setEditing(false)
  }

  return (
    <div className="item" role="listitem">
      <div className="name">
        {editing ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label={`Edit name for ${item.name}`}
          />
        ) : (
          item.name
        )}
      </div>

      <div className={"price " + priceClass(editing ? Number(price) : item.price)}>
        {editing ? (
          <input
            type="number"
            value={price}
            step="0.01"
            min="0"
            onChange={(e) => setPrice(e.target.value)}
            aria-label={`Edit price for ${item.name}`}
          />
        ) : (
          currency.format(item.price)
        )}
      </div>

      <div className="actions">
        {editing ? (
          <>
            <button onClick={handleSave} className="btn-primary">Save</button>
            <button onClick={() => { setEditing(false); setName(item.name); setPrice(item.price) }} className="btn-ghost">Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={onDelete} className="btn-danger">Delete</button>
          </>
        )}
      </div>
    </div>
  )
}
