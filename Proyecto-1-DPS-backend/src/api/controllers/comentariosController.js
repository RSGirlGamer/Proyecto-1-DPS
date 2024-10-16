const Comments = require("../models/commentsModel");

const getComments = (req, res) => {
    const {id} = req.params
    Comments.get(id, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(200).json(results);
    });
};

const createComment = (req, res) => {
  const comment = req.body;
  Comments.create(comment, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Comentario Creado', id: result.insertId });
  });
};

module.exports = {
    getComments,
    createComment
};
