import React, { useState } from 'react'
import axios from 'axios';
import Form from '../components/Form';
import Display from '../components/Display';

const Home = () => {
    const [ games, setGames ] = useState([])

    const removeFromDom = gameId => {
        setGames(games.filter(items => items._id != gameId))}

    return (
        <div>
            <Display games={games} setGames={setGames} removeFromDom={removeFromDom} />
        </div>
    )
}

export default Home