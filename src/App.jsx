import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  Phone, Mail, MapPin, Clock,  
  Star, Shield, Award, Stethoscope, Smile, Activity, 
  Baby, Syringe, Sparkles, Menu, X, CheckCircle2,
  ArrowRight, MessageCircle, ChevronLeft, ChevronRight,
  Loader2, Navigation, AlertCircle, Calendar, Check, ExternalLink
} from 'lucide-react';
import clinicLogo from './assets/logo.jpg';
import drimage from "./assets/dr_image.jpeg";

import smileDesigningImg from "./assets/rotating/smile designing.jpeg";
import rootCanalImg from "./assets/rotating/root canal.jpeg";
import extractionImg from "./assets/rotating/extraction.jpeg";
import implantsImg from "./assets/rotating/implants.jpeg";
import kidDentistryImg from "./assets/rotating/kids.jpeg";
import generalImg from "./assets/rotating/general.jpeg";

// --- CLINIC BRANCH CONFIGURATION ---
const CLINIC_BRANCHES = [
  {
    id: "head-office",
    name: "Head Office (Main Branch)",
    shortName: "Head Office",
    badge: "Main Surgical & Implant Center",
    landmark: "Near RTC Bus Stand",
    address: "Near RTC Bus Stand, Main Road, Tenali, Andhra Pradesh 522201",
    phone: "+91 94414 53157",
    phoneRaw: "9441453157",
    phoneLink: "tel:9441453157",
    email: "bestdentalimplantcenter@gmail.com",
    timings: "Mon - Sat: 9:30 AM - 9:00 PM | Sun: 9:30 AM - 1:00 PM",
    features: [
      "Advanced Dental Implant Center",
      "Digital OPG Panoramic X-Ray",
      "Full Surgical Suite",
      "Emergency Dental Care"
    ],
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=BEST+DENTAL+HOSPITAL+Tenali",
    embedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3187.19094872716!2d80.6497227!3d16.2402478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a075dcb51d7b7%3A0x93bcfccebd9cdf46!2sBEST%20DENTAL%20HOSPITAL!5e1!3m2!1sen!2sin!4v1785426570350!5m2!1sen!2sin",
  },
  {
    id: "city-branch",
    name: "City Branch",
    shortName: "City Branch",
    badge: "Central Tenali Clinic",
    landmark: "Bose Road / Market Center",
    address: "Bose Road, Near Market Center, Tenali, Andhra Pradesh 522201",
    phone: "+91 94414 53157",
    phoneRaw: "9441453157",
    phoneLink: "tel:9441453157",
    email: "bestdentalimplantcenter@gmail.com",
    timings: "Mon - Sat: 10:00 AM - 8:30 PM | Sun: 10:00 AM - 1:00 PM",
    features: [
      "Smile Designing & Aesthetic Veneers",
      "Pediatric Dentistry for Kids",
      "Single-Sitting Root Canal Treatments",
      "Clear Aligners & Teeth Straightening"
    ],
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Bose+Road+Tenali",
    embedMapUrl: "https://maps.google.com/maps?q=Bose+Road+Tenali+Andhra+Pradesh&t=&z=15&ie=UTF8&iwloc=&output=embed",
  }
];

// --- CUSTOM VENGENCE UI COMPONENTS ---

const MorphText = ({ words, className = "" }) => {
  const [index, setIndex] = useState(0);
  const longestWord = words.reduce((longest, word) => word.length > longest.length ? word : longest, "");

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words]);

  return (
    <div className={`relative overflow-hidden inline-flex items-center justify-start max-w-full ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 28, opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -28, opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4B006E] to-purple-600 truncate text-left"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
      <span className="opacity-0 font-bold select-none pointer-events-none">{longestWord}</span> {/* Spacer matching longest word */}
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
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-100/40 rounded-full blur-3xl opacity-50 mix-blend-multiply pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-purple-50/50 rounded-full blur-3xl opacity-50 mix-blend-multiply pointer-events-none" />
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
  const [radius, setRadius] = useState(330);
  const [cardSize, setCardSize] = useState({ width: 310, height: 310 });
  const [isDragging, setIsDragging] = useState(false);
  
  const dragStartX = useRef(0);
  const startRotation = useRef(0);
  const dragDistance = useRef(0);
  const lastX = useRef(0);
  const velocity = useRef(0);
  const isHovered = useRef(false);
  const theta = 360 / items.length;

  // Squarish proportions with tight gaps across screen sizes
  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      if (w < 440) {
        // Compact mobile - squarish
        setRadius(175);
        setCardSize({ width: 165, height: 165 });
      } else if (w < 640) {
        // Standard mobile - squarish
        setRadius(200);
        setCardSize({ width: 190, height: 190 });
      } else if (w < 1024) {
        // Tablet - squarish
        setRadius(265);
        setCardSize({ width: 250, height: 250 });
      } else {
        // Desktop - squarish proportions with tight ~20px gap
        setRadius(330);
        setCardSize({ width: 310, height: 310 });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Automatic rotation when not dragging and not hovered
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging && !isHovered.current) {
        setRotation((prev) => prev - theta);
      }
    }, 3500);
    return () => clearInterval(interval);
  }, [theta, isDragging]);

  // Global mouse & touch listeners while dragging for uninterrupted swiping
  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (clientX) => {
      const deltaX = clientX - dragStartX.current;
      dragDistance.current = Math.abs(deltaX);
      
      // Track swipe velocity for flick momentum
      velocity.current = clientX - lastX.current;
      lastX.current = clientX;

      // Real-time rotation tracking: 0.35 deg per pixel
      setRotation(startRotation.current + deltaX * 0.35);
    };

    const handlePointerUp = () => {
      setIsDragging(false);

      // Flick momentum snap to nearest card
      setRotation((prev) => {
        let target = prev;
        if (Math.abs(velocity.current) > 6) {
          const dir = velocity.current > 0 ? 1 : -1;
          target += dir * (theta * 0.5);
        }
        return Math.round(target / theta) * theta;
      });
    };

    const onMouseMove = (e) => handlePointerMove(e.clientX);
    const onMouseUp = () => handlePointerUp();

    const onTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX);
      }
    };
    const onTouchEnd = () => handlePointerUp();

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('touchcancel', onTouchEnd);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [isDragging, theta]);

  const onMouseDown = (e) => {
    if (e.button !== 0) return; // Only primary mouse button
    setIsDragging(true);
    dragDistance.current = 0;
    dragStartX.current = e.clientX;
    lastX.current = e.clientX;
    velocity.current = 0;
    startRotation.current = rotation;
  };

  const onTouchStart = (e) => {
    if (e.touches && e.touches.length > 0) {
      setIsDragging(true);
      dragDistance.current = 0;
      dragStartX.current = e.touches[0].clientX;
      lastX.current = e.touches[0].clientX;
      velocity.current = 0;
      startRotation.current = rotation;
    }
  };

  const currentIndex = Math.round((-rotation / theta) % items.length);
  const normalizedIndex = ((currentIndex % items.length) + items.length) % items.length;

  // Navigate along shortest angular path so clicking first image from last advances forward rather than rewinding all the way back
  const navigateToIndex = (targetIndex) => {
    let diff = targetIndex - normalizedIndex;
    if (diff > items.length / 2) {
      diff -= items.length;
    } else if (diff < -items.length / 2) {
      diff += items.length;
    }
    setRotation((prev) => prev - diff * theta);
  };

  // Clicking any card smoothly rotates along shortest path to the front
  const handleCardClick = (index) => {
    if (dragDistance.current > 8) return; // Was dragging, not clicking
    navigateToIndex(index);
  };

  const handlePrev = () => setRotation((prev) => prev + theta);
  const handleNext = () => setRotation((prev) => prev - theta);

  // Generous stage height so 3D perspective projection never cuts off at the bottom
  const stageHeight = Math.round(cardSize.height * 1.4 + 50);

  return (
    <div 
      className={`relative w-full flex flex-col items-center justify-center py-4 select-none touch-pan-y ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onMouseEnter={() => { isHovered.current = true; }}
      onMouseLeave={() => { isHovered.current = false; }}
    >
      <div 
        className="relative w-full flex items-center justify-center perspective-[1200px]"
        style={{ height: `${stageHeight}px` }}
      >
        <motion.div
          className="relative transform-style-3d"
          style={{ 
            width: `${cardSize.width}px`, 
            height: `${cardSize.height}px`,
            transformStyle: 'preserve-3d' 
          }}
          animate={{ rotateY: rotation }}
          transition={
            isDragging 
              ? { duration: 0 } 
              : { duration: 1.0, ease: [0.25, 1, 0.5, 1] }
          }
        >
          {items.map((item, i) => (
            <div
              key={i}
              onClick={() => handleCardClick(i)}
              className="absolute top-0 left-0 w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/30 shadow-2xl backface-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
              style={{
                transform: `rotateY(${i * theta}deg) translateZ(${radius}px)`,
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent z-10" />
              <img 
                src={item.src} 
                alt={item.title} 
                className="w-full h-full object-cover pointer-events-none select-none" 
                draggable="false"
              />
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-20 text-white">
                <p className="font-bold text-sm sm:text-base md:text-lg leading-tight drop-shadow-md">{item.title}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* UI Controls: Prev/Next & Dots */}
      <div className="flex items-center gap-4 mt-6 z-20">
        <button 
          onClick={handlePrev}
          aria-label="Previous slide"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-purple-700 hover:border-purple-300 active:scale-95 transition-all shadow-sm flex items-center justify-center min-w-[44px] min-h-[44px] cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => navigateToIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 rounded-full transition-all cursor-pointer min-h-[20px] py-1 ${
                normalizedIndex === i 
                  ? 'w-8 bg-[#4B006E]' 
                  : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

        <button 
          onClick={handleNext}
          aria-label="Next slide"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-purple-700 hover:border-purple-300 active:scale-95 transition-all shadow-sm flex items-center justify-center min-w-[44px] min-h-[44px] cursor-pointer"
        >
          <ChevronRight size={20} />
        </button>
      </div>
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
    <div ref={ref} style={{ width }} className="relative">
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState("head-office");

  // Controlled appointment form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    timeSlot: "Morning (10:00 AM - 1:00 PM)",
    branch: CLINIC_BRANCHES[0].name,
    treatment: "Consultation & General Checkup",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("idle"); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

  const activeBranch = CLINIC_BRANCHES.find(b => b.id === selectedBranchId) || CLINIC_BRANCHES[0];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu or confirmation modal is open
  useEffect(() => {
    if (mobileMenuOpen || formStatus === 'success') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, formStatus]);

  // Handle ESC key to dismiss confirmation modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && formStatus === 'success') {
        setFormStatus('idle');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [formStatus]);

  const validatePhone = (phoneStr) => {
    const cleaned = (phoneStr || "").replace(/[\s\-()]/g, "");
    const match = cleaned.match(/^(?:(?:\+?91)|0)?([6-9]\d{9})$/);
    return match ? match[1] : null;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "phone" && phoneError) {
      setPhoneError("");
    }
  };

  const handleBranchSelect = (branch) => {
    setSelectedBranchId(branch.id);
    setFormData((prev) => ({
      ...prev,
      branch: branch.name,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const validMobile = validatePhone(formData.phone);
    if (!validMobile) {
      setPhoneError("Please enter a valid 10-digit mobile number (e.g. 94414 53157)");
      return;
    }
    setPhoneError("");
    setFormStatus("submitting");
    setErrorMessage("");

    try {
      const payload = {
        access_key: "5a908874-0be3-436c-8310-ddf3a476c48b",
        subject: `New Appointment Request: ${formData.name} (${formData.branch})`,
        from_name: "Best Dental Clinic Website",
        name: formData.name,
        phone: validMobile,
        email: formData.email ? formData.email : "Not provided",
        branch: formData.branch,
        preferred_date: formData.date,
        preferred_slot: formData.timeSlot,
        treatment: formData.treatment,
        message: formData.message ? formData.message : "None",
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setSubmittedData({ ...formData, phone: validMobile });
        setFormStatus("success");
      } else {
        setErrorMessage(data.message || "Failed to submit appointment request. Please try again.");
        setFormStatus("error");
      }
    } catch (err) {
      console.error("Booking submission error:", err);
      setErrorMessage("Network issue detected. Please check your connection or call us directly at 9441453157.");
      setFormStatus("error");
    }
  };

  const handleResetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      date: "",
      timeSlot: "Morning (10:00 AM - 1:00 PM)",
      branch: activeBranch.name,
      treatment: "Consultation & General Checkup",
      message: "",
    });
    setPhoneError("");
    setErrorMessage("");
    setFormStatus("idle");
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-purple-200 selection:text-[#4B006E] overflow-x-hidden">

      {/* Floating Dual Quick Actions (Call + WhatsApp) */}
      <div 
        className="fixed bottom-5 sm:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2 pointer-events-auto"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <a 
          href="tel:9441453157"
          aria-label="Call Best Dental Clinic at 9441453157"
          className="bg-white/95 hover:bg-white text-slate-800 hover:text-[#4B006E] active:scale-95 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.18)] border border-slate-200/90 transition-all flex items-center gap-2 min-h-[48px] backdrop-blur-md group"
        >
          <div className="w-7 h-7 rounded-full bg-purple-100 text-[#4B006E] flex items-center justify-center shrink-0 group-hover:bg-purple-200 transition-colors">
            <Phone size={15} />
          </div>
          <span className="text-xs sm:text-sm font-bold tracking-tight pr-0.5 text-slate-800">Call</span>
        </a>

        <a 
          href="https://wa.me/919441453157" 
          target="_blank" 
          rel="noreferrer"
          aria-label="Chat with Best Dental Clinic on WhatsApp"
          className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full shadow-[0_8px_30px_rgb(5,150,105,0.35)] transition-all flex items-center gap-2 min-h-[48px] border border-emerald-500/40 backdrop-blur-md group"
        >
          <div className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0 group-hover:bg-white/30 transition-colors">
            <MessageCircle size={17} />
          </div>
          <span className="text-xs sm:text-sm font-bold tracking-tight pr-0.5">WhatsApp</span>
        </a>
      </div>

      {/* Appointment Confirmation Modal */}
      <AnimatePresence>
        {formStatus === "success" && submittedData && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirmation-modal-title"
          >
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFormStatus("idle")}
              className="fixed inset-0 bg-slate-900/65 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Modal Card */}
            <motion.div 
              initial={{ scale: 0.92, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 16 }}
              transition={{ type: "spring", damping: 25, stiffness: 320 }}
              className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 sm:p-8 z-10 my-8 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#4B006E] via-purple-600 to-amber-400" />
              
              <button 
                onClick={() => setFormStatus("idle")}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Close confirmation dialog"
              >
                <X size={20} />
              </button>

              <div className="text-center pt-2">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50/60 shadow-inner">
                  <CheckCircle2 size={40} className="sm:w-12 sm:h-12" />
                </div>

                <h3 id="confirmation-modal-title" className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                  Appointment Request Sent!
                </h3>
                <p className="text-slate-600 text-sm sm:text-base mb-6">
                  Thank you, <span className="font-semibold text-slate-800">{submittedData.name}</span>! Dr. Ogirala Hima Bindu's team will contact you shortly to confirm your slot.
                </p>

                {/* Recap */}
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 text-left border border-slate-100 mb-6 space-y-2.5 text-xs sm:text-sm">
                  <div className="flex items-start justify-between pb-2 border-b border-slate-200/70 gap-2">
                    <span className="text-slate-500 font-medium">Branch</span>
                    <span className="text-slate-900 font-semibold text-right">{submittedData.branch}</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200/70 gap-2">
                    <span className="text-slate-500 font-medium">Date & Slot</span>
                    <span className="text-slate-900 font-semibold">{submittedData.date} • {submittedData.timeSlot}</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200/70 gap-2">
                    <span className="text-slate-500 font-medium">Treatment</span>
                    <span className="text-[#4B006E] font-semibold">{submittedData.treatment}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-slate-500 font-medium">Phone</span>
                    <span className="text-slate-900 font-semibold">+91 {submittedData.phone}</span>
                  </div>
                </div>

                {/* Direct instant WhatsApp CTA */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a 
                    href={`https://wa.me/919441453157?text=${encodeURIComponent(
                      `Hello Dr. Bindu, I submitted an appointment request for ${submittedData.name} on ${submittedData.date} (${submittedData.timeSlot}) at ${submittedData.branch} for ${submittedData.treatment}. Please confirm my slot.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 text-sm sm:text-base min-h-[48px]"
                  >
                    <MessageCircle size={18} />
                    <span>Confirm via WhatsApp</span>
                  </a>
                  <button 
                    onClick={handleResetForm}
                    className="sm:w-auto px-5 py-3.5 bg-slate-100 hover:bg-slate-200 active:scale-[0.99] text-slate-700 font-semibold rounded-xl transition-colors text-sm sm:text-base min-h-[48px]"
                  >
                    Done
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3 bg-[#4B006E]/95 backdrop-blur-xl shadow-lg border-b border-white/10' : 'py-4 sm:py-5 bg-[#4B006E]'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer shrink-0" onClick={() => scrollTo('home')}>
            <img src={clinicLogo} alt="Best Dental Logo" className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl object-cover shadow-sm" />
            <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white whitespace-nowrap">Best Dental</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7 lg:gap-8 text-sm font-medium text-purple-50">
            {['Home', 'About', 'Services', 'Reviews', 'Gallery', 'Contact'].map((item) => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="hover:text-amber-400 transition-colors py-1">
                {item}
              </button>
            ))}
            <button onClick={() => scrollTo('contact')} className="bg-amber-400 text-[#4B006E] font-bold px-5 lg:px-6 py-2.5 rounded-full hover:bg-amber-500 active:scale-95 transition-all shadow-md">
              Book Appointment
            </button>
          </div>

          {/* Mobile Nav Toggle & Always Visible Button */}
          <div className="flex items-center gap-2 sm:gap-3 md:hidden">
            <button 
              onClick={() => scrollTo('contact')} 
              className="bg-amber-400 text-[#4B006E] text-xs font-bold px-3 py-2 sm:px-4 rounded-full hover:bg-amber-500 active:scale-95 transition-all shadow-md whitespace-nowrap min-h-[36px]"
            >
              Book Now
            </button>
            <button 
              className="p-2 -mr-1 text-white hover:text-amber-400 focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg active:bg-white/10 transition-colors" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden bg-[#4B006E] border-b border-white/10 overflow-hidden shadow-2xl"
            >
              <div className="px-5 py-6 flex flex-col gap-1.5 text-center">
                {['Home', 'About', 'Services', 'Reviews', 'Gallery', 'Contact'].map((item) => (
                  <button 
                    key={item} 
                    onClick={() => scrollTo(item.toLowerCase())} 
                    className="w-full min-h-[48px] py-3 px-4 text-base font-semibold text-purple-50 hover:text-amber-400 hover:bg-white/5 active:bg-white/10 rounded-xl transition-all flex items-center justify-center"
                  >
                    {item}
                  </button>
                ))}
                <div className="pt-2">
                  <button 
                    onClick={() => scrollTo('contact')} 
                    className="w-full min-h-[48px] bg-amber-400 text-[#4B006E] font-bold py-3 px-6 rounded-xl hover:bg-amber-500 active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-2 text-base"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 sm:pb-20 overflow-hidden">
        <AnimatedRays />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-2 gap-10 lg:gap-12 items-center relative z-10">
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left pt-6 sm:pt-10 lg:pt-0">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-purple-50/90 border border-purple-100 text-purple-900 text-xs sm:text-sm font-semibold backdrop-blur-md mb-2 sm:mb-4">
                <Sparkles size={16} className="text-purple-600 shrink-0" />
                <span>Dr. Ogirala Hima Bindu • 10+ Years Exp</span>
              </div>
            </Reveal>
            
            <Reveal delay={0.1}>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                Transforming Smiles. <br />
                <span className="text-slate-400">Discover your</span> <br />
                <MorphText words={["NEW SMILE", "CONFIDENCE", "BEST DENTAL"]} className="h-[1.25em] min-w-0 max-w-full justify-center lg:justify-start text-center lg:text-left inline-flex" />
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Experience premium dental care combining advanced technology with personalized comfort. Your journey to a perfect smile starts here.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 justify-center lg:justify-start">
                <LiquidMetalButton onClick={() => scrollTo('contact')} className="w-full sm:w-auto min-h-[48px]">
                  Book Appointment <ArrowRight size={18} />
                </LiquidMetalButton>
                <button 
                  onClick={() => window.location.href='tel:+919441453157'}
                  className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 transition-colors w-full sm:w-auto flex items-center justify-center gap-2 border border-slate-200 sm:border-transparent min-h-[48px]"
                >
                  <Phone size={18} /> Call Now
                </button>
              </div>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.4}>
            <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[500px] aspect-[4/5] lg:aspect-square my-4 sm:my-0">
              {/* Decorative background elements for image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-100 to-purple-50 rounded-[2.5rem] sm:rounded-[3rem] rotate-2 sm:rotate-3 scale-105" />
              <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[2.5rem] sm:rounded-[3rem] shadow-2xl overflow-hidden p-2">
                <img 
                  src={drimage} 
                  alt="Dr. Ogirala Hima Bindu"
                  className="w-full h-full object-cover object-[center_20%] rounded-[2rem] sm:rounded-[2.5rem]"
                  loading="eager"
                />
              </div>
              
              {/* Floating Cards - Positioned safely inside screen bounds on mobile */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-3 left-1 sm:-bottom-6 sm:-left-6 bg-white/95 backdrop-blur-xl p-3 sm:p-4 rounded-2xl shadow-xl border border-white flex items-center gap-3 sm:gap-4"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center shrink-0">
                  <Star fill="currentColor" size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">Google Rating</p>
                  <p className="text-lg sm:text-xl font-bold text-slate-900">5.0/5.0</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-2 right-1 sm:top-10 sm:-right-6 bg-white/95 backdrop-blur-xl p-3 sm:p-4 rounded-2xl shadow-xl border border-white flex items-center gap-3 sm:gap-4"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center shrink-0">
                  <Shield size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-bold text-slate-900">10k+</p>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">Happy Smiles</p>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal direction="right">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] group">
                <img 
                  src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1000&auto=format&fit=crop" 
                  alt="Modern Clinic Facility" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">Best Dental Clinics</h3>
                  <p className="text-white/80 text-sm sm:text-base flex items-center gap-2"><MapPin size={16}/> 2 Branches in Tenali, Andhra Pradesh</p>
                </div>
              </div>
            </Reveal>

            <div className="space-y-6 sm:space-y-8">
              <Reveal>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
                  Meet Your Expert <span className="text-purple-700">Implantologist</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-xl sm:text-2xl font-semibold text-slate-800">Dr. Ogirala Hima Bindu</h3>
                  <p className="text-purple-700 font-medium text-base sm:text-lg">BDS., MOI (Implantologist)</p>
                  <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
                    With over a decade of dedicated experience, Dr. Bindu combines advanced dental science with an artistic eye to design perfect smiles. Her patient-first approach ensures every treatment is personalized, painless, and precise.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    "Personalized Care", "Modern Technology", 
                    "Painless Treatments", "Trusted by Thousands"
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2 rounded-xl">
                      <CheckCircle2 className="text-purple-600 shrink-0" size={22} />
                      <span className="font-medium text-slate-700 text-sm sm:text-base">{feature}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 sm:mb-6">Premium Dental Services</h2>
              <p className="text-base sm:text-lg text-slate-600">Comprehensive oral healthcare using state-of-the-art equipment in a sterile, comfortable environment.</p>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
                  whileHover={{ y: -6 }}
                  className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group h-full flex flex-col"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-50 text-purple-700 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-[#4B006E] group-hover:text-white transition-all duration-300 shrink-0">
                    <service.icon size={26} className="sm:w-7 sm:h-7" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{service.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats & Why Choose Us */}
      <section className="py-16 sm:py-24 bg-[#4B006E] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2000&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#4B006E]/60 to-[#4B006E]/95" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            <div className="space-y-6 sm:space-y-8">
              <Reveal>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Why Patients <span className="text-amber-400">Trust Us</span></h2>
              </Reveal>
              
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  "10+ Years Experience", "Advanced Equipment",
                  "Affordable Treatments", "Sterilized Clinic",
                  "Expert Implantologist", "Patient First Approach"
                ].map((item, idx) => (
                  <Reveal key={idx} delay={idx * 0.05}>
                    <div className="flex items-center gap-3 sm:gap-4 bg-white/5 backdrop-blur-md p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-400/20 text-amber-400 rounded-full flex items-center justify-center shrink-0">
                        <CheckCircle2 size={18} className="sm:w-5 sm:h-5" />
                      </div>
                      <span className="font-medium text-slate-200 text-sm sm:text-base">{item}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              {[
                { number: "10+", label: "Years Experience" },
                { number: "5000+", label: "Happy Patients" },
                { number: "1000+", label: "Successful Implants" },
                { number: "5.0", label: "Google Rating", star: true }
              ].map((stat, idx) => (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="bg-white/10 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-white/20 text-center flex flex-col justify-center min-h-[110px] sm:min-h-[140px]">
                    <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2 flex items-center justify-center gap-1">
                      {stat.number} {stat.star && <Star className="text-amber-400 shrink-0" fill="currentColor" size={22}/>}
                    </h3>
                    <p className="text-purple-200 font-medium text-xs sm:text-sm md:text-base">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Gallery Carousel */}
      <section id="gallery" className="py-16 sm:py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-8 sm:mb-14">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2 sm:mb-4">Our Clinic Gallery</h2>
            <p className="text-slate-600 text-sm sm:text-base">Take a virtual tour of our state-of-the-art facilities and procedures.</p>
          </Reveal>
        </div>
        
        <Reveal>
          <CylinderCarousel items={[
            { title: "Smile Designing", src: smileDesigningImg },
            { title: "Root Canal", src: rootCanalImg }, 
            { title: "Extraction", src: extractionImg },
            { title: "Implants", src: implantsImg },
            { title: "Kid Dentistry", src: kidDentistryImg },
            { title: "General Care", src: generalImg }
          ]} />
        </Reveal>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-16 gap-4 sm:gap-6">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2 sm:mb-4">Patient Stories</h2>
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={20} />)}
                </div>
                <span className="text-base sm:text-lg font-semibold text-slate-700">5.0/5.0 on Google</span>
              </div>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { name: "Priya R.", text: "Professional and painless implant treatment. Highly recommend Dr. Bindu!" },
              { name: "Kiran Kumar", text: "Friendly doctor and staff. The clinic is extremely hygienic and well maintained." },
              { name: "Suresh P.", text: "Excellent root canal treatment. Completely comfortable experience and reasonable pricing." }
            ].map((review, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-100 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex text-amber-400 mb-3 sm:mb-4">
                      {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={16} />)}
                    </div>
                    <p className="text-slate-700 text-base sm:text-lg mb-6 italic leading-relaxed">"{review.text}"</p>
                  </div>
                  <p className="font-bold text-slate-900 text-sm sm:text-base">- {review.name}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            
            {/* Multi-Branch Directory & Interactive Map */}
            <div className="space-y-6 sm:space-y-8">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/80 text-[#4B006E] text-xs font-semibold mb-3">
                  <MapPin size={14} />
                  <span>2 Convenient Locations in Tenali</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">Visit Our Clinics</h2>
                <p className="text-slate-600 text-base sm:text-lg">
                  Both locations are equipped with modern sterilization and led by Dr. Ogirala Hima Bindu. Select a branch below to view direct directions, timings, and facilities.
                </p>
              </Reveal>

              {/* Interactive Branch Selector Tabs */}
              <Reveal delay={0.1}>
                <div className="p-1 sm:p-1.5 bg-slate-200/80 rounded-2xl flex gap-1 shadow-inner">
                  {CLINIC_BRANCHES.map((branch) => {
                    const isActive = activeBranch.id === branch.id;
                    return (
                      <button
                        key={branch.id}
                        type="button"
                        onClick={() => handleBranchSelect(branch)}
                        className={`flex-1 py-3 px-3 sm:px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 min-h-[46px] cursor-pointer ${
                          isActive
                            ? "bg-[#4B006E] text-white shadow-md shadow-[#4B006E]/25"
                            : "text-slate-700 hover:text-slate-900 hover:bg-white/60 active:bg-white/80"
                        }`}
                      >
                        <MapPin size={16} className={isActive ? "text-amber-400" : "text-slate-500"} />
                        <span className="truncate">{branch.shortName}</span>
                      </button>
                    );
                  })}
                </div>
              </Reveal>

              {/* Dynamic Active Branch Detail Card */}
              <div className="space-y-4">
                {/* Branch Header & Landmark Card */}
                <Reveal delay={0.15}>
                  <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-100 shadow-sm space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div>
                        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md mb-1.5">
                          {activeBranch.badge}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{activeBranch.name}</h3>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full">
                        <Check size={12} /> Open Today
                      </span>
                    </div>

                    {/* Address & Navigation */}
                    <div className="flex items-start gap-3.5 pt-1">
                      <div className="w-10 h-10 bg-purple-50 text-[#4B006E] rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin size={20} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-amber-600 mb-1">Landmark: {activeBranch.landmark}</p>
                        <p className="text-slate-700 text-sm sm:text-base leading-relaxed">{activeBranch.address}</p>
                        <a 
                          href={activeBranch.directionsUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#4B006E] font-semibold text-xs sm:text-sm transition-colors group"
                        >
                          <Navigation size={14} className="group-hover:translate-x-0.5 transition-transform" />
                          <span>Get Directions on Google Maps</span>
                          <ExternalLink size={12} className="opacity-70" />
                        </a>
                      </div>
                    </div>

                    {/* Timings & Direct Phone */}
                    <div className="grid sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/80">
                        <Clock size={18} className="text-[#4B006E] shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs text-slate-500 font-medium">Timings</p>
                          <p className="text-xs sm:text-sm font-semibold text-slate-800 truncate">{activeBranch.timings}</p>
                        </div>
                      </div>

                      <a 
                        href={activeBranch.phoneLink} 
                        className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/80 hover:bg-purple-50 transition-colors group"
                      >
                        <Phone size={18} className="text-[#4B006E] shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs text-slate-500 font-medium">Direct Clinic Line</p>
                          <p className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-[#4B006E]">{activeBranch.phone}</p>
                        </div>
                      </a>
                    </div>

                    {/* Facility Highlights */}
                    <div className="pt-2">
                      <p className="text-xs font-medium text-slate-500 mb-2">Key Highlights at this branch:</p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {activeBranch.features.map((feature, i) => (
                          <span 
                            key={i} 
                            className="inline-flex items-center gap-1 text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg"
                          >
                            <Sparkles size={11} className="text-amber-500 shrink-0" />
                            <span>{feature}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>

                {/* Google Map Embed */}
                <Reveal delay={0.25}>
                  <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-white">
                    <div className="h-[240px] sm:h-[280px] w-full relative">
                      <iframe 
                        key={activeBranch.id}
                        title={`Best Dental Clinic Location Map - ${activeBranch.name}`}
                        src={activeBranch.embedMapUrl}
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                    <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                      <span>Showing {activeBranch.shortName}</span>
                      <a 
                        href={activeBranch.directionsUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="font-semibold text-[#4B006E] hover:underline inline-flex items-center gap-1"
                      >
                        <span>Open in Maps App</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Asynchronous Appointment Form */}
            <Reveal direction="left">
              <div className="bg-white p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-[2.5rem] shadow-xl sm:shadow-2xl border border-slate-100 relative">
                
                {/* Form Header */}
                <div className="mb-6 sm:mb-8">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1 rounded-full mb-2">
                    <Calendar size={13} />
                    <span>Instant Online Booking</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">Book an Appointment</h3>
                  <p className="text-slate-500 text-sm mt-1">
                    Fill out the form below. We'll immediately process your request and confirm your appointment.
                  </p>
                </div>

                {/* Inline Submission Error Notice */}
                {formStatus === "error" && (
                  <div role="alert" className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3">
                    <AlertCircle size={20} className="text-rose-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold">Booking Submission Failed</p>
                      <p className="text-xs sm:text-sm mt-0.5 text-rose-700">{errorMessage}</p>
                      <div className="mt-2.5 flex items-center gap-3">
                        <button 
                          type="button" 
                          onClick={handleFormSubmit}
                          className="text-xs font-bold underline hover:no-underline text-rose-800 cursor-pointer"
                        >
                          Retry Submission
                        </button>
                        <span className="text-rose-300">•</span>
                        <a href="tel:9441453157" className="text-xs font-bold underline hover:no-underline text-rose-800">
                          Call Directly: 9441453157
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Inline Confirmation Card when Success */}
                {formStatus === "success" && submittedData ? (
                  <div className="py-6 px-4 sm:px-6 rounded-2xl bg-purple-50/60 border border-purple-100 text-center space-y-4">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-4 ring-emerald-50">
                      <CheckCircle2 size={32} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900">Appointment Request Received!</h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1">
                        Thank you, <span className="font-semibold">{submittedData.name}</span>. We've reserved your request for <span className="font-semibold">{submittedData.date}</span> at <span className="font-semibold">{submittedData.branch}</span>.
                      </p>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
                      <a 
                        href={`https://wa.me/919441453157?text=${encodeURIComponent(
                          `Hello Dr. Bindu, I requested an appointment for ${submittedData.name} on ${submittedData.date} (${submittedData.timeSlot}) at ${submittedData.branch} for ${submittedData.treatment}. Please confirm.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all min-h-[44px]"
                      >
                        <MessageCircle size={16} />
                        <span>Chat on WhatsApp</span>
                      </a>
                      <button 
                        type="button"
                        onClick={handleResetForm}
                        className="bg-white hover:bg-slate-100 text-slate-700 font-semibold text-sm py-3 px-4 rounded-xl border border-slate-200 transition-colors min-h-[44px] cursor-pointer"
                      >
                        Book Another Appointment
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} noValidate className="space-y-4 sm:space-y-5">
                    
                    {/* Honeypot spam defense */}
                    <input 
                      type="checkbox" 
                      name="botcheck" 
                      className="hidden" 
                      style={{ display: 'none' }} 
                      tabIndex="-1" 
                      autoComplete="off" 
                    />

                    {/* Branch Selection */}
                    <div className="space-y-1.5 sm:space-y-2">
                      <label htmlFor="branch-select" className="text-sm font-semibold text-slate-700 flex items-center justify-between">
                        <span>Select Branch *</span>
                        <span className="text-xs text-[#4B006E] font-medium">Tenali</span>
                      </label>
                      <select 
                        id="branch-select"
                        name="branch" 
                        value={formData.branch}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData(prev => ({ ...prev, branch: val }));
                          const matchedBranch = CLINIC_BRANCHES.find(b => b.name === val);
                          if (matchedBranch) {
                            setSelectedBranchId(matchedBranch.id);
                          }
                        }}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4B006E] transition-all text-base"
                      >
                        {CLINIC_BRANCHES.map((b) => (
                          <option key={b.id} value={b.name}>
                            {b.name} ({b.landmark})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Patient Name & Mobile Number */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 sm:space-y-2">
                        <label htmlFor="patient-name" className="text-sm font-semibold text-slate-700">Full Name *</label>
                        <input 
                          id="patient-name"
                          type="text" 
                          name="name" 
                          value={formData.name}
                          onChange={handleInputChange}
                          required 
                          autoComplete="name"
                          placeholder="e.g. Ramesh V." 
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4B006E] transition-all text-base" 
                        />
                      </div>
                      
                      <div className="space-y-1.5 sm:space-y-2">
                        <div className="flex justify-between items-center">
                          <label htmlFor="patient-phone" className="text-sm font-semibold text-slate-700">Phone Number *</label>
                          {phoneError && (
                            <span className="text-xs text-rose-600 font-medium">{phoneError}</span>
                          )}
                        </div>
                        <input 
                          id="patient-phone"
                          type="tel" 
                          name="phone" 
                          value={formData.phone}
                          onChange={handleInputChange}
                          onBlur={() => {
                            if (formData.phone && !validatePhone(formData.phone)) {
                              setPhoneError("Enter 10-digit number");
                            }
                          }}
                          required 
                          autoComplete="tel"
                          inputMode="tel"
                          placeholder="94414 53157" 
                          className={`w-full px-4 py-3 rounded-xl bg-slate-50 border transition-all text-base ${
                            phoneError 
                              ? "border-rose-400 focus:ring-2 focus:ring-rose-500 bg-rose-50/20" 
                              : "border-slate-200 focus:ring-2 focus:ring-[#4B006E]"
                          }`} 
                        />
                      </div>
                    </div>
                    
                    {/* Email (Optional) & Preferred Date */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 sm:space-y-2">
                        <label htmlFor="patient-email" className="text-sm font-semibold text-slate-700">
                          Email <span className="text-xs font-normal text-slate-400">(Optional)</span>
                        </label>
                        <input 
                          id="patient-email"
                          type="email" 
                          name="email" 
                          value={formData.email}
                          onChange={handleInputChange}
                          autoComplete="email"
                          inputMode="email"
                          placeholder="name@gmail.com" 
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4B006E] transition-all text-base" 
                        />
                      </div>

                      <div className="space-y-1.5 sm:space-y-2">
                        <label htmlFor="preferred-date" className="text-sm font-semibold text-slate-700">Preferred Date *</label>
                        <input 
                          id="preferred-date"
                          type="date" 
                          name="date" 
                          value={formData.date}
                          onChange={handleInputChange}
                          required 
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4B006E] transition-all text-base" 
                        />
                      </div>
                    </div>

                    {/* Time Slot & Treatment */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 sm:space-y-2">
                        <label htmlFor="preferred-slot" className="text-sm font-semibold text-slate-700">Time Slot</label>
                        <select 
                          id="preferred-slot"
                          name="timeSlot" 
                          value={formData.timeSlot}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4B006E] transition-all text-base"
                        >
                          <option>Morning (10:00 AM - 1:00 PM)</option>
                          <option>Afternoon (2:00 PM - 5:00 PM)</option>
                          <option>Evening (5:00 PM - 8:30 PM)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5 sm:space-y-2">
                        <label htmlFor="treatment-type" className="text-sm font-semibold text-slate-700">Treatment Needed</label>
                        <select 
                          id="treatment-type"
                          name="treatment" 
                          value={formData.treatment}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4B006E] transition-all text-base"
                        >
                          <option>Consultation & General Checkup</option>
                          <option>Dental Implants</option>
                          <option>Root Canal Treatment (RCT)</option>
                          <option>Smile Designing & Veneers</option>
                          <option>Clear Aligners & Braces</option>
                          <option>Pediatric / Kid Dentistry</option>
                          <option>Tooth Extraction & Surgery</option>
                          <option>Teeth Cleaning & Whitening</option>
                          <option>Emergency Dental Care</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Optional Message */}
                    <div className="space-y-1.5 sm:space-y-2">
                      <label htmlFor="patient-message" className="text-sm font-semibold text-slate-700">
                        Message / Dental Concern <span className="text-xs font-normal text-slate-400">(Optional)</span>
                      </label>
                      <textarea 
                        id="patient-message"
                        name="message" 
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="2" 
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4B006E] transition-all resize-none text-base" 
                        placeholder="Tell us about tooth pain, specific symptoms, or questions..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit" 
                      disabled={formStatus === "submitting"}
                      aria-busy={formStatus === "submitting"}
                      className="w-full bg-[#4B006E] text-white font-semibold min-h-[50px] py-3.5 sm:py-4 rounded-xl hover:bg-purple-800 active:scale-[0.99] transition-all shadow-lg shadow-[#4B006E]/20 text-base disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {formStatus === "submitting" ? (
                        <>
                          <Loader2 size={20} className="animate-spin text-amber-400" />
                          <span>Submitting Request...</span>
                        </>
                      ) : (
                        <>
                          <span>Confirm Appointment</span>
                          <ArrowRight size={18} />
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-slate-500 pt-1">
                      🔒 Your details are kept strictly confidential. No pre-payment required.
                    </p>
                  </form>
                )}
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#4B006E] pt-14 sm:pt-20 pb-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12 sm:mb-16">
            
            {/* Brand */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-3">
                <img src={clinicLogo} alt="Best Dental Logo" className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover shadow-sm" />
                <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">Best Dental</span>
              </div>
              <p className="text-purple-100/80 text-sm sm:text-base leading-relaxed">Premium dental care in Tenali by Dr. Ogirala Hima Bindu. Transforming smiles, changing lives.</p>
              <div className="flex gap-3 sm:gap-4">
                <a href="#" aria-label="Follow us on Instagram" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-amber-400 hover:text-[#4B006E] active:scale-95 transition-all">
                  <span className="font-bold text-sm">IG</span>
                </a>
                <a href="https://wa.me/919441453157" target="_blank" rel="noreferrer" aria-label="Message on WhatsApp" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-emerald-500 active:scale-95 transition-all">
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-bold text-base sm:text-lg mb-4 sm:mb-6">Quick Links</h4>
              <ul className="space-y-2.5 sm:space-y-3.5 text-purple-100/80 text-sm sm:text-base">
                {['Home', 'About Dr. Bindu', 'Our Services', 'Gallery', 'Patient Reviews'].map(link => (
                  <li key={link}>
                    <button 
                      onClick={() => scrollTo(link.split(' ')[0].toLowerCase() === 'about' ? 'about' : link.split(' ')[0].toLowerCase() === 'patient' ? 'reviews' : link.split(' ')[0].toLowerCase())} 
                      className="hover:text-amber-400 transition-colors py-1 inline-block text-left"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-bold text-base sm:text-lg mb-4 sm:mb-6">Treatments</h4>
              <ul className="space-y-2.5 sm:space-y-3.5 text-purple-100/80 text-sm sm:text-base">
                <li><button onClick={() => scrollTo('services')} className="hover:text-amber-400 transition-colors py-1 inline-block text-left">Dental Implants</button></li>
                <li><button onClick={() => scrollTo('services')} className="hover:text-amber-400 transition-colors py-1 inline-block text-left">Root Canal Treatment</button></li>
                <li><button onClick={() => scrollTo('services')} className="hover:text-amber-400 transition-colors py-1 inline-block text-left">Smile Designing</button></li>
                <li><button onClick={() => scrollTo('services')} className="hover:text-amber-400 transition-colors py-1 inline-block text-left">Aligners & Braces</button></li>
                <li><button onClick={() => scrollTo('services')} className="hover:text-amber-400 transition-colors py-1 inline-block text-left">Teeth Whitening</button></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold text-base sm:text-lg mb-4 sm:mb-6">Contact Us</h4>
              <ul className="space-y-3 sm:space-y-4 text-purple-100/80 text-sm sm:text-base">
                <li className="flex items-start gap-3">
                  <MapPin size={20} className="text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <span className="font-semibold text-white block">Head Office:</span>
                    <span>Near RTC Bus Stand, Tenali</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={20} className="text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <span className="font-semibold text-white block">City Branch:</span>
                    <span>Bose Road / Market Center, Tenali</span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={20} className="text-amber-400 shrink-0" />
                  <a href="tel:9441453157" className="hover:text-amber-400 transition-colors min-h-[32px] flex items-center font-medium">+91 94414 53157</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={20} className="text-amber-400 shrink-0" />
                  <a href="mailto:bestdentalimplantcenter@gmail.com" className="hover:text-amber-400 transition-colors truncate min-h-[32px] flex items-center">bestdentalimplantcenter@gmail.com</a>
                </li>
              </ul>
            </div>

          </div>

          <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-purple-100/60 text-xs sm:text-sm">© {new Date().getFullYear()} Best Dental Clinic. All rights reserved.</p>
            <p className="text-purple-100/60 text-xs sm:text-sm">Designed with precision for all devices.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}