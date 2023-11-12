import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'

const RandomAdd = () => {
        const {name} = useParams();
        const [ newGame, setNewGame ] = useState({
            title: name,
            platform: '',
            purchaseDate: '',
            notes: '',
            price: 0,
        });
        const navigate = useNavigate()
        const [error, setError] = useState([]);
    
        const handleChange = (e) => {
            setNewGame({...newGame, [e.target.name]: e.target.value})
        }
    
        const handleSubmit = (e) => {
            e.preventDefault()
            axios.post("http://localhost:8000/api/games", newGame)
                .then(res => {
                    console.log(res.data.game)
                    setError([])
                    navigate('/');
                })
                .catch(err => {
                    console.log(err.response.data.error.errors);
                    setError(err.response.data.error.errors);
                })
        }
    
        const clearForm = () => {
            setNewGame({
                title: '',
                price: 0,
                notes: '',
                purchaseDate: '',
                platform: '',
            })
        }
    
        return(
            <div className='container'>
                <h1 className='title'>Add Game</h1>
                <div className='buttons'>
                    <button onClick={(e)=>{ navigate(`/`)}}>Go Home</button>
                    <button onClick={clearForm}>Clear Form</button>
                </div>
                <div className='bottomBox'>
                    <form onSubmit={ handleSubmit }>
                        <div className='formLeft'>
                            <label htmlFor="title">Game Title:</label>
                            <input type="text" name="title" value={newGame.title} onChange={ handleChange } />
                            {
                                error.title ? <p className='error'>{error.title.message}</p> : null
                            }<br />
                            <label htmlFor="price">Value:</label>
                            <input type="number" name="price" value={newGame.price} onChange={ handleChange } />
                            {
                                error.price ? <p className='error'>{error.price.message}</p> : null
                            }<br />
                            <label htmlFor="notes">Notes:</label>
                            <input type="text" name="notes" value={newGame.notes} onChange={ handleChange } />
                            {
                                error.notes ? <p className='error'>{error.notes.message}</p> : null
                            }<br />
                        </div>
                        <div className='formRight'>
                            <label htmlFor="purchaseDate">Purchase Date:</label>
                            <input type="date" name="purchaseDate" value={newGame.purchaseDate} onChange={ handleChange } />
                            {
                                error.purchaseDate ? <p className='error'>{error.purchaseDate.message}</p> : null
                            }<br />
                            <label htmlFor="platform">Platform:</label>
                            <select id="platform" name="platform" value={newGame.platform} onChange={ handleChange }>
                                <option value="Select">Select</option>
                                <option value="PC">PC</option>
                                <option value="Nintendo">Nintendo</option>
                                <option value="Playstation">Playstation</option>
                                <option value="Xbox">Xbox</option>
                            </select>
                            {
                                error.platform ? <p className='error'>{error.platform.message}</p> : null
                            }<br />
                        {
                            newGame.platform == '' || newGame.platform == 'Select' ?
                            <button disabled={true}>Submit</button> : <button>Submit</button>
                        }
                        </div>
                    </form>
                </div>
            </div>
        )
    }

export default RandomAdd