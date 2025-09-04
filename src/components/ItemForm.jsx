import React, { useState } from 'react'

export default function ItemForm({ onAdd }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return alert('Please enter an item name')
    const value = Number(price)
    if (Number.isNaN(value) || value < 0) return alert('Please enter a valid non-negative price')
    const ok = onAdd(name, value)
    if (ok) { setName(''); setPrice('') }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        aria-label="Item name"
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        step="0.01"
        min="0"
        aria-label="Item price"
      />
      <button className="btn-primary" type="submit">Add Item</button>
    </form>
  )
}
