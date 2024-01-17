module.exports = {
  async show (req, res) {
    await res.send({
      body: {
        id: req.body.id,
        subjectname: 'Math',
        desctiption: 'This is a subject from the backend',
      }
    });
  },
  async update (req, res) {
    await res.send({
      id: req.body.id,
      message: 'Subject is updated'
    });
  }
}