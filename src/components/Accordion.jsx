import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './Accordion.css';

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const onTitleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="accordion-container">
      {items.map((item, index) => {
        const active = index === activeIndex ? 'active' : '';

        return (
          <div key={item.id || index} className={`accordion-item ${active}`}>
            <div 
              className="accordion-title" 
              onClick={() => onTitleClick(index)}
              role="button"
              tabIndex="0"
              onKeyPress={(e) => {
                if (e.key === 'Enter') onTitleClick(index);
              }}
            >
              <h3>{item.question}</h3>
              <ChevronDown className={`accordion-icon ${active}`} />
            </div>
            <div className="accordion-content">
              <div className="accordion-text">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
