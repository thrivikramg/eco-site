"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProductForm from "@/components/sell/product-form";
import ProductList from "@/components/sell/product-list";
import { IProduct } from "@/models/product";

export default function SellerPage() {
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const [reloadProducts, setReloadProducts] = useState(false);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session || session.user.role !== "vendor") {
    redirect("/");
  }

  const handleCreateNew = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product: IProduct) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (productId: string) => {
    await fetch(`/api/products/${productId}`, { method: "DELETE" });
    setReloadProducts(!reloadProducts);
  };

  const handleFormSubmit = async (data: any) => {
    const method = editingProduct ? "PUT" : "POST";
    const url = editingProduct
      ? `/api/products/${editingProduct._id}`
      : "/api/products";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, seller: session.user.id }),
    });

    setIsModalOpen(false);
    setReloadProducts(!reloadProducts);
  };

  return (
    <div className="container py-8 md:py-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Seller Dashboard</h1>
        <Button onClick={handleCreateNew}>Add New Product</Button>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
          </DialogHeader>
          <ProductForm
            initialData={editingProduct}
            onSubmit={handleFormSubmit}
            isLoading={false}
          />
        </DialogContent>
      </Dialog>
      <ProductList
        sellerId={session.user.id}
        onEdit={handleEdit}
        onDelete={handleDelete}
        key={reloadProducts.toString()}
      />
    </div>
  );
}
