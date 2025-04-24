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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./schemas";
import type z from "zod";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
export const SignUpView = () => {
  const trpc = useTRPC();
  const router = useRouter();
  const register = useMutation(
    trpc.auth.register.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: () => {
        toast.success("Account created successfully");
        router.push("/");
      },
    })
  );

  // Initialize form
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    register.mutate(values);
  };

  const username = form.watch("username");
  const usernameError = form.formState.errors.username;
  const showPreview = username && !usernameError;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5">
      <div className="h-screen w-full lg:col-span-3 overflow-auto flex flex-col items-center justify-between px-8 md:px-12 py-12 space-y-12">
        <div className="h-16 w-full flex items-center justify-between">
          <Logo className="text-xl" />
          <Link prefetch href="/sign-in">
            <Button variant="link">
              Login
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <h1 className="text-3xl font-semibold text-center">Welcome</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 flex flex-col w-full max-w-xl gap-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Your store will be available at&nbsp;
                    <strong>{username || "username"}.funroad.com</strong>
                  </FormDescription>
                </FormItem>
              )}
            />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={register.isPending}
            >
              {register.isPending ? "Signing up..." : "Sign Up"}
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
