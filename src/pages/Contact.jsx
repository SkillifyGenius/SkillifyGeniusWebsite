import React, { useState } from 'react';
import { Mail, Phone, Globe, Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        e.target.reset();
      } else {
        setStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setStatus('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page page-padding section-padding">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="section-title">Get in Touch</h1>
          <p className="text-muted text-lg">
            Have questions about our curriculums or platform? Our educational counselors are here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="contact-info col-span-1">
            <div className="card h-full flex flex-col gap-6 bg-primary text-white contact-card">
              <h3>Contact Information</h3>
              <p className="text-white-80">
                Fill out the form and our team will get back to you within 24 hours.
              </p>
              
              <div className="info-item mt-4">
                <Phone size={20} />
                <span>+880 1860 99 88 88</span>
              </div>
              <div className="info-item">
                <Mail size={20} />
                <span>skillifygenius@gmail.com</span>
              </div>
              <div className="info-item">
                <Globe size={20} />
                <span>Online Classes<br/> skillifygenius.com</span>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper md:col-span-2">
            <form className="card trial-form" onSubmit={handleSubmit}>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="form-group border-none">
                  <label htmlFor="fname">First Name</label>
                  <input type="text" id="fname" name="First Name" placeholder="John" required />
                </div>
                <div className="form-group border-none">
                  <label htmlFor="lname">Last Name</label>
                  <input type="text" id="lname" name="Last Name" placeholder="Doe" required />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="form-group border-none">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="Email" placeholder="john@example.com" required />
                </div>
                <div className="form-group border-none">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" name="Phone Number" placeholder="(555) 000-0000" />
                </div>
              </div>

              <div className="form-group mt-4 border-none">
                <label>What's your inquiry about?</label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2 font-normal cursor-pointer text-muted">
                    <input type="radio" name="Topic" value="general" defaultChecked /> General
                  </label>
                  <label className="flex items-center gap-2 font-normal cursor-pointer text-muted">
                    <input type="radio" name="Topic" value="courses" /> Courses
                  </label>
                  <label className="flex items-center gap-2 font-normal cursor-pointer text-muted">
                    <input type="radio" name="Topic" value="support" /> Tech Support
                  </label>
                </div>
              </div>

              <div className="form-group mt-6 border-none">
                <label htmlFor="msg">Message</label>
                <textarea id="msg" name="Message" rows="4" placeholder="Write your message..." required></textarea>
              </div>

              {status && (
                <div className={`mt-4 p-3 rounded ${status.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {status}
                </div>
              )}

              <button type="submit" className="btn btn-primary mt-6 flex ml-auto" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
                {!loading && <Send size={18} />}
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Contact;
