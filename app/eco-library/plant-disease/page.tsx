import type { Metadata } from "next"
import PlantDiseaseDetector from "@/components/eco-library/plant-disease-detector"
import CommonDiseases from "@/components/eco-library/common-diseases"
import PreventionTips from "@/components/eco-library/prevention-tips"

export const metadata: Metadata = {
  title: "Plant Disease Detector | EcoGrow",
  description: "Identify plant diseases and get treatment recommendations with our AI-powered tool.",
}

export default function PlantDiseasePage() {
  return (
    <>
      <PlantDiseaseDetector />
      <CommonDiseases />
      <PreventionTips />
    </>
  )
}
