import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export const createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.postId);

    if (!post) return res.status(404).json({ message: "Post not found" });
    if (!text?.trim()) return res.status(400).json({ message: "Comment cannot be empty" });

    const comment = await Comment.create({
      text: text.trim(),
      post: post._id,
      author: req.user._id
    });

    await comment.populate("author", "name");
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Failed to create comment", error: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can delete only your own comments" });
    }

    await comment.deleteOne();
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete comment", error: error.message });
  }
};
