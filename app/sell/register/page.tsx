import type { Metadata } from "next"
import SellerRegistration from "../../../components/services/sell/seller-registration"

export const metadata: Metadata = {
  title: "Seller Registration | EcoGrow",
  description: "Register as a seller on EcoGrow and start selling your eco-friendly products.",
}

export default function SellerRegistrationPage() {
  return <SellerRegistration />
}
