const express = require('express');
const router = express.Router();
const { sendWhatsAppMessage, getLastQrCode } = require('../controller/whatsappServices');

router.post('/send-whatsapp', async (req, res) => {
  const { phone, message } = req.body;
  try {
    const result = await sendWhatsAppMessage(phone, message);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/qrcode', getLastQrCode);

module.exports = router;