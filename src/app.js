const express = require('express');

const app = express();

require('dotenv').config();

const cors = require('cors')


const PORT = process.env.PORT

const mongoose = require("mongoose")
const connect = require('./db/db')
// const Post = mongoose.model("Post")
const Post = require('./models/Posts');

connect();

app.use(express.json());

app.use(cors());



app.post('/create_post', async (req, res) => {

    try {

        const { title, description, content } = req.body;

        console.log(title);
        console.log(teste);
        console.log(content);

        const createPost = await Post.create({ title, description, content });

        res.json({ createPost });


    } catch (error) {
        return res.status(400).json(error)
    }
});


app.get('/list_posts', async (req, res) => {

    try {
        const posts = await Post.find()

        res.send({ posts })
    } catch (error) {
        res.status(400).send(error)
    }
});

app.get('/:post_id', async (req, res) => {

    try {
        const postId = req.params.post_id;

        const post = await Post.find({ _id: postId })

        res.send(post)

    } catch (error) {
        res.status(400).send(error)
    }
});

app.patch('/update_post/:post_id', async (req, res) => {

    try {
        const postId = req.params.post_id;

        const { title, content } = req.body;

        const post = await Post.findByIdAndUpdate(postId, { title, content }, { new: true })

        res.send({ post });
    } catch (error) {
        res.status(400).send(error);
    }
});

app.delete('/delete_post/:post_id', async (req, res) => {


    try {
        const postId = req.params.post_id;

        await Post.findByIdAndDelete(postId)

        res.send({ Mensagem: 'Deletado com sucesso!' });

    } catch (error) {
        res.status(400).send(error)
    }
})



app.listen(PORT, () => {
    console.log('server running on port:' + PORT)

});

