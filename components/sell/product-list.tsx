"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IProduct } from "@/models/product";

interface ProductListProps {
  sellerId: string;
  onEdit: (product: IProduct) => void;
  onDelete: (productId: string) => void;
}

export default function ProductList({ sellerId, onEdit, onDelete }: ProductListProps) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products?sellerId=${sellerId}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [sellerId]);

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>In Stock</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product._id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.inStock ? "Yes" : "No"}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" className="mr-2" onClick={() => onEdit(product)}>
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => onDelete(product._id)}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
