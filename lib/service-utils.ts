/**
 * Utility functions for handling services
 */

// Define a minimal router interface that has push method
interface Router {
  push: (url: string) => void;
}

interface ServiceData {
  id: string;
  name: string;
  description: string;
  price: string | number;
  image: string;
  duration?: string;
  category: string;
  rating?: number;
  reviewCount?: number;
}

/**
 * Stores service information in localStorage and redirects to service checkout
 */
export const bookService = (service: ServiceData, router: Router) => {
  // Store the selected service in localStorage
  if (typeof window !== "undefined") {
    try {
      // Process price - if it's a string, extract the numeric part
      let price = service.price;
      if (typeof price === "string") {
        price = parseInt(price.replace(/[^0-9]/g, ""));
      }

      localStorage.setItem("selectedService", JSON.stringify({
        id: service.id,
        name: service.name,
        description: service.description,
        price: price,
        image: service.image,
        duration: service.duration || "1-2 hours", // Default duration if not provided
        category: service.category
      }));
    } catch (error) {
      console.error("Error saving service to localStorage:", error);
    }
  }
  
  // Redirect to service checkout
  router.push("/service-checkout");
};
