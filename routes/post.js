const express = require('express');
const { User, Post } = require('../models');

const router = express.Router();


// Create
router.post('/', async (req, res) => {
  const body = req.body;
  await Post.create({
      title: body.title,
      content: body.content,
      writter: body.writter
  })
  .then(result=> {
      res.status(200).json({
          postsuccess: true
      })
  })
  .catch(err => {
      res.status(400).send(err);
  })
});

//R(전체 글 목록)
router.get('/postlist', async (req, res, next) => {
    try {
      const post = await Post.findAll();
      if (post) {
        res.status(200).send(post);
      } else {
        res.status(400).send('no post');
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  });


//R(전체 내가 쓴 글 목록)
router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findAll({ where: { writter: req.params.id } });
    if (post) {
      res.status(200).send(post);
    } else {
      res.status(400).send('no post');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});


// Update & Delete
router.route('/edit/:id')   //post 테이블의 id

    .patch(async (req, res, next) => {
    const postId = req.params.id;
    const body = req.body;
        try {
            await Post.update({
              title: body.title,
              content: body.content,
            }, { where: { id: postId }});
            res.send("updated successfully")
        } catch (error) {
            console.error(error);
            next(error);
        }
})
    .delete(async (req,res,next) => {
        try {
            await Post.destroy( {
                where : { id: req.params.id }
            });
            res.send("deleted successfully")
        }
        catch(err) {
            console.log(err);
            next(err);
        }
    })




module.exports = router;