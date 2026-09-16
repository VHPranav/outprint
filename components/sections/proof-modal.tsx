"use client";

import * as React from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { CheckCircle2, FileCheck } from "lucide-react";

interface ProofModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProofModal({ open, onOpenChange }: ProofModalProps) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Prepress Digital Proof Studio"
      description="Review automated vector separation, bleed allowance, and dieline tolerance."
      footer={
        <>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              onOpenChange(false);
              toast.success("Proof Signed Off", {
                description: "Proceeding to platemaking and press setup.",
              });
            }}
          >
            Approve Proof & Continue
          </Button>
        </>
      }
    >
      <div className="space-y-4 py-2">
        <div className="rounded-xl border border-[#E5E5E5] bg-[#FAFAF9] p-4 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-500 font-medium">Color Calibration</span>
            <span className="text-[#0B5D3B] font-semibold flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              Fogra51 (PSO Coated v3)
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-500 font-medium">Resolution Check</span>
            <span className="text-neutral-800 font-medium">2400 x 2400 DPI Stochastic</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-500 font-medium">Dieline Offset</span>
            <span className="text-neutral-800 font-medium">3.00mm Exterior Bleed</span>
          </div>
        </div>

        <div className="p-4 border border-dashed border-[#E5E5E5] rounded-xl flex items-center justify-center space-x-3 bg-white">
          <FileCheck className="w-5 h-5 text-[#0B5D3B]" />
          <p className="text-xs text-neutral-600 font-sans">
            Vector paths verified. Zero low-resolution raster artifacts detected.
          </p>
        </div>
      </div>
    </Modal>
  );
}
