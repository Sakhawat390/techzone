export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
}

export class ProductModel {
    private products: Product[] = [];

    public createProduct(product: Product): Product {
        this.products.push(product);
        return product;
    }

    public getProductById(id: string): Product | undefined {
        return this.products.find(product => product.id === id);
    }

    public updateProduct(id: string, updatedProduct: Partial<Product>): Product | undefined {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            this.products[productIndex] = { ...this.products[productIndex], ...updatedProduct };
            return this.products[productIndex];
        }
        return undefined;
    }

    public deleteProduct(id: string): boolean {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            this.products.splice(productIndex, 1);
            return true;
        }
        return false;
    }

    public getAllProducts(): Product[] {
        return this.products;
    }
}