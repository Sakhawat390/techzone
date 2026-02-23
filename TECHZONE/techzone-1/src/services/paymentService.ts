export class PaymentService {
    processPayment(amount: number, paymentMethod: string): Promise<string> {
        return new Promise((resolve, reject) => {
            // Simulate payment processing
            if (amount <= 0) {
                reject('Invalid payment amount');
            } else {
                // Simulate successful payment
                resolve(`Payment of $${amount} processed using ${paymentMethod}`);
            }
        });
    }

    refundPayment(transactionId: string): Promise<string> {
        return new Promise((resolve, reject) => {
            // Simulate refund processing
            if (!transactionId) {
                reject('Invalid transaction ID');
            } else {
                // Simulate successful refund
                resolve(`Refund for transaction ${transactionId} processed successfully`);
            }
        });
    }
}