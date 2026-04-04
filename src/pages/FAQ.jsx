import React from 'react';
import faqsData from '../data/faqs.json';
import Accordion from '../components/Accordion';

const FAQ = () => {
  return (
    <div className="faq-page page-padding section-padding">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="section-title">Frequently Asked Questions</h1>
          <p className="text-muted text-lg">
            Everything you need to know about the product and billing.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion items={faqsData} />
        </div>
        
        <div className="text-center mt-12 p-8 bg-light-green rounded-xl max-w-3xl mx-auto border border-color">
          <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
          <p className="text-muted mb-4">Can't find the answer you're looking for?</p>
          <a href="/contact" className="btn btn-primary">Contact Support</a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
