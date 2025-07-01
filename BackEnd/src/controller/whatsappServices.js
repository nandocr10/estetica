const axios = require('axios');
const wppconnect = require('@wppconnect-team/wppconnect');

let clientInstance = null;

// Inicializa o cliente WPPConnect (apenas uma vez)
async function getClient() {
  if (clientInstance) return clientInstance;
  clientInstance = await wppconnect.create({
    session: 'estetica-session',
    catchQR: (base64Qr, asciiQR) => {
      console.log('Escaneie este QR Code no WhatsApp:');
      console.log(asciiQR);
    },
    statusFind: (statusSession, session) => {
      console.log('Status da sessão:', statusSession);
    }
  });

  // Listener para respostas de clientes
  clientInstance.onMessage(async (message) => {
    console.log('Mensagem recebida:', message.body, 'de', message.from); // <-- Adicione esta linha
    if (message.body.trim().toLowerCase() === 'sim') {
      console.log(`Cliente ${message.from} confirmou o agendamento!`);
    } else if (
      message.body.trim().toLowerCase() === 'não' ||
      message.body.trim().toLowerCase() === 'nao'
    ) {
      console.log(`Cliente ${message.from} cancelou o agendamento!`);
    }
  });

  return clientInstance;
}

async function sendWhatsAppMessage(phone, message) {
  // phone deve ser no formato: '5511999999999@c.us'
  const client = await getClient();
  try {
    const to = phone.endsWith('@c.us') ? phone : `${phone}@c.us`;
    const result = await client.sendText(to, message);
    console.log('Mensagem enviada:', result);
    return result;
  } catch (error) {
    console.error('Erro ao enviar WhatsApp:', error.message);
    throw error;
  }
}

module.exports = { sendWhatsAppMessage };