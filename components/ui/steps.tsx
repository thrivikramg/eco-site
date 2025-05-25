import type React from "react"
import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type StepStatus = "incomplete" | "current" | "complete"

interface StepsProps {
  steps?: {
    label: string
    status: StepStatus
  }[]
  className?: string
  children?: React.ReactNode
}

export function Steps({ steps, className, children }: StepsProps) {
  // If children are provided, use them instead of steps prop
  if (children) {
    return <div className={cn("flex w-full", className)}>{children}</div>
  }
  
  // If no steps and no children, return empty div
  if (!steps || steps.length === 0) {
    return <div className={cn("flex w-full", className)} />
  }
  
  // Otherwise, render using steps prop
  return (
    <div className={cn("flex w-full", className)}>
      {steps.map((step, index) => (
        <div
          key={index}
          className={cn("flex-1 flex flex-col items-center", {
            "text-muted-foreground": step.status === "incomplete",
          })}
        >
          <div className="flex items-center w-full">
            <div
              className={cn("flex-1 h-1", {
                "bg-primary": index > 0 && steps[index - 1].status === "complete",
                "bg-muted": index > 0 && steps[index - 1].status !== "complete",
              })}
              style={{ visibility: index === 0 ? "hidden" : "visible" }}
            />
            <div
              className={cn(
                "relative flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold",
                {
                  "border-primary bg-primary text-primary-foreground": step.status === "complete",
                  "border-primary text-primary": step.status === "current",
                  "border-muted-foreground": step.status === "incomplete",
                },
              )}
            >
              {step.status === "complete" ? <CheckIcon className="h-4 w-4" /> : index + 1}
            </div>
            <div
              className={cn("flex-1 h-1", {
                "bg-primary": step.status === "complete",
                "bg-muted": step.status !== "complete",
              })}
              style={{ visibility: index === steps.length - 1 ? "hidden" : "visible" }}
            />
          </div>
          <span className="mt-2 text-sm font-medium">{step.label}</span>
        </div>
      ))}
    </div>
  )
}

// Add the missing Step component
interface StepProps {
  status?: StepStatus
  label: string
  index?: number
  className?: string
  children?: React.ReactNode
}

export function Step({ status = "incomplete", label, index, className, children }: StepProps) {
  return (
    <div
      className={cn(
        "flex-1 flex flex-col items-center",
        {
          "text-muted-foreground": status === "incomplete",
        },
        className,
      )}
    >
      <div className="flex items-center w-full">
        {index !== 0 && (
          <div
            className={cn("flex-1 h-1", {
              "bg-primary": index && index > 0 && status === "complete",
              "bg-muted": !index || index === 0 || status !== "complete",
            })}
          />
        )}
        <div
          className={cn(
            "relative flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold",
            {
              "border-primary bg-primary text-primary-foreground": status === "complete",
              "border-primary text-primary": status === "current",
              "border-muted-foreground": status === "incomplete",
            },
          )}
        >
          {status === "complete" ? <CheckIcon className="h-4 w-4" /> : index !== undefined ? index + 1 : null}
          {children}
        </div>
        {index !== undefined && (
          <div
            className={cn("flex-1 h-1", {
              "bg-primary": status === "complete",
              "bg-muted": status !== "complete",
            })}
          />
        )}
      </div>
      <span className="mt-2 text-sm font-medium">{label}</span>
    </div>
  )
}
