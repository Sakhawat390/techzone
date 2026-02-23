export interface Order {
    id: string;
    userId: string;
    productIds: string[];
    totalAmount: number;
    status: 'pending' | 'completed' | 'canceled';
    createdAt: Date;
    updatedAt: Date;
}

export class OrderModel {
    private orders: Order[] = [];

    createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Order {
        const newOrder: Order = {
            ...order,
            id: this.generateId(),
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.orders.push(newOrder);
        return newOrder;
    }

    getOrderById(id: string): Order | undefined {
        return this.orders.find(order => order.id === id);
    }

    private generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }
}