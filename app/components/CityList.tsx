'use client'

import { useState, useEffect } from 'react'
import CityItem from './CityItem'

const indianCities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 
  'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 
  'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 
  'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 
  'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivli', 'Vasai-Virar', 
  'Varanasi', 'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar', 
  'Navi Mumbai', 'Allahabad', 'Ranchi', 'Howrah', 'Coimbatore', 
  'Jabalpur', 'Gwalior', 'Vijayawada', 'Jodhpur', 'Madurai', 'Raipur', 
  'Kota', 'Guwahati', 'Chandigarh', 'Solapur', 'Hubballi-Dharwad'
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

  useEffect(() => {
    const storedVotes = localStorage.getItem(`votes_${foodItem}`)
    const storedVoteCounts = localStorage.getItem(`voteCounts_${foodItem}`)
    const storedUserVotes = localStorage.getItem(`userVotes_${foodItem}`)
    if (storedVotes) setVotes(JSON.parse(storedVotes))
    if (storedVoteCounts) setVoteCounts(JSON.parse(storedVoteCounts))
    if (storedUserVotes) setUserVotes(JSON.parse(storedUserVotes))
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

  const filteredCities = indianCities.filter(city => 
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
    </div>
  )
}

