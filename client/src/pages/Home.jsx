import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineArrowRight, HiOutlineChevronDown, HiOutlineChevronUp, HiOutlineStar } from 'react-icons/hi';
import { FEATURES, STATS_COUNTERS, TESTIMONIALS, FAQ_DATA } from '../constants';
import useAuth from '../hooks/useAuth';

// Animated counter component
const AnimatedCounter = ({ value, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const stepTime = Math.max(Math.floor(duration / value), 10);
    const timer = setInterval(() => {
      start += Math.ceil(value / (duration / stepTime));
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [isVisible, value]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

// FAQ Item component
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="text-sm font-semibold text-dark-100 pr-4">{question}</span>
        {isOpen ? (
          <HiOutlineChevronUp className="w-5 h-5 text-primary-400 flex-shrink-0" />
        ) : (
          <HiOutlineChevronDown className="w-5 h-5 text-dark-400 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-5 pb-5 animate-fade-in">
          <p className="text-sm text-dark-400 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-hidden bg-dark-950 min-h-screen">
      {/* ==================== HERO SECTION ==================== */}
      <section id="hero-section" className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-20 overflow-hidden">
        {/* Animated Ambient Gradient Glows (Linear x Cursor aesthetic) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="ambient-hero-glow top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary-600/20 animate-ambient-glow" />
          <div className="ambient-hero-glow top-32 left-1/3 w-[450px] h-[300px] bg-cyan-500/15 animate-float" style={{ animationDelay: '2s' }} />
          <div className="ambient-hero-glow bottom-10 right-1/4 w-[500px] h-[300px] bg-indigo-700/15 animate-pulse-glow" />
          
          {/* Subtle Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        <div className="section-container relative z-10 py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Linear-style Highlight Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs font-medium mb-8 animate-fade-in-down">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-dark-300">AI-Powered Interview Platform</span>
              <span className="text-cyan-400 font-semibold pl-1">PlacementPro 2.0</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1] animate-fade-in-up">
              Ace Your Placements <br />
              <span className="gradient-text">With Engineering Intelligence</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-dark-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal animate-fade-in-up animate-delay-200">
              Master aptitude, core computer science, DSA, and coding with AI mock interviews and targeted practice designed for modern software engineering roles.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animate-delay-300">
              <Link
                to={isAuthenticated ? '/dashboard' : '/register'}
                className="btn-gradient text-sm sm:text-base !px-7 !py-3.5 w-full sm:w-auto"
              >
                {isAuthenticated ? 'Go to Dashboard' : 'Start Preparing Free'}
                <HiOutlineArrowRight className="w-4 h-4 ml-1 inline" />
              </Link>
              <a
                href="#features"
                className="btn-outline text-sm sm:text-base !px-7 !py-3.5 w-full sm:w-auto"
              >
                Explore Platform
              </a>
            </div>

            {/* Dashboard Visual Artwork */}
            <div className="relative mt-16 sm:mt-20 animate-fade-in-up animate-delay-400">
              <div className="glass-card p-5 sm:p-7 max-w-3xl mx-auto border border-white/[0.1] shadow-card-hover bg-dark-900/90">
                <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
                  <div className="bg-dark-800/80 border border-white/[0.05] rounded-xl p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-white">500+</div>
                    <div className="text-xs text-dark-400 mt-1">Curated Questions</div>
                  </div>
                  <div className="bg-dark-800/80 border border-white/[0.05] rounded-xl p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-cyan-400">12+</div>
                    <div className="text-xs text-dark-400 mt-1">Tech Subjects</div>
                  </div>
                  <div className="bg-dark-800/80 border border-white/[0.05] rounded-xl p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-primary-300">AI</div>
                    <div className="text-xs text-dark-400 mt-1">Mock Rounds</div>
                  </div>
                </div>

                {/* Progress Visualizer */}
                <div className="space-y-3 bg-dark-950/60 p-4 rounded-xl border border-white/[0.04]">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-dark-300 font-medium">Quantitative Aptitude</span>
                    <span className="text-cyan-400 font-semibold">84% Accuracy</span>
                  </div>
                  <div className="w-full bg-dark-800 rounded-full h-2">
                    <div className="bg-gradient-to-r from-primary-500 to-cyan-400 h-2 rounded-full" style={{ width: '84%' }} />
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 mb-1">
                    <span className="text-dark-300 font-medium">Data Structures & Algorithms</span>
                    <span className="text-primary-300 font-semibold">72% Mastered</span>
                  </div>
                  <div className="w-full bg-dark-800 rounded-full h-2">
                    <div className="bg-gradient-to-r from-primary-600 to-primary-400 h-2 rounded-full" style={{ width: '72%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURES SECTION ==================== */}
      <section id="features" className="py-24 sm:py-32 relative border-t border-white/[0.06] bg-dark-900/40">
        <div className="section-container">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Built for <span className="gradient-text">Top Engineering Success</span>
            </h2>
            <p className="text-dark-300 max-w-xl mx-auto text-sm sm:text-base">
              A streamlined toolset engineered to give you the exact technical advantage in modern interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {FEATURES.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="glass-card p-6 sm:p-8 group hover:border-primary-500/40 transition-all duration-300 flex flex-col items-start"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 mb-6 group-hover:scale-105 group-hover:bg-primary-500/20 transition-all">
                    {typeof IconComponent === 'function' ? (
                      <IconComponent className="w-6 h-6 text-primary-300" />
                    ) : (
                      <span className="text-xl">{feature.icon}</span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-dark-300 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== STATISTICS SECTION ==================== */}
      <section id="statistics" className="py-20 relative border-t border-b border-white/[0.06] bg-dark-900/60">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS_COUNTERS.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-xs sm:text-sm text-dark-300 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS SECTION ==================== */}
      <section id="testimonials" className="py-24 sm:py-32">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
              Trusted by <span className="highlight-text">Students & Developers</span>
            </h2>
            <p className="text-dark-300 max-w-xl mx-auto text-sm">
              Real outcomes from candidates who passed top-tier tech placement rounds.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="glass-card p-8 sm:p-10 text-center relative">
              <div className="flex items-center justify-center gap-1 mb-6">
                {[...Array(TESTIMONIALS[activeTestimonial].rating)].map((_, i) => (
                  <HiOutlineStar key={i} className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                ))}
              </div>
              <p className="text-base sm:text-lg text-dark-200 leading-relaxed mb-6 font-normal">
                "{TESTIMONIALS[activeTestimonial].quote}"
              </p>
              <div>
                <p className="text-sm font-semibold text-white">
                  {TESTIMONIALS[activeTestimonial].name}
                </p>
                <p className="text-xs text-dark-400">{TESTIMONIALS[activeTestimonial].college}</p>
              </div>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === activeTestimonial
                      ? 'bg-cyan-400 w-6'
                      : 'bg-dark-700 w-1.5 hover:bg-dark-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FAQ SECTION ==================== */}
      <section id="faq" className="py-24 sm:py-32 border-t border-white/[0.06] bg-dark-900/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-dark-300 max-w-xl mx-auto text-sm">
              Everything you need to know about PlacementPro.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            {FAQ_DATA.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section id="cta-section" className="py-24 sm:py-32 relative border-t border-white/[0.06] overflow-hidden">
        <div className="ambient-hero-glow bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-primary-600/15 blur-3xl" />
        <div className="section-container relative z-10 text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Ready to <span className="gradient-text">Accelerate Your Prep</span>?
          </h2>
          <p className="text-dark-300 max-w-xl mx-auto text-sm sm:text-base mb-8">
            Join thousands of engineering students mastering placement interviews with confidence.
          </p>
          <Link
            to={isAuthenticated ? '/dashboard' : '/register'}
            className="btn-gradient text-sm sm:text-base !px-8 !py-3.5 inline-flex items-center gap-2"
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'}
            <HiOutlineArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
