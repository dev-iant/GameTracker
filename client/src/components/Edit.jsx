import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Edit = (props) => {
    const navigate = useNavigate()
    const [error, setError] = useState([]);
    const {id} = useParams();
    const [ game, setGame ] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8000/api/games/' + id)
            .then(res => {
                setGame(res.data.game);
                console.log(game);
            })
            .catch(err => console.log(err))
    }, [])

    const updateGame = (e) => {
        e.preventDefault();
        axios.patch('http://localhost:8000/api/games/' + id, {
            title: game.title,    // this is shortcut syntax for firstName: firstName,
            price: game.price,      // this is shortcut syntax for lastName: lastName
            notes: game.notes,
            purchaseDate: game.purchaseDate,
            platform: game.platform
        })
            .then(res => {
                console.log(res);
                setError([])
                navigate("/"); // this will take us back to the Main.js
            })
            .catch(err => {
                console.log(err.response.data.error.errors);
                setError(err.response.data.error.errors);
            })
    }

    const handleChange = (e) => {
        setGame({...game, [e.target.name]: e.target.value})
    }

    const clearForm = () => {
        setGame({
            title: '',
            price: 0,
            notes: '',
            purchaseDate: '',
            platform: '',
        })
    }

    const deleteGame = (id) => {
        axios.delete(`http://localhost:8000/api/games/${id}`)
            .then(res => {
                console.log(res)
                navigate('/')
            })
            .catch(err => {
                console.log(err)
            })
    }

    return(
        <div className='container'>
            <h1 className='title'>Edit Game</h1>
            <div className='buttons'>
                <button onClick={(e)=>{ navigate(`/`)}}>Go Home</button>
                <button onClick={clearForm}>Clear Form</button>
                <button onClick={(e) => {deleteGame(id)}}>Delete Game</button>
            </div>
            <div className='bottomBox'>
                <form onSubmit={ updateGame }>
                    <div className='formLeft'>
                        <label htmlFor="title">Game Title:</label>
                        <input type="text" name="title" value={game.title} onChange={ handleChange } />
                        {
                            error.title ? <p>{error.title.message}</p> : null
                        }<br />
                        <label htmlFor="price">Value:</label>
                        <input type="number" name="price" value={game.price} onChange={ handleChange } />
                        {
                            error.price ? <p>{error.price.message}</p> : null
                        }<br />
                        <label htmlFor="notes">Notes:</label>
                        <input type="text" name="notes" value={game.notes} onChange={ handleChange } />
                        {
                            error.notes ? <p>{error.notes.message}</p> : null
                        }<br />
                    </div>
                    <div className='formRight'>
                        <label htmlFor="purchaseDate">Purchase Date:</label>
                        <input type="date" name="purchaseDate" value={game.purchaseDate} onChange={ handleChange } />
                        {
                            error.purchaseDate ? <p>{error.purchaseDate.message}</p> : null
                        }<br />
                        <label htmlFor="platform">Platform:</label>
                        <select id="platform" name="platform" value={game.platform} onChange={ handleChange }>
                            <option value="PC">PC</option>
                            <option value="Nintendo">Nintendo</option>
                            <option value="Playstation">Playstation</option>
                            <option value="Xbox">Xbox</option>
                        </select>
                        {
                            error.platform ? <p>{error.platform.message}</p> : null
                        }<br />
                    <button>Submit Changes</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Edit;