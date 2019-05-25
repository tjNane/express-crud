
const express = require('express')
const fs = require('fs')
const student = require('./student')

const router = express.Router()

// 首页
router.get('/', (req, res) => {
  student.find((err, studentsList) => {
    if (err) {
      return res.status(500).send('Sever Error')
    }
    res.render('index.html', {
      // 标签
      labels: [
        { label: 'label1', desc: 'desc111' },
        { label: 'label2', desc: 'desc222' },
        { label: 'label3', desc: 'desc333' },
        { label: 'label4', desc: 'desc444' }
      ],
      // 列表
      studentsList
    })
  })
})

// 添加学生页
router.get('/students/add', (req, res) => {
  res.render('addStudent.html')
})

// 添加学生
router.post('/students/add', (req, res) => {
  student.save(req.body, (err) => {
    if (err) {
      return res.status(500).send('Sever Error')
    }
    res.redirect('/')
  })
})

// 编辑学生页
router.get('/students/edit', (req, res) => {
  let id = +req.query.id
  student.findById(id, (err, students) => {
    if (err) {
      return res.status(500).send('Sever Error')
    }
    res.render('editStudent.html', {
      students
    })
  })
})

// 编辑学生
router.post('/students/edit', (req, res) => {
  student.updateById(req.body, (err) => {
    if (err) {
      return res.status(500).send('Sever Error')
    }
    res.redirect('/')
  })
})

// 删除学生
router.get('/students/delete', (req, res) => {
  let id = +req.query.id
  student.deleteById(id, err => {
    if (err) {
      return res.status(500).send('Sever Error')
    }
    res.redirect('/')
  })
})

module.exports = router

