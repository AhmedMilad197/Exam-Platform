module.exports = {
  async show (req, res) {
    await res.send({
      body: {
        id: req.body.id,
        question: 'Question from the backend',
        answers: [
          {
            id: 1,
            value: 'This is the first answer',
            isAnswer: false
          },
          {
            id: 2,
            value: 'This is the second answer',
            isAnswer: true
          },
          {
            id: 3,
            value: 'This is the third answer',
            isAnswer: false
          },
          {
            id: 4,
            value: 'This is the fourth answer',
            isAnswer: false
          },
        ]
      }
    });
  }
}