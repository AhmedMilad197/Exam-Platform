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
  },
  
  async index (req, res) {
    res.send([
      {
        teacher_id: req.body.id,
        id: 1,
        firstname: 'ahmed',
        lastname: 'milad',
        password: '13123',
        phone: '0912356478',
        address: '5223'
      },
      {
        teacher_id: req.body.id,
        id: 2,
        firstname: 'ali',
        lastname: 'milad',
        password: '13123',
        phone: '0912356478',
        address: '5223'
      },
      {
        teacher_id: req.body.id,
        id: 3,
        firstname: 'khaled',
        lastname: 'milad',
        password: '13123',
        phone: '0912356478',
        address: '5223'
      },
      {
        teacher_id: req.body.id,
        id: 4,
        firstname: 'seraj',
        lastname: 'milad',
        password: '13123',
        phone: '0912356478',
        address: '5223'
      },
      {
        teacher_id: req.body.id,
        id: 5,
        firstname: 'fares',
        lastname: 'milad',
        password: '13123',
        phone: '0912356478',
        address: '5223'
      },
      {
        id: 6,
        firstname: 'mohammed',
        lastname: 'milad',
        password: '13123',
        phone: '0912356478',
        address: '5223'
      },
    ]);
  }
}