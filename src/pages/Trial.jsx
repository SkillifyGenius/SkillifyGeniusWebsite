import React from 'react';
import { Link } from 'react-router-dom';
import './Trial.css';

const Trial = () => {
  return (
    <div className="trial-page section-padding page-padding">
      <div className="container">
        
        <div className="trial-header text-center mb-12">
          <h1 className="section-title">Schedule Your Session</h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Experience our unique teaching methodology firsthand. Fill out the form below to book a completely free, personalized trial session for your child.
          </p>
        </div>

        {/* Embedded Google Form */}
        <div className="google-form-container mx-auto mb-20">
          <div className="iframe-wrapper card">
            <iframe 
              src="https://docs.google.com/forms/d/e/1FAIpQLSc_gjUD0WgK_XdPGsc0ReJWzAT7vMqPst0JSAi4-CMEsIkqBQ/viewform?embedded=true" 
              width="100%" 
              height="2400" 
              frameBorder="0" 
              marginHeight="0" 
              marginWidth="0"
              title="Free Trial Booking Form"
              className="native-iframe"
            >
              Loading…
            </iframe>
          </div>
        </div>

        {/* Promotional Cards Section */}
        <div className="promo-sections mt-16 max-w-6xl mx-auto">
          
          {/* Promo Card 1 */}
          <div className="promo-card mb-20 grid md:grid-cols-2 gap-12 items-center">
            <div className="promo-content">
              <h2 className="text-3xl font-bold mb-4 text-primary">Short on time?</h2>
              <p className="text-muted text-lg mb-8">
                Learn a highly sought-after technical skill within exactly an hour. Our fast-track modules are designed for immediate impact.
              </p>
              <Link to="/courses" className="btn btn-outline">
                Browse 1-Hour Courses
              </Link>
            </div>
            <div className="promo-image-wrapper right-image">
              <div className="shape shape-purple bg-primary-hover"></div>
              <div className="shape shape-green bg-primary-light"></div>
              <div className="shape shape-blue bg-secondary"></div>
              <img src="/images/promo_1_3d.png" alt="3D illustration of highly sought-after skill" className="main-image shadow-xl relative z-10" />
            </div>
          </div>

          {/* Promo Card 2 */}
          <div className="promo-card grid md:grid-cols-2 gap-12 items-center">
            <div className="promo-image-wrapper left-image order-2 md:order-1">
              <div className="shape shape-blue-large bg-primary-light"></div>
              <div className="shape shape-green-top bg-primary-hover"></div>
              <div className="shape shape-purple-bottom bg-secondary"></div>
              <img src="/images/promo_2_3d.png" alt="3D Pathfinder Robot" className="main-image shadow-xl relative z-10" />
            </div>
            <div className="promo-content order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-4 text-primary">Not sure where to start?</h2>
              <p className="text-muted text-lg mb-8">
                Take our interactive pathfinder quiz to discover your optimal trajectory in the world of technology and coding.
              </p>
              <button className="btn btn-primary" onClick={() => alert('Pathfinder Quiz Coming Soon!')}>
                Take the Quiz
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Trial;
