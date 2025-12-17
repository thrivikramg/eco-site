'use client'

import { useEffect } from 'react'

export default function CheckoutPage() {
  useEffect(() => {
    const loadRazorpay = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.onload = () => resolve(true)
        script.onerror = () => reject('Razorpay SDK failed to load')
        document.body.appendChild(script)
      })
    }

    const makePayment = async () => {
      const res = await loadRazorpay()
      if (!res) {
        alert('Razorpay failed to load. Are you online?')
        return
      }

      const orderRes = await fetch('/api/payment/razorpay', {
        method: 'POST',
      })

      const orderData = await orderRes.json()

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        name: 'EcoSaro',
        currency: orderData.currency,
        amount: orderData.amount,
        order_id: orderData.id,
        description: 'EcoSaro Payment',
        handler: async function (response: any) {
          // ✅ Call /api/orders after successful payment
          const orderResponse = await fetch('/api/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          })

          if (!orderResponse.ok) {
            const errorText = await orderResponse.text()
            console.error('Failed to place order:', errorText)
            alert('Something went wrong. Please try again.')
            return
          }

          const data = await orderResponse.json()
          console.log('✅ Order Placed:', data)
          alert('🎉 Order placed successfully!')
        },
        prefill: {
          name: 'Your Name',
          email: 'your@email.com',
          contact: '9999999999',
        },
      }

      const paymentObject = new (window as any).Razorpay(options)
      paymentObject.open()
    }

    makePayment()
  }, [])

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold">Redirecting to Payment...</h1>
    </div>
  )
}
