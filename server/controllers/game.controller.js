const { model } = require('mongoose');
const Game = require('../models/game.model');

module.exports = {
    allMyGames: (req, res) => {
        Game.find({})
            .then((games) => {
                res.json(games)
            })
            .catch((err) => res.json({
                message: 'The allMyGames function crashed, fam.',
                error: err
            }));
    },
    createGame: (req, res) => {
        Game.create(req.body)
            .then(newGame => {
                res.json({ game: newGame })
            })
            .catch((err) => res.status(500).json({
                message: 'The createGame function is not bussin frfr smh',
                error: err
            }));
    },
    getOneGame: (req, res) => {
        Game.findOne({ _id: req.params.id })
            .then(oneGame => {
                res.json({ game: oneGame })
            })
            .catch((err) => res.json({
                message: 'Killshot. No-go on the getOne, g.',
                error: err
            }));
    },
    patchOneGame: (req, res) => {
        Game.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        )
            .then(updatedGame => {
                res.json({ game: updatedGame })
            })
            .catch((err) =>
                res.status(500).json({
                    message: 'Only thing you gotta update is that code, son.',
                    error: err
                }));
    },
    deleteGame: (req, res) => {
        Game.deleteOne({ _id: req.params.id })
            .then(result => {
                res.json({ result: result })
            })
            .catch((err) => {
                res.json({
                    message: "No yeet zone on god.",
                    error: err
                })
            });
    }
}