"use client";

import * as React from "react";
import { Check, Zap } from "lucide-react";
import { categories } from "@/data/categories";
import { PRICING_TIERS, STYLE_TAGS, RUSH_TURNAROUND, type StyleTag } from "@/data/hire-designer";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { Stepper, type StepItem } from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "@/components/ui/toast";
import { ReferenceUploads, type ReferenceFile } from "./reference-uploads";
import { ConfirmationScreen } from "./confirmation-screen";

const NOT_SURE = "Not sure yet";
const ROOT_CATEGORIES = categories.filter((c) => !c.parentId).map((c) => c.name);

const STEPS: StepItem[] = [
  { title: "Project" },
  { title: "Brief" },
  { title: "Package" },
  { title: "You" },
];

interface RequestFormProps {
  initialCategory?: string;
  initialProductName?: string;
  initialTier?: string;
}

export function RequestForm({ initialCategory, initialProductName, initialTier }: RequestFormProps) {
  const [step, setStep] = React.useState(0);

  const [category, setCategory] = React.useState(
    initialCategory && ROOT_CATEGORIES.includes(initialCategory) ? initialCategory : ""
  );
  const [brief, setBrief] = React.useState("");
  const [styleTags, setStyleTags] = React.useState<StyleTag[]>([]);
  const [references, setReferences] = React.useState<ReferenceFile[]>([]);

  const [tier, setTier] = React.useState(
    initialTier && PRICING_TIERS.some((t) => t.id === initialTier) ? initialTier : "standard"
  );
  const [wantsRush, setWantsRush] = React.useState(false);

  const [name, setName] = React.useState("");
  const [contact, setContact] = React.useState("");

  const [waLink, setWaLink] = React.useState<string | null>(null);

  const selectedTier = PRICING_TIERS.find((t) => t.id === tier) ?? PRICING_TIERS[0];
  const effectiveTurnaround = wantsRush ? RUSH_TURNAROUND : selectedTier.turnaround;

  const canAdvance = step === 0 ? !!category : step === 1 ? brief.trim().length > 0 : true;
  const canSubmit = name.trim().length > 0 && contact.trim().length > 0;

  function toggleStyleTag(tag: StyleTag) {
    setStyleTags((current) => (current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag]));
  }

  function resetForm() {
    setStep(0);
    setCategory("");
    setBrief("");
    setStyleTags([]);
    setReferences([]);
    setTier("standard");
    setWantsRush(false);
    setName("");
    setContact("");
    setWaLink(null);
  }

  function handleSubmit() {
    if (!canSubmit) return;
    try {
      const link = buildWhatsAppLink({
        type: "design-request",
        customerName: name,
        contact,
        category: category || undefined,
        productContext: initialProductName,
        projectDescription: brief,
        styleTags,
        referenceFileUrls: references.filter((f) => f.status === "success" && f.url).map((f) => f.url!),
        packageTier: selectedTier.name,
        turnaround: effectiveTurnaround,
      });
      window.open(link, "_blank", "noopener,noreferrer");
      setWaLink(link);
    } catch (error) {
      toast.error("WhatsApp isn't set up yet", {
        description: error instanceof Error ? error.message : undefined,
      });
    }
  }

  if (waLink) {
    return <ConfirmationScreen waLink={waLink} onReset={resetForm} />;
  }

  return (
    <div>
      {initialProductName && (
        <span className="mb-6 inline-flex items-center rounded-full border border-[#E5E5E5] bg-white px-4 py-1.5 text-xs font-medium text-neutral-600">
          Designing for {initialProductName}
        </span>
      )}

      <Stepper steps={STEPS} currentStep={step} onStepClick={(i) => i <= step && setStep(i)} className="mb-10" />

      <div className="rounded-3xl border border-[#E5E5E5] bg-white p-6 sm:p-10">
        {/* Step 0: Project */}
        {step === 0 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl text-neutral-900">What are you designing?</h2>
              <p className="mt-1.5 text-sm text-neutral-500">
                Pick the closest fit — your designer can always adjust scope once they see your brief.
              </p>
            </div>
            <Select value={category || undefined} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a category" />
              </SelectTrigger>
              <SelectContent>
                {ROOT_CATEGORIES.map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
                <SelectItem value={NOT_SURE}>{NOT_SURE}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Step 1: Brief */}
        {step === 1 && (
          <div className="space-y-7">
            <div>
              <h2 className="font-serif text-2xl text-neutral-900">Describe your brief</h2>
              <p className="mt-1.5 text-sm text-neutral-500">
                The more context you give, the fewer rounds of revisions you&apos;ll need.
              </p>
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-neutral-500">
                Your brief
              </label>
              <Textarea
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                placeholder="What's this for, who's it for, and what should it feel like? Share any brand colors, copy, or must-haves."
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-neutral-500">
                Reference images or logo
              </label>
              <ReferenceUploads files={references} onChange={setReferences} />
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-neutral-500">
                Style preference
              </label>
              <div className="flex flex-wrap gap-2">
                {STYLE_TAGS.map((tag) => {
                  const active = styleTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleStyleTag(tag)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                        active
                          ? "border-black bg-black text-white"
                          : "border-[#E5E5E5] text-neutral-700 hover:border-neutral-400"
                      )}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Package */}
        {step === 2 && (
          <div className="space-y-7">
            <div>
              <h2 className="font-serif text-2xl text-neutral-900">Choose a package</h2>
              <p className="mt-1.5 text-sm text-neutral-500">You can always upgrade later if the scope grows.</p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {PRICING_TIERS.map((option) => {
                const active = tier === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setTier(option.id)}
                    className={cn(
                      "flex flex-col rounded-2xl border-2 p-4 text-left transition-colors",
                      active ? "border-black bg-[#FAFAF9]" : "border-[#E5E5E5] hover:border-neutral-300"
                    )}
                  >
                    <span className="flex items-center justify-between">
                      <span className="text-sm font-medium text-neutral-900">{option.name}</span>
                      {active && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                          <Check className="h-3 w-3" />
                        </span>
                      )}
                    </span>
                    <span className="mt-1 text-xs text-neutral-500">{option.tagline}</span>
                    <span className="mt-0.5 text-xs font-medium text-neutral-700">{option.turnaround}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setWantsRush((v) => !v)}
              className={cn(
                "flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors",
                wantsRush ? "border-black bg-[#FAFAF9]" : "border-[#E5E5E5] hover:border-neutral-300"
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                  wantsRush ? "bg-black text-white" : "bg-[#F5F5F4] text-neutral-400"
                )}
              >
                <Zap className="h-3 w-3" />
              </span>
              <span className="flex-1">
                <span className="block text-sm font-medium text-neutral-900">Need it faster?</span>
                <span className="block text-xs text-neutral-500">
                  Rush it to {RUSH_TURNAROUND.toLowerCase()}.
                </span>
              </span>
            </button>
          </div>
        )}

        {/* Step 3: Contact + review */}
        {step === 3 && (
          <div className="space-y-7">
            <div>
              <h2 className="font-serif text-2xl text-neutral-900">Your details</h2>
              <p className="mt-1.5 text-sm text-neutral-500">
                We&apos;ll use this to introduce you to your designer on WhatsApp.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Name
                </label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Phone or email
                </label>
                <Input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="+971 50 123 4567 or you@email.com"
                />
              </div>
            </div>

            <div className="rounded-2xl bg-[#FAFAF9] p-5">
              <h3 className="text-xs font-medium uppercase tracking-wider text-neutral-500">Review</h3>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-neutral-500">Designing</dt>
                  <dd className="text-right font-medium text-neutral-900">{category || "Not specified"}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="shrink-0 text-neutral-500">Brief</dt>
                  <dd className="truncate text-right text-neutral-700">{brief || "—"}</dd>
                </div>
                {styleTags.length > 0 && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-neutral-500">Style</dt>
                    <dd className="text-right text-neutral-700">{styleTags.join(", ")}</dd>
                  </div>
                )}
                {references.length > 0 && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-neutral-500">References</dt>
                    <dd className="text-right text-neutral-700">
                      {references.filter((f) => f.status === "success").length} of {references.length} uploaded
                    </dd>
                  </div>
                )}
                <div className="flex justify-between gap-4 border-t border-[#E5E5E5] pt-2">
                  <dt className="text-neutral-500">Package</dt>
                  <dd className="text-right font-medium text-neutral-900">{selectedTier.name}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-neutral-500">Turnaround</dt>
                  <dd className="text-right text-neutral-700">{effectiveTurnaround}</dd>
                </div>
              </dl>
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between border-t border-[#F0F0EE] pt-6">
          {step > 0 ? (
            <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>
              Back
            </Button>
          ) : (
            <span />
          )}
          {step < STEPS.length - 1 ? (
            <Button onClick={() => setStep((s) => s + 1)} disabled={!canAdvance}>
              Continue
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!canSubmit}>
              Send Request on WhatsApp
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
