'use client'

import { useState, useEffect } from 'react'
import CityItem from './CityItem'
import AddCityModal from './AddCityModal'
import { Plus } from 'lucide-react'

interface CityListProps {
  foodItem: string
  searchTerm: string
  onVoteUsed: () => void
  remainingVotes: number
}

export default function CityList({ foodItem, searchTerm, onVoteUsed, remainingVotes }: CityListProps) {
  const [cities, setCities] = useState<string[]>([])
  const [votes, setVotes] = useState<{[key: string]: number}>({})
  const [voteCounts, setVoteCounts] = useState<{[key: string]: number}>({})
  const [userVotes, setUserVotes] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const storedCities = localStorage.getItem('cities')
    const storedVotes = localStorage.getItem(`votes_${foodItem}`)
    const storedVoteCounts = localStorage.getItem(`voteCounts_${foodItem}`)
    const storedUserVotes = localStorage.getItem(`userVotes_${foodItem}`)
    if (storedCities) setCities(JSON.parse(storedCities))
    if (storedVotes) setVotes(JSON.parse(storedVotes))
    if (storedVoteCounts) setVoteCounts(JSON.parse(storedVoteCounts))
    if (storedUserVotes) setUserVotes(JSON.parse(storedUserVotes))
  }, [foodItem])

  const handleVote = (city: string, rating: number) => {
    if (userVotes.length >= 5 && !userVotes.includes(city)) {
      alert(`You can only vote for up to 5 cities for ${foodItem}!`)
      return
    }

    if (userVotes.includes(city)) {
      alert(`You have already voted for ${city} in this category!`)
      return
    }

    const newVotes = { ...votes, [city]: rating }
    setVotes(newVotes)
    localStorage.setItem(`votes_${foodItem}`, JSON.stringify(newVotes))

    const newVoteCounts = { ...voteCounts, [city]: (voteCounts[city] || 0) + 1 }
    setVoteCounts(newVoteCounts)
    localStorage.setItem(`voteCounts_${foodItem}`, JSON.stringify(newVoteCounts))

    const newUserVotes = [...userVotes, city]
    setUserVotes(newUserVotes)
    localStorage.setItem(`userVotes_${foodItem}`, JSON.stringify(newUserVotes))
    onVoteUsed()
  }

  const handleAddCity = (newCity: string) => {
    if (!cities.includes(newCity)) {
      const newCities = [...cities, newCity]
      setCities(newCities)
      localStorage.setItem('cities', JSON.stringify(newCities))

      // Initialize leaderboard for the new city for all food items
      const foodItems = JSON.parse(localStorage.getItem('foodItems') || '[]')
      foodItems.forEach((item: string) => {
        const itemVotes = JSON.parse(localStorage.getItem(`votes_${item}`) || '{}')
        const itemVoteCounts = JSON.parse(localStorage.getItem(`voteCounts_${item}`) || '{}')
        itemVotes[newCity] = 0
        itemVoteCounts[newCity] = 0
        localStorage.setItem(`votes_${item}`, JSON.stringify(itemVotes))
        localStorage.setItem(`voteCounts_${item}`, JSON.stringify(itemVoteCounts))
      })
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
          remainingVotes={remainingVotes}
          canVote={!userVotes.includes(city) && userVotes.length < 5}
        />
      ))}
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full py-2 px-4 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
      >
        <Plus size={16} className="mr-2" />
        Add City
      </button>
      <AddCityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddCity}
      />
    </div>
  )
}

