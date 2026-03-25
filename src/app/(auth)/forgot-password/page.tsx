"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { useState } from "react";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
});
type FormData = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    await new Promise((r) => setTimeout(r, 800));
    console.log("Reset request:", data);
    setSent(true);
  }

  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 shadow-2xl">
      {sent ? (
        <div className="text-center py-4">
          <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
            <Mail className="h-6 w-6 text-emerald-400" />
          </div>
          <h2 className="text-lg font-bold text-white mb-2">Check your inbox</h2>
          <p className="text-sm text-white/50 mb-6">We&apos;ve sent a password reset link to your email.</p>
          <Link href="/login" className="text-primary hover:underline text-sm">Back to login</Link>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold text-white mb-1">Reset password</h2>
          <p className="text-sm text-white/50 mb-6">We&apos;ll send you a reset link</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-white/70 text-xs uppercase tracking-wide">Email</Label>
              <Input id="email" type="email" placeholder="you@company.com" className="bg-white/10 border-white/20 text-white placeholder:text-white/30" {...register("email")} />
              {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
            </div>
            <Button id="forgot-submit" type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              {isSubmitting ? "Sending…" : "Send Reset Link"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-white/40">
            <Link href="/login" className="text-primary hover:underline">Back to login</Link>
          </p>
        </>
      )}
    </div>
  );
}
