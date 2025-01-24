import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

// Define the type for the vote data
interface Vote {
    city_id: string;
    food_item_id: string;
    total_votes: number;
}

const GlobalLeaderboard = () => {
    const [votes, setVotes] = useState<Vote[]>([]);

    useEffect(() => {
        const fetchVotes = async () => {
            const { data, error } = await supabase
                .from('votes')
                .select('city_id, food_item_id, sum(vote_count) as total_votes');

            if (error) {
                console.error('Error fetching votes:', error);
            } else {
                setVotes(data as unknown as Vote[]);
            }
        };

        fetchVotes();
    }, []);

    return (
        <div>
            <h2>Global Leaderboard</h2>
            <ul>
                {votes.map((vote) => (
                    <li key={`${vote.city_id}-${vote.food_item_id}`}>
                        {vote.city_id}: {vote.total_votes} votes for {vote.food_item_id}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GlobalLeaderboard; 