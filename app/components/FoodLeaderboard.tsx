'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, Info, Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import CityList from './CityList'
import AddFoodModal from './AddFoodModal'

const initialFoodItems = [
  { id: 'dosa', name: 'Dosa', votes: 0 },
  { id: 'biryani', name: 'Biryani', votes: 0 },
  { id: 'samosa', name: 'Samosa', votes: 0 },
  { id: 'pani-puri', name: 'Pani Puri', votes: 0 },
  { id: 'chai', name: 'Chai', votes: 0 },
  { id: 'butter-chicken', name: 'Butter Chicken', votes: 0 },
  { id: 'chole-bhature', name: 'Chole Bhature', votes: 0 },
  { id: 'vada-pav', name: 'Vada Pav', votes: 0 },
]

// Function to set a cookie
const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

// Function to check if a cookie exists
const hasCookie = (name: string) => {
    return document.cookie.split('; ').some((item) => item.trim().startsWith(`${name}=`));
};

// Function to save a vote in local storage
const saveVoteToLocalStorage = (foodItemId: string, cityId: string) => {
    const votes = JSON.parse(localStorage.getItem(`votes_${foodItemId}`)) || {};
    votes[cityId] = (votes[cityId] || 0) + 1; // Increment vote count for the city
    localStorage.setItem(`votes_${foodItemId}`, JSON.stringify(votes));
};

export default function FoodLeaderboard() {
  const [foodItems, setFoodItems] = useState(initialFoodItems)
  const [activeTab, setActiveTab] = useState(foodItems[0].id)
  const [remainingVotes, setRemainingVotes] = useState(5)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [votes, setVotes] = useState({}) // State to hold votes

  useEffect(() => {
    // Check if window is defined to access localStorage
    if (typeof window !== 'undefined') {
      const storedVotes = JSON.parse(localStorage.getItem(`votes_${activeTab}`)) || {};
      setVotes(storedVotes);
    }
  }, [activeTab]);

  const handleAddFood = (newFoodName: string) => {
    const newFood = {
      id: newFoodName.toLowerCase().replace(/\s+/g, '-'),
      name: newFoodName,
      votes: 0 // Initialize votes for new food item
    }
    setFoodItems([...foodItems, newFood])
    setActiveTab(newFood.id)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const handleVote = (cityId: string) => {
    if (!hasCookie(`vote_${activeTab}_${cityId}`)) {
        saveVoteToLocalStorage(activeTab, cityId); // Save vote in local storage
        setCookie(`vote_${activeTab}_${cityId}`, '1', 365); // Set cookie for 1 year
        alert(`You voted for city ID: ${cityId}`);
    } else {
        alert('You have already voted for this city.');
    }
  };

  return (
    <div className="space-y-4">
      <div className="sticky top-0 bg-white z-10 border-b border-dashed border-gray-300 pb-2">
        <div className="flex items-center">
          <div className="w-8 bg-white z-10">
            <button
              onClick={() => scroll('left')}
              className="p-1 w-full h-full flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div 
            ref={scrollContainerRef}
            className="flex-1 overflow-x-auto scrollbar-hide space-x-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex px-2">
              {foodItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-colors whitespace-nowrap mx-1
                    ${activeTab === item.id 
                      ? 'bg-gray-200 text-gray-800' 
                      : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="w-24 bg-white flex items-center justify-end z-10">
            <button
              onClick={() => scroll('right')}
              className="p-1 w-8 h-full flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium transition-colors text-gray-600 hover:bg-gray-100"
            >
              <Plus size={16} />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>

      <div className="sticky top-12 bg-white z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search your city..."
            className="w-full pl-10 pr-4 py-2 rounded border border-gray-300 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
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

