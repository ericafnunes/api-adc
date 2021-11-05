const express = require('express');

const app = express();

require('dotenv').config();

const cors = require('cors')



const PORT = process.env.PORT

const Post = require('./models/Posts');

app.use(express.json());

app.use(cors());

app.get('/hello_world', (req, res) => {
    res.send('testando');
})

app.post('/create', (req, res) => {
    const title = req.body.title;

    console.log(title);

    res.send(`Titulo: ${title}`);
});

app.post('/create_post', async (req, res) => {

    try {
        const { title, content } = req.body;

        const post = await Post.create({ title, content })

        res.send(post);

    } catch (error) {
        res.status(400).send(error)
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

app.get('/show_post/:post_id', async (req, res) => {

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

