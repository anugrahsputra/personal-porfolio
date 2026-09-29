"use client";

import { useState } from "react";
import { CircleAlert, CircleCheck, Linkedin, Loader2, Mail, MapPin } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SectionLabel from "@/components/SectionLabel";
import { Reveal, RevealLine } from "@/components/motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeData } from "@/features/resume/types";
import { sendMail } from "../data/actions";

interface ContactProps {
  initialData: ResumeData;
}

type Field = "name" | "email" | "subject" | "message";
type FormValues = Record<Field, string>;
type Status = "idle" | "sending" | "sent" | "failed";

const EMPTY_FORM: FormValues = { name: "", email: "", subject: "", message: "" };

function validate(values: FormValues): Partial<FormValues> {
  const errors: Partial<FormValues> = {};
  if (!values.name.trim()) errors.name = "Enter your name.";
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim()))
    errors.email = "Enter an email address like name@example.com.";
  if (!values.subject.trim()) errors.subject = "Add a subject.";
  if (!values.message.trim()) errors.message = "Write a message.";
  return errors;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p
      id={id}
      className="mt-2 flex gap-2 rounded-sm bg-destructive px-2 py-1.5 text-sm/5 text-foreground"
    >
      <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
      {message}
    </p>
  );
}

const labelClass = "mb-2 block text-sm/5";
const linkClass = "rounded-sm link-line";

export default function Contact({ initialData }: ContactProps) {
  const { email, location, linkedin } = initialData;
  const [values, setValues] = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = e.target.name as Field;
    setValues({ ...values, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    setStatus("sending");
    const { name, email: from, subject, message } = values;
    const result = await sendMail(name, from, subject, message);
    setStatus(result.success ? "sent" : "failed");
    if (result.success) setValues(EMPTY_FORM);
  };

  const fieldProps = (field: Field) => ({
    id: field,
    name: field,
    value: values[field],
    onChange: handleChange,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });

  return (
    <section
      id="contact"
      className="pt-[clamp(4rem,7.5vw,7.5rem)] pb-[clamp(4.5rem,8vw,8rem)]"
    >
      <div className="page-container">
        <RevealLine />
        <div className="grid gap-y-10 pt-6 md:grid-cols-2 md:gap-x-[clamp(2rem,4vw,4rem)]">
          <Reveal className="md:sticky md:top-24 md:self-start">
            <SectionLabel>Contact</SectionLabel>
            <p className="mt-8 max-w-[22ch] indent-[clamp(2.5rem,4vw,3.5rem)] text-[clamp(1.5rem,2.4vw,2.125rem)] leading-[1.2] tracking-[-0.025em]">
              Available for freelance mobile work and full-time roles.
            </p>
            <ul className="mt-6 space-y-3 text-sm/5">
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-foreground/60" aria-hidden />
                <a href={`mailto:${email}`} className={linkClass}>
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-foreground/70">
                <MapPin className="size-4 text-foreground/60" aria-hidden />
                {location}
              </li>
              {linkedin && (
                <li className="flex items-center gap-2">
                  <Linkedin className="size-4 text-foreground/60" aria-hidden />
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="min-w-0">
            <Card className="p-[clamp(1.25rem,2.5vw,2rem)]">
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {status === "sent" && (
                  <Alert>
                    <CircleCheck />
                    <AlertTitle>Message sent</AlertTitle>
                    <AlertDescription>
                      Thanks. I&apos;ll reply by email.
                    </AlertDescription>
                  </Alert>
                )}
                {status === "failed" && (
                  <Alert variant="destructive">
                    <CircleAlert />
                    <AlertTitle>Your message didn&apos;t send</AlertTitle>
                    <AlertDescription>
                      The mail server didn&apos;t accept it. Try again, or email me
                      at{" "}
                      <a href={`mailto:${email}`} className="underline underline-offset-4">
                        {email}
                      </a>
                      .
                    </AlertDescription>
                  </Alert>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      Name
                    </label>
                    <Input {...fieldProps("name")} autoComplete="name" />
                    <FieldError id="name-error" message={errors.name} />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email
                    </label>
                    <Input
                      {...fieldProps("email")}
                      type="email"
                      autoComplete="email"
                      placeholder="name@example.com"
                    />
                    <FieldError id="email-error" message={errors.email} />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className={labelClass}>
                    Subject
                  </label>
                  <Input {...fieldProps("subject")} />
                  <FieldError id="subject-error" message={errors.subject} />
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    Message
                  </label>
                  <Textarea {...fieldProps("message")} rows={6} />
                  <FieldError id="message-error" message={errors.message} />
                </div>

                <Button type="submit" size="lg" disabled={status === "sending"}>
                  {status === "sending" ? (
                    <>
                      <Loader2 className="animate-spin" aria-hidden />
                      Sending...
                    </>
                  ) : (
                    "Send message"
                  )}
                </Button>
              </form>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
