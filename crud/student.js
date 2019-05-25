const fs = require('fs')

const dbPath = './db.json'


/**
 * 获取所有学生列表
 * @param {Function} callback 回调函数
 */
exports.find = (callback) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }
    return callback(null, JSON.parse(data).students)
  })
}


/**
 * 添加学生信息
 * @param {Object} student 学生信息
 * @param {Function} callback 回调函数
 */
exports.save = (student, callback) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }
    let students = JSON.parse(data).students
    if (students.length) {
      // 唯一id
      student.id = students[students.length - 1].id + 1
    } else {
      student.id = 1
    }

    students.push(student)
    let fileData = JSON.stringify({ students })
    fs.writeFile(dbPath, fileData, (err) => {
      if (err) {
        callback(err)
      }
      callback(null)
    })
  })
}

/**
 * 查找单个学生信息
 * @param {number} id 学生信息
 * @param {Function} callback 回调函数
 */
exports.findById = (id, callback) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }
    let students = JSON.parse(data).students
    let result = students.find(item => item.id == id)
    return callback(null, result)
  })
}

/**
 * 编辑单个学生信息
 * @param {Object} student 学生信息
 * @param {Function} callback 回调函数
 */
exports.updateById = (student, callback) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }
    let students = JSON.parse(data).students
    student.id = +student.id
    let stu = students.find((item) => item.id == student.id)

    for (let key in student) {
      stu[key] = student[key]
    }
    let fileData = JSON.stringify({ students })
    fs.writeFile(dbPath, fileData, (err) => {
      if (err) {
        callback(err)
      }
      callback(null)
    })
  })
}

// 删除学生
exports.deleteById = (id, callback) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }
    let students = JSON.parse(data).students
    let deleteId = students.findIndex((item) => item.id == id)
    students.splice(deleteId, 1)
    let fileData = JSON.stringify({ students: students })
    fs.writeFile(dbPath, fileData, err => {
      if (err) {
        callback(err)
      }
      callback(null)
    })
  })
}
