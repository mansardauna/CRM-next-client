"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(data: LoginForm) {
    await new Promise((r) => setTimeout(r, 800));
    console.log("Login:", data);
    window.location.href = "/dashboard";
  }

  return (
    <div className="flex min-h-screen bg-white font-sans">
       {/* Left: Marketing Section */}
       <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#00003C]">
        <div className="absolute inset-0 opacity-40">
           <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070" 
            alt="Business" 
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
            <h1 className="text-5xl font-black leading-tight">Welcome back to excellence.</h1>
            <p className="text-lg text-white/70 font-medium">Continue managing your business with the most powerful suite on the market. Smart insights await.</p>
            
            <div className="space-y-4 pt-4">
              {[
                "Real-time Data Syncing",
                "Advanced User Permissions",
                "Unified Business Dashboard",
              ].map((text) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-[#4CAF50]/20 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-[#4CAF50]" />
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

      {/* Right: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-24 py-12 bg-white dark:bg-[#00001A]">
        <div className="max-w-md w-full mx-auto">
          <div className="lg:hidden flex items-center gap-3 mb-12">
             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00003C] text-white shadow-lg font-black text-2xl">Z</div>
             <span className="text-xl font-black tracking-tight text-[#00003C]">ZARAH</span>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-black text-[#00003C] dark:text-white">Sign In</h2>
            <p className="text-zinc-400 font-bold mt-2">Access your powerful business tools.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[11px] font-black uppercase tracking-wider text-zinc-500">Email Address</Label>
              <Input id="email" type="email" placeholder="john@example.com" className="h-12 bg-zinc-50 border-zinc-200 rounded-xl focus:ring-[#00003C]" {...register("email")} />
              {errors.email && <p className="text-[10px] text-red-500 font-bold">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-[11px] font-black uppercase tracking-wider text-zinc-500">Password</Label>
                <Link href="/forgot-password" size="sm" className="text-[10px] font-bold text-[#00003C] hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Input id="password" type={showPass ? "text" : "password"} placeholder="••••••••" className="h-12 bg-zinc-50 border-zinc-200 rounded-xl pr-10 focus:ring-[#00003C]" {...register("password")} />
                <button type="button" onClick={() => setShowPass((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors">
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-[10px] text-red-500 font-bold">{errors.password.message}</p>}
            </div>

            <div className="pt-2">
              <Button type="submit" disabled={isSubmitting} className="w-full h-12 bg-[#00003C] hover:bg-[#00002C] text-white rounded-xl font-bold text-sm shadow-xl shadow-[#00003C]/20 transition-all active:scale-[0.98]">
                {isSubmitting ? (
                  <span className="flex items-center gap-2"><div className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Signing in…</span>
                ) : (
                  <span className="flex items-center gap-2">Sign In <LogIn className="h-4 w-4" /></span>
                )}
              </Button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm font-bold text-zinc-400">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#00003C] hover:underline">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
