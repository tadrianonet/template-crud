"use client"

import { useState } from "react"
import { useProducts } from "../lib/useProducts"
import type { Product } from "../lib/types"

export default function ProductList() {
  const { products, isLoading, isError, deleteProduct, updateProduct } = useProducts()
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  if (isLoading) return <div className="text-center">Carregando produtos...</div>
  if (isError) return <div className="text-center text-red-500">Erro ao carregar produtos.</div>

  return (
    <div className="space-y-4">
      {products?.map((product) => (
        <div key={product.id} className="bg-white shadow-md rounded-lg p-6">
          {editingProduct?.id === product.id ? (
            <EditProductForm
              product={product}
              onSave={(updatedProduct) => {
                updateProduct({ id: product.id, product: updatedProduct })
                setEditingProduct(null)
              }}
              onCancel={() => setEditingProduct(null)}
            />
          ) : (
            <>
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-gray-800 mb-1">Preço: R$ {product.price.toFixed(2)}</p>
              <p className="text-gray-800 mb-1">Quantidade: {product.quantity}</p>
              <p className="text-gray-800 mb-4">Categoria: {product.category}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingProduct(product)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Excluir
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

function EditProductForm({
  product,
  onSave,
  onCancel,
}: { product: Product; onSave: (product: Partial<Product>) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState(product)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: name === "price" || name === "quantity" ? Number(value) : value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        step="0.01"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        name="quantity"
        value={formData.quantity}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <div className="flex space-x-2">
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
          Salvar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}

