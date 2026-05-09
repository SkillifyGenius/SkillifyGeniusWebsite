import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, PlayCircle, Star, ShieldCheck, Zap, GraduationCap, Award, Book, MonitorPlay, BookOpen, Clock } from 'lucide-react';
import siteData from '../data/siteContent.json';
import coursesData from '../data/courses.json';
import reviewsData from '../data/reviews.json';
import blogData from '../data/blog.json';
import offerBannerData from '../data/offerBanner.json';
import CourseCard from '../components/CourseCard';
import Modal from '../components/Modal';
import './Home.css';

const Home = () => {
  const { hero, trust, path, benefits, highlights, quickSkill, finalCta } = siteData;
  const activeOffer = offerBannerData.find((offer) => offer.enabled);
  const [activeBlog, setActiveBlog] = useState(null);

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <section className="hero section-padding">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="bg-white rounded-full px-2 py-1 text-xs text-orange-500 uppercase tracking-widest mr-2 shadow-sm border border-orange-100">New</span>
              The #1 Problem-Solving & AI Curriculum
            </div>
            <h1>{hero.headline}</h1>
            <p className="hero-subtext">{hero.subHeadline}</p>
            <div className="hero-actions">
              <Link to="/trial" className="btn btn-primary hero-btn">
                {hero.primaryCTA}
                <ArrowRight size={20} />
              </Link>
              <button className="btn btn-outline hero-btn">
                <PlayCircle size={20} />
                {hero.secondaryCTA}
              </button>
            </div>
            
            {/* 2. Trust Micro-Section */}
            <div className="trust-micro mt-8">
              <div className="trust-profiles">
                <div className="avatar bg-blue"></div>
                <div className="avatar bg-purple"></div>
                <div className="avatar bg-green"></div>
                <div className="avatar bg-orange text-white">+500</div>
              </div>
              <p className="trust-text">
                <span className="stars">★★★★★</span> <br/>
                {trust.text}
              </p>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="hero-image-wrapper card">
              <img src="/images/hero_3d.png" alt="3D illustration of student learning to code" />
              <div className="floating-card stats-card">
                <ShieldCheck className="text-primary" size={24} />
                <div>
                  <strong>Safe & Secure</strong>
                  <span>Parent-approved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {activeOffer && (
        <section className="offer-banner-section">
          <div className="container">
            <div className="offer-banner">
              <div className="offer-banner-icon">
                <Zap size={26} />
              </div>
              <div className="offer-banner-content">
                <span>{activeOffer.eyebrow}</span>
                <h2>{activeOffer.title}</h2>
                <p>{activeOffer.description}</p>
              </div>
              <div className="offer-banner-action">
                {activeOffer.note && <small>{activeOffer.note}</small>}
                <Link to={activeOffer.ctaLink || '/trial'} className="btn btn-primary">
                  {activeOffer.ctaText || 'Claim Offer'}
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Path / How It Works */}
      <section className="pathway bg-white section-padding">
        <div className="container text-center">
          <h2 className="section-title">{path.title}</h2>
          <div className="path-grid mt-8 grid md:grid-cols-3 gap-8">
            {path.steps.map((step, idx) => (
              <div key={step.id} className="path-step">
                <div className="step-number">{idx + 1}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Benefits Section */}
      <section className="benefits section-padding">
        <div className="container benefits-container">
          <div className="benefits-image card">
            <img src="/images/benefits_3d.png" alt="3D Coding concepts" />
          </div>
          <div className="benefits-content">
            <Zap className="text-primary mb-4" size={40} />
            <h2 className="section-title text-left">{benefits.title}</h2>
            <ul className="benefits-list mt-8">
              {benefits.list.map((item, idx) => (
                <li key={idx} className="benefit-item">
                  <Check className="text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Live Course Highlights */}
      <section className="highlights bg-white section-padding">
        <div className="container text-center">
          <h2 className="section-title">{highlights.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {highlights.features.map((feature, idx) => (
              <div key={idx} className="feature-card card text-left">
                <div className="feature-icon mb-4">
                  <Star className="text-primary" />
                </div>
                <h3>{feature.title}</h3>
                <p className="text-muted mt-2">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Promotional Blocks (Stacked Blobs) */}
      <section className="promotional-blocks section-padding bg-white">
        <div className="container">
          {quickSkill.map((promo, idx) => (
            <div key={promo.id} className={`promo-row ${idx % 2 !== 0 ? 'reverse' : ''}`}>
              <div className="promo-text text-left flex flex-col items-start gap-2">
                <h2 className="section-title text-left mb-4" style={{ fontSize: '2rem' }}>{promo.title}</h2>
                <p className="text-muted text-lg mb-8">{promo.subtitle}</p>
                <Link to="/courses" className={`btn ${promo.type === 'primary' ? 'btn-outline' : 'btn-primary'} mt-2`}>
                  {promo.ctaText}
                </Link>
              </div>
              <div className="promo-visual">
                <div className="promo-img-box">
                  <img src={idx === 0 
                    ? "/images/promo_1_3d.png" 
                    : "/images/promo_2_3d.png"} 
                    alt={promo.title} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Courses Preview Section */}
      <section className="courses-preview bg-white section-padding">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title text-left m-0">Featured Courses</h2>
            <Link to="/courses" className="text-primary font-semibold flex items-center gap-2">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coursesData.slice(0, 4).map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. Reviews Section */}
      <section className="reviews section-padding bg-light-green">
        <div className="container text-center">
          <h2 className="section-title">What Parents & Students Say</h2>
          <div className="reviews-marquee-wrapper mt-8">
            <div className="reviews-marquee-content">
              {[...reviewsData, ...reviewsData].map((review, idx) => (
                <div key={`${review.id}-${idx}`} className="review-card card text-left">
                  <div className="stars text-orange-500 mb-4">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </div>
                  <p className="review-text">"{review.text}"</p>
                  <div className="review-author mt-4">
                    <div className="font-bold text-main">{review.name}</div>
                    <div className="text-sm text-muted">{review.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. From Our Blog */}
      <section className="home-blog section-padding bg-base">
        <div className="container">
          <div className="flex justify-between items-center max-w-5xl mx-auto" style={{ marginBottom: '3rem' }}>
            <h2 className="section-title text-left m-0">From Our Blog</h2>
            {blogData.length > 6 && (
              <Link to="/resources" className="text-primary font-semibold flex items-center gap-2 hover:underline">
                View All <ArrowRight size={16} />
              </Link>
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {blogData.slice(0, 6).map((post, idx) => {
              const borderColors = ['#f43f5e', '#8b5cf6', '#16a34a', '#f97316', '#3b82f6', '#ec4899'];
              const Icons = [GraduationCap, Award, Book, MonitorPlay, Zap, Star];
              const IconComp = Icons[idx % Icons.length];
              const color = borderColors[idx % borderColors.length];
              return (
                <div key={post.id} className="blog-preview-card card flex items-center gap-6 text-left" style={{ borderTop: `4px solid ${color}`}}>
                  <div className="blog-preview-icon flex-shrink-0 flex items-center justify-center rounded-full shadow-md" style={{ backgroundColor: color, width: '60px', height: '60px' }}>
                    <IconComp size={28} color="#ffffff" />
                  </div>
                  <div className="blog-preview-content flex flex-col justify-center">
                    <h4 className="font-bold text-main leading-tight mb-2 text-lg">{post.title}</h4>
                    <button onClick={() => setActiveBlog(post)} className="text-blue-600 font-semibold text-sm hover:underline cursor-pointer p-0 text-left" style={{background: 'transparent', border: 'none'}}>View Article</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blog Details Modal */}
      <Modal isOpen={!!activeBlog} onClose={() => setActiveBlog(null)}>
        {activeBlog && (
          <>
            <div className="modal-header">
              <span className="blog-tag text-primary bg-light-green inline-block mb-4 px-3 py-1 rounded-full text-sm font-semibold">{activeBlog.date}</span>
              <h2 className="modal-title">{activeBlog.title}</h2>
              <div className="modal-meta mt-2">
                <span className="flex items-center gap-1"><BookOpen size={16} /> {activeBlog.author}</span>
                <span className="flex items-center gap-1"><Clock size={16} /> {activeBlog.readTime}</span>
              </div>
            </div>
            
            <div className="modal-body">
              {activeBlog.content ? (
                activeBlog.content.map((paragraph, i) => (
                  <p key={i} className={`text-lg leading-relaxed mb-4 ${activeBlog.isPremium && i === 0 ? 'p-6 bg-light-green rounded-xl text-center text-primary border border-color my-4 font-bold' : ''}`}>
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-lg leading-relaxed mb-6">{activeBlog.preview}</p>
              )}
            </div>
          </>
        )}
      </Modal>

      {/* 10. Final CTA Section */}
      <section className="final-cta section-padding text-center">
        <div className="container cta-container card bg-primary text-white">
          <h2>{finalCta.title}</h2>
          <p className="mt-4 mb-8 text-white-80 max-w-2xl mx-auto">{finalCta.subtitle}</p>
          <Link to="/trial" className="btn bg-white text-primary cta-btn">
            {finalCta.ctaText}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
