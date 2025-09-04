
# Shopping List — React + Vite

A professional, modern Shopping List app that lets you add items with prices, view them in a list, and see a running total.

**Bonus features implemented** (from the task):
- Color-coded prices:
  - Green if price is **less than $20**
  - Orange if price is **between $10 and $50**
  - Red if price is **greater than $50**
  - *Note*: If a price falls in both "less than $20" and "between $10 and $50", green takes precedence.
- Prevent duplicates by name (case-insensitive). If a duplicate is entered, an alert is shown and the item is not added.
- Inline **Edit** for each item (change name or price). Duplicate names are prevented on rename as well.

**Extra niceties**
- LocalStorage persistence
- Search, sorting, delete item, and clear-all
- Accessible labels and keyboard-friendly inputs
- Clean modern UI without external CSS frameworks

## Quick start

1. Ensure you have **Node.js 18+** installed.
2. Inside this folder, run:
   ```bash
   npm install
   npm run dev
   ```
3. Open the local URL printed in your terminal.

## File structure

```
shopping-list-vite/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── styles.css
│   ├── utils/
│   │   └── storage.js
│   └── components/
│       ├── ItemForm.jsx
│       ├── ItemList.jsx
│       └── ItemRow.jsx
└── README.md
```

## Notes

- Prices are formatted using your system locale with USD as the currency.
- Data is stored in `localStorage` under the `items` key.
- Designed to be easy to extend (e.g., add quantity, categories, export/import JSON).
