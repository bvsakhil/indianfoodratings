'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface AddFoodModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (foodName: string) => void
}

export default function AddFoodModal({ isOpen, onClose, onSubmit }: AddFoodModalProps) {
  const [foodName, setFoodName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (foodName.trim()) {
      onSubmit(foodName.trim())
      setFoodName('')
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Add New Food Item</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            placeholder="Enter food item name"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

