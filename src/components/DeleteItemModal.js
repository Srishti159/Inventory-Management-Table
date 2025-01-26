import React from "react";

function DeleteItemModal({ itemName, onClose, onDelete, nightMode }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className= {nightMode ? "bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full" : "bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"}>
        <h2 className= {nightMode ? "text-2xl font-semibold text-orange-300 mb-4 text-center" : "text-2xl font-semibold text-orange-900 mb-4 text-center"}>Delete Item</h2>
        <p className= {nightMode ? "text-white mb-6 text-center" : "text-gray-700 mb-6 text-center"}>
          Are you sure you want to delete the item{" "}
          <strong className= {nightMode ? "text-red-500" : "text-red-700"}>{itemName}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 text-black rounded-lg shadow hover:bg-gray-500 transition-all"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-900 transition-all"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteItemModal;
