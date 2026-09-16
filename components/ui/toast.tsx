"use client";

import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast font-sans group-[.toaster]:bg-white group-[.toaster]:text-neutral-900 group-[.toaster]:border-[#E5E5E5] group-[.toaster]:shadow-card-hover group-[.toaster]:rounded-xl group-[.toaster]:p-4",
          description: "group-[.toast]:text-neutral-500 text-xs mt-1",
          actionButton:
            "group-[.toast]:bg-[#0B5D3B] group-[.toast]:text-white font-medium text-xs rounded-lg px-3 py-1.5",
          cancelButton:
            "group-[.toast]:bg-neutral-100 group-[.toast]:text-neutral-700 font-medium text-xs rounded-lg px-3 py-1.5",
          success: "!border-[#C4E4D5] !bg-[#F2F9F5] !text-[#0B5D3B]",
          error: "!border-red-200 !bg-red-50 !text-red-900",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
