import React, { useState } from "react"
import { Mail, Linkedin, Github, Send, CheckCircle2 } from "lucide-react"
import { AnimatedHeading } from "./AnimatedHeading"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setFormData({ name: "", email: "", subject: "", message: "" })
      
      // Auto-reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000)
    }, 1200)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="py-20 md:py-32 bg-background-alt relative overflow-hidden">
      {/* Background glow decorations */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10">
        <div className="flex items-center gap-4 mb-16">
          <span className="text-primary font-mono text-sm">07.</span>
          <AnimatedHeading className="text-2xl md:text-3xl font-bold text-foreground">Get In Touch</AnimatedHeading>
          <div className="h-px bg-border flex-1 max-w-xs" />
        </div>

        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Contact Information */}
          <div className="flex flex-col p-6 md:p-8 bg-card backdrop-blur-md border border-border rounded-2xl shadow-xl hover:border-primary/30 transition-colors duration-300">
            <div>
              <h3 className="text-xl font-bold font-sans text-foreground mb-3">Contact Information</h3>
              <p className="text-sm text-muted-foreground font-sans mb-8 leading-relaxed">
                I'm currently open to new opportunities and collaborations. Whether you have a question or just want to say hi, feel free to reach out!
              </p>
              
              <div className="space-y-6">
                {/* Email Item */}
                <a 
                  href="mailto:mohsinalimirxa@gmail.com" 
                  className="group flex items-center gap-4 p-3 -mx-3 rounded-xl hover:bg-muted/40 transition-colors duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center text-primary group-hover:text-primary group-hover:border-primary/30 group-hover:bg-primary/10 transition-all duration-300 shadow-inner">
                     <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono tracking-wider text-muted-foreground uppercase">Email</span>
                    <span className="block text-sm md:text-base font-semibold font-sans text-foreground group-hover:text-primary transition-colors duration-300">
                      mohsinalimirxa@gmail.com
                    </span>
                  </div>
                </a>

                {/* LinkedIn Item */}
                <a 
                  href="https://linkedin.com/in/mohsin-ali-mirza" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center gap-4 p-3 -mx-3 rounded-xl hover:bg-muted/40 transition-colors duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center text-primary group-hover:text-primary group-hover:border-primary/30 group-hover:bg-primary/10 transition-all duration-300 shadow-inner">
                     <Linkedin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono tracking-wider text-muted-foreground uppercase">LinkedIn</span>
                    <span className="block text-sm md:text-base font-semibold font-sans text-foreground group-hover:text-primary transition-colors duration-300">
                      linkedin.com/in/mohsin-ali-mirza
                    </span>
                  </div>
                </a>

                {/* GitHub Item */}
                <a 
                  href="https://github.com/mohsin-ali-mirza" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center gap-4 p-3 -mx-3 rounded-xl hover:bg-muted/40 transition-colors duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center text-primary group-hover:text-primary group-hover:border-primary/30 group-hover:bg-primary/10 transition-all duration-300 shadow-inner">
                     <Github className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono tracking-wider text-muted-foreground uppercase">GitHub</span>
                    <span className="block text-sm md:text-base font-semibold font-sans text-foreground group-hover:text-primary transition-colors duration-300">
                      github.com/mohsin-ali-mirza
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Send Me a Message Form */}
          <div className="p-6 md:p-8 bg-card backdrop-blur-md border border-border rounded-2xl shadow-xl hover:border-primary/30 transition-colors duration-300 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold font-sans text-foreground mb-6">Send Me a Message</h3>
              
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-4 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                     <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h4 className="text-lg font-bold font-sans text-foreground mb-2">Message Sent!</h4>
                  <p className="text-sm font-sans text-muted-foreground max-w-sm">
                    Thank you for reaching out! I appreciate your message and will get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="sr-only">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-muted/40 border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-sm font-sans"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="sr-only">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-muted/40 border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-sm font-sans"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="sr-only">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-muted/40 border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-sm font-sans"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="sr-only">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-muted/40 border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-sm resize-none font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.2 px-6 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/25 hover:border-primary/40 text-primary font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_12px_rgba(0,240,255,0.05)] hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] font-sans"
                  >
                    {isSubmitting ? (
                      <span className="h-5 w-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
