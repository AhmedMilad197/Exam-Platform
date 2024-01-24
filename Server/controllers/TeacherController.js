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
  }
}