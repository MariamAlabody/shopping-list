import React, { useMemo, useState, useEffect } from 'react'
import ItemForm from './components/ItemForm.jsx'
import ItemList from './components/ItemList.jsx'
import { load, save } from './utils/storage.js'

const CURRENCY = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' })

const normalizeName = (name) => name.trim().toLowerCase()

export default function App() {
  const [items, setItems] = useState(() => load('items', []))
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('newest')

  useEffect(() => save('items', items), [items])

  const addItem = (name, price) => {
    const key = normalizeName(name)
    const exists = items.some(i => normalizeName(i.name) === key)
    if (exists) {
      alert('Duplicate item name. Choose a different name.')
      return false
    }
    const item = { id: crypto.randomUUID(), name: name.trim(), price: Number(price), createdAt: Date.now() }
    setItems(prev => [item, ...prev])
    return true
  }

  const updateItem = (id, data) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, ...data } : i))
  }

  const removeItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const clearAll = () => {
    if (confirm('Clear all items?')) setItems([])
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const base = q ? items.filter(i => i.name.toLowerCase().includes(q)) : items
    const sorted = [...base]
    if (sort === 'newest') sorted.sort((a, b) => b.createdAt - a.createdAt)
    if (sort === 'oldest') sorted.sort((a, b) => a.createdAt - b.createdAt)
    if (sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)
    return sorted
  }, [items, query, sort])

  const total = useMemo(() => items.reduce((sum, i) => sum + Number(i.price || 0), 0), [items])

  return (
    <div className="container">
      <div className="header">
        <h1>Shopping List</h1>
        <span className="badge">React + Vite</span>
      </div>

      <div className="card">
        <ItemForm onAdd={addItem} />

        <div className="tools">
          <input
            type="text"
            placeholder="Search items…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search items"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort items"
            style={{
              padding: "12px 14px",
              borderRadius: "12px",
              background: "#0d1525",
              color: "var(--text)",
              border: "1px solid rgba(255,255,255,0.12)"
            }}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="name">Name (A→Z)</option>
            <option value="price-asc">Price (low→high)</option>
            <option value="price-desc">Price (high→low)</option>
          </select>
          <button className="btn-ghost" onClick={clearAll} title="Clear all items">Clear All</button>
        </div>

        <div className="list">
          {filtered.length === 0 ? (
            <div className="empty">No items yet. Add your first item above.</div>
          ) : (
            <ItemList
              items={filtered}
              onDelete={removeItem}
              onEdit={updateItem}
              currency={CURRENCY}
              allItems={items}
            />
          )}
        </div>

        <div className="footer">
          <div className="summary">
            <span>Items: {items.length}</span>
            <span className="total">Total: {CURRENCY.format(total)}</span>
          </div>
          <small style={{ color: 'var(--muted)' }}>
            Bonus: color-coded prices, duplicate prevention, inline edit, search, sorting, persistence
          </small>
        </div>
      </div>
    </div>
  )
}
