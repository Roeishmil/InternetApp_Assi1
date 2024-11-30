const commentModel = require("../models/comments_model");

const getAllComments = async (req, res) => {
  const filter = req.query.post_id;
  try {
    if (filter) {
      const comments = await commentModel.find({ post_id: filter });
      res.send(comments);
    } else {
      const comments = await commentModel.find();
      res.send(comments);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getCommentById = async (req, res) => {
  const commentId = req.params.id;

  try {
    const comment = await commentModel.findById(commentId);
    if (comment) {
      res.send(comment);
    } else {
      res.status(404).send("comment not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createAComment = async (req, res) => {
  const commentBody = req.body;
  try {
    const comment = await commentModel.create(commentBody);
    res.status(201).send(comment);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateCommentByID = async (req, res) => {
    const commentId = req.params.id; //Get the id from the json
    const commentBody = req.body;
    try {
        const comment = await commentModel.updateOne({_id : commentId} , {$set: {content:commentBody.content}});
        if (comment) {
          res.send(comment);
        } else {
          res.status(404).send("comment not found");
        }
      } catch (error) {
        res.status(400).send(error.message);
      }
};

const deleteCommentByID = async (req, res) => {
  const commentId = req.params.id; //Get the id from the json
  try {
      const comment = await commentModel.deleteOne({_id : commentId});
      if (comment) {
        res.send(comment);
      } else {
        res.status(404).send("comment not found");
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
};


module.exports = {
  getAllComments,
  createAComment,
  updateCommentByID,
  getCommentById,
  deleteCommentByID,
};