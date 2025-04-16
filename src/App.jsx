import { useState } from "react";
// import logo from "./assets/logo-dark.svg";
// import viteLogo from "/vite.svg";
// <img src="/vite.svg" alt="Vite logo" />
// import "./App.css";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: false },
];

export default function App() {
  return(
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  )
}

function Logo() {
  return(
    <h1>🌴 Far Away 🎒👜</h1>
  )
}

function Form() {

  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    // When description empty return early
    // Guard clause
    if (description === "") return;

    const newItem = {description, quantity, packed: false, id: Date.now()};
    console.log(newItem)

    // Reset form to empty
    setDescription("");
    setQuantity(1);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={e => setQuantity(Number(e.target.value))}>
        {
          // Create array from 1 to 20 then map each number to option tags
          // e.g. <option value=1>1</option>
          Array.from({length: 20}, (_, i) => i + 1)
            .map(num => 
              <option value={num} key={num}>{num}</option>
            )
        }
      </select>
      <input type="text" placeholder="Item..." value={description} onChange={e => setDescription(e.target.value)} />
      <button>Add</button>
    </form>
  );
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        {
          initialItems.map(item => 
            <Item item={item} key={item.id} />
          )
        }
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? {textDecoration: "line-through"} : null}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  )
}

function Stats() {
  return (
    <footer className="stats">
      <em>🎒 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}
