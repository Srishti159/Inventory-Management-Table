import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig"; // Import Firebase configuration
import AddItemModal from "./AddItemModal";
import EditItemModal from "./EditItemModal";
import DeleteItemModal from "./DeleteItemModal";
import '../styles.css';

function InventoryTable() {
  const [items, setItems] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [filterCategory, setFilterCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [nightMode, setNightMode] = useState(false); // State to manage night mode
  
  const fetchItems = async () => {
    const snapshot = await getDocs(collection(db, "inventory"));
    const itemList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setItems(itemList);
  };

  useEffect(() => {
    fetchItems();
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setNightMode(storedTheme === 'dark');
    }
  }, []);

  const addItem = async (item) => {
    await addDoc(collection(db, "inventory"), item);
    fetchItems();
  };

  const updateItem = async (id, updatedItem) => {
    await updateDoc(doc(db, "inventory", id), updatedItem);
    fetchItems();
  };

  const deleteItemWithConfirmation = async (id) => {
    await deleteDoc(doc(db, "inventory", id));
    fetchItems();
    setDeleteItem(null);
  };

  const filteredItems = items.filter((item) =>
    filterCategory ? item.category.toLowerCase().includes(filterCategory.toLowerCase()) : true
  );

  const sortedItems = [...filteredItems].sort((a, b) =>
    sortOrder === "asc" ? a.quantity - b.quantity : b.quantity - a.quantity
  );

  const toggleNightMode = () => {
    setNightMode(!nightMode);
    localStorage.setItem('theme', !nightMode ? 'dark' : 'light'); // Save theme preference
  };

  return (
    <div className={nightMode ? "bg-gray-900 text-white min-h-screen p-6" : "bg-gradient-to-r from-red-300 via-coral-300 to-emerald-300 min-h-screen p-6"}>
      <div className={nightMode ? "max-w-7xl mx-auto bg-gray-800 bg-opacity-90 shadow-xl rounded-lg p-6" : "max-w-7xl mx-auto bg-white bg-opacity-30 shadow-xl rounded-lg p-6"}>
        <h1 className={nightMode ? 
          "text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-coral-200 to-emerald-400 mb-8 text-center leading-tight" 
          : 
          "text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-coral-400 to-emerald-600 mb-8 text-center leading-tight"}
          style={{ fontFamily: "'Ubuntu', sans-serif" }}>
          Inventory Table  <span className="text-black"> 📦 </span>
        </h1>
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Filter by category"
            className={nightMode ? "border border-gray-600 bg-gray-700 text-white rounded-md p-3 w-1/3 shadow-md focus:outline-none focus:ring-2 focus:ring-rose-200" : "border border-gray-300 bg-white rounded-md p-3 w-1/3 bg-opacity-80 shadow-md focus:outline-none focus:ring-2 focus:ring-rose-300"}
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          />
          <button
            className={nightMode ? "bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-emerald-900 transition-all ease-in-out duration-300" : "bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-emerald-900 transition-all ease-in-out duration-300"}
            onClick={() => setAddModalOpen(true)}
          >
            + Add Item
          </button>
        </div>
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
          <table className={nightMode ? "min-w-full bg-gray-800 rounded-lg shadow-md border-collapse text-white" : "min-w-full bg-white rounded-lg shadow-md border-collapse"}>
            <thead >
              <tr className={nightMode ? "bg-gray-600 text-white uppercase text-sm leading-normal" : "bg-gray-200 text-black uppercase text-sm leading-normal"}>
                <th className="py-4 px-6 text-left">Name</th>
                <th className="py-4 px-6 text-left">Category</th>
                <th className="py-4 px-6 text-left flex items-center justify-center">Quantity
                  <button
                    className={nightMode ? "flex items-center text-white hover:text-gray-700 focus:outline-none transition-all duration-300 ease-in-out ml-1" : "flex items-center text-black hover:text-white focus:outline-none transition-all duration-300 ease-in-out ml-1"}
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  >
                    <span className="text-sm">{sortOrder === "asc" ? "↑" : "↓"}</span>
                  </button>
                </th>
                <th className={nightMode ? "py-4 px-6 text-center" : "py-4 px-6 text-center text-black"}>Actions</th>
              </tr>
            </thead>
            <tbody className={nightMode ? "text-white text-sm font-light bg-gray-800" : "text-black text-sm font-light bg-white"}>
              {sortedItems.map((item) => (
                <tr 
                  key={item.id} 
                  className={ `relative group ${
                    nightMode ? "bg-gray-800 hover:bg-gray-700 transition-all duration-300" : "bg-white hover:bg-gray-100 transition-all duration-300"
                  }`}
                >
                  <td className="py-3 px-6 text-left">{item.name}</td>
                  <td className="py-3 px-6 text-left">{item.category}</td>
                  <td className="py-3 px-6 text-center">{item.quantity}
                    {/* Low Stock Icon */}
                    {item.quantity < 10 && (
                      <span className="ml-2 text-red-500 font-bold">⚠</span>  /* ⚠ Icon */
                    )}
                  </td>
                  
                  <td className="py-3 px-6 text-center">
                    <button
                      className={nightMode ? "bg-amber-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-amber-900 transition-all mr-2" : "bg-amber-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-amber-900 transition-all mr-2"}
                      onClick={() => setEditItem(item)}
                    >
                      Edit
                    </button>
                    <button
                      className={nightMode ? "bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-900 transition-all" : "bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-900 transition-all"}
                      onClick={() => setDeleteItem(item)}
                    >
                      Delete
                    </button>
                  </td>
                  {/* Tooltip for Low Stock Alert */}
                  {item.quantity < 10 && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-4 ml-10 px-2 py-1 text-xs text-white bg-red-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Low Stock!
                    </div>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {addModalOpen && (
        <AddItemModal 
          onClose={() => setAddModalOpen(false)} 
          onAdd={addItem}
          nightMode={nightMode} 
        />
      )}
      {editItem && (
        <EditItemModal
          item={editItem}
          onClose={() => setEditItem(null)}
          onSave={updateItem}
          nightMode={nightMode}
        />
      )}
      {deleteItem && (
        <DeleteItemModal
          itemName={deleteItem.name}
          onClose={() => setDeleteItem(null)}
          onDelete={() => deleteItemWithConfirmation(deleteItem.id)}
          nightMode={nightMode}
        />
      )}
      <button
        onClick={toggleNightMode}
        className={nightMode ? "fixed top-14 right-8 p-4 bg-emerald-800 text-white rounded-full shadow-md hover:bg-emerald-500 transition-all" : "fixed top-14 right-8 p-4 bg-teal-500 text-white rounded-full shadow-md hover:bg-teal-700 transition-all"}
      >
        {nightMode ? "🌙" : "🌞"}
      </button>
    </div>
  );
}

export default InventoryTable;
