import Link from "next/link"
import type { Product } from "@/lib/products"

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      {product.images && product.images.length > 0 ? (
        <img
          src={product.images[0]}
          alt={`Image of ${product.name}`}
          className="w-full h-56 object-cover"
        />
      ) : (
        <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No image available</span>
        </div>
      )}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold truncate">{product.name}</h3>
        <p className="text-gray-600 mt-1 text-sm h-10 overflow-hidden">
          {product.description || "No description available."}
        </p>
        <p className="text-xl font-bold mt-auto pt-2">${product.price.toFixed(2)}</p>
      </div>
    </div>
  )
}

// Fetch products from the API endpoint instead of direct DB access
async function getProducts(): Promise<Product[]> {
  // Using an absolute URL for server-side fetching
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/shop`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json();
}

const ShopPage = async () => {
  const products = await getProducts();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <Link href={`/shop/product/${product._id}`} key={product._id} className="block h-full">
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </main>
  );
};

export default ShopPage;