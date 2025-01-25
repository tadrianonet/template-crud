"use client"

import { useEffect, useState } from "react"
import { ProductForm } from "@/components/product-form"

interface Product {
  id: number
  name: string
  description: string
  price: number
  quantity: number
  category: string
}

export default function EditProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    // Simulate API call to fetch product
    const fetchProduct = async () => {
      // In a real app, this would be an API call
      const mockProduct = {
        id: Number.parseInt(params.id),
        name: "Teclado Gamer",
        description: "Teclado mecânico com iluminação RGB.",
        price: 399.99,
        quantity: 20,
        category: "Acessórios",
      }
      setProduct(mockProduct)
    }

    fetchProduct()
  }, [params.id])

  if (!product) {
    return <div>Carregando...</div>
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <ProductForm product={product} />
    </div>
  )
}

