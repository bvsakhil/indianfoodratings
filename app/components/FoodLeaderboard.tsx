'use client'

import { useState } from 'react'
import { Search, Info, Plus } from 'lucide-react'
import CityList from './CityList'
import AddFoodModal from './AddFoodModal'

const initialFoodItems = [
  { id: 'pani-puri', name: 'Pani Puri', icon: '🥘' },
  { id: 'chai', name: 'Chai', icon: '☕' },
  { id: 'biryani', name: 'Biryani', icon: '🍚' }
]

export default function FoodLeaderboard() {
  const [foodItems, setFoodItems] = useState(initialFoodItems)
  const [activeTab, setActiveTab] = useState(foodItems[0].id)
  const [remainingVotes, setRemainingVotes] = useState(5)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddFood = (newFoodName: string) => {
    const newFood = {
      id: newFoodName.toLowerCase().replace(/\s+/g, '-'),
      name: newFoodName,
      icon: '🍽️' // Default icon
    }
    setFoodItems([...foodItems, newFood])
    setActiveTab(newFood.id)
  }

  return (
    <div className="space-y-4">
      <div className="flex border-b border-dashed border-gray-300 pb-2 overflow-x-auto">
        {foodItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-1 px-2 py-1 rounded text-sm font-medium transition-colors mr-2 whitespace-nowrap
              ${activeTab === item.id 
                ? 'bg-gray-200 text-gray-800' 
                : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1 px-2 py-1 rounded text-sm font-medium transition-colors mr-2 text-gray-600 hover:bg-gray-100"
        >
          <Plus size={16} />
          <span>Add New</span>
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search by state..."
          className="w-full pl-10 pr-4 py-2 rounded border border-gray-300 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2 text-gray-600 py-2">
        <Info className="w-4 h-4" />
        <span className="text-xs">{remainingVotes} votes remaining</span>
      </div>

      <CityList 
        foodItem={activeTab} 
        searchTerm={searchTerm}
        onVoteUsed={() => setRemainingVotes(prev => Math.max(0, prev - 1))} 
      />

      <AddFoodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddFood}
      />
    </div>
  )
}

