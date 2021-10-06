const router = require('express').Router()

const Article = require('../models/Article')

router.get('/', async (req, res) => {
    try {
        const articles = await Article.find()
        res.status(200).json({ articles })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' })
    }
})

router.post('/', async (req, res) => {
    const { title, content } = req.body

    try {
        const article = new Article({
            title,
            content
        })

        const newArticle = await article.save()

        res.status(201).json({ saved: 'new article added to server' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'something went wrong' })
    }
})

router.delete('/', async (req, res) => {
    try {
        await Article.deleteMany()

        res.status(200).json({ confirmed: 'all articles were erased' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'something went wrong' })
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const article = await Article.findById(id)

        if (!article) {
            res.status(404).json({ NotFound: 'no article with matching params were found' })
        }

        res.status(200).json({ article })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'something went wrong' })
    }
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const { title, content } = req.body
    try {
        if (title) await Article.findByIdAndUpdate(id, { $set: { title } }, { new: true })
        if (content) await Article.findByIdAndUpdate(id, { $set: { content } }, { new: true })

        res.status(201).json({ confirmed: 'Article Updated' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'something went wrong' })
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    try {
        await Article.findByIdAndUpdate(id, { $set: req.body }, { new: true })

        res.status(201).json({ confirmed: 'Article Updated' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'something went wrong' })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const isDeleted = await Article.findOneAndRemove(id)
        if (isDeleted.deletedCount) {
            return res.status(404).json({ NotFound: 'article to be deleted is not found' })
        }
        res.status(200).json({ confirmed: 'requested article is erased' })

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'something went wrong' })
    }
})

module.exports = router