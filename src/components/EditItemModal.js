import React, { useState } from "react";

function EditItemModal({ item, onClose, onSave, nightMode }) {
  const [updatedItem, setUpdatedItem] = useState(item);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updatedItem.name && updatedItem.category && updatedItem.quantity) {
      onSave(updatedItem.id, {
        name: updatedItem.name,
        category: updatedItem.category,
        quantity: parseInt(updatedItem.quantity, 10),
      });
      onClose();
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className={nightMode ? "bg-gray-800 p-6 rounded-lg shadow-lg w-96" : "bg-gray-200 p-6 rounded-lg shadow-lg w-96"}>
        <h2 className={nightMode ? "text-3xl font-semibold text-orange-200 text-center mb-4" : "text-3xl font-semibold text-orange-900 text-center mb-4"}>
          Edit Item
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-black-600 mb-2">Name</label>
            <input
              type="text"
              className={`w-full p-2 mb-4 border rounded ${
                nightMode ? "bg-gray-700 text-white border-gray-600" : "border-gray-300"
              }`}
              value={updatedItem.name}
              onChange={(e) =>
                setUpdatedItem({ ...updatedItem, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black-600 mb-2">
              Category
            </label>
            <input
              type="text"
              className={`w-full p-2 mb-4 border rounded ${
                nightMode ? "bg-gray-700 text-white border-gray-600" : "border-gray-300"
              }`}
              value={updatedItem.category}
              onChange={(e) =>
                setUpdatedItem({ ...updatedItem, category: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black-600 mb-2">
              Quantity
            </label>
            <input
              type="number"
              className={`w-full p-2 mb-4 border rounded ${
                nightMode ? "bg-gray-700 text-white border-gray-600" : "border-gray-300"
              }`}
              value={updatedItem.quantity}
              onChange={(e) =>
                setUpdatedItem({ ...updatedItem, quantity: e.target.value })
              }
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditItemModal;
