const express = require('express');
const passport = require('passport');
const passportService = require('../services/passport');
const db = require('../db');

const router = express.Router();

//Use requireAuth for any request that is executed while signed in
const requireAuth = passport.authenticate('jwt', {session: false});

//Get the list of all friends of user
router.get('/get', requireAuth, (req, res) => {
    const user_id = req.user.id;

    const query_select_friends = "SELECT users.last_name, users.first_name, users.email, users.phone_number " +
        `FROM users INNER JOIN friends ON users.id = friends.friend_id WHERE user_id = '${user_id}'`;

    db.query(query_select_friends, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            const friends = JSON.parse(JSON.stringify(results));
            res.json(friends);
        }
    });
});

//Add a friend for user
router.post('/add', requireAuth, (req, res) => {
    const user_id = req.user.id;
    const friend_id = req.body.friend_id;

    const query_add_friend = `INSERT INTO friends (user_id, friend_id) VALUES ('${user_id}', '${friend_id}')`;

    db.query(query_add_friend, (err, result) => {
        if (err) return res.send(err);
        res.send({
            isSuccess: true,
            reqEndpoint: '/api/friends/add',
            friend_id
        });
        console.log('1 friend inserted');
    });
});

module.exports = router;