import type { Product } from "./types"

const products: Product[] = [
  {
    id: 1,
    name: "Teclado Gamer",
    description: "Teclado mecânico com iluminação RGB.",
    price: 399.99,
    quantity: 20,
    category: "Acessórios",
  },
]

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const api = {
  getProducts: async (): Promise<Product[]> => {
    await delay(500)
    return products
  },

  getProduct: async (id: number): Promise<Product> => {
    await delay(500)
    const product = products.find((p) => p.id === id)
    if (!product) throw new Error("Product not found")
    return product
  },

  createProduct: async (product: Omit<Product, "id">): Promise<Product> => {
    await delay(500)
    const newProduct = { ...product, id: Date.now() }
    products.push(newProduct)
    return newProduct
  },

  updateProduct: async (id: number, updates: Partial<Product>): Promise<Product> => {
    await delay(500)
    const index = products.findIndex((p) => p.id === id)
    if (index === -1) throw new Error("Product not found")
    products[index] = { ...products[index], ...updates }
    return products[index]
  },

  deleteProduct: async (id: number): Promise<void> => {
    await delay(500)
    const index = products.findIndex((p) => p.id === id)
    if (index === -1) throw new Error("Product not found")
    products.splice(index, 1)
  },
}

