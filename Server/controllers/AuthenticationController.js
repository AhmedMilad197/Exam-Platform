module.exports = {
  async register (req, res) {
    await res.send({
      message: 'Hello this is a message from the backend. ',
    });
  }
}