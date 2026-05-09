import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Calendar, Target, Layers, Trophy } from 'lucide-react';
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
          <span className="course-phase">{course.phase || course.ageGroup}</span>
          <span className="course-duration">
            <Clock size={16} />
            {course.duration}
          </span>
        </div>
        
        <h3 className="course-title">{course.title}</h3>
        <p className="course-desc">{course.description}</p>
        {course.primaryOutcome && (
          <div className="course-outcome">
            <Trophy size={16} />
            <span>{course.primaryOutcome}</span>
          </div>
        )}
        
        <button className="btn btn-outline course-btn" onClick={() => setIsModalOpen(true)}>
          View Details
          <ArrowRight size={18} />
        </button>
      </div>
    </div>

    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="course-modal">
        <div className="course-modal-hero">
          <img src={course.image} alt={course.title} />
          <div className="course-modal-hero-overlay">
            <span>{course.phase}</span>
            <h2>{course.title}</h2>
          </div>
        </div>

        <div className="course-modal-body">
          <div className="course-modal-tags">
            <span>{course.ageGroup}</span>
            <span>{course.level}</span>
          </div>

          <section className="course-modal-overview">
            <h3>Course Overview</h3>
            <p>{course.overview || course.description}</p>
          </section>
          
          <div className="course-stat-grid">
            <div className="course-stat">
              <Clock className="text-primary" size={22} />
              <div>
                <strong>Duration</strong>
                <span>{course.duration}</span>
              </div>
            </div>
            <div className="course-stat">
              <Calendar className="text-primary" size={22} />
              <div>
                <strong>Class Frequency</strong>
                <span>{course.classFrequency || course.sessions || 'Live Classes'}</span>
              </div>
            </div>
          </div>

          {(course.goal || course.modules || course.primaryOutcome) && (
            <div className="course-detail-list">
              {course.goal && (
                <div className="course-detail-item">
                  <Target className="text-primary" size={20} />
                  <div>
                    <strong>Goal</strong>
                    <p>{course.goal}</p>
                  </div>
                </div>
              )}
              {course.modules && (
                <div className="course-detail-item">
                  <Layers className="text-primary" size={20} />
                  <div>
                    <strong>Modules</strong>
                    <p>{course.modules}</p>
                  </div>
                </div>
              )}
              {course.primaryOutcome && (
                <div className="course-detail-item">
                  <Trophy className="text-primary" size={20} />
                  <div>
                    <strong>Primary Outcome</strong>
                    <p>{course.primaryOutcome}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="course-modal-actions">
          <Link to="/trial" className="btn btn-primary flex-grow">
            Book Free Trial
          </Link>
          <button className="btn btn-outline flex-grow" onClick={() => setIsModalOpen(false)}>
            Close
          </button>
        </div>
      </div>
    </Modal>
    </>
  );
};

export default CourseCard;
