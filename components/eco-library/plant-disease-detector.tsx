"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Camera, AlertCircle, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function PlantDiseaseDetector() {
  const [image, setImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<{
    disease: string
    confidence: number
    description: string
    treatment: string
  } | null>(null)
  const { toast } = useToast()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive",
      })
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      })
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setImage(reader.result as string)
      setResult(null)
    }
    reader.readAsDataURL(file)
  }

  const analyzeImage = async () => {
    if (!image) {
      toast({
        title: 'Error',
        description: 'No image selected for analysis',
        variant: 'destructive',
      })
      return
    }

    setIsAnalyzing(true)

    try {
      console.log('Starting image analysis...')

      // Debug: Log all environment variables (in development only)
      if (process.env.NODE_ENV === 'development') {
        console.log('Environment variables:', Object.keys(process.env).filter(key => key.includes('OPENROUTER') || key.includes('NEXT_PUBLIC')));
      }

      // Check if API key is available
      const apiKey = process.env.OPENROUTER_API_KEY;
      console.log('API Key found:', !!apiKey);

      if (!apiKey) {
        console.error('API Key not found in environment variables. Make sure to set OPENROUTER_API_KEY in your .env.local file.');
        throw new Error('OpenRouter API key is not configured. Please check your environment variables.');
      }

      // Verify image format
      if (!image.startsWith('data:image/')) {
        throw new Error('Invalid image format. Please upload a valid image file.')
      }

      console.log('Sending request to OpenRouter API...')

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.href,
          'X-Title': 'EcoSaro Plant Disease Detector',
        },
        body: JSON.stringify({
          model: 'google/gemini-pro-vision',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: 'Analyze this plant image for any diseases. Provide the response in valid JSON format with these exact fields: {\"disease\": string, \"confidence\": number, \"description\": string, \"treatment\": string}. Only include the JSON object in your response.'
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: image
                  }
                }
              ]
            }
          ],
          temperature: 0.2,
          max_tokens: 1000
        })
      })

      console.log('API Response Status:', response.status)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('API Error:', errorData)
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data = await response.json()
      console.log('API Response Data:', data)

      const content = data.choices?.[0]?.message?.content

      if (!content) {
        throw new Error('No content in API response')
      }

      // Try to extract JSON from the response
      let resultData
      try {
        // Try to parse as direct JSON first
        resultData = JSON.parse(content)

        // If the response is a string that contains JSON, try to extract it
        if (typeof resultData === 'string') {
          const jsonMatch = resultData.match(/\{[\s\S]*\}/)
          if (jsonMatch) {
            resultData = JSON.parse(jsonMatch[0])
          }
        }
      } catch (parseError) {
        console.error('Error parsing API response:', parseError)
        throw new Error('Could not parse the analysis results. Please try again.')
      }

      setResult({
        disease: resultData.disease || 'Unknown Disease',
        confidence: resultData.confidence || 0,
        description: resultData.description || 'No description available.',
        treatment: resultData.treatment || 'No specific treatment information available.',
      })

      toast({
        title: 'Analysis complete',
        description: 'We\'ve analyzed your plant image.',
      })
    } catch (error) {
      console.error('Error analyzing image:', error)
      let errorMessage = 'Failed to analyze the image. Please try again.'

      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          errorMessage = 'API key is not configured. Please check your environment variables.'
        } else if (error.message.includes('network')) {
          errorMessage = 'Network error. Please check your internet connection.'
        } else if (error.message.includes('parse') || error.message.includes('JSON')) {
          errorMessage = 'Error processing the analysis results. The image might be unclear or not a plant.'
        } else if (error.message.includes('status')) {
          errorMessage = `API request failed: ${error.message}`
        } else {
          errorMessage = error.message || errorMessage
        }
      }

      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const resetDetector = () => {
    setImage(null)
    setResult(null)
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-green-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Plant Disease Detector</h1>
          <p className="text-lg text-gray-600">
            Upload a photo of your plant to identify diseases and get treatment recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Upload Plant Image</h2>

                {!image ? (
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer"
                    onClick={() => document.getElementById("image-upload")?.click()}
                  >
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-2">Drag and drop an image here or click to browse</p>
                    <p className="text-sm text-gray-500">Supports JPG, PNG (max 5MB)</p>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                ) : (
                  <div className="relative h-[300px] w-full rounded-lg overflow-hidden">
                    <Image src={image || "/placeholder.svg"} alt="Uploaded plant" fill className="object-contain" />
                    <Button variant="outline" size="sm" className="absolute top-2 right-2" onClick={resetDetector}>
                      Change Image
                    </Button>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => document.getElementById("image-upload")?.click()}
                  >
                    <Upload className="h-4 w-4" />
                    Upload Image
                  </Button>

                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() =>
                      toast({
                        title: "Camera access required",
                        description: "Please allow camera access to take a photo.",
                      })
                    }
                  >
                    <Camera className="h-4 w-4" />
                    Take Photo
                  </Button>
                </div>

                <Button className="w-full" disabled={!image || isAnalyzing} onClick={analyzeImage}>
                  {isAnalyzing ? "Analyzing..." : "Analyze Plant"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-6">Analysis Results</h2>

              {!image && !result && (
                <div className="flex flex-col items-center justify-center h-[300px] text-center">
                  <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600">Upload an image to see disease analysis results</p>
                </div>
              )}

              {image && !result && (
                <div className="flex flex-col items-center justify-center h-[300px] text-center">
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                      <p className="text-gray-600">Analyzing your plant image...</p>
                      <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-600">Click "Analyze Plant" to identify diseases</p>
                    </>
                  )}
                </div>
              )}

              {result && (
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg">{result.disease}</h3>
                      <p className="text-sm text-gray-500">Confidence: {result.confidence.toFixed(1)}%</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <h4 className="font-medium mb-1">Description:</h4>
                    <p className="text-gray-700 text-sm">{result.description}</p>
                  </div>

                  <div className="pt-2">
                    <h4 className="font-medium mb-1">Treatment Recommendations:</h4>
                    <p className="text-gray-700 text-sm">{result.treatment}</p>
                  </div>

                  <div className="pt-4">
                    <Button variant="outline" className="w-full" onClick={resetDetector}>
                      Analyze Another Plant
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="max-w-3xl mx-auto mt-12 text-center">
          <p className="text-sm text-gray-500">
            Note: This tool provides general guidance based on visual symptoms. For severe plant issues, consult with a
            professional horticulturist or agricultural expert.
          </p>
        </div>
      </div>
    </section>
  )
}
