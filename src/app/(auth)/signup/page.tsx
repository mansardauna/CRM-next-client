"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Eye, EyeOff, CheckCircle2, Building2 } from "lucide-react";
import { useState } from "react";

const signupSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  company: z.string().min(1, "Company name is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignupForm = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [showPass, setShowPass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({ resolver: zodResolver(signupSchema) });

  async function onSubmit(data: SignupForm) {
    await new Promise((r) => setTimeout(r, 800));
    console.log("Signup:", data);
    window.location.href = "/dashboard";
  }

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Left: Marketing Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#00003C]">
        <div className="absolute inset-0 opacity-40">
           <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069" 
            alt="Marketing" 
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#00003C] via-[#00003C]/20 to-transparent" />
        
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-3">
             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#00003C] shadow-lg font-black text-2xl">Z</div>
             <span className="text-xl font-black tracking-tight">ZARAH</span>
          </div>
          
          <div className="space-y-6 max-w-md">
            <h1 className="text-5xl font-black leading-tight">Scale your business with confidence.</h1>
            <p className="text-lg text-white/70 font-medium">The most advanced ERP and CRM platform for modern enterprises. Join 10,000+ businesses worldwide.</p>
            
            <div className="space-y-4 pt-4">
              {[
                "Advanced Analytics & Deep Insights",
                "Automated Workflows & CRM",
                "Secure Financial Management",
              ].map((text) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  </div>
                  <span className="font-bold text-sm text-white/90">{text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm font-bold text-white/50">
            <span>© 2024 ZARAH Corp.</span>
            <span>•</span>
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>

      {/* Right: Signup Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-24 py-12 bg-white dark:bg-[#00001A]">
        <div className="max-w-md w-full mx-auto">
          <div className="lg:hidden flex items-center gap-3 mb-12">
             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00003C] text-white shadow-lg font-black text-2xl">Z</div>
             <span className="text-xl font-black tracking-tight text-[#00003C]">ZARAH</span>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-black text-[#00003C] dark:text-white">Create Account</h2>
            <p className="text-zinc-400 font-bold mt-2">Professional suite for your business growth.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[11px] font-black uppercase tracking-wider text-zinc-500">Full Name</Label>
                <Input id="name" placeholder="John Doe" className="h-12 bg-zinc-50 border-zinc-200 rounded-xl focus:ring-[#00003C]" {...register("name")} />
                {errors.name && <p className="text-[10px] text-red-500 font-bold">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-[11px] font-black uppercase tracking-wider text-zinc-500">Company Name</Label>
                <Input id="company" placeholder="Acme Inc." className="h-12 bg-zinc-50 border-zinc-200 rounded-xl focus:ring-[#00003C]" {...register("company")} />
                {errors.company && <p className="text-[10px] text-red-500 font-bold">{errors.company.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[11px] font-black uppercase tracking-wider text-zinc-500">Email Address</Label>
              <Input id="email" type="email" placeholder="john@example.com" className="h-12 bg-zinc-50 border-zinc-200 rounded-xl focus:ring-[#00003C]" {...register("email")} />
              {errors.email && <p className="text-[10px] text-red-500 font-bold">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[11px] font-black uppercase tracking-wider text-zinc-500">Password</Label>
              <div className="relative">
                <Input id="password" type={showPass ? "text" : "password"} placeholder="••••••••" className="h-12 bg-zinc-50 border-zinc-200 rounded-xl pr-10 focus:ring-[#00003C]" {...register("password")} />
                <button type="button" onClick={() => setShowPass((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors">
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-[10px] text-red-500 font-bold">{errors.password.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-[11px] font-black uppercase tracking-wider text-zinc-500">Confirm Password</Label>
              <Input id="confirmPassword" type="password" placeholder="••••••••" className="h-12 bg-zinc-50 border-zinc-200 rounded-xl focus:ring-[#00003C]" {...register("confirmPassword")} />
              {errors.confirmPassword && <p className="text-[10px] text-red-500 font-bold">{errors.confirmPassword.message}</p>}
            </div>

            <div className="pt-2">
              <Button type="submit" disabled={isSubmitting} className="w-full h-12 bg-[#00003C] hover:bg-[#00002C] text-white rounded-xl font-bold text-sm shadow-xl shadow-[#00003C]/20 transition-all active:scale-[0.98]">
                {isSubmitting ? (
                  <span className="flex items-center gap-2"><div className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Processing…</span>
                ) : (
                  <span className="flex items-center gap-2">Create Account <UserPlus className="h-4 w-4" /></span>
                )}
              </Button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm font-bold text-zinc-400">
            Already have an account?{" "}
            <Link href="/login" className="text-[#00003C] hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
