module.exports = {
  async show (req, res) {
    await res.send({
      body: {
        id: req.body.id,
        firstname: 'ahmed',
        lastname: 'milad',
        password: '13123',
        phone: '0912356478',
        address: '5223'
      }
    });
  },
  async update (req, res) {
    await res.send({
      id: req.body.id,
      message: 'updated'
    });
  }
}