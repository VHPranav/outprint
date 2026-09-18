"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StepItem {
  id?: string | number;
  title: string;
  description?: string;
}

export interface StepperProps {
  steps: StepItem[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  className,
  orientation = "horizontal",
}) => {
  if (orientation === "vertical") {
    return (
      <div className={cn("space-y-6", className)}>
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isClickable = !!onStepClick && index <= currentStep + 1;

          return (
            <div
              key={step.id ?? index}
              className={cn("flex items-start group", isClickable && "cursor-pointer")}
              onClick={() => isClickable && onStepClick?.(index)}
            >
              <div className="flex flex-col items-center mr-4">
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full text-xs font-medium transition-all duration-200 border",
                    isCompleted &&
                      "bg-[#0B5D3B] text-white border-[#0B5D3B]",
                    isCurrent &&
                      "bg-white text-[#0B5D3B] border-[#0B5D3B] ring-4 ring-[#0B5D3B]/10 shadow-sm",
                    !isCompleted &&
                      !isCurrent &&
                      "bg-[#FAFAF9] text-neutral-400 border-[#E5E5E5]"
                  )}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-0.5 h-10 my-1 transition-colors duration-200",
                      isCompleted ? "bg-[#0B5D3B]" : "bg-[#E5E5E5]"
                    )}
                  />
                )}
              </div>
              <div className="pt-1">
                <p
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isCurrent ? "text-neutral-950 font-medium" : "text-neutral-700"
                  )}
                >
                  {step.title}
                </p>
                {step.description && (
                  <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isClickable = !!onStepClick && index <= currentStep + 1;

          return (
            <React.Fragment key={step.id ?? index}>
              <div
                className={cn(
                  "flex flex-col items-center text-center relative z-10 select-none",
                  isClickable && "cursor-pointer group"
                )}
                onClick={() => isClickable && onStepClick?.(index)}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full text-xs font-medium transition-all duration-200 border",
                    isCompleted &&
                      "bg-[#0B5D3B] text-white border-[#0B5D3B]",
                    isCurrent &&
                      "bg-white text-[#0B5D3B] border-[#0B5D3B] ring-4 ring-[#0B5D3B]/10 shadow-subtle font-medium",
                    !isCompleted &&
                      !isCurrent &&
                      "bg-[#FAFAF9] text-neutral-400 border-[#E5E5E5]"
                  )}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={cn(
                      "text-xs sm:text-[13px] font-medium transition-colors whitespace-nowrap",
                      isCurrent
                        ? "text-neutral-950 font-medium"
                        : isCompleted
                        ? "text-neutral-700"
                        : "text-neutral-400"
                    )}
                  >
                    {step.title}
                  </p>
                  {step.description && (
                    <p className="hidden md:block text-[11px] text-neutral-400 mt-0.5">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-[2px] mx-2 -mt-6 sm:-mt-7 transition-colors duration-300",
                    index < currentStep ? "bg-[#0B5D3B]" : "bg-[#E5E5E5]"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
