"use client";

import * as React from "react";
import Image from "next/image";
import { Palette, UploadCloud, MessageCircle, PackageCheck, Truck } from "lucide-react";
import type {
  Product,
  ShapeOptionGroup,
  SizeOptionGroup,
  QuantityOptionGroup,
  MaterialOptionGroup,
} from "@/data/products";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const howToOrderSteps = [
  {
    icon: Palette,
    title: "Configure your order",
    description: "Pick shape, size, quantity and material for your product.",
  },
  {
    icon: UploadCloud,
    title: "Attach your design",
    description: "Upload artwork, pick a template, design it yourself, or hire our design team.",
  },
  {
    icon: MessageCircle,
    title: "Send your order on WhatsApp",
    description: "One tap sends your full configuration and design file straight to our team.",
  },
  {
    icon: PackageCheck,
    title: "We confirm & produce",
    description: "You'll get a free digital proof to approve before anything goes to press.",
  },
  {
    icon: Truck,
    title: "Delivered to your door",
    description: "Fast delivery across all Emirates with tracking updates sent over WhatsApp.",
  },
];

const faqs = [
  {
    question: "What file formats do you accept?",
    answer:
      "Vector PDF/X-4, Adobe Illustrator (.ai), EPS and high-resolution PNG/JPG (300 DPI minimum). We'll flag low-resolution files before printing.",
  },
  {
    question: "Do I get a proof before you print?",
    answer:
      "Yes — every order includes a free digital proof. Production only starts after you approve it over WhatsApp.",
  },
  {
    question: "How long does production take?",
    answer:
      "Most orders ship in 5-7 business days after proof approval. Rush production is available as an add-on where offered.",
  },
];

interface ProductInfoTabsProps {
  product: Product;
}

export function ProductInfoTabs({ product }: ProductInfoTabsProps) {
  const shapeGroup = product.optionGroups.find((g): g is ShapeOptionGroup => g.type === "shape");
  const sizeGroup = product.optionGroups.find((g): g is SizeOptionGroup => g.type === "size");
  const quantityGroup = product.optionGroups.find(
    (g): g is QuantityOptionGroup => g.type === "quantity"
  );
  const materialGroup = product.optionGroups.find(
    (g): g is MaterialOptionGroup => g.type === "material"
  );

  const specs: { label: string; value: string }[] = [];
  if (sizeGroup) {
    specs.push({
      label: "Sizes",
      value:
        sizeGroup.presets.map((p) => p.label).join(", ") +
        (sizeGroup.allowCustomSize ? " · Custom sizes available" : ""),
    });
  }
  if (quantityGroup) {
    specs.push({
      label: "Quantity range",
      value: `${Math.min(...quantityGroup.tiers)} – ${Math.max(...quantityGroup.tiers)} pcs`,
    });
  }
  if (materialGroup) {
    specs.push({
      label: "Materials",
      value: materialGroup.options.map((m) => m.label).join(", "),
    });
  }
  if (shapeGroup) {
    specs.push({ label: "Shapes", value: shapeGroup.options.join(", ") });
  }

  return (
    <Tabs defaultValue="how-to-order" className="w-full">
      <TabsList className="h-auto flex-wrap justify-start gap-1">
        <TabsTrigger value="how-to-order">How to Order</TabsTrigger>
        <TabsTrigger value="gallery">Gallery</TabsTrigger>
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="faqs">FAQs</TabsTrigger>
        <TabsTrigger value="specs">Specs</TabsTrigger>
      </TabsList>

      <TabsContent value="how-to-order" className="pt-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {howToOrderSteps.map((step, index) => (
            <div key={step.title}>
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-black text-xs font-medium text-white">
                {index + 1}
              </div>
              <step.icon className="mb-2 h-5 w-5 text-neutral-700" />
              <h4 className="font-serif text-base text-neutral-900">{step.title}</h4>
              <p className="mt-1 text-xs leading-relaxed text-neutral-500">{step.description}</p>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="gallery" className="pt-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {product.images.map((image, index) => (
            <div key={image + index} className="relative aspect-square w-full overflow-hidden rounded-xl border border-[#E5E5E5]">
              <Image
                src={image}
                alt={`${product.name} gallery image ${index + 1}`}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="description" className="pt-6">
        <p className="max-w-2xl text-sm leading-relaxed text-neutral-600">{product.description}</p>
      </TabsContent>

      <TabsContent value="faqs" className="pt-6">
        <Accordion type="single" collapsible className="max-w-2xl">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </TabsContent>

      <TabsContent value="specs" className="pt-6">
        <dl className="max-w-2xl divide-y divide-[#E5E5E5] border-y border-[#E5E5E5]">
          {specs.map((spec) => (
            <div key={spec.label} className="flex flex-col gap-1 py-3 text-sm sm:flex-row sm:justify-between">
              <dt className="text-neutral-500">{spec.label}</dt>
              <dd className="font-medium text-neutral-900 sm:text-right">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </TabsContent>
    </Tabs>
  );
}
