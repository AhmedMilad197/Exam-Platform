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
  },
  async index (req, res) {
    await res.send([
        {
          id: 1,
          question: 'This is the first question from the backend.',
        },
        {
          id: 2,
          question: 'This is the second question from the backend.',
        },
        {
          id: 3,
          question: 'This is the third question from the backend.',
        },
        {
          id: 4,
          question: 'This is the fourth question from the backend.',
        },
        {
          id: 5,
          question: 'This is the fifth question from the backend.',
        }
      ]
    );
  }
}