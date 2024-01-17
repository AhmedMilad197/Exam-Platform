module.exports = {
  async show (req, res) {
    await res.send({
      body: {
        id: req.body.id,
        question: 'Question from the backend'
      }
    });
  }
}