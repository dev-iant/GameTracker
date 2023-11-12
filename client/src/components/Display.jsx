import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from "dayjs";
import { format } from "date-fns";

const Display = (props) => {
    const { removeFromDom, games , setGames } = props
    const [allGames, setAllGames] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:8000/api/games')
            .then(res => {
                console.log(res.data)
                setGames(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const deleteGame = (id) => {
        axios.delete(`http://localhost:8000/api/games/${id}`)
            .then(res => {
                console.log(res)
                removeFromDom(id)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className='container'>
            <h1>Game Collection</h1>
            <div className='buttons'>
                <button onClick={(e)=>{ navigate(`/game/new`)}}>Add Game</button>
                <button onClick={(e)=>{ navigate(`/game/random`)}}>View Random Entry</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Platform</th>
                        <th>Purchase Date</th>
                        <th>Notes</th>
                        <th>Price</th>
                        <th>Edit?</th>
                        <th>Delete?</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        games.map((game) => (
                            <tr key={game._id}>
                                <td><Link to={`/game/view/${game._id}`}>{game.title}</Link></td>
                                <td>{game.platform}</td>
                                <td>
                                {
                                dayjs(`${game.purchaseDate}`).format("MMM. YYYY")
                                }
                                </td>
                                <td>{game.notes}</td>
                                <td>${game.price}</td>
                                <td><p className='pointer' onClick={ (e) => {navigate(`/game/edit/${game._id}`)} }>Edit</p></td>
                                <td><p className='pointer' onClick={ (e) => {deleteGame(game._id)} } >Delete</p></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Display;