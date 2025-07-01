const express = require('express');
//const { Router } = require("express");
const { sendWhatsAppMessage } = require('../controller/whatsappServices');
//const controller = require("./../controller/whatsappService");
const router = express.Router();

router.post('/send-whatsapp', async (req, res) => {
  const { to, message } = req.body;

  try {
    const messageId = await sendWhatsAppMessage(to, message);
    res.status(200).json({ success: true, messageId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;