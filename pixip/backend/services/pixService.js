// Serviço simples de integração PIX (simulado)
class PixService {
  static async processPayment(leadId, amount) {
    // Aqui você pode integrar com API de PIX real futuramente
    console.log(`Processando pagamento PIX de ${amount} para lead ${leadId}`);
    return { status: 'success', amount };
  }
}

module.exports = PixService;
