const GameController = require('../controllers/game.controller');

module.exports = app => {
    app.get('/api/games', GameController.allMyGames);
    app.post('/api/games', GameController.createGame);
    app.get('/api/games/:id', GameController.getOneGame);
    app.patch('/api/games/:id', GameController.patchOneGame);
    app.delete('/api/games/:id', GameController.deleteGame);
}