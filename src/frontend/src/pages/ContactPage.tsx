import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle, Clock, Mail, MapPin, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { ContactRequest } from "../backend";
import { mockBackend } from "../mocks/backend";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "ashwin.chouhan@pharmaresearch.ac.in",
    href: "mailto:ashwin.chouhan@pharmaresearch.ac.in",
  },
  { icon: MapPin, label: "Location", value: "India", href: null },
  {
    icon: Clock,
    label: "Response Time",
    value: "Usually within 48 hours",
    href: null,
  },
];

export function ContactPage() {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = useMutation({
    mutationFn: (req: ContactRequest) => mockBackend.submitContact(req),
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Message sent successfully! I'll get back to you soon.");
    },
    onError: () => {
      toast.error("Failed to send message. Please try again.");
    },
  });

  const validate = () => {
    const newErrors: Partial<ContactForm> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email address";
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    submitMutation.mutate({
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    });
  };

  const handleChange =
    (field: keyof ContactForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const loading = submitMutation.isPending;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-display text-4xl font-black text-foreground mb-3">
          Get in <span className="text-gradient">Touch</span>
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
          Have a research collaboration in mind? Want to discuss pharmacology or
          have a question? I'd love to hear from you.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Contact Info */}
        <motion.div
          className="lg:col-span-2 flex flex-col gap-6"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-5">
            <h2 className="font-display font-bold text-foreground">
              Contact Information
            </h2>
            {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-primary/15 border border-primary/30 shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm text-foreground hover:text-accent transition-smooth break-all"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm text-foreground">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-6">
            <h3 className="font-display font-semibold text-foreground mb-2">
              Research Collaboration
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Open to collaborative research opportunities, co-authorship, and
              academic partnerships in pharmacology, drug discovery, and
              medicinal chemistry.
            </p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-card border border-border rounded-2xl p-8">
            {submitted ? (
              <div
                className="flex flex-col items-center justify-center py-12 gap-4 text-center"
                data-ocid="contact.success_state"
              >
                <div className="p-4 rounded-full bg-accent/20 border border-accent/40">
                  <CheckCircle className="w-10 h-10 text-accent" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  Message Sent!
                </h3>
                <p className="text-muted-foreground text-sm max-w-sm">
                  Thank you for reaching out. I'll review your message and get
                  back to you within 48 hours.
                </p>
                <Button
                  variant="outline"
                  className="mt-2 border-border"
                  onClick={() => {
                    setSubmitted(false);
                    submitMutation.reset();
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                >
                  Send Another
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
                noValidate
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="name"
                      className="text-muted-foreground text-sm"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={handleChange("name")}
                      placeholder="Your name"
                      className="bg-input border-border focus:border-primary/60"
                      data-ocid="contact.name_input"
                    />
                    {errors.name && (
                      <p
                        className="text-destructive text-xs"
                        data-ocid="contact.name_field_error"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="email"
                      className="text-muted-foreground text-sm"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange("email")}
                      placeholder="your@email.com"
                      className="bg-input border-border focus:border-primary/60"
                      data-ocid="contact.email_input"
                    />
                    {errors.email && (
                      <p
                        className="text-destructive text-xs"
                        data-ocid="contact.email_field_error"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="subject"
                    className="text-muted-foreground text-sm"
                  >
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    value={form.subject}
                    onChange={handleChange("subject")}
                    placeholder="Research collaboration, question, etc."
                    className="bg-input border-border focus:border-primary/60"
                    data-ocid="contact.subject_input"
                  />
                  {errors.subject && (
                    <p
                      className="text-destructive text-xs"
                      data-ocid="contact.subject_field_error"
                    >
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="message"
                    className="text-muted-foreground text-sm"
                  >
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    value={form.message}
                    onChange={handleChange("message")}
                    placeholder="Tell me about your inquiry..."
                    rows={6}
                    className="bg-input border-border focus:border-primary/60 resize-none"
                    data-ocid="contact.message_textarea"
                  />
                  {errors.message && (
                    <p
                      className="text-destructive text-xs"
                      data-ocid="contact.message_field_error"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="gradient-primary text-primary-foreground font-semibold w-full py-5 hover:opacity-90 transition-smooth"
                  data-ocid="contact.submit_button"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" /> Send Message
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
