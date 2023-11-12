import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import dayjs from "dayjs";
import { format } from "date-fns";


const RandomGame = () => {
    const [ game, setGame ] = useState({});
    const navigate = useNavigate();
    
    const randomNumber = (x, y) => {
        return Math.floor(Math.random() * (y - x) + x);
    }

    useEffect(() => {
        axios.get(`https://api.rawg.io/api/games/${Math.floor(Math.random() * 10000)}?key=680bbc2c6e084b43a416a2a227e2c634`)
            .then(res => {
                setGame(res.data);
                console.log(res.data);
            })
            .catch(err => console.log(err))
    }, [])
    
    return (
        <div className='container'>
            <div className='buttons'>
                <button onClick={(e)=>{ navigate(`/`)}}>Go Home</button>
                <button onClick={(e)=>{ navigate(`/game/new`)}}>Add New Game</button>
                <button onClick={(e)=>{ window.location.reload() }}>Generate New Game</button>
            </div>
            <div className='randomBox'>
                <div className='topBox'>
                    <div>
                        <h1>{game.name}</h1>
                        <p>Release Date:  &nbsp;
                        {
                                dayjs(`${game.released}`).format("MMM. YYYY")
                        }
                        </p>
                    </div>
                    <div>
                        <img src={game.background_image} alt="Game Image" height="250" />
                    </div>
                </div>
                <div>
                    <p>Description: {game.description_raw}</p>
                </div>
            </div>
            <button onClick={(e)=>{ navigate(`/game/${game.name}`)}}>Own it? Add it!</button>
        </div>
    )
}

export default RandomGame;