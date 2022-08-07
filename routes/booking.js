const router = require('express').Router();
const axios = require('axios');
const { Booking, Users, Rooms, Days } = require('../db/models');

router.post('/', async (req, res) => {
  const { type_id, room_id, time_start, time_end, comment, day_id } = req.body;
  const day = await Days.findOne({ where: { id: day_id } });
  const bookedRoom = await Rooms.findOne({ where: { id: room_id } });

  try {
    if (req.session.userId) {
      const { userId } = req.session;
      const newBooking = await Booking.create({
        room_id,
        day_id,
        user_id: userId,
        comment,
        time_start,
        time_end,
        type_id,
      });

      axios.post(process.env.BOT_WEBHOOK, {
        text: `${req.session.userName} забронировал ${bookedRoom.title} с ${time_start} до ${time_end} (${day.day}) `,
      });
    } else if (req.session.passport.user) {
      const { id } = req.session.passport.user;
      const { name } = req.session.passport.user;
      const newBooking = await Booking.create({
        room_id,
        day_id,
        user_id: id,
        comment,
        time_start,
        time_end,
        type_id,
      });

      axios.post(process.env.BOT_WEBHOOK, {
        text: `${name} забронировал ${bookedRoom.title}  с ${time_start} до ${time_end} (${day.day})`,
      });
    }
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
});

router.get('/', async (req, res) => {
  const booking = await Booking.findAll({
    include: [{ all: true }],
  });
  res.json(booking);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Booking.destroy({
      where: { id },
    });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
