const axios = require('axios');

// Substitua pelos seus dados da Z-API
const instanceId = '3E38D632F89790194315525186025094';
const token = '5AE43CDD116C34C1C72F546D';

async function sendWhatsAppMessage(phone, message) {
  console.log('Enviando WhatsApp via Z-API para:', phone, 'Mensagem:', message);

  //const url = `https://api.z-api.io/instances/${instanceId}/token/${token}/send-text`;
  
  const payload = {
    phone: phone, // Exemplo: '5541999999999' (sem +)
    message: message
  };

  try {
    // NÃO envie headers aqui!
    const response = await axios.post(url, payload);
    console.log('Resposta Z-API:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar WhatsApp via Z-API:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = { sendWhatsAppMessage };