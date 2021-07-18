const { User } = require('../models');

const userController = {
    //GET all users 
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '__v'
        })
        .select('__v')
        .sort({_id: -1})
        .then((dbUserData) => {
            res.status(200).json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
                    });
    },
    //GET one user by id
    getUserById({params}, res) {
        User.findOne({_id: params.id})
        .populate({
            path: 'thoughts',
            select: '__v'
        })
        .populate({
            path: 'friends',
            select: '__v'
        })
        .select('__v')
        .then((dbUserData) => {
            if(!dbUserData) {
                res.status(400).json({ message:'No User found with this id!'});
                return;
            }
            res.status(200).json(err);
        });
    },
    //POST create User
    createUser({body}, res) {
        User.create(body)
        .then((dbUserData) => {
            res.status(200).json(dbUserData);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
    },
    //PUT Update user by id 
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({_id: params.id}, body, {new: true})
        .then((dbUserData) => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No User found with this id!'});
                return;
            }
            res.status(200).json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //POST add a new friend to user's friend list 
    addFriend({params}, res) {
        User.findOne(
            {_id: params.userId},
            {$addToSet: {friends: params.friendId}},
            {new: true}
            )
        .then((friendData) => {
            if(!friendData) {
                res.status(404).json({ message: 'No friend found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(200).json(err);
        });
    },
    //DELETE a friend 
    deleteFriend({params}, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$pull: {friends: params.friendId}},
            {new: true}
        )
        .then((dbUserData) => {
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(200).json(err);
        });
    }
};

module.exports = userController;