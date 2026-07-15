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
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* ==================== HERO SECTION ==================== */}
      <section id="hero-section" className="relative min-h-screen flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="section-container relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-8 animate-fade-in-down">
              <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
              AI-Powered Interview Preparation
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in-up">
              Ace Your{' '}
              <span className="gradient-text">Placements</span>
              <br />
              With Confidence
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-dark-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up animate-delay-200">
              Master aptitude, technical, DSA, and coding with our intelligent preparation platform.
              Practice with real interview questions and track your progress.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animate-delay-300">
              <Link
                to={isAuthenticated ? '/dashboard' : '/register'}
                className="btn-gradient text-lg !px-8 !py-4 w-full sm:w-auto"
              >
                {isAuthenticated ? 'Go to Dashboard' : 'Start Preparing Free'}
                <HiOutlineArrowRight className="w-5 h-5 inline ml-2" />
              </Link>
              <a
                href="#features"
                className="btn-outline text-lg !px-8 !py-4 w-full sm:w-auto"
              >
                Explore Features
              </a>
            </div>

            {/* Floating Cards (CSS Art representing dashboard) */}
            <div className="relative mt-16 animate-fade-in-up animate-delay-400">
              <div className="glass-card p-4 md:p-6 max-w-3xl mx-auto">
                <div className="grid grid-cols-3 gap-3 md:gap-4">
                  <div className="bg-dark-800/60 rounded-xl p-3 md:p-4 text-center">
                    <div className="text-2xl md:text-3xl font-bold text-primary-400">500+</div>
                    <div className="text-xs text-dark-400 mt-1">Questions</div>
                  </div>
                  <div className="bg-dark-800/60 rounded-xl p-3 md:p-4 text-center">
                    <div className="text-2xl md:text-3xl font-bold text-secondary-400">12+</div>
                    <div className="text-xs text-dark-400 mt-1">Subjects</div>
                  </div>
                  <div className="bg-dark-800/60 rounded-xl p-3 md:p-4 text-center">
                    <div className="text-2xl md:text-3xl font-bold text-accent-400">∞</div>
                    <div className="text-xs text-dark-400 mt-1">Practice</div>
                  </div>
                </div>
                {/* Fake progress bars */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-dark-400 w-20">Aptitude</span>
                    <div className="flex-1 bg-dark-800/60 rounded-full h-2">
                      <div className="bg-gradient-to-r from-primary-500 to-primary-400 h-2 rounded-full" style={{ width: '78%' }} />
                    </div>
                    <span className="text-xs text-primary-400">78%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-dark-400 w-20">Technical</span>
                    <div className="flex-1 bg-dark-800/60 rounded-full h-2">
                      <div className="bg-gradient-to-r from-secondary-500 to-secondary-400 h-2 rounded-full" style={{ width: '65%' }} />
                    </div>
                    <span className="text-xs text-secondary-400">65%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-dark-400 w-20">DSA</span>
                    <div className="flex-1 bg-dark-800/60 rounded-full h-2">
                      <div className="bg-gradient-to-r from-accent-500 to-accent-400 h-2 rounded-full" style={{ width: '52%' }} />
                    </div>
                    <span className="text-xs text-accent-400">52%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURES SECTION ==================== */}
      <section id="features" className="py-24 relative">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-100 mb-4">
              Everything You Need to{' '}
              <span className="gradient-text">Succeed</span>
            </h2>
            <p className="text-dark-400 max-w-2xl mx-auto">
              A comprehensive platform designed to help you prepare for every aspect of placement interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, index) => (
              <div
                key={index}
                className="glass-card p-6 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-dark-100 mb-2 group-hover:text-primary-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-dark-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== STATISTICS SECTION ==================== */}
      <section id="statistics" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950/50 via-dark-950 to-accent-950/50" />
        <div className="section-container relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS_COUNTERS.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-dark-400 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FAQ SECTION ==================== */}
      <section id="faq" className="py-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-100 mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-dark-400 max-w-xl mx-auto">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            {FAQ_DATA.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section id="cta-section" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/30 via-dark-950 to-accent-900/30" />
        <div className="section-container relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-100 mb-4">
            Ready to <span className="gradient-text">Start Preparing</span>?
          </h2>
          <p className="text-dark-400 max-w-xl mx-auto mb-8">
            Join thousands of students who are already acing their placement interviews with PlacementPro.
          </p>
          <Link
            to={isAuthenticated ? '/dashboard' : '/register'}
            className="btn-gradient text-lg !px-10 !py-4 inline-flex items-center gap-2"
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'}
            <HiOutlineArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
