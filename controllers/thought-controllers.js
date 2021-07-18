const { User, Thought, Reaction } = require('../models');

const thoughtController = {
    //get all thoughts 
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'user',
            select: '-__v'
        })
        .select('-__v')
        .sort({_id: -1})
        .then((dbThoughtData) => {
            res.status(200).json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //GET - a single thought by id
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.id})
        .populate({
            path: 'user',
            select: '-__v'
        })
        .select('-__v')
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id!'});
                return;
            }
            res.status(200).json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    //POST -create a new thought 
    createThought({body}, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: body.userId},
                {$push: {thoughts: _id}},
                {new: true}
            );
        })
        .then((dbUserData) => {
            if(!dbUserData) {
                res.status(400).json({ message: 'No user found with this id!'});
                return;
            }
            res.status(200).json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });

    },
    //PUT - update a thought with id
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, { new: true})
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id!'});
                return;
            }
            res.status(200).json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //DELETE a thought by id 
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.thoughtId})
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id!'});
                return;
            }
            res.status(200).json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
    }
    //Add reaction
    addReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$addToSet: {reactions: body}},
            {new: true}
        )
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
            res.status(404).json({message: 'No thought found with this id!'});
            return;
            }
            res.status(200).json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //DELETE reaction 
    deleteReaction({params}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId: params.reactionId}}},
            {new: true}
        )
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id!'});
                return;
            }
            res.status(200).json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
    },  
};

module.exports = thoughtController;
