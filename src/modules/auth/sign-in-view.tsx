"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Logo } from "@/components/logo";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./schemas";
import type z from "zod";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
export const SignInView = () => {
  const trpc = useTRPC();
  const router = useRouter();
  const login = useMutation(
    trpc.auth.login.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: () => {
        toast.success("Logged in successfully");
        router.push("/");
      },
    })
  );

  // Initialize form
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    login.mutate(values);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5">
      <div className="h-screen w-full lg:col-span-3 overflow-auto flex flex-col items-center justify-between px-8 md:px-12 py-12 space-y-12">
        <div className="h-16 w-full flex items-center justify-between">
          <Logo className="text-xl" />
          <Link prefetch href="/sign-up">
            <Button variant="link">
              Create an account
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <h1 className="text-3xl font-semibold text-center">
          Welcome Back to your store
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 flex flex-col w-full max-w-xl gap-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="your@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={login.isPending}>
              {login.isPending ? "loging in..." : "Login"}
            </Button>
          </form>
        </Form>
      </div>

      <div className="h-screen w-full lg:col-span-2 bg-white overflow-auto">
        <div className="h-full flex items-center justify-center p-8">Image</div>
      </div>
    </div>
  );
};
