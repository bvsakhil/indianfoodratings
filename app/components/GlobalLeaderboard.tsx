import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

// Define the type for the vote data
interface Vote {
    id: string;
    food_item_id: string;
    city_id: string;
    vote_count: number;
}

const GlobalLeaderboard = () => {
    const [votes, setVotes] = useState<Vote[]>([]); // Specify the type here

    useEffect(() => {
        const fetchVotes = async () => {
            const { data, error } = await supabase
                .from('votes')
                .select('*');

            if (error) {
                console.error('Error fetching votes:', error);
            } else {
                setVotes(data);
            }
        };

        fetchVotes();
    }, []);

    return (
        <div>
            <h2>Global Leaderboard</h2>
            <ul>
                {votes.map((vote) => (
                    <li key={vote.id}>
                        {vote.city_id}: {vote.vote_count} votes for {vote.food_item_id}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GlobalLeaderboard; 