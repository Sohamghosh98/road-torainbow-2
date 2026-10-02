import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Brain,
  CheckCircle2,
  Compass,
  Dna,
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  Instagram,
  Leaf,
  Lightbulb,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Microscope,
  NotebookPen,
  Phone,
  PlayCircle,
  Send,
  Sparkles,
  Sprout,
  TreePine,
  Trophy,
  UsersRound,
  X,
  Youtube,
  Facebook,
} from "lucide-react";

type GoogleReview = {
  name: string;
  photoUri?: string;
  rating: number;
  text: string;
  relativePublishTimeDescription?: string;
  googleMapsUri?: string;
};

/* =========================================================
   NAVIGATION
========================================================= */

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Career Guidance", href: "#careers" },
  { label: "Stories", href: "#stories" },
  { label: "Workshops", href: "#workshops" },
  { label: "Contact", href: "#contact" },
];

/* =========================================================
   SERVICES
========================================================= */

const services = [
  {
    icon: Compass,
    title: "Career Guidance",
    copy: "Personalised guidance to explore strengths, interests and career options.",
    tone: "blush",
  },
  {
    icon: BookOpen,
    title: "Biology Education",
    copy: "30+ years of Biology teaching focused on clear concepts and meaningful learning.",
    tone: "mint",
  },
  {
    icon: UsersRound,
    title: "Student Counselling",
    copy: "Supportive conversations to build clarity, confidence and direction.",
    tone: "lavender",
  },
  {
    icon: NotebookPen,
    title: "Workshops & Seminars",
    copy: "Interactive sessions that inspire curiosity and informed decision-making.",
    tone: "butter",
  },
];



type GoogleReviewsResponse = {
  rating?: number;
  userRatingCount?: number;
  reviews?: GoogleReview[];
};

const GOOGLE_REVIEWS_FALLBACK: GoogleReview[] = [];

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/?q=place_id:ChIJV8qoI_Kb-DkR_NVqiX6Xlok";

/* =========================================================
   APPROACH
========================================================= */

const pillars = [
  {
    icon: Lightbulb,
    title: "Clarity first",
    copy: "Understand yourself and your options before making decisions.",
  },
  {
    icon: GraduationCap,
    title: "Student-focused",
    copy: "Every student has different strengths, interests and goals.",
  },
  {
    icon: HeartHandshake,
    title: "Holistic support",
    copy: "Supporting education, careers, confidence and growth.",
  },
  {
    icon: UsersRound,
    title: "Open conversations",
    copy: "A safe space to ask, explore and express.",
  },
];

/* =========================================================
   CAREER PATHS
========================================================= */

const careerPaths = [
  {
    icon: Microscope,
    label: "Medicine",
    short: "Healthcare",
  },
  {
    icon: Dna,
    label: "Life Sciences",
    short: "Biology & research",
  },
  {
    icon: FlaskConical,
    label: "Research",
    short: "Science pathways",
  },
  {
    icon: Sprout,
    label: "Environment",
    short: "Ecology & sustainability",
  },
  {
    icon: Leaf,
    label: "Botany",
    short: "Plant sciences",
  },
  {
    icon: TreePine,
    label: "Zoology",
    short: "Animal sciences",
  },
  {
    icon: Brain,
    label: "Higher Education",
    short: "Academic pathways",
  },
  {
    icon: GraduationCap,
    label: "Beyond Science",
    short: "Explore more",
  },
];

/* =========================================================
   GUIDANCE STORIES
   ---------------------------------------------------------
   These are intentionally not presented as testimonials.
   They describe areas of guidance rather than inventing
   student reviews or outcomes.
========================================================= */

const guidanceStories = [
  {
    number: "01",
    title: "Understand",
    copy: "Identify interests, strengths and goals.",
    tone: "gold",
  },
  {
    number: "02",
    title: "Explore",
    copy: "Discover academic and career possibilities.",
    tone: "blue",
  },
  {
    number: "03",
    title: "Navigate",
    copy: "Turn possibilities into informed choices.",
    tone: "green",
  },
];

/* =========================================================
   SCROLL HELPER
========================================================= */

function scrollToId(id: string) {
  document.querySelector(id)?.scrollIntoView({
    behavior: "smooth",
  });
}



/* =========================================================
   HOME
========================================================= */

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  // Google Reviews state MUST be here
  const [googleReviews, setGoogleReviews] = useState<GoogleReview[]>([]);
  const [googleRating, setGoogleRating] = useState<number | null>(null);
  const [googleReviewCount, setGoogleReviewCount] =
    useState<number | null>(null);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState(false);

  // Google Reviews effect MUST also be here
  useEffect(() => {
    let cancelled = false;

    async function loadGoogleReviews() {
      try {
        setReviewsLoading(true);
        setReviewsError(false);

        const response = await fetch("/api/google-reviews");

        if (!response.ok) {
          throw new Error("Unable to load Google reviews");
        }

        const data = await response.json();

        if (cancelled) return;

        setGoogleReviews(data.reviews ?? []);
        setGoogleRating(data.rating ?? null);
        setGoogleReviewCount(data.userRatingCount ?? null);
      } catch (error) {
        console.error("Google Reviews error:", error);

        if (!cancelled) {
          setReviewsError(true);
        }
      } finally {
        if (!cancelled) {
          setReviewsLoading(false);
        }
      }
    }

    loadGoogleReviews();

    return () => {
      cancelled = true;
    };
  }, []);

  // Your existing active navigation effect
  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visible[0]) {
          setActiveSection(
            `#${visible[0].target.id}`
          );
        }
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  /* =======================================================
     NAV HANDLER
  ======================================================= */

  const handleNav = (href: string) => {
    setMenuOpen(false);
    scrollToId(href);
  };

  return (
    <div className="site-shell">

      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="site-header">
        <div className="container nav-inner">

          <a
            className="brand"
            href="#home"
            onClick={(event) => {
              event.preventDefault();
              handleNav("#home");
            }}
          >
            <span className="brand-mark">
              <Leaf
                size={23}
                strokeWidth={2.2}
              />
            </span>

            <span className="brand-wordmark">
              Road to the <span>Rainbow</span>

              <small>
                Learn · Explore · Grow
              </small>
            </span>
          </a>

          <nav
            className={`desktop-nav ${menuOpen ? "mobile-open" : ""
              }`}
            aria-label="Primary navigation"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                className={
                  activeSection === item.href
                    ? "active"
                    : ""
                }
                href={item.href}
                onClick={(event) => {
                  event.preventDefault();
                  handleNav(item.href);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            className="button button-yellow nav-cta"
            href="#contact"
            onClick={(event) => {
              event.preventDefault();
              handleNav("#contact");
            }}
          >
            Start a Conversation
            <ArrowRight size={16} />
          </a>

          <button
            className="menu-button"
            aria-label={
              menuOpen
                ? "Close menu"
                : "Open menu"
            }
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
          >
            {menuOpen ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>

        </div>
      </header>

      <main>

        {/* =================================================
            HERO
        ================================================= */}

        <section
          id="home"
          className="hero section-paper"
        >
          <div className="hero-orb hero-orb-one" />
          <div className="hero-orb hero-orb-two" />

          <div className="container hero-grid">

            <div className="hero-copy reveal">

              <div className="eyebrow">
                <span className="eyebrow-line" />
                Biology · Careers · Life
              </div>

              <h1>
                Find your path.
                <em>
                  {" "}
                  Make it meaningful.
                </em>
              </h1>

              <p className="hero-lede">
                Founder & Lead Career Navigator
                <br />
                Biology Educator · Career Coach · Mentor
              </p>

              <p className="hero-description">
                Helping young people understand their
                strengths, explore possibilities and make
                informed choices about education and careers.
              </p>

              <div className="hero-actions">

                <a
                  className="button button-yellow"
                  href="#contact"
                  onClick={(event) => {
                    event.preventDefault();
                    handleNav("#contact");
                  }}
                >
                  Start Your Journey
                  <ArrowRight size={17} />
                </a>

                <button
                  className="story-link"
                  onClick={() =>
                    scrollToId("#about")
                  }
                >
                  <PlayCircle size={22} />
                  Discover my story
                </button>

              </div>

              <div className="hero-promise">
                <span>
                  Helping young minds find direction.
                </span>

                <span className="smile">
                  ☺
                </span>
              </div>

            </div>

            {/* HERO IMAGE */}

            <div className="hero-visual reveal delay-2">

              <div className="hero-card">

                <div className="hero-image-glow" />

                <div
                  className="hero-portrait"
                  aria-label="Portrait of Manisha Dhar"
                >
                  <img
                    src="/images/Manisha.png"
                    alt="Manisha Dhar — Founder & Lead Career Navigator"
                  />
                </div>

                <div className="note-card note-card-top">
                  <Sparkles size={15} />

                  <span>
                    Explore.
                    <br />
                    Understand.
                    <br />
                    <strong>Grow.</strong>
                  </span>
                </div>

                <div className="note-card note-card-side">

                  <span>
                    Your journey
                    <br />
                    is uniquely
                    <br />
                    <strong>yours.</strong>
                  </span>

                  <span className="note-smile">
                    ☺
                  </span>

                </div>

                <div className="stacked-books">
                  <span>BIOLOGY</span>
                  <span>CAREER GUIDANCE</span>
                  <span>EDUCATION</span>
                  <span>MENTORSHIP</span>
                  <span>LIFE SKILLS</span>
                </div>

              </div>

            </div>

          </div>

          {/* HERO BENEFITS */}

          <div className="container benefit-row reveal delay-3">

            {[
              {
                icon: BookOpen,
                label: "Biology Education",
              },
              {
                icon: Compass,
                label: "Career Guidance",
              },
              {
                icon: UsersRound,
                label: "Student Counselling",
              },
              {
                icon: HeartHandshake,
                label: "Mentorship",
              },
            ].map(
              ({ icon: Icon, label }) => (
                <div
                  className="benefit"
                  key={label}
                >
                  <Icon
                    size={24}
                    strokeWidth={1.8}
                  />

                  <span>{label}</span>
                </div>
              )
            )}

          </div>

        </section>

        {/* =================================================
            ABOUT
        ================================================= */}

        <section
          id="about"
          className="about section-cream section-space"
        >
          <div className="container about-grid">

            <div className="about-visual reveal">

              <div className="about-image-frame">

                <img
                  src="/images/Manisha.png"
                  alt="Manisha Dhar — Founder & Lead Career Navigator"
                />

                <div className="about-portrait-badge">
                  <Leaf size={28} />

                  <div className="experience-content">
                    <span className="experience-number">30+</span>

                    <strong>
                      YEARS OF
                      <br />
                      TEACHING EXPERIENCE
                    </strong>
                  </div>
                </div>

              </div>

              <div className="scribble scribble-about">
                Learn with purpose,
                <br />
                grow with confidence!
              </div>

            </div>

            <div className="about-copy reveal delay-1">

              <div className="section-kicker">
                About Manisha
              </div>

              <h2>
                An educator, mentor
                <br />
                <em>and career navigator.</em>
              </h2>

              <p className="intro">
                Manisha Dhar is the Founder & Lead Career Navigator
                of Road to the Rainbow.
              </p>

              <p>
                With 30+ years of Biology teaching experience,
                she helps students understand themselves,
                explore opportunities and make informed choices.
              </p>

              <p>
                Former Vice-Principal of Narayana School Kolkata,
                she works with students, parents and institutions
                through counselling, mentoring and workshops.
              </p>

              {/* PROFESSIONAL CREDENTIAL */}

              <div className="about-credential">

                <span>
                  Former Vice-Principal
                </span>

                <strong>
                  Narayana School Kolkata
                </strong>

              </div>

              <blockquote>
                “My goal is to help young minds
                <br />
                <strong>
                  find clarity, confidence and direction.
                </strong>
                ”
              </blockquote>

            </div>

          </div>
        </section>

        {/* =================================================
            EXPERIENCE
        ================================================= */}

        <section
          className="results section-paper section-space-tight"
        >
          <div className="container">

            <div className="section-heading-row reveal">

              <div>

                <div className="section-kicker">
                  Experience & perspective
                </div>

                <h2>
                  Years of learning.
                  <br />
                  <em>
                    Years of guiding.
                  </em>
                </h2>

              </div>

              <BadgeCheck
                className="heading-seal"
                size={47}
              />

            </div>

            <div className="stats-grid reveal delay-1">

              {/* 01 */}

              <div className="stat-card">
                <BookOpen size={29} />

                <strong>
                  30+
                </strong>

                <span>
                  Years of high-school
                  Biology teaching
                </span>
              </div>

              {/* 02 */}

              <div className="stat-card">
                <GraduationCap size={29} />

                <strong>
                  Educator
                </strong>

                <span>
                  Dedicated to meaningful
                  Biology education
                </span>
              </div>

              {/* 03 */}

              <div className="stat-card">
                <UsersRound size={29} />

                <strong>
                  Mentor
                </strong>

                <span>
                  Supporting students,
                  parents and institutions
                </span>
              </div>

              {/* 04 */}

              <div className="stat-card">
                <HeartHandshake size={29} />

                <strong>
                  Guide
                </strong>

                <span>
                  Helping young minds
                  find clarity and direction
                </span>
              </div>

            </div>

          </div>
        </section>

        {/* =================================================
            SERVICES
        ================================================= */}

        <section
          id="services"
          className="services section-cream section-space"
        >
          <div className="container">

            <div className="section-heading-row reveal">

              <div>

                <div className="section-kicker">
                  What I do
                </div>

                <h2>
                  Guidance for every
                  <br />
                  <em>
                    important step.
                  </em>
                </h2>

              </div>

              <div className="heading-doodle">
                One conversation
                <br />
                can change direction
                <span>↘</span>
              </div>

            </div>

            <div className="services-grid reveal delay-1">

              {services.map(
                ({
                  icon: Icon,
                  title,
                  copy,
                  tone,
                }) => (
                  <article
                    className={`service-card ${tone}`}
                    key={title}
                  >

                    <div className="service-icon">
                      <Icon size={30} />
                    </div>

                    <h3>
                      {title}
                    </h3>

                    <p>
                      {copy}
                    </p>

                    <ArrowUpRight
                      className="card-arrow"
                      size={19}
                    />

                  </article>
                )
              )}

            </div>

          </div>
        </section>

        {/* =================================================
            APPROACH
        ================================================= */}

        <section
          className="why section-paper section-space"
        >
          <div className="container why-grid">

            <div className="why-copy reveal">

              <div className="section-kicker">
                My approach
              </div>

              <h2>
                Listen.
                <br />
                <em>
                  Understand. Guide.
                </em>
              </h2>

              <p>
                Career decisions are deeply personal.
                My approach is centred around
                conversation, self-awareness,
                exploration and informed
                decision-making.
              </p>

              <div className="bracket-note">
                Small steps
                <br />
                <strong>
                  big shifts.
                </strong>{" "}
                <span>☺</span>
              </div>

            </div>

            <div className="pillars reveal delay-1">

              {pillars.map(
                ({
                  icon: Icon,
                  title,
                  copy,
                }) => (
                  <div
                    className="pillar"
                    key={title}
                  >

                    <div className="pillar-icon">
                      <Icon size={22} />
                    </div>

                    <div>
                      <h3>
                        {title}
                      </h3>

                      <p>
                        {copy}
                      </p>
                    </div>

                  </div>
                )
              )}

            </div>

          </div>
        </section>

        {/* =================================================
            CAREER GUIDANCE
        ================================================= */}

        <section
          id="careers"
          className="careers section-cream section-space"
        >
          <div className="container career-grid">

            <div className="career-copy reveal">

              <div className="section-kicker">
                Career guidance
              </div>

              <h2>
                There is more than
                <br />
                <em>
                  one way forward.
                </em>
              </h2>

              <p>
                From Biology and healthcare to
                research, education, environment
                and beyond, there are many possible
                paths.
              </p>

              <p>
                Career guidance is about understanding
                those possibilities and exploring the
                choices that connect with your interests,
                strengths and aspirations.
              </p>

              <div className="path-list">

                {careerPaths.map(
                  ({
                    icon: Icon,
                    label,
                    short,
                  }) => (
                    <div
                      className="path-chip"
                      key={label}
                    >

                      <Icon size={18} />

                      <span>
                        {label}
                        <small>
                          {short}
                        </small>
                      </span>

                    </div>
                  )
                )}

              </div>

              <a
                className="button button-yellow"
                href="#contact"
                onClick={(event) => {
                  event.preventDefault();
                  handleNav("#contact");
                }}
              >
                Explore Your Options
                <ArrowRight size={16} />
              </a>

            </div>

            {/* CAREER VISUAL */}

            <div className="career-visual reveal delay-2">

              <div className="career-rainbow">

                <div className="rainbow-arc arc-one" />
                <div className="rainbow-arc arc-two" />
                <div className="rainbow-arc arc-three" />

                <div className="career-center">

                  <span>
                    YOUR
                  </span>

                  <strong>
                    JOURNEY
                  </strong>

                  <small>
                    starts with
                    <br />
                    curiosity
                  </small>

                </div>

                <div className="career-dot dot-one">
                  <Microscope size={17} />
                </div>

                <div className="career-dot dot-two">
                  <Dna size={17} />
                </div>

                <div className="career-dot dot-three">
                  <Leaf size={17} />
                </div>

                <div className="career-dot dot-four">
                  <GraduationCap size={17} />
                </div>

              </div>

              <div className="career-caption">
                Different paths.
                <br />
                <em>
                  One meaningful journey.
                </em>
                <br />
                Let's explore <span>♡</span>
              </div>

            </div>

          </div>
        </section>

        {/* =================================================
            STORIES / GUIDANCE JOURNEY
        ================================================= */}

        {/* =================================================
    GOOGLE REVIEWS
================================================= */}

        <section
          id="stories"
          className="stories section-paper section-space"
        >
          <div className="container">

            <div className="section-heading-row reveal">

              <div>

                <div className="section-kicker">
                  Google Reviews
                </div>

                <h2>
                  What students
                  <br />
                  <em>and families say.</em>
                </h2>

              </div>

              <a
                className="text-button"
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                View all Google Reviews
                <ArrowUpRight size={16} />
              </a>

            </div>

            {/* GOOGLE RATING SUMMARY */}

            <div className="google-rating-summary reveal">

              <div className="google-rating-left">

                <div className="google-logo-mark">
                  G
                </div>

                <div>

                  <div className="google-rating-title">
                    Google Reviews
                  </div>

                  <div className="google-rating-stars">
                    ★★★★★
                  </div>

                </div>

              </div>

              <div className="google-rating-score">

                <strong>
                  {googleRating !== null
                    ? googleRating.toFixed(1)
                    : "—"}
                </strong>

                <span>
                  {googleReviewCount !== null
                    ? `${googleReviewCount} reviews`
                    : "Google reviews"}
                </span>

              </div>

            </div>

            {/* REVIEWS */}

            {reviewsLoading ? (

              <div className="google-reviews-loading">
                <div className="review-loading-card" />
                <div className="review-loading-card" />
                <div className="review-loading-card" />
              </div>

            ) : reviewsError ? (

              <div className="google-reviews-empty">

                <Sparkles size={25} />

                <h3>
                  See the latest reviews on Google
                </h3>

                <p>
                  We couldn't load the reviews right now.
                </p>

                <a
                  className="button button-yellow"
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Google Reviews
                  <ArrowUpRight size={16} />
                </a>

              </div>

            ) : googleReviews.length === 0 ? (

              <div className="google-reviews-empty">

                <Sparkles size={25} />

                <h3>
                  Reviews from Google
                </h3>

                <p>
                  Read the latest experiences directly on Google.
                </p>

                <a
                  className="button button-yellow"
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Google Reviews
                  <ArrowUpRight size={16} />
                </a>

              </div>

            ) : (

              <div className="testimonials-grid google-reviews-grid reveal delay-1">

                {googleReviews.map((review, index) => (

                  <article
                    className="testimonial google-review-card"
                    key={`${review.name}-${index}`}
                  >

                    {/* REVIEW HEADER */}

                    <div className="google-review-header">

                      {review.photoUri ? (

                        <img
                          className="google-review-avatar"
                          src={review.photoUri}
                          alt=""
                          loading="lazy"
                        />

                      ) : (

                        <div className="google-review-avatar google-review-avatar-fallback">
                          {review.name.charAt(0).toUpperCase()}
                        </div>

                      )}

                      <div className="google-review-author">

                        <strong>
                          {review.name}
                        </strong>

                        <span>
                          Google reviewer
                        </span>

                      </div>

                      <div className="google-review-badge">
                        ✓
                      </div>

                    </div>

                    {/* STARS */}

                    <div
                      className="google-review-stars"
                      aria-label={`${review.rating} out of 5 stars`}
                    >
                      {"★".repeat(Math.round(review.rating))}
                      {"☆".repeat(5 - Math.round(review.rating))}
                    </div>

                    {/* REVIEW TEXT */}

                    <p className="google-review-text">
                      {review.text}
                    </p>

                    {/* DATE */}

                    {review.relativePublishTimeDescription && (

                      <span className="google-review-date">
                        {review.relativePublishTimeDescription}
                      </span>

                    )}

                    {/* SOURCE */}

                    <div className="google-review-footer">

                      <span className="google-source">
                        <span className="google-g">
                          G
                        </span>
                        Google
                      </span>

                      {review.googleMapsUri && (

                        <a
                          href={review.googleMapsUri}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View review
                          <ArrowUpRight size={13} />
                        </a>

                      )}

                    </div>

                  </article>

                ))}

              </div>

            )}

            {/* GOOGLE ATTRIBUTION / ORDERING NOTICE */}

            <div className="google-reviews-note">

              <span>
                Reviews shown here are sourced from Google Maps
                and are displayed in Google's returned order.
              </span>

              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                View all reviews on Google
                <ArrowUpRight size={14} />
              </a>

            </div>

            <div className="stories-bottom-note">

              <Sparkles size={17} />

              <span>
                Every journey begins with a conversation.
              </span>

            </div>

          </div>
        </section>

        {/* =================================================
            WORKSHOPS & SEMINARS
        ================================================= */}

        <section
          id="workshops"
          className="workshops section-cream section-space"
        >
          <div className="container">

            <div className="workshops-heading reveal">

              <div className="section-kicker">
                Workshops & Seminars
              </div>

              <h2>
                Ideas become meaningful
                <br />
                <em>
                  when they are shared.
                </em>
              </h2>

              <p>
                From educational talks and
                professional seminars to school
                programmes and career conversations,
                every interaction is an opportunity
                to encourage curiosity, clarity and
                confident decision-making.
              </p>

            </div>

            <div className="workshops-gallery">

              {/* FEATURED IMAGE */}

              <article className="workshop-feature reveal">

                <div className="workshop-image">

                  <img
                    src="/images/seminars/seminar-01.jpg"
                    alt="Manisha Dhar at a professional event"
                    loading="lazy"
                  />

                  <div className="workshop-image-overlay" />

                </div>

                <div className="workshop-caption workshop-caption-yellow">

                  <div className="workshop-icon">
                    <Trophy size={22} />
                  </div>

                  <div>

                    <h3>
                      Professional Engagements
                    </h3>

                    <p>
                      Moments from educational
                      and professional events.
                    </p>

                  </div>

                  <ArrowUpRight
                    className="workshop-arrow"
                    size={20}
                  />

                </div>

              </article>

              {/* SECOND IMAGE */}

              <article className="workshop-card reveal delay-1">

                <div className="workshop-image">

                  <img
                    src="/images/seminars/seminar-02.png"
                    alt="Manisha Dhar at the RDX Global Summit 2022"
                    loading="lazy"
                  />

                  <div className="workshop-image-overlay" />

                </div>

                <div className="workshop-caption">

                  <div className="workshop-icon green">
                    <UsersRound size={21} />
                  </div>

                  <div>

                    <h3>
                      RDX Global Summit 2022
                    </h3>

                    <p>
                      A moment from a
                      professional summit.
                    </p>

                  </div>

                  <ArrowUpRight
                    className="workshop-arrow"
                    size={20}
                  />

                </div>

              </article>

              {/* FUTURE CONTENT */}

              <article className="workshop-future reveal delay-2">

                <div className="future-doodle">
                  <NotebookPen size={28} />
                </div>

                <div>

                  <span className="future-label">
                    More moments coming soon
                  </span>

                  <h3>
                    Workshops.
                    <br />
                    Talks.
                    <br />
                    <em>
                      Conversations.
                    </em>
                  </h3>

                  <p>
                    More photographs from school
                    programmes, seminars and
                    educational engagements will
                    be added here.
                  </p>

                </div>

              </article>

            </div>

            {/* WORKSHOP FOOTER */}

            <div className="workshops-footer reveal delay-2">

              <div className="workshop-topics">

                <span>
                  <GraduationCap size={19} />
                  School programmes
                </span>

                <i />

                <span>
                  <Lightbulb size={19} />
                  Career talks
                </span>

                <i />

                <span>
                  <UsersRound size={19} />
                  Workshops
                </span>

                <i />

                <span>
                  <NotebookPen size={19} />
                  Seminars
                </span>

              </div>

              <div className="workshops-footer-bottom">

                <p>
                  Creating spaces for meaningful
                  conversations.
                </p>

                <a
                  className="button button-yellow"
                  href="#contact"
                  onClick={(event) => {
                    event.preventDefault();
                    handleNav("#contact");
                  }}
                >
                  Invite Manisha
                  <ArrowRight size={16} />
                </a>

              </div>

            </div>

          </div>
        </section>

        {/* =================================================
            CONTACT
        ================================================= */}

        <section
          id="contact"
          className="contact section-cream section-space"
        >
          <div className="container contact-grid">

            <div className="contact-copy reveal">

              <div className="section-kicker">
                Connect with Manisha
              </div>

              <h2>
                Have a question or
                <br />
                <em>
                  want to start a conversation?
                </em>
              </h2>

              <p>
                Whether you are a student, parent,
                school or young professional, feel
                free to reach out about career
                guidance, education, workshops,
                counselling or student development.
              </p>

              <div className="contact-details">

                <a href="tel:+919230387647">
                  <Phone size={17} />
                  +91 92303 87647
                </a>

                <a href="mailto:manisha2016dhar@gmail.com">
                  <Mail size={17} />
                  manisha2016dhar@gmail.com
                </a>

                <span>
                  <MapPin size={17} />
                  Kolkata, West Bengal
                </span>

              </div>

              {/* SOCIAL LINKS */}

              <div className="socials">

                <a
                  href="https://www.instagram.com/road_to_the_rainbow/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>

                <a
                  href="https://www.youtube.com/@manishadharbiology"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                >
                  <Youtube size={18} />
                </a>

                <a
                  href="https://www.linkedin.com/in/manisha-dhar-602aaa198/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>

                <a
                  href="https://www.facebook.com/share/1DaMoYmr2d/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>

              </div>

            </div>

            {/* CONTACT FORM */}

            <form
              className="contact-form reveal delay-1"
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
              }}
            >

              {submitted ? (

                <div className="form-success">

                  <CheckCircle2 size={34} />

                  <h3>
                    Thank you for reaching out!
                  </h3>

                  <p>
                    Your message has been received.
                    Manisha will get back to you soon.
                  </p>

                  <button
                    type="button"
                    className="text-button"
                    onClick={() =>
                      setSubmitted(false)
                    }
                  >
                    Send another message
                  </button>

                </div>

              ) : (

                <>

                  <label>
                    <span>
                      Your name
                    </span>

                    <input
                      required
                      placeholder="How should I call you?"
                    />
                  </label>

                  <label>
                    <span>
                      Your email
                    </span>

                    <input
                      required
                      type="email"
                      placeholder="you@example.com"
                    />
                  </label>

                  <label>
                    <span>
                      I am interested in
                    </span>

                    <select
                      defaultValue=""
                      required
                    >
                      <option
                        value=""
                        disabled
                      >
                        Choose an area
                      </option>

                      <option>
                        Career guidance
                      </option>

                      <option>
                        Student counselling
                      </option>

                      <option>
                        Biology education
                      </option>

                      <option>
                        School workshop
                      </option>

                      <option>
                        Career awareness session
                      </option>

                      <option>
                        Other
                      </option>
                    </select>

                  </label>

                  <label>
                    <span>
                      Your message
                    </span>

                    <textarea
                      rows={4}
                      placeholder="Tell me a little about what you would like to discuss..."
                    />
                  </label>

                  <button
                    className="button button-yellow form-submit"
                    type="submit"
                  >
                    Send message
                    <Send size={16} />
                  </button>

                </>

              )}

            </form>

            <div className="contact-note">
              A small conversation
              <br />
              <strong>
                can lead to a meaningful tomorrow!
              </strong>{" "}
              <span>☺</span>
            </div>

          </div>
        </section>

      </main>

      {/* ===================================================
          FOOTER
      =================================================== */}

      <footer className="site-footer">

        <div className="container footer-top">

          <a
            className="brand"
            href="#home"
            onClick={(event) => {
              event.preventDefault();
              handleNav("#home");
            }}
          >
            <span className="brand-mark">
              <Leaf
                size={23}
                strokeWidth={2.2}
              />
            </span>

            <span className="brand-wordmark">
              Road to the <span>Rainbow</span>

              <small>
                Learn · Explore · Grow
              </small>
            </span>
          </a>

          <nav>

            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => {
                  event.preventDefault();
                  handleNav(item.href);
                }}
              >
                {item.label}
              </a>
            ))}

          </nav>

          <div className="footer-mantra">

            <Leaf size={20} />

            Find your direction.
            <br />

            <strong>
              Make it meaningful.
            </strong>

          </div>

        </div>

        <div className="container footer-bottom">

          <span>
            © {new Date().getFullYear()} Road to the Rainbow.
            All rights reserved.
          </span>

          <span>
            Manisha Dhar · Founder & Lead Career Navigator
          </span>

          <button
            className="back-top"
            onClick={() =>
              scrollToId("#home")
            }
            aria-label="Back to top"
          >
            ↑
          </button>

        </div>

      </footer>

    </div>
  );
}

export { Home };