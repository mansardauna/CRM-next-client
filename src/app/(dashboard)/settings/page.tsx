"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Building2, Globe, Bell, Shield } from "lucide-react";
import { useState } from "react";

const schema = z.object({
  company_name: z.string().min(1, "Required"),
  company_email: z.string().email("Invalid email"),
  timezone: z.string(),
  language: z.string(),
  currency: z.string(),
});
type FormData = z.infer<typeof schema>;

const TABS = [
  { id: "general", label: "General", icon: Building2 },
  { id: "locale", label: "Locale", icon: Globe },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
];

export default function SettingsPage() {
  const [tab, setTab] = useState("general");
  const [saved, setSaved] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { company_name: "My Company", company_email: "admin@company.com", timezone: "UTC", language: "English", currency: "USD" },
  });

  async function onSubmit(data: FormData) {
    await new Promise((r) => setTimeout(r, 600));
    console.log("Settings saved:", data);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="space-y-6">
      <h1 className="crm-page-title">Settings</h1>

      <div className="flex gap-6">
        {/* Sidebar tabs */}
        <nav className="w-48 shrink-0 space-y-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              id={`settings-tab-${t.id}`}
              onClick={() => setTab(t.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${tab === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
            >
              <t.icon className="h-4 w-4 shrink-0" />
              {t.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="flex-1 crm-card">
          {tab === "general" && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <h2 className="text-base font-semibold mb-4">General Settings</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="company_name">Company Name</Label>
                  <Input id="company_name" {...register("company_name")} className={errors.company_name ? "border-destructive" : ""} />
                  {errors.company_name && <p className="text-xs text-destructive">{errors.company_name.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="company_email">Company Email</Label>
                  <Input id="company_email" type="email" {...register("company_email")} className={errors.company_email ? "border-destructive" : ""} />
                  {errors.company_email && <p className="text-xs text-destructive">{errors.company_email.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input id="timezone" {...register("timezone")} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="language">Language</Label>
                  <Input id="language" {...register("language")} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="currency">Currency</Label>
                  <Input id="currency" {...register("currency")} />
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <Button id="settings-save" type="submit" disabled={isSubmitting} className="gap-2">
                  <Save className="h-4 w-4" />
                  {isSubmitting ? "Saving…" : "Save Settings"}
                </Button>
                {saved && <span className="text-sm text-emerald-600 font-medium">✓ Saved successfully</span>}
              </div>
            </form>
          )}
          {tab === "locale" && (
            <div>
              <h2 className="text-base font-semibold mb-4">Locale & Internationalization</h2>
              <p className="text-sm text-muted-foreground">Supported languages: English, Arabic, German, Spanish, French.</p>
            </div>
          )}
          {tab === "notifications" && (
            <div>
              <h2 className="text-base font-semibold mb-4">Notification Preferences</h2>
              <p className="text-sm text-muted-foreground">Configure email and in-app notification settings.</p>
            </div>
          )}
          {tab === "security" && (
            <div>
              <h2 className="text-base font-semibold mb-4">Security</h2>
              <p className="text-sm text-muted-foreground">Manage two-factor authentication and session settings.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
