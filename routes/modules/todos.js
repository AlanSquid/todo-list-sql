const express = require('express')
const router = express.Router()
const db = require('../../models')
const Todo = db.Todo
const User = db.User

// 到新增頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

// 新增項目
router.post('/', async (req, res) => {
  const UserId = req.user.id
  const name = req.body.name
  try {
    await Todo.create({ name, UserId })
    res.redirect('/')
  }
  catch (error) {
    console.log(error)
  }
})

// 查看detail
router.get('/:id', async (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  try {
    const todo = await Todo.findOne({ where: { id, UserId } })
    res.render('detail', { todo: todo.toJSON() })
  }
  catch (error) {
    console.log(error)
  }
})

// 到edit頁面
router.get('/:id/edit', async (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  try {
    const todo = await Todo.findOne({ where: { id, UserId } })
    res.render('edit', { todo: todo.toJSON() })
  }
  catch (error) {
    console.log(error)
  }
})

// 修改項目
router.put('/:id', async (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  const { name, isDone } = req.body
  try {
    const todo = await Todo.findOne({ where: { id, UserId } })
    todo.name = name
    todo.isDone = isDone === 'on'
    todo.save()
    res.redirect(`/todos/${id}`)
  }
  catch (error) {
    console.log(error)
  }
})

// 刪除項目
router.delete('/:id', async (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  try {
    const todo = await Todo.findOne({ where: { id, UserId } })
    await todo.destroy()
    res.redirect('/')
  }
  catch (error) {
    console.log(error)
  }
})

module.exports = router