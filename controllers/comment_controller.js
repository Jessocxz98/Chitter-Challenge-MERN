const CommentModel = require('../database/models/Comment');

module.exports.newComment_post = async (req, res) => {
  const { text, userId, peepId } = req.body;

  try {
    const user = await UserModel.findOne({ _id: userId });
    // const { username } = user;
    const newComment = await CommentModel.create({ text, username: user.username, userId, peepId });
    res.status(201).json(newComment)
  }
  catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to create comment' })
  }
}