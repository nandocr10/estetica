const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const httpStatus = require('http-status');
const twilio = require('twilio');

// Substitua pelas suas credenciais do Twilio
const accountSid = 'AC1ae2fe2fe41958851d47eaff60a83d03'; // Encontre no painel do Twilio
const authToken = 'fc491e1e35a86d9373eed9eff9e40816'; // Encontre no painel do Twilio
const client = twilio(accountSid, authToken);

async function sendWhatsAppMessage(phone, message) {
  console.log('Enviando WhatsApp para:', phone, 'Mensagem:', message);
  try {
    const response = await client.messages.create({
      from: 'whatsapp:+14155238886', // Número do WhatsApp Sandbox do Twilio
      to: 'whatsapp:+5541996746601', // Número do destinatário no formato internacional (+55 para Brasil)
      body: message, // Mensagem a ser enviada
    });

    console.log('Mensagem enviada com sucesso:', response.sid);
    return response.sid;
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error.message);
    throw error;
  }
};

module.exports = { sendWhatsAppMessage };