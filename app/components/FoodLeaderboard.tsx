'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, Info, Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import CityList from './CityList'
import AddFoodModal from './AddFoodModal'

const initialFoodItems = [
  { id: 'pani-puri', name: 'Pani Puri', icon: '🥘' },
  { id: 'chai', name: 'Chai', icon: '☕' },
  { id: 'biryani', name: 'Biryani', icon: '🍚' },
  { id: 'dosa', name: 'Dosa', icon: '🥞' },
  { id: 'samosa', name: 'Samosa', icon: '🔺' },
  { id: 'butter-chicken', name: 'Butter Chicken', icon: '🍗' },
  { id: 'chole-bhature', name: 'Chole Bhature', icon: '🥘' },
  { id: 'vada-pav', name: 'Vada Pav', icon: '🍔' },
]

const initialCities = [
  'Aalo', 'Agartala', 'Agra', 'Ahmedabad', 'Aizawl', 
  'Ajmer', 'Amritsar', 'Asansol', 'Baghmara', 'Baddi', 
  'Bengaluru', 'Belagavi', 'Belonia', 'Berhampur', 'Bhagalpur', 
  'Bharatpur', 'Bhopal', 'Bhubaneswar', 'Bikaner', 'Bilaspur', 
  'Bishnupur', 'Bokaro Steel City', 'Champhai', 'Chennai', 'Churachandpur', 
  'Coimbatore', 'Cuttack', 'Dehradun', 'Deoghar', 'Dhanbad', 
  'Dharamshala', 'Dharmanagar', 'Dibrugarh', 'Dimapur', 'Durg-Bhilai Nagar', 
  'Durgapur', 'Faridabad', 'Gangtok', 'Gaya', 'Ghaziabad', 
  'Guntur', 'Guwahati', 'Gwalior', 'Gyalshing', 'Haldwani', 
  'Haridwar', 'Howrah', 'Hubballi-Dharwad', 'Hyderabad', 'Imphal', 
  'Indore', 'Itanagar', 'Jabalpur', 'Jaipur', 'Jalandhar', 
  'Jamshedpur', 'Jodhpur', 'Jorhat', 'Kanpur', 'Kailashahar', 
  'Karimnagar', 'Khammam', 'Kochi', 'Kolkata', 'Kollam', 
  'Kota', 'Kozhikode', 'Kurnool', 'Lucknow', 'Ludhiana', 
  'Lunglei', 'Madurai', 'Mangaluru', 'Mangan', 'Margao', 
  'Mapusa', 'Muzaffarpur', 'Mumbai', 'Mysuru', 'Naharlagun', 
  'Nagaon', 'Nagpur', 'Namchi', 'Nashik', 'Nellore', 
  'Nizamabad', 'Nongstoin', 'Panaji', 'Panipat', 'Pasighat', 
  'Patiala', 'Patna', 'Ponda', 'Pune', 'Purnia', 
  'Raipur', 'Rajkot', 'Rajnandgaon', 'Ranchi', 'Roorkee', 
  'Rourkela', 'Rudrapur', 'Saiha', 'Salem', 'Sambalpur', 
  'Serchhip', 'Shillong', 'Shimla', 'Siliguri', 'Singtam', 
  'Solan', 'Surat', 'Tawang', 'Thane', 'Thiruvananthapuram', 
  'Thoubal', 'Thrissur', 'Tiruchirappalli', 'Tura', 'Tuensang', 
  'Udaipur', 'Ujjain', 'Ukhrul', 'Vadodara', 'Varanasi', 
  'Vasco da Gama', 'Vijayawada', 'Visakhapatnam', 'Warangal', 'Wokha', 
  'Yamunanagar'
]

export default function FoodLeaderboard() {
  const [foodItems, setFoodItems] = useState(initialFoodItems)
  const [activeTab, setActiveTab] = useState(foodItems[0].id)
  const [remainingVotes, setRemainingVotes] = useState(5)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const storedFoodItems = localStorage.getItem('foodItems')
    const storedCities = localStorage.getItem('cities')
    
    if (!storedFoodItems) {
      localStorage.setItem('foodItems', JSON.stringify(initialFoodItems.map(item => item.id)))
    }
    
    let cities = initialCities
    if (storedCities) {
      const parsedStoredCities = JSON.parse(storedCities)
      cities = Array.from(new Set([...parsedStoredCities, ...initialCities]))
    }
    localStorage.setItem('cities', JSON.stringify(cities))

    // Initialize leaderboards for all food items and cities
    const foodItemIds = JSON.parse(storedFoodItems || JSON.stringify(initialFoodItems.map(item => item.id)))

    foodItemIds.forEach((foodItem: string) => {
      let votes = {}
      let voteCounts = {}
      const storedVotes = localStorage.getItem(`votes_${foodItem}`)
      const storedVoteCounts = localStorage.getItem(`voteCounts_${foodItem}`)

      if (storedVotes && storedVoteCounts) {
        votes = JSON.parse(storedVotes)
        voteCounts = JSON.parse(storedVoteCounts)
      }

      cities.forEach((city: string) => {
        if (!(city in votes)) {
          votes[city] = 0
        }
        if (!(city in voteCounts)) {
          voteCounts[city] = 0
        }
      })

      localStorage.setItem(`votes_${foodItem}`, JSON.stringify(votes))
      localStorage.setItem(`voteCounts_${foodItem}`, JSON.stringify(voteCounts))
    })
  }, [])

  useEffect(() => {
    const storedUserVotes = localStorage.getItem(`userVotes_${activeTab}`)
    const userVotes = storedUserVotes ? JSON.parse(storedUserVotes) : []
    setRemainingVotes(5 - userVotes.length)
  }, [activeTab]);

  const handleAddFood = (newFoodName: string) => {
    const newFood = {
      id: newFoodName.toLowerCase().replace(/\s+/g, '-'),
      name: newFoodName,
      icon: '🍽️' // Default icon
    }
    const updatedFoodItems = [...foodItems, newFood]
    setFoodItems(updatedFoodItems)
    setActiveTab(newFood.id)

    // Update foodItems in localStorage
    localStorage.setItem('foodItems', JSON.stringify(updatedFoodItems.map(item => item.id)))

    // Initialize leaderboard for the new food item
    const cities = JSON.parse(localStorage.getItem('cities') || '[]')
    const initialVotes: {[key: string]: number} = {}
    const initialVoteCounts: {[key: string]: number} = {}
    cities.forEach((city: string) => {
      initialVotes[city] = 0
      initialVoteCounts[city] = 0
    })
    localStorage.setItem(`votes_${newFood.id}`, JSON.stringify(initialVotes))
    localStorage.setItem(`voteCounts_${newFood.id}`, JSON.stringify(initialVoteCounts))
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

  return (
    <div className="space-y-4">
      <div className="relative border-b border-dashed border-gray-300 pb-2">
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
        <span className="text-xs">{remainingVotes} votes remaining for {foodItems.find(item => item.id === activeTab)?.name}</span>
      </div>

      <CityList 
        foodItem={activeTab} 
        searchTerm={searchTerm}
        onVoteUsed={() => setRemainingVotes(prev => Math.max(0, prev - 1))} 
        remainingVotes={remainingVotes}
        setRemainingVotes={setRemainingVotes}
      />

      <AddFoodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddFood}
      />
    </div>
  )
}

