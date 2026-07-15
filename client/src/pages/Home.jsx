import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineArrowRight,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineStar,
  HiOutlineCheckCircle,
  HiOutlineTerminal,
  HiOutlineChartBar,
  HiOutlineSparkles,
  HiOutlineAcademicCap,
  HiOutlineMicrophone,
  HiOutlinePlay,
  HiOutlineCode,
} from 'react-icons/hi';
import { FEATURES, STATS_COUNTERS, TESTIMONIALS, FAQ_DATA } from '../constants';
import useAuth from '../hooks/useAuth';

// Top Tech Companies Marquee
const HIRING_PARTNERS = [
  'Google', 'Amazon', 'Microsoft', 'Meta', 'Apple', 'Netflix', 'Uber', 'Stripe', 'Adobe', 'Atlassian'
];

// Interactive Showcase Tabs Data
const SHOWCASE_TABS = [
  {
    id: 'ai-interview',
    label: 'AI Interview Engine',
    icon: HiOutlineMicrophone,
    title: 'Simulate High-Stakes HR & Technical Rounds',
    subtitle: 'Adaptive voice & code prompts tailored to FAANG role expectations.',
    preview: (
      <div className="space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22D3EE] animate-ping" />
            <span className="text-white font-semibold">Live Technical Assessment</span>
          </div>
          <span className="text-[#F59E0B] font-medium bg-[#F59E0B]/10 px-2.5 py-0.5 rounded-full border border-[#F59E0B]/20">Timer: 14:32</span>
        </div>
        <div className="p-4 rounded-2xl bg-[#111114]/90 border border-white/[0.08] space-y-3">
          <p className="text-[#A1A1AA] text-[11px] uppercase tracking-wider font-semibold">Question 3 of 5 • Data Structures</p>
          <p className="text-white text-sm font-sans font-medium">"Given a binary tree, return the lowest common ancestor (LCA) of two given nodes with sub-linear space complexity."</p>
          <div className="p-3 rounded-xl bg-[#5B5CF6]/10 border border-[#5B5CF6]/30 text-[#22D3EE] font-mono text-xs">
            ✓ Optimal Time Complexity Verified: O(N)
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'dsa-ide',
    label: 'Real-Time Code IDE',
    icon: HiOutlineCode,
    title: 'In-Browser Multi-Language Workspace',
    subtitle: 'Write, compile, and benchmark code against edge cases with instant telemetry.',
    preview: (
      <div className="font-mono text-xs space-y-2">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 text-[#A1A1AA]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="text-white font-semibold pl-2">solution.cpp</span>
          </div>
          <span className="text-[#22D3EE]">Language: C++20</span>
        </div>
        <pre className="text-[#FAFAFA] p-3 rounded-xl bg-[#09090B] overflow-x-auto border border-white/[0.06]">
{`class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (!root || root == p || root == q) return root;
        TreeNode* left = lowestCommonAncestor(root->left, p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);
        return !left ? right : !right ? left : root;
    }
};`}
        </pre>
        <div className="flex items-center justify-between pt-1 text-emerald-400">
          <span>Test Cases: 15 / 15 Passed</span>
          <span>Runtime: 4ms (Top 96%)</span>
        </div>
      </div>
    ),
  },
  {
    id: 'analytics-hub',
    label: 'Performance Telemetry',
    icon: HiOutlineChartBar,
    title: 'Deep Precision Analytics & Weakness Heatmaps',
    subtitle: 'Track readiness velocity across Quantitative Aptitude, Technical, and DSA.',
    preview: (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-2xl bg-[#5B5CF6]/10 border border-[#5B5CF6]/30 text-center">
            <div className="text-xs text-[#A1A1AA]">Overall Mastery</div>
            <div className="text-2xl font-extrabold text-white">88.4%</div>
          </div>
          <div className="p-3 rounded-2xl bg-[#22D3EE]/10 border border-[#22D3EE]/30 text-center">
            <div className="text-xs text-[#A1A1AA]">Solved Speed</div>
            <div className="text-2xl font-extrabold text-[#22D3EE]">1.4m / Q</div>
          </div>
        </div>
        <div className="space-y-2 p-3 rounded-2xl bg-[#111114] border border-white/[0.08]">
          <div className="flex justify-between text-xs text-[#FAFAFA]">
            <span>Dynamic Programming</span>
            <span className="text-[#5B5CF6] font-semibold">High Accuracy (92%)</span>
          </div>
          <div className="w-full bg-[#17171C] rounded-full h-2">
            <div className="bg-gradient-to-r from-[#5B5CF6] to-[#22D3EE] h-2 rounded-full" style={{ width: '92%' }} />
          </div>
        </div>
      </div>
    ),
  },
];

// Pricing tiers
const PRICING_PLANS = [
  {
    name: 'Free Starter',
    price: '$0',
    description: 'Essential practice for engineering students preparing for upcoming campus rounds.',
    features: [
      '500+ Curated Aptitude & Technical Questions',
      'Topic-wise DSA Problem Bank',
      'Daily Streak & Mastery Tracking',
      'Community Solutions & Discussions',
    ],
    cta: 'Start Free Prep',
    popular: false,
  },
  {
    name: 'Pro Candidate',
    price: '$19',
    period: '/month',
    description: 'Full-featured AI mock interviews and deep performance insights for top-tier roles.',
    features: [
      'Everything in Free Starter',
      'Unlimited AI Voice Mock Interviews',
      'Real-Time Code Compiler & Benchmarks',
      'Weakness Diagnosis & Study Planner',
      'Verified Certificate Badges',
    ],
    cta: 'Elevate Preparation',
    popular: true,
  },
  {
    name: 'Campus Pro',
    price: '$49',
    period: '/seat/yr',
    description: 'Designed for placement cells & universities managing cohort preparation analytics.',
    features: [
      'Full Administrative Analytics Portal',
      'Custom Subject & Mock Test Builder',
      'Automated Performance Reports',
      'Dedicated Campus Support Manager',
    ],
    cta: 'Contact University Team',
    popular: false,
  },
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="aurora-card rounded-[24px] overflow-hidden border border-white/[0.08]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="text-sm sm:text-base font-semibold text-white pr-4">{question}</span>
        {isOpen ? (
          <HiOutlineChevronUp className="w-5 h-5 text-[#5B5CF6] flex-shrink-0" />
        ) : (
          <HiOutlineChevronDown className="w-5 h-5 text-[#A1A1AA] flex-shrink-0" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 pb-6 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed border-t border-white/[0.04] pt-4"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('ai-interview');
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const selectedShowcase = SHOWCASE_TABS.find((t) => t.id === activeTab);

  return (
    <div className="relative overflow-hidden bg-[#09090B] text-[#FAFAFA] min-h-screen">
      {/* Dynamic Animated Aurora Background Mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="aurora-mesh top-[-100px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#5B5CF6]/20 animate-aurora-glow" />
        <div className="aurora-mesh top-[200px] left-1/4 w-[600px] h-[400px] bg-[#22D3EE]/15 animate-float-slow" />
        <div className="aurora-mesh top-[600px] right-1/4 w-[500px] h-[400px] bg-[#F59E0B]/10 animate-pulse-subtle" />
      </div>

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative z-10 pt-36 pb-24 sm:pt-44 sm:pb-32 min-h-screen flex items-center justify-center">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            {/* Apple-style Glass Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-[20px] text-xs font-medium mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
              <span className="text-[#A1A1AA]">Aurora OS 3.0</span>
              <span className="text-white font-semibold pl-1">Targeted Engineering Placements</span>
            </motion.div>

            {/* Main Headline with Stripe Gradient */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight stripe-text mb-6 leading-[1.08]"
            >
              Master Placement Interviews <br />
              With Precision Intelligence
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-xl text-[#A1A1AA] max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
            >
              Prepare for quantitative aptitude, 12+ technical core subjects, data structures, and AI-driven mock interview rounds in one unified platform.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to={isAuthenticated ? '/dashboard' : '/register'}
                className="btn-apple-primary text-sm sm:text-base w-full sm:w-auto"
              >
                {isAuthenticated ? 'Go to Dashboard' : 'Start Preparing Free'}
                <HiOutlineArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <a
                href="#interactive-showcase"
                className="btn-apple-secondary text-sm sm:text-base w-full sm:w-auto"
              >
                Watch Product Demo
              </a>
            </motion.div>

            {/* Flagship Interactive UI Mockup Showcase */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative mt-16 sm:mt-20"
            >
              <div className="aurora-card p-4 sm:p-6 max-w-4xl mx-auto shadow-2xl border border-white/[0.1] bg-[#111114]/90 backdrop-blur-[20px]">
                {/* Simulated Window Control Bar */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="text-xs text-[#A1A1AA] font-mono ml-2">aurora-os // placement-dashboard.v3</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#22D3EE] font-mono">
                    <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-ping" />
                    <span>Real-Time Engine Active</span>
                  </div>
                </div>

                {/* Dashboard Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-[#5B5CF6]/40 transition-colors">
                    <div className="flex items-center justify-between text-xs text-[#A1A1AA] mb-2">
                      <span>Aptitude Accuracy</span>
                      <HiOutlineAcademicCap className="w-4 h-4 text-[#5B5CF6]" />
                    </div>
                    <div className="text-2xl font-bold text-white">88.5%</div>
                    <div className="text-[11px] text-emerald-400 mt-1">↑ 12% from last week</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-[#22D3EE]/40 transition-colors">
                    <div className="flex items-center justify-between text-xs text-[#A1A1AA] mb-2">
                      <span>DSA Problems Solved</span>
                      <HiOutlineCode className="w-4 h-4 text-[#22D3EE]" />
                    </div>
                    <div className="text-2xl font-bold text-white">142 / 200</div>
                    <div className="text-[11px] text-[#22D3EE] mt-1">71% Topic Completion</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-[#F59E0B]/40 transition-colors">
                    <div className="flex items-center justify-between text-xs text-[#A1A1AA] mb-2">
                      <span>Mock Interview Score</span>
                      <HiOutlineMicrophone className="w-4 h-4 text-[#F59E0B]" />
                    </div>
                    <div className="text-2xl font-bold text-white">94 / 100</div>
                    <div className="text-[11px] text-[#F59E0B] mt-1">FAANG Ready Score</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== HIRING PARTNERS MARQUEE ==================== */}
      <section className="py-12 border-y border-white/[0.06] bg-[#111114]/40 backdrop-blur-[20px] overflow-hidden">
        <div className="section-container text-center mb-6">
          <p className="text-xs uppercase tracking-widest text-[#A1A1AA] font-semibold">
            Candidates Prepared Here Pass Interviews At Top Tech Companies
          </p>
        </div>
        <div className="flex overflow-hidden select-none">
          <div className="flex animate-marquee shrink-0 gap-12 whitespace-nowrap">
            {HIRING_PARTNERS.concat(HIRING_PARTNERS).map((partner, index) => (
              <span
                key={index}
                className="text-lg font-bold text-[#A1A1AA]/50 hover:text-white transition-colors cursor-default tracking-wider"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== INTERACTIVE SHOWCASE ==================== */}
      <section id="interactive-showcase" className="py-24 sm:py-32 relative">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Designed For <span className="cyan-accent-text">Real Interview Mastery</span>
            </h2>
            <p className="text-[#A1A1AA] text-sm sm:text-base">
              Experience the tools engineered specifically to bridge the gap between academic study and technical hiring standards.
            </p>
          </div>

          {/* Showcase Tab Selector */}
          <div className="flex justify-center mb-10">
            <div className="flex p-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-[20px] max-w-xl w-full">
              {SHOWCASE_TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="relative flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-full text-xs font-semibold transition-colors z-10"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="showcaseActiveTab"
                        className="absolute inset-0 bg-[#5B5CF6] rounded-full shadow-[0_0_20px_rgba(91,92,246,0.5)]"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <Icon className={`w-4 h-4 relative z-20 ${isActive ? 'text-white' : 'text-[#A1A1AA]'}`} />
                    <span className={`relative z-20 ${isActive ? 'text-white' : 'text-[#A1A1AA]'}`}>
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Showcase Content Panel */}
          <div className="aurora-card p-6 sm:p-10 max-w-4xl mx-auto border border-white/[0.1]">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedShowcase.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{selectedShowcase.title}</h3>
                  <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed mb-6">
                    {selectedShowcase.subtitle}
                  </p>
                  <Link to="/register" className="btn-apple-primary text-xs !px-5 !py-2.5 inline-flex items-center gap-2">
                    Try {selectedShowcase.label}
                    <HiOutlineArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div>{selectedShowcase.preview}</div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ==================== PRICING CARDS ==================== */}
      <section id="pricing" className="py-24 sm:py-32 relative border-t border-white/[0.06] bg-[#111114]/40">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Simple, Transparent <span className="stripe-text">Placement Access</span>
            </h2>
            <p className="text-[#A1A1AA] text-sm sm:text-base">
              Choose the preparation plan that matches your interview goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PRICING_PLANS.map((plan, index) => (
              <div
                key={index}
                className={`aurora-card p-8 flex flex-col justify-between relative ${
                  plan.popular ? 'border-[#5B5CF6] shadow-[0_0_40px_rgba(91,92,246,0.35)]' : 'border-white/[0.08]'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#5B5CF6] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-lg">
                    Most Popular Choice
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed mb-6">{plan.description}</p>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                    {plan.period && <span className="text-xs text-[#A1A1AA]">{plan.period}</span>}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs text-[#FAFAFA]">
                        <HiOutlineCheckCircle className="w-4 h-4 text-[#22D3EE] flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  to={isAuthenticated ? '/dashboard' : '/register'}
                  className={`w-full text-center ${plan.popular ? 'btn-apple-primary' : 'btn-apple-secondary'} text-xs font-semibold py-3`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FAQ SECTION ==================== */}
      <section id="faq" className="py-24 sm:py-32 border-t border-white/[0.06]">
        <div className="section-container">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-[#A1A1AA] text-sm">
              Answers to common questions about PlacementPro & Aurora OS.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            {FAQ_DATA.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA BANNER ==================== */}
      <section className="py-24 sm:py-32 relative border-t border-white/[0.06] overflow-hidden">
        <div className="aurora-mesh bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#5B5CF6]/25 blur-[120px]" />
        <div className="section-container relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight stripe-text mb-6">
            Ready To Secure Your Next Tech Offer?
          </h2>
          <p className="text-[#A1A1AA] text-sm sm:text-base mb-8">
            Join thousands of engineering candidates acing interview rounds with confidence.
          </p>
          <Link
            to={isAuthenticated ? '/dashboard' : '/register'}
            className="btn-apple-primary text-sm sm:text-base !px-8 !py-4 inline-flex items-center gap-2"
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Create Free Account'}
            <HiOutlineArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
