import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Phone, Mail, MapPin, Clock, Calendar, ChevronRight, 
  Star, Shield, Award, Stethoscope, Smile, Activity, 
  Baby, Syringe, Sparkles, Menu, X, CheckCircle2,
  ArrowRight, MessageCircle
} from 'lucide-react';
import clinicLogo from './assets/logo.svg';
import drimage from "./assets/dr_image.jpeg";
// --- CUSTOM VENGENCE UI COMPONENTS ---

const MorphText = ({ words, className }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words]);

  return (
    <div className={`relative overflow-hidden inline-flex items-center justify-center ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 40, opacity: 0, filter: 'blur(8px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -40, opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0a2e25] to-emerald-600"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
      <span className="opacity-0 font-bold">{words[0]}</span> {/* Spacer */}
    </div>
  );
};

const AnimatedRays = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] opacity-[0.03]"
        style={{
          background: 'repeating-conic-gradient(from 0deg, transparent 0deg, #000 10deg, transparent 20deg)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/80 to-white backdrop-blur-[2px]" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-100/40 rounded-full blur-3xl opacity-50 mix-blend-multiply pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-teal-50/50 rounded-full blur-3xl opacity-50 mix-blend-multiply pointer-events-none" />
    </div>
  );
};

const LiquidMetalButton = ({ children, onClick, className = "" }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative group overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 via-slate-300 to-slate-100 text-slate-800 font-semibold shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/60 transition-all ${className}`}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_60%)]" />
      <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      <span className="relative z-10 flex items-center justify-center gap-2 px-8 py-4">
        {children}
      </span>
    </motion.button>
  );
};

const CylinderCarousel = ({ items }) => {
  const [rotation, setRotation] = useState(0);
  const theta = 360 / items.length;
  const radius = 280; // Distance from center

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev - theta);
    }, 4000);
    return () => clearInterval(interval);
  }, [theta]);

  return (
    <div className="relative w-full h-[400px] perspective-[1200px] flex items-center justify-center overflow-hidden py-10">
      <motion.div
        className="relative w-64 h-64 transform-style-3d"
        animate={{ rotateY: rotation }}
        transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl backface-hidden"
            style={{
              transform: `rotateY(${i * theta}deg) translateZ(${radius}px)`,
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-4 left-4 right-4 z-20 text-white">
              <p className="font-semibold text-lg leading-tight">{item.title}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// --- ANIMATION WRAPPERS ---

const Reveal = ({ children, delay = 0, width = "100%", direction = "up" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const directions = {
    up: { y: 40, opacity: 0 },
    down: { y: -40, opacity: 0 },
    left: { x: 40, opacity: 0 },
    right: { x: -40, opacity: 0 }
  };

  return (
    <div ref={ref} style={{ width }} className="relative overflow-hidden">
      <motion.div
        variants={{
          hidden: directions[direction],
          visible: { opacity: 1, y: 0, x: 0 },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// --- MAIN APPLICATION ---

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-200 selection:text-[#0a2e25] overflow-x-hidden">
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-amber-400 origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Floating WhatsApp */}
      <a 
        href="https://wa.me/919441453157" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
      >
        <MessageCircle size={28} />
        <span className="absolute right-full mr-4 bg-white text-slate-800 text-sm font-semibold py-2 px-4 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat with us!
        </span>
      </a>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3 bg-[#0a2e25]/95 backdrop-blur-xl shadow-lg border-b border-white/10' : 'py-5 bg-[#0a2e25]'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => scrollTo('home')}>
            <img src={clinicLogo} alt="Best Dental Logo" className="w-10 h-10 md:w-12 md:h-12 rounded-xl object-cover shadow-sm" />
            <span className="text-xl md:text-2xl font-bold tracking-tight text-amber-400">Best Dental</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-emerald-50">
            {['Home', 'About', 'Services', 'Reviews', 'Gallery', 'Contact'].map((item) => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="hover:text-amber-400 transition-colors">
                {item}
              </button>
            ))}
            <button onClick={() => scrollTo('contact')} className="bg-amber-400 text-[#0a2e25] font-bold px-6 py-2.5 rounded-full hover:bg-amber-500 transition-colors shadow-md">
              Book Appointment
            </button>
          </div>

          {/* Mobile Nav Toggle & Always Visible Button */}
          <div className="flex items-center gap-2 sm:gap-3 md:hidden">
            <button onClick={() => scrollTo('contact')} className="bg-amber-400 text-[#0a2e25] text-[11px] sm:text-xs font-bold px-3 py-2 sm:px-4 rounded-full hover:bg-amber-500 transition-colors shadow-md whitespace-nowrap">
              Book Now
            </button>
            <button className="p-1 sm:p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0a2e25] border-b border-white/10 overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-4 text-center">
                {['Home', 'About', 'Services', 'Reviews', 'Gallery', 'Contact'].map((item) => (
                  <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="py-2 font-medium text-emerald-50 hover:text-amber-400">
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
        <AnimatedRays />
        
        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8 text-center lg:text-left pt-10 lg:pt-0">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50/80 border border-emerald-100 text-emerald-800 text-sm font-semibold backdrop-blur-md mb-4">
                <Sparkles size={16} />
                <span>Dr. Ogirala Hima Bindu • 10+ Years Exp</span>
              </div>
            </Reveal>
            
            <Reveal delay={0.1}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                Transforming Smiles. <br />
                <span className="text-slate-400">Discover your</span> <br />
                <MorphText words={["NEW SMILE", "CONFIDENCE", "BEST DENTAL"]} className="h-[1.2em] min-w-[300px] text-left inline-flex" />
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Experience premium dental care combining advanced technology with personalized comfort. Your journey to a perfect smile starts here.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <LiquidMetalButton onClick={() => scrollTo('contact')} className="w-full sm:w-auto">
                  Book Appointment <ArrowRight size={18} />
                </LiquidMetalButton>
                <button 
                  onClick={() => window.location.href='tel:+919441453157'}
                  className="px-8 py-4 rounded-2xl font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  <Phone size={18} /> Call Now
                </button>
              </div>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.4}>
            <div className="relative mx-auto w-full max-w-[500px] aspect-[4/5] lg:aspect-square">
              {/* Decorative background elements for image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-teal-50 rounded-[3rem] rotate-3 scale-105" />
              <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[3rem] shadow-2xl overflow-hidden p-2">
                <img 
                  src= {drimage} 
                  alt="Dr. Ogirala Hima Bindu"
                  className="w-full h-full object-cover rounded-[2.5rem]"
                />
              </div>
              
              {/* Floating Cards */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center">
                  <Star fill="currentColor" size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Google Rating</p>
                  <p className="text-xl font-bold text-slate-900">4.9/5.0</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-10 -right-8 bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center">
                  <Shield size={24} />
                </div>
                <div>
                  <p className="text-xl font-bold text-slate-900">10k+</p>
                  <p className="text-sm text-slate-500 font-medium">Happy Smiles</p>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal direction="right">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] group">
                <img 
                  src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1000&auto=format&fit=crop" 
                  alt="Modern Clinic Facility" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Best Dental Head Office</h3>
                  <p className="text-white/80 flex items-center gap-2"><MapPin size={16}/> Tenali, Andhra Pradesh</p>
                </div>
              </div>
            </Reveal>

            <div className="space-y-8">
              <Reveal>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
                  Meet Your Expert <span className="text-emerald-700">Implantologist</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-slate-800">Dr. Ogirala Hima Bindu</h3>
                  <p className="text-emerald-700 font-medium text-lg">BDS., MOI (Implantologist)</p>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    With over a decade of dedicated experience, Dr. Bindu combines advanced dental science with an artistic eye to design perfect smiles. Her patient-first approach ensures every treatment is personalized, painless, and precise.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Personalized Care", "Modern Technology", 
                    "Painless Treatments", "Trusted by Thousands"
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="text-emerald-600" size={24} />
                      <span className="font-medium text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Premium Dental Services</h2>
              <p className="text-lg text-slate-600">Comprehensive oral healthcare using state-of-the-art equipment in a sterile, comfortable environment.</p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Activity, title: "Dental Implants", desc: "Permanent, natural-looking replacement for missing teeth." },
              { icon: Shield, title: "Root Canal", desc: "Painless single-sitting root canal treatments to save your natural teeth." },
              { icon: Smile, title: "Smile Designing", desc: "Custom makeovers for a confident, radiant smile." },
              { icon: Sparkles, title: "Teeth Whitening", desc: "Professional brightening treatments for instant results." },
              { icon: Baby, title: "Kids Dentistry", desc: "Gentle and friendly dental care for the little ones." },
              { icon: Stethoscope, title: "Dental Crowns", desc: "Durable ceramic and zirconia crowns to protect damaged teeth." },
              { icon: Activity, title: "Aligners & Braces", desc: "Invisible aligners and traditional braces for perfect alignment." },
              { icon: Syringe, title: "Tooth Extraction", desc: "Safe, painless extraction including wisdom teeth removal." },
              { icon: Award, title: "General Dentistry", desc: "Routine checkups, cleaning, and preventative care." }
            ].map((service, idx) => (
              <Reveal key={idx} delay={idx * 0.05}>
                <motion.div 
                  whileHover={{ y: -8 }}
                  className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group h-full"
                >
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#0a2e25] group-hover:text-white transition-all duration-300">
                    <service.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-600">{service.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats & Why Choose Us */}
      <section className="py-24 bg-[#0a2e25] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2000&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a2e25]/50 to-[#0a2e25]/90" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-8">
              <Reveal>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Patients <span className="text-amber-400">Trust Us</span></h2>
              </Reveal>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  "10+ Years Experience", "Advanced Equipment",
                  "Affordable Treatments", "Sterilized Clinic",
                  "Expert Implantologist", "Patient First Approach"
                ].map((item, idx) => (
                  <Reveal key={idx} delay={idx * 0.1}>
                    <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="w-10 h-10 bg-amber-400/20 text-amber-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 size={20} />
                      </div>
                      <span className="font-medium text-slate-200">{item}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { number: "10+", label: "Years Experience" },
                { number: "5000+", label: "Happy Patients" },
                { number: "1000+", label: "Successful Implants" },
                { number: "4.9", label: "Google Rating", star: true }
              ].map((stat, idx) => (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 text-center">
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center gap-1">
                      {stat.number} {stat.star && <Star className="text-amber-400" fill="currentColor" size={32}/>}
                    </h3>
                    <p className="text-emerald-200 font-medium">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Gallery Carousel */}
      <section id="gallery" className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <Reveal>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Clinic Gallery</h2>
            <p className="text-slate-600">Take a virtual tour of our state-of-the-art facilities.</p>
          </Reveal>
        </div>
        
        <Reveal>
          {/* CylinderCarousel renders the 3D rotating display */}
          <CylinderCarousel items={[
            { title: "Dr. Hima Bindu", src: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop" }, // Placeholder for Doctor Photo
            { title: "Clinic Entrance", src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop" }, // Placeholder for Sign Board
            { title: "Best Dental Logo", src: {clinicLogo} }, 
            { title: "Treatment Room", src: "https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?q=80&w=800&auto=format&fit=crop" },
            { title: "Advanced Tech", src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop" }
          ]} />
        </Reveal>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <Reveal>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Patient Stories</h2>
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={24} />)}
                </div>
                <span className="text-lg font-semibold text-slate-700">4.9/5 on Google</span>
              </div>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Priya R.", text: "Professional and painless implant treatment. Highly recommend Dr. Bindu!" },
              { name: "Kiran Kumar", text: "Friendly doctor and staff. The clinic is extremely hygienic and well maintained." },
              { name: "Suresh P.", text: "Excellent root canal treatment. Completely comfortable experience and reasonable pricing." }
            ].map((review, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={16} />)}
                  </div>
                  <p className="text-slate-700 text-lg mb-6 italic">"{review.text}"</p>
                  <p className="font-bold text-slate-900">- {review.name}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Contact Info & Map */}
            <div className="space-y-10">
              <Reveal>
                <h2 className="text-4xl font-bold text-slate-900 mb-6">Visit Our Clinic</h2>
                <p className="text-slate-600 mb-8 text-lg">We have two branches in Tenali to serve you better. Schedule your visit today.</p>
              </Reveal>

              <div className="space-y-6">
                {[
                  { icon: Phone, title: "Phone / WhatsApp", detail: "9441453157", link: "tel:9441453157" },
                  { icon: Mail, title: "Email", detail: "bestdentalimplantcenter@gmail.com", link: "mailto:bestdentalimplantcenter@gmail.com" },
                  { icon: MapPin, title: "Address", detail: "Best Dental Head Office, Tenali (2 Branches)", link: "#" },
                  { icon: Clock, title: "Timings", detail: "Mon-Sat: 9:30 AM - 9:00 PM | Sun: 9:30 AM - 1:00 PM", link: null }
                ].map((info, idx) => (
                  <Reveal key={idx} delay={idx * 0.1}>
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                      <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center flex-shrink-0">
                        <info.icon size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">{info.title}</h4>
                        {info.link ? (
                          <a href={info.link} className="text-slate-600 hover:text-emerald-700 transition-colors">{info.detail}</a>
                        ) : (
                          <p className="text-slate-600">{info.detail}</p>
                        )}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.4}>
                <div className="h-[300px] w-full rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
                  {/* Embedded Google Map - Coordinates approximate to Tenali center for generic representation */}
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3187.19094872716!2d80.6497227!3d16.2402478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a075dcb51d7b7%3A0x93bcfccebd9cdf46!2sBEST%20DENTAL%20HOSPITAL!5e1!3m2!1sen!2sin!4v1785426570350!5m2!1sen!2sin"  
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </Reveal>
            </div>

            {/* Appointment Form connected to Web3Forms */}
            <Reveal direction="left">
              <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-slate-100">
                <h3 className="text-3xl font-bold text-slate-900 mb-8">Book an Appointment</h3>
                <form action="https://api.web3forms.com/submit" method="POST" className="space-y-6">
                  
                  {/* Web3Forms Access Key */}
                  <input type="hidden" name="access_key" value="5a908874-0be3-436c-8310-ddf3a476c48b" />
                  
                  {/* Optional: Redirect back to your site after submission instead of Web3Forms default page */}
                  {/* <input type="hidden" name="redirect" value="https://your-github-url.github.io/best-dental/" /> */}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Full Name</label>
                      <input type="text" name="name" required className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                      <input type="tel" name="phone" required className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all" placeholder="+91 00000 00000" />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Email Address</label>
                      <input type="email" name="email" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Preferred Date</label>
                      <input type="date" name="date" required className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Treatment Needed</label>
                    <select name="treatment" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all">
                      <option>Consultation</option>
                      <option>Dental Implants</option>
                      <option>Root Canal</option>
                      <option>Smile Designing</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Message (Optional)</label>
                    <textarea name="message" rows="4" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all resize-none" placeholder="How can we help you?"></textarea>
                  </div>

                  <button type="submit" className="w-full bg-[#0a2e25] text-white font-semibold py-4 rounded-xl hover:bg-emerald-800 transition-colors shadow-lg shadow-[#0a2e25]/20">
                    Confirm Appointment
                  </button>
                </form>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a2e25] pt-20 pb-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Brand */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <img src={clinicLogo} alt="Best Dental Logo" className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                <span className="text-2xl font-bold text-white tracking-tight">Best Dental</span>
              </div>
              <p className="text-emerald-100/70">Premium dental care in Tenali by Dr. Ogirala Hima Bindu. Transforming smiles, changing lives.</p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-amber-400 hover:text-[#0a2e25] transition-all">
                  <span className="font-bold">IG</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-green-500 transition-all">
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-emerald-100/70">
                {['Home', 'About Dr. Bindu', 'Our Services', 'Gallery', 'Patient Reviews'].map(link => (
                  <li key={link}><a href="#" onClick={(e) => { e.preventDefault(); scrollTo(link.split(' ')[0].toLowerCase() === 'about' ? 'about' : link.split(' ')[0].toLowerCase() === 'patient' ? 'reviews' : link.split(' ')[0].toLowerCase()); }} className="hover:text-amber-400 transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-bold mb-6">Treatments</h4>
              <ul className="space-y-4 text-emerald-100/70">
                <li><a href="#services" className="hover:text-amber-400 transition-colors">Dental Implants</a></li>
                <li><a href="#services" className="hover:text-amber-400 transition-colors">Root Canal Treatment</a></li>
                <li><a href="#services" className="hover:text-amber-400 transition-colors">Smile Designing</a></li>
                <li><a href="#services" className="hover:text-amber-400 transition-colors">Aligners & Braces</a></li>
                <li><a href="#services" className="hover:text-amber-400 transition-colors">Teeth Whitening</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold mb-6">Contact Us</h4>
              <ul className="space-y-4 text-emerald-100/70">
                <li className="flex items-start gap-3">
                  <MapPin size={20} className="text-amber-400 shrink-0" />
                  <span>Head Office, Tenali, AP</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={20} className="text-amber-400 shrink-0" />
                  <a href="tel:9441453157" className="hover:text-white">9441453157</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={20} className="text-amber-400 shrink-0" />
                  <a href="mailto:bestdentalimplantcenter@gmail.com" className="hover:text-white truncate">bestdentalimplantcenter@...</a>
                </li>
              </ul>
            </div>

          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-emerald-100/50 text-sm">© {new Date().getFullYear()} Best Dental Clinic. All rights reserved.</p>
            <p className="text-emerald-100/50 text-sm">Designed with precision.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}