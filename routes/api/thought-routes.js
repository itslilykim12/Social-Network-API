const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thought-controllers');

// /api/thoughts - GET all thoughts, POST new thought
router.route('/').get(getAllThoughts).post(createThought);
// /api/thoughts/:id - GET thought by id, PUT update thought by id, POST new reaction to thought
router.route('/:id').get(getThoughtById).put(updateThought);
// /api/thoughts/userId/:thoughtId - DELETE thought by id 
router.route('/:userId/:thoughtId').delete(deleteThought);
// /api/thoughts/:thoughtId/reactions - POST a reaction to a thought by id 
router.route('/:thoughtId/reactions').post(addReaction);
// /api/thoughts/:thoughtId/reaction/:reactionId - DELETE a reaction by id 
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
