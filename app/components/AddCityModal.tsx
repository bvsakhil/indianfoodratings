'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface AddCityModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (cityName: string) => void
}

export default function AddCityModal({ isOpen, onClose, onSubmit }: AddCityModalProps) {
  const [cityName, setCityName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (cityName.trim()) {
      onSubmit(cityName.trim())
      setCityName('')
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Add New City</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            placeholder="Enter city name"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            Add City
          </button>
        </form>
      </div>
    </div>
  )
}

