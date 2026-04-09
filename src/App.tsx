/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  MessageCircle, 
  Download, 
  Send, 
  FileText, 
  Layout, 
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Star,
  ShieldCheck,
  Zap
} from 'lucide-react';

const SELAR_LINK = "https://selar.com/7k17r76756";
const WHATSAPP_LINK = "https://wa.me/2348000000000"; // Placeholder, user can update

const PRICES: Record<string, { symbol: string, amount: string }> = {
  NG: { symbol: "₦", amount: "25,000" },
  GH: { symbol: "GH₵", amount: "450" },
  KE: { symbol: "KSh", amount: "4,500" },
  ZA: { symbol: "R", amount: "650" },
  US: { symbol: "$", amount: "35" },
  GB: { symbol: "£", amount: "28" },
  EU: { symbol: "€", amount: "32" },
  DEFAULT: { symbol: "$", amount: "35" }
};

const CTAButton = ({ children, className = "", primary = true }: { children: ReactNode, className?: string, primary?: boolean }) => (
  <motion.a
    href={SELAR_LINK}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg ${
      primary 
        ? "bg-gold text-premium-dark hover:bg-white hover:shadow-gold/20" 
        : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
    } ${className}`}
  >
    {children}
    <ArrowRight className="ml-2 w-5 h-5" />
  </motion.a>
);

const SectionTitle = ({ children, subtitle, light = false }: { children: ReactNode, subtitle?: string, light?: boolean }) => (
  <div className="text-center mb-16">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-3xl md:text-5xl font-extrabold mb-4 ${light ? "text-white" : "text-white"}`}
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-gray-400 text-lg max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
    <div className="w-24 h-1 bg-gold mx-auto mt-6 rounded-full" />
  </div>
);

const NOTIFICATIONS = [
  { name: "Amaka", location: "Enugu, Nigeria", action: "just signed up" },
  { name: "Kofi", location: "Accra, Ghana", action: "just purchased" },
  { name: "Sarah", location: "Nairobi, Kenya", action: "just enrolled" },
  { name: "Ibrahim", location: "Cairo, Egypt", action: "just joined" },
  { name: "Thabo", location: "Johannesburg, SA", action: "just signed up" },
  { name: "Mary", location: "Lagos, Nigeria", action: "just purchased" },
  { name: "James", location: "Abuja, Nigeria", action: "just joined" },
  { name: "Aisha", location: "Ibadan, Nigeria", action: "just signed up" },
  { name: "Chinedu", location: "Enugu, Nigeria", action: "just enrolled" },
  { name: "Bisi", location: "Port Harcourt, Nigeria", action: "just purchased" },
  { name: "Emeka", location: "Owerri, Nigeria", action: "just joined" },
  { name: "Fatima", location: "Kano, Nigeria", action: "just signed up" },
];

const RecentSalesPopup = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setIsVisible(true), 3000);
    
    const cycleInterval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % NOTIFICATIONS.length);
        setIsVisible(true);
      }, 1000); // Wait for exit animation
    }, 8000); // Show each for 7 seconds + 1 second transition

    return () => {
      clearTimeout(showTimer);
      clearInterval(cycleInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -50, scale: 0.9 }}
          className="fixed bottom-8 left-8 z-40 flex items-center bg-premium-dark/90 backdrop-blur-md border border-gold/30 p-4 rounded-2xl shadow-2xl max-w-[280px]"
        >
          <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center mr-4 flex-shrink-0">
            <Zap className="w-5 h-5 text-gold fill-gold" />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-white truncate">
              {NOTIFICATIONS[currentIndex].name} from {NOTIFICATIONS[currentIndex].location}
            </p>
            <p className="text-xs text-gold font-medium">
              {NOTIFICATIONS[currentIndex].action}
            </p>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="ml-4 text-gray-500 hover:text-white transition-colors"
          >
            <XCircle className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-gold transition-colors"
      >
        <span className="text-lg font-semibold pr-8">{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 flex-shrink-0" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-400 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [price, setPrice] = useState(PRICES.NG);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const countryCode = data.country_code;
        if (PRICES[countryCode]) {
          setPrice(PRICES[countryCode]);
        } else if (data.continent_code === 'EU') {
          setPrice(PRICES.EU);
        } else {
          setPrice(PRICES.DEFAULT);
        }
      } catch (error) {
        console.error("Error fetching location:", error);
        setPrice(PRICES.NG); // Fallback to NGN
      }
    };
    fetchLocation();
  }, []);

  return (
    <div className="min-h-screen selection:bg-gold selection:text-premium-dark">
      <RecentSalesPopup />
      {/* Hero Section */}
      <header className="relative pt-24 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-bold mb-8 tracking-wider uppercase"
          >
            Limited Slots Available
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-extrabold mb-8 leading-[1.1] tracking-tight"
          >
            I Will Turn Your Knowledge Into a <span className="text-gold">Profitable Online Course</span> & Sales Page
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Get everything done for you for just <span className="text-white font-bold">{price.symbol}{price.amount}</span> — no tech skills needed. Even if you're starting from zero.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <CTAButton>Get Started Now</CTAButton>
            <p className="mt-6 text-gray-500 text-sm flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 mr-2" />
              Secure Payment via Selar
            </p>
          </motion.div>
        </div>
      </header>

      {/* Problem Section */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Does any of this sound like you?">The Struggle is Real</SectionTitle>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: XCircle, text: "You have knowledge but don't know how to sell it" },
              { icon: XCircle, text: "You don't know how to create a professional course" },
              { icon: XCircle, text: "You don't know how to design a high-converting sales page" },
              { icon: XCircle, text: "You are tired of posting on social media without making money" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-red-500/30 transition-colors group"
              >
                <item.icon className="w-12 h-12 text-red-500 mb-6 group-hover:scale-110 transition-transform" />
                <p className="text-lg font-medium text-gray-300 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gold/5 blur-[150px] -z-10" />
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle subtitle="Your shortcut to becoming a digital product owner">The Ultimate Solution</SectionTitle>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-10 md:p-16 rounded-[40px] bg-gradient-to-br from-gold/20 to-transparent border border-gold/30 backdrop-blur-sm"
          >
            <h3 className="text-2xl md:text-4xl font-bold mb-6 leading-tight">
              "I will help you turn your idea into a complete online course and sales system"
            </h3>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Stop wasting months trying to figure out the tech. I handle the heavy lifting while you focus on what you know best.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center text-gold font-bold">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                100% Done-For-You
              </div>
              <div className="flex items-center text-gold font-bold">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                No Tech Skills Needed
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="A simple, stress-free process to get your course live">How It Works</SectionTitle>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2 z-0" />
            
            {[
              { step: "01", title: "Make Payment", desc: `Pay the one-time fee of ${price.symbol}${price.amount} securely.`, icon: TrendingUp },
              { step: "02", title: "Download Instructions", desc: "Get the guide on how to send your details.", icon: Download },
              { step: "03", title: "Send Your Idea", desc: "Tell me what you want your course to be about.", icon: Send },
              { step: "04", title: "I Create Your Course", desc: "I structure and design your course as a PDF.", icon: FileText },
              { step: "05", title: "I Design Your Page", desc: "I build your high-converting sales page.", icon: Layout },
              { step: "06", title: "You Start Selling", desc: "Launch your course and start earning!", icon: Zap }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative z-10 p-8 rounded-3xl bg-premium-dark border border-white/10 hover:border-gold/50 transition-all group"
              >
                <div className="absolute -top-6 -left-4 text-6xl font-black text-white/5 group-hover:text-gold/10 transition-colors">
                  {item.step}
                </div>
                <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold transition-colors">
                  <item.icon className="w-7 h-7 text-gold group-hover:text-premium-dark transition-colors" />
                </div>
                <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Everything you need to launch a successful digital business">What You Get</SectionTitle>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Full Course Creation", desc: "I handle the research, structuring, and writing of your course content based on your idea.", icon: FileText },
              { title: "Professionally Designed PDF", desc: "Your course won't just be text; it will be a beautifully designed, branded PDF that your students will love.", icon: CheckCircle2 },
              { title: "High-Converting Sales Page", desc: "A professional landing page designed to turn visitors into paying customers instantly.", icon: Layout },
              { title: "Free Hosting Setup", desc: "I'll help you set up where your course and sales page will live, so you don't pay extra for hosting.", icon: Zap }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex p-8 rounded-3xl bg-white/[0.03] border border-white/10"
              >
                <div className="mr-6 flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-gold" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Real results from real creators across Nigeria">What People Are Saying</SectionTitle>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Blessing A.", location: "Lagos", text: "I never believed I could sell my knowledge until this was done for me. Now I have my own course online and the sales are coming in!" },
              { name: "Tunde M.", location: "Abuja", text: "This is the best investment I've made this year. Everything was handled professionally from start to finish. Highly recommended!" },
              { name: "Chioma E.", location: "Enugu", text: "Simple process, clear communication, and my course looks amazing. I didn't have to touch a single line of code." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-premium-dark border border-white/10 relative"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-gold fill-gold" />)}
                </div>
                <p className="text-gray-300 italic mb-8 leading-relaxed">"{item.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center font-bold text-gold mr-3">
                    {item.name[0]}
                  </div>
                  <div>
                    <div className="font-bold">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle subtitle="No hidden charges. No recurring fees. Just one-time value.">Simple, Transparent Pricing</SectionTitle>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 md:p-20 rounded-[40px] bg-gradient-to-b from-gold/10 to-transparent border-2 border-gold shadow-[0_0_50px_rgba(212,175,55,0.1)]"
          >
            <h3 className="text-2xl font-bold text-gold mb-4 uppercase tracking-widest">The All-In-One Package</h3>
            <div className="flex items-center justify-center mb-8">
              <span className="text-4xl md:text-6xl font-black">{price.symbol}{price.amount}</span>
              <span className="text-gray-500 ml-3 text-xl">ONLY</span>
            </div>
            
            <ul className="text-left max-w-md mx-auto mb-12 space-y-4">
              {[
                "Full Course Content Creation",
                "Professional PDF Design",
                "High-Converting Sales Page",
                "Free Hosting Setup",
                "Mobile Responsive Design",
                "24/7 Support during setup"
              ].map((item, i) => (
                <li key={i} className="flex items-center text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-gold mr-3 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            
            <CTAButton className="w-full md:w-auto">Order Now on Selar</CTAButton>
            <p className="mt-6 text-gray-500 font-medium">One-time payment. No hidden charges.</p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto">
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          <div className="bg-premium-dark rounded-3xl border border-white/10 p-4 md:p-8">
            <FAQItem 
              question="I don't have experience, can I still do this?" 
              answer="Absolutely! This service is specifically designed for beginners. You provide the knowledge, and I handle all the technical aspects of course creation and sales page design." 
            />
            <FAQItem 
              question="What if I don't have content?" 
              answer="Don't worry. I will help you structure everything from your basic idea. We'll work together to turn your expertise into a logical, high-value course curriculum." 
            />
            <FAQItem 
              question="How will I receive my course?" 
              answer="You will receive your course in a professional, branded PDF format that is easy for your students to download and read on any device." 
            />
            <FAQItem 
              question="What is a sales page?" 
              answer="A sales page is a dedicated webpage designed with one goal: to explain the value of your course and convince visitors to buy it. It includes your headline, benefits, testimonials, and payment buttons." 
            />
            <FAQItem 
              question="How long will it take?" 
              answer="The entire process typically takes 3-7 business days after you've provided all the necessary details about your course idea." 
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gold/5 -z-10" />
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight"
          >
            Stop sitting on your knowledge. <span className="text-gold">Start earning from it.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 mb-12"
          >
            Join hundreds of Nigerian creators who are already making passive income from their expertise.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <CTAButton>Get Started Now</CTAButton>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="text-2xl font-black mb-6 tracking-tighter">
            CourseCraft<span className="text-gold">Nigeria</span>
          </div>
          <p className="text-gray-500 mb-8">© 2026 CourseCraft Nigeria. All rights reserved.</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-gold transition-colors">Terms</a>
            <a href="#" className="text-gray-400 hover:text-gold transition-colors">Privacy</a>
            <a href={WHATSAPP_LINK} className="text-gray-400 hover:text-gold transition-colors flex items-center">
              <MessageCircle className="w-4 h-4 mr-1" />
              Contact Support
            </a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl text-white"
      >
        <MessageCircle className="w-8 h-8" />
      </motion.a>
    </div>
  );
}
