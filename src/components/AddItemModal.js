import React, { useState } from "react";

function AddItemModal({ onClose, onAdd, nightMode }) {
  const [item, setItem] = useState({ name: "", category: "", quantity: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item.name && item.category && item.quantity) {
      onAdd({ ...item, quantity: parseInt(item.quantity, 10) });
      onClose();
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className= {nightMode ? "bg-gray-800 p-6 rounded-lg shadow-lg w-96" : "bg-gray-200 p-6 rounded-lg shadow-lg w-96"}>
        <h2 className= {nightMode ? "text-3xl font-semibold text-orange-200 text-center mb-4" : "text-3xl font-semibold text-orange-900 text-center mb-4"}>Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-black-600 mb-2">
              Name
            </label>
            <input
              type="text"
              className={`w-full p-2 mb-4 border rounded ${
                nightMode ? "bg-gray-700 text-white border-gray-600" : "border-gray-300"
              }`}
              value={item.name}
              onChange={(e) => setItem({ ...item, name: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-black-600 mb-2">
              Category
            </label>
            <input
              type="text"
              className={`w-full p-2 mb-4 border rounded ${
                nightMode ? "bg-gray-700 text-white border-gray-600" : "border-gray-300"
              }`}
              value={item.category}
              onChange={(e) => setItem({ ...item, category: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-black-600 mb-2">
              Quantity
            </label>
            <input
              type="number"
              className={`w-full p-2 mb-4 border rounded ${
                nightMode ? "bg-gray-700 text-white border-gray-600" : "border-gray-300"
              }`}
              value={item.quantity}
              onChange={(e) => setItem({ ...item, quantity: e.target.value })}
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-800 transition-all"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-900 transition-all"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItemModal;
