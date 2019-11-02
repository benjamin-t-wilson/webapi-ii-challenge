const express = require("express");
const db = require("../data/db");

const router = express.Router();

router.post("/", (req, res) => {
  const newPost = req.body;

  if (!newPost.title || !newPost.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    db.insert(newPost)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(() => {
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      });
  }
});

router.post("/:id/comments", (req, res) => {
  const commentInfo = { ...req.body, post_id: req.params.id };
  const id = req.params.id;

  if (!commentInfo.text) {
    res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });
  } else {
    db.findById(id)
      .then(post => {
        if (post.length > 0) {
          db.insertComment(commentInfo)
            .then(comment => {
              res.status(201).json(comment);
            })
            .catch(err => {
              res.status(500).json({
                error:
                  "There was an error while saving the comment to the database",
                err
              });
            });
        } else {
          res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the comment to the database",
          err
        });
      });
  }
});

router.get("/", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(post => {
      if (post.length > 0) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved.", err });
    });
});

router.get("/:id/comments", (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then(post => {
      if (post.length > 0) {
        db.findPostComments(id)
          .then(comments => {
            res.status(200).json(comments);
          })
          .catch(err => {
            res.status(500).json({
              error: "The post information could not be retrieved.",
              err
            });
          });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved.", err });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then(post => {
      if (post.length > 0) {
        db.remove(id)
          .then(() => {
            res.status(204).end();
          })
          .catch(err => {
            res.status(500).json({
              error: "The post information could not be retrieved.",
              err
            });
          });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved.", err });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const postInfo = req.body;

  if (!postInfo.title || !postInfo.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
  db.findById(id)
    .then(post => {
      if (post.length > 0) {
        db.update(id, postInfo)
          .then(() => {
            db.findById(id)
              .then(newPost => {
                res.status(200).json(newPost);
              })
              .catch(err => {
                res
                  .status(500)
                  .json({
                    error: "The post information could not be modified."
                  });
              });
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: "The post information could not be modified." });
          });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
    });
});

module.exports = router;
