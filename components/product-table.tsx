"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, Pencil, Trash2, ChevronUp, ChevronDown, Plus } from "lucide-react"
import { Logo } from "./logo"
import Swal from "sweetalert2"

// Mock data
const initialProducts = [
  {
    id: 1,
    name: "Teclado Gamer",
    description: "Teclado mecânico com iluminação RGB.",
    price: 399.99,
    quantity: 20,
    category: "Acessórios",
  },
  {
    id: 2,
    name: "Mouse Gamer",
    description: "Mouse com sensor óptico avançado",
    price: 299.99,
    quantity: 15,
    category: "Acessórios",
  },
  {
    id: 3,
    name: "Headset Pro",
    description: "Headset com som surround 7.1",
    price: 499.99,
    quantity: 10,
    category: "Acessórios",
  },
  {
    id: 4,
    name: "Mousepad XL",
    description: "Mousepad extra grande com superfície premium",
    price: 89.99,
    quantity: 30,
    category: "Acessórios",
  },
  {
    id: 5,
    name: "Base para Notebook",
    description: "Base ergonômica com ventilação",
    price: 159.99,
    quantity: 25,
    category: "Acessórios",
  },
]

type SortField = "name" | "price" | "quantity" | "category"
type SortDirection = "asc" | "desc"

export function ProductTable() {
  const router = useRouter()
  const [products, setProducts] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<SortField>("name")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  const ITEMS_PER_PAGE = 5
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE)

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter esta ação!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar",
    })

    if (result.isConfirmed) {
      setProducts(products.filter((product) => product.id !== id))
      await Swal.fire({
        title: "Deletado!",
        text: "O produto foi deletado com sucesso.",
        icon: "success",
        confirmButtonColor: "#2563eb",
      })
    }
  }

  // Search and sort products
  const filteredProducts = products
    .filter((product) =>
      Object.values(product).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
    )
    .sort((a, b) => {
      if (sortDirection === "asc") {
        return a[sortField] > b[sortField] ? 1 : -1
      }
      return a[sortField] < b[sortField] ? 1 : -1
    })

  // Paginate products
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Logo />
        <div className="flex items-center space-x-4">
          <Input
            type="search"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button onClick={() => router.push("/products/new")} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Novo Produto
          </Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                <div className="flex items-center space-x-1">
                  <span>Name</span>
                  <SortIcon field="name" />
                </div>
              </TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("price")}>
                <div className="flex items-center space-x-1">
                  <span>Price</span>
                  <SortIcon field="price" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("quantity")}>
                <div className="flex items-center space-x-1">
                  <span>Quantity</span>
                  <SortIcon field="quantity" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("category")}>
                <div className="flex items-center space-x-1">
                  <span>Category</span>
                  <SortIcon field="category" />
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProducts.map((product, index) => (
              <TableRow key={product.id}>
                <TableCell>{startIndex + index + 1}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => router.push(`/products/${product.id}`)}>
                      <Eye className="h-4 w-4 text-blue-500" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => router.push(`/products/${product.id}/edit`)}>
                      <Pencil className="h-4 w-4 text-yellow-500" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {startIndex + 1} out of {filteredProducts.length} entries
        </p>
        <div className="flex space-x-1">
          <Button variant="outline" size="sm" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
            «
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            »
          </Button>
        </div>
      </div>
    </div>
  )
}

