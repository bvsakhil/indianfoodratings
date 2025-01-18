'use client'

import { useState, useEffect } from 'react'
import CityItem from './CityItem'
import AddCityModal from './AddCityModal'
import { Plus } from 'lucide-react'

const initialIndianCities = [
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

interface CityListProps {
  foodItem: string
  searchTerm: string
  onVoteUsed: () => void
}

export default function CityList({ foodItem, searchTerm, onVoteUsed }: CityListProps) {
  const [votes, setVotes] = useState<{[key: string]: number}>({})
  const [voteCounts, setVoteCounts] = useState<{[key: string]: number}>({})
  const [userVotes, setUserVotes] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>(initialIndianCities)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const storedVotes = localStorage.getItem(`votes_${foodItem}`)
    const storedVoteCounts = localStorage.getItem(`voteCounts_${foodItem}`)
    const storedUserVotes = localStorage.getItem(`userVotes_${foodItem}`)
    const storedCities = localStorage.getItem('indianCities')
    if (storedVotes) setVotes(JSON.parse(storedVotes))
    if (storedVoteCounts) setVoteCounts(JSON.parse(storedVoteCounts))
    if (storedUserVotes) setUserVotes(JSON.parse(storedUserVotes))
    if (storedCities) setCities(JSON.parse(storedCities))
  }, [foodItem])

  const handleVote = (city: string, rating: number) => {
    if (userVotes.length >= 5 && !userVotes.includes(city)) {
      alert('You can only vote for up to 5 cities!')
      return
    }

    const newVotes = { ...votes, [city]: rating }
    setVotes(newVotes)
    localStorage.setItem(`votes_${foodItem}`, JSON.stringify(newVotes))

    const newVoteCounts = { ...voteCounts, [city]: (voteCounts[city] || 0) + 1 }
    setVoteCounts(newVoteCounts)
    localStorage.setItem(`voteCounts_${foodItem}`, JSON.stringify(newVoteCounts))

    if (!userVotes.includes(city)) {
      const newUserVotes = [...userVotes, city]
      setUserVotes(newUserVotes)
      localStorage.setItem(`userVotes_${foodItem}`, JSON.stringify(newUserVotes))
      onVoteUsed()
    }
  }

  const handleAddCity = (newCity: string) => {
    if (!cities.includes(newCity)) {
      const updatedCities = [...cities, newCity]
      setCities(updatedCities)
      localStorage.setItem('indianCities', JSON.stringify(updatedCities))
    }
  }

  const filteredCities = cities.filter(city => 
    city.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedCities = filteredCities.sort((a, b) => {
    const scoreA = votes[a] || 0
    const scoreB = votes[b] || 0
    return scoreB - scoreA
  })

  return (
    <div className="space-y-1">
      {sortedCities.map((city, index) => (
        <CityItem
          key={city}
          city={city}
          rank={index + 1}
          foodItem={foodItem}
          votes={votes[city] || 0}
          voteCount={voteCounts[city] || 0}
          onVote={(rating) => handleVote(city, rating)}
          userVoted={userVotes.includes(city)}
        />
      ))}
      {filteredCities.length === 0 && (
        <div className="text-center py-4">
          <p className="text-gray-500 mb-2">No cities found. Add a new city?</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center w-full gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
          >
            <Plus size={16} />
            <span>Add New City</span>
          </button>
        </div>
      )}
      <AddCityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddCity}
      />
    </div>
  )
}

