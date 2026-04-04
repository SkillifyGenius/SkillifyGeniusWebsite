import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Activity, Calendar } from 'lucide-react';
import Modal from './Modal';
import './CourseCard.css';

const CourseCard = ({ course }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    <div className="card course-card">
      <div className="course-image">
        <img src={course.image} alt={course.title} />
        <span className="course-level">{course.level}</span>
      </div>
      
      <div className="course-content">
        <div className="course-meta">
          <span className="course-age">{course.ageGroup}</span>
          <span className="course-duration">
            <Clock size={16} />
            {course.duration}
          </span>
        </div>
        
        <h3 className="course-title">{course.title}</h3>
        <p className="course-desc">{course.description}</p>
        
        <button className="btn btn-outline course-btn" onClick={() => setIsModalOpen(true)}>
          View Details
          <ArrowRight size={18} />
        </button>
      </div>
    </div>

    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="modal-header">
        <h2 className="modal-title">{course.title}</h2>
        <div className="modal-meta mt-2 mb-4">
          <span className="course-age">{course.ageGroup}</span>
          <span className="course-level text-primary bg-light-green px-2 py-1 rounded-md text-sm">{course.level}</span>
        </div>
      </div>
      
      <img src={course.image} alt={course.title} style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1.5rem' }} />
      
      <div className="modal-body">
        <h4 className="font-bold mb-2">Course Overview</h4>
        <p>{course.overview || course.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="flex items-center gap-2 text-muted">
            <Clock className="text-primary" size={20} />
            <div>
              <div className="font-semibold text-main">Duration</div>
              <span>{course.duration}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-muted">
            <Calendar className="text-primary" size={20} />
            <div>
              <div className="font-semibold text-main">Sessions</div>
              <span>{course.sessions || 'Live Classes'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-8 pt-6 border-t border-color" style={{ borderTop: '1px solid var(--pk-border)' }}>
        <Link to="/trial" className="btn btn-primary flex-grow">
          Book Free Trial
        </Link>
        <button className="btn btn-outline flex-grow" onClick={() => setIsModalOpen(false)}>
          Close
        </button>
      </div>
    </Modal>
    </>
  );
};

export default CourseCard;
