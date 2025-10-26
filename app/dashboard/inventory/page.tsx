"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2, Edit, RefreshCcw, AlertTriangle, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
}

interface Vendor {
  bankDetails?: {
    accountHolder?: string;
    accountNumber?: string;
    bankName?: string;
    ifsc?: string;
  };
}

export default function VendorInventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [hasCompleteBankDetails, setHasCompleteBankDetails] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    images: "",
  });

  const fetchProducts = async () => {
    // Also fetch vendor status to check bank details
    try {
      const vendorRes = await fetch('/api/vendor/store');
      if (vendorRes.ok) {
        const vendorData: Vendor = await vendorRes.json();
        const { bankDetails } = vendorData;
        if (bankDetails && bankDetails.accountHolder && bankDetails.accountNumber && bankDetails.bankName && bankDetails.ifsc) {
          setHasCompleteBankDetails(true);
        } else {
          setHasCompleteBankDetails(false);
        }
      } else {
        setHasCompleteBankDetails(false);
      }
    } catch (e) {
      setHasCompleteBankDetails(false);
    }

    setLoading(true);
    try {
      const res = await fetch("/api/products?role=vendor");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      } else {
        toast.error("Failed to fetch products.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching products.");
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const payload = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      category: form.category,
      stock: parseInt(form.stock),
      images: form.images.split(",").map((img) => img.trim()).filter(img => img),
    };

    const method = editingProduct ? "PUT" : "POST";
    const url = editingProduct ? `/api/products/${editingProduct._id}` : "/api/products";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      toast.success(editingProduct ? "Product updated!" : "Product created!");
      resetFormAndCloseDialog();
      fetchProducts();
    } else {
      const errorData = await res.json();
      toast.error(errorData.message || "Error saving product");
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString(),
      images: product.images.join(", "),
    });
    setIsDialogOpen(true);
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Product deleted");
      fetchProducts();
    } else {
      const errorData = await res.json();
      toast.error(errorData.message || "Error deleting product");
    }
  };

  const resetFormAndCloseDialog = () => {
    setForm({ name: "", description: "", price: "", category: "", stock: "", images: "" });
    setEditingProduct(null);
    setIsDialogOpen(false);
  };

  if (loading) return <div className="p-8 text-gray-500 text-center">Loading...</div>;

  return (
    <div className="p-6">
      {!hasCompleteBankDetails && !loading && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Banking Information Incomplete</AlertTitle>
          <AlertDescription>
            You must complete your banking details before you can add, edit, or delete products.
            <Button asChild variant="link" className="p-0 h-auto ml-2">
              <Link href="/dashboard/store?tab=banking">
                Update Settings
                <ExternalLink className="h-3 w-3 ml-1" />
              </Link>
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between mb-6 items-center">
        <h1 className="text-3xl font-bold">Vendor Inventory</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchProducts}>
            <RefreshCcw className="w-4 h-4 mr-2" /> Refresh
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            if (!open) {
              resetFormAndCloseDialog();
            } else {
              setIsDialogOpen(true);
            }
          }}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700 text-white" disabled={!hasCompleteBankDetails}>
                <Plus className="w-4 h-4 mr-2" /> Add Product
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {["name", "description", "price", "category", "stock", "images"].map((field) => (
                  <div key={field} className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor={field} className="text-right capitalize">{field}</Label>
                    <Input
                      id={field}
                      name={field}
                      value={(form as any)[field]}
                      onChange={handleChange}
                      placeholder={field === 'images' ? 'Comma-separated URLs' : `Enter ${field}`}
                      className="col-span-3"
                    />
                  </div>
                ))}
              </div>
              <Button onClick={handleSubmit} className="w-full" disabled={!hasCompleteBankDetails}>{editingProduct ? "Update Product" : "Create Product"}</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>Products</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length > 0 ? products.map((p) => (
                <TableRow key={p._id}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell>₹{p.price}</TableCell>
                  <TableCell>{p.stock}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(p)} disabled={!hasCompleteBankDetails}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => deleteProduct(p._id)} disabled={!hasCompleteBankDetails}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">No products found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
