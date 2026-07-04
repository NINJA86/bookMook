import { Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-10 px-6 py-14">
      <div className="space-y-4">
        <p className="text-sm font-medium text-primary">Get in touch</p>
        <h1 className="font-display text-5xl font-semibold tracking-tight sm:text-6xl">Contact BookMook</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Reach out about partnerships, new releases, curated reading lists, or anything else about the BookMook experience.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <Card>
          <CardContent className="space-y-5 p-6">
            <div className="flex items-start gap-3 rounded-[24px] border border-border bg-background/60 p-4">
              <Mail className="mt-1 h-4 w-4 text-primary" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-muted-foreground">hello@bookmook.store</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-[24px] border border-border bg-background/60 p-4">
              <Phone className="mt-1 h-4 w-4 text-primary" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-sm text-muted-foreground">+1 (415) 555-0198</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-[24px] border border-border bg-background/60 p-4">
              <MapPin className="mt-1 h-4 w-4 text-primary" />
              <div>
                <p className="font-medium">Studio</p>
                <p className="text-sm text-muted-foreground">34 Orchard Lane, San Francisco, CA</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4 p-6">
            <h2 className="font-display text-3xl font-semibold">Send a message</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Input placeholder="Your name" />
              <Input type="email" placeholder="Email address" />
            </div>
            <Input placeholder="Subject" />
            <Textarea placeholder="Tell us what you are looking for..." className="min-h-40 rounded-[24px]" />
            <Button className="w-full sm:w-fit">Send inquiry</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
