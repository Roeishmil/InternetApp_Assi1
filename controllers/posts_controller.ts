import PostModel from"../models/posts_model";

const getAllPosts = async (req:any, res:any) => {
  const filter = req.query.sender;
  try {
    if (filter) {
      const posts = await PostModel.find({ sender: filter });
      res.send(posts);
    } else {
      const posts = await PostModel.find();
      res.send(posts);
    }
  } catch (error:any) {
    res.status(400).send(error.message);
  }
};

const getPostById = async (req:any, res:any) => {
  const postId = req.params.id;

  try {
    const post = await PostModel.findById(postId);
    if (post) {
      res.send(post);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error:any) {
    res.status(400).send(error.message);
  }
};

const createAPost = async (req:any, res:any) => {
  const postBody = req.body;
  try {
    const post = await PostModel.create(postBody);
    res.status(201).send(post);
  } catch (error:any) {
    res.status(400).send(error.message);
  }
};

const updatePostByID = async (req:any, res:any) => {
    const postId = req.params.id; //Get the id from the json
    const postBody = req.body;
    try {
        const post = await PostModel.updateOne({_id : postId} , {$set: {content:postBody.content}});
        if (post) {
          res.send(post);
        } else {
          res.status(404).send("Post not found");
        }
      } catch (error:any) {
        res.status(400).send(error.message);
      }
};

export default {
  getAllPosts,
  createAPost,
  updatePostByID,
  getPostById,
};