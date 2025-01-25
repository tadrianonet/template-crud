import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

const API_URL = "/api/products"

async function fetchProducts() {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }
  return response.json()
}

async function fetchProduct(id: number) {
  const response = await fetch(`${API_URL}/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch product")
  }
  return response.json()
}

async function createProduct(product: Omit<Product, "id">) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  })
  if (!response.ok) {
    throw new Error("Failed to create product")
  }
  return response.json()
}

async function updateProduct(id: number, product: Partial<Product>) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  })
  if (!response.ok) {
    throw new Error("Failed to update product")
  }
  return response.json()
}

async function deleteProduct(id: number) {
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" })
  if (!response.ok) {
    throw new Error("Failed to delete product")
  }
}

export function useProducts() {
  const queryClient = useQueryClient()

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  })

  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })

  const updateProductMutation = useMutation({
    mutationFn: ({ id, product }: { id: number; product: Partial<Product> }) => updateProduct(id, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })

  return {
    products: productsQuery.data,
    isLoading: productsQuery.isLoading,
    isError: productsQuery.isError,
    createProduct: createProductMutation.mutate,
    updateProduct: updateProductMutation.mutate,
    deleteProduct: deleteProductMutation.mutate,
  }
}

