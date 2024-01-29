module.exports = {
  async show (req, res) {
    await res.send({
      message: 'Hello this is a message from the backend.',
      data: {
        id: req.body.id,
        name: 'ahmed',
        username: 'test',
        last_login: 'last login',
        active: true
      }
    });
  },
  async questions(req, res) {
    await res.send({
      teacher_id: req.body.id,
      message: 'My quesitons from the backend.',
      data: [
        {
          id: 1,
          question: 'This is my first question from the backend.'
        },
        {
          id: 2,
          question: 'This is my second question from the backend.'
        },
        {
          id: 3,
          question: 'This is my third question from the backend.'
        },
        {
          id: 4,
          question: 'This is my fourth question from the backend.'
        },
        {
          id: 5,
          question: 'This is my fifth question from the backend.'
        },
        {
          id: 6,
          question: 'This is my sixth question from the backend.'
        }
      ]
    })
  }
}