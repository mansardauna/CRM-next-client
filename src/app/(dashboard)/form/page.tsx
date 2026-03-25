"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, PenTool, Share2, Eye, MessageSquare, Copy, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type FieldType = "text" | "email" | "number" | "date" | "textarea" | "checkbox";

interface FormField { id: string; label: string; type: FieldType; required: boolean; }
interface FormResponse { id: string; submittedAt: string; data: Record<string, any>; }

const schema = z.object({ label: z.string().min(1, "Required"), type: z.string() });
type SchemaType = z.infer<typeof schema>;

const FIELD_TYPES: FieldType[] = ["text", "email", "number", "date", "textarea", "checkbox"];

export default function FormBuilderPage() {
  const [activeTab, setActiveTab] = useState<"builder" | "responses">("builder");
  const [fields, setFields] = useState<FormField[]>([
    { id: "f1", label: "Full Name", type: "text", required: true },
    { id: "f2", label: "Email Address", type: "email", required: true },
    { id: "f3", label: "Message", type: "textarea", required: false },
  ]);
  const [formName, setFormName] = useState("Contact Form");
  const [copied, setCopied] = useState(false);

  const [responses] = useState<FormResponse[]>([
    { id: "r1", submittedAt: "2024-03-24 10:30", data: { f1: "John Doe", f2: "john@example.com", f3: "Hello!" } },
    { id: "r2", submittedAt: "2024-03-25 09:15", data: { f1: "Jane Smith", f2: "jane@test.io", f3: "Interested in your CRM." } },
  ]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<SchemaType>({ resolver: zodResolver(schema) });

  function addField(data: SchemaType) {
    setFields((p) => [...p, { id: `f${Date.now()}`, label: data.label, type: data.type as FieldType, required: false }]);
    reset();
  }
  function removeField(id: string) { setFields((p) => p.filter((f) => f.id !== id)); }

  const shareUrl = `https://erp.app/f/${formName.toLowerCase().replace(/\s+/g, "-")}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="crm-page-title">Form Builder</h1>
          <p className="text-sm text-muted-foreground mt-1">Build, share and analyze your custom forms</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2" onClick={copyToClipboard}>
            {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Share2 className="h-4 w-4" />}
            {copied ? "Copied" : "Share Link"}
          </Button>
          <Button size="sm" className="gap-2"><Eye className="h-4 w-4" />Preview</Button>
        </div>
      </div>

      <div className="flex gap-1 p-1 bg-muted/30 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab("builder")}
          className={cn(
            "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
            activeTab === "builder" ? "bg-background shadow-sm" : "hover:bg-background/50 text-muted-foreground"
          )}
        >
          Editor
        </button>
        <button
          onClick={() => setActiveTab("responses")}
          className={cn(
            "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
            activeTab === "responses" ? "bg-background shadow-sm" : "hover:bg-background/50 text-muted-foreground"
          )}
        >
          Responses ({responses.length})
        </button>
      </div>

      {activeTab === "builder" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Builder */}
          <div className="crm-card space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="form-name">Form Name</Label>
              <Input id="form-name" value={formName} onChange={(e) => setFormName(e.target.value)} />
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Fields</p>
              <div className="space-y-2">
                {fields.map((field) => (
                  <div key={field.id} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30">
                    <PenTool className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{field.label}</p>
                      <p className="text-xs text-muted-foreground capitalize">{field.type}</p>
                    </div>
                    <button onClick={() => removeField(field.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit(addField)} className="flex gap-2 pt-2">
              <Input id="field-label" placeholder="Field label…" {...register("label")} className={errors.label ? "border-destructive" : ""} />
              <select {...register("type")} id="field-type" className="rounded-lg border border-input px-3 py-2 text-sm bg-background capitalize">
                {FIELD_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <Button id="add-field-btn" type="submit" size="icon" className="shrink-0"><Plus className="h-4 w-4" /></Button>
            </form>
          </div>

          {/* Preview */}
          <div className="crm-card">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Live Preview — {formName}</p>
            <div className="space-y-4">
              {fields.map((field) => (
                <div key={field.id} className="space-y-1.5">
                  <Label>{field.label}{field.required && <span className="text-destructive ml-1">*</span>}</Label>
                  {field.type === "textarea" ? (
                    <textarea className="w-full rounded-lg border border-input px-3 py-2 text-sm bg-background resize-none h-20" placeholder={field.label} />
                  ) : field.type === "checkbox" ? (
                    <div className="flex items-center gap-2"><input type="checkbox" className="h-4 w-4" /><span className="text-sm">{field.label}</span></div>
                  ) : (
                    <Input type={field.type} placeholder={field.label} />
                  )}
                </div>
              ))}
              {fields.length > 0 && (
                <Button id="form-preview-submit" className="w-full mt-2">Submit</Button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="crm-card overflow-hidden !p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 font-semibold text-muted-foreground">ID</th>
                  <th className="px-6 py-3 font-semibold text-muted-foreground">Submitted At</th>
                  {fields.map((f) => (
                    <th key={f.id} className="px-6 py-3 font-semibold text-muted-foreground">{f.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {responses.map((resp) => (
                  <tr key={resp.id} className="hover:bg-muted/5 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs">{resp.id}</td>
                    <td className="px-6 py-4 text-muted-foreground">{resp.submittedAt}</td>
                    {fields.map((f) => (
                      <td key={f.id} className="px-6 py-4">{resp.data[f.id] || "—"}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {responses.length === 0 && (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="font-semibold text-foreground">No responses yet</p>
              <p className="text-sm text-muted-foreground mt-1">Share your form to start collecting data</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
