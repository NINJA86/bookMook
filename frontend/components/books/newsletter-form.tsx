"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { newsletterSchema } from "@/lib/validators";

type NewsletterValues = z.infer<typeof newsletterSchema>;

export function NewsletterForm() {
  const form = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: ""
    }
  });

  async function onSubmit(values: NewsletterValues) {
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      toast.error("Could not subscribe right now.");
      return;
    }

    form.reset();
    toast.success("Subscribed to the Bookmook letter.");
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 sm:flex-row">
      <Input type="email" placeholder="Enter your email" {...form.register("email")} />
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Joining..." : "Join newsletter"}
      </Button>
    </form>
  );
}
