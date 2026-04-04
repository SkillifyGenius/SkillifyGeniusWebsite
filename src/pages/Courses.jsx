import React, { useState } from 'react';
import coursesData from '../data/courses.json';
import CourseCard from '../components/CourseCard';
import './Courses.css';

const Courses = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Extract unique categories
  const categories = ['All', ...new Set(coursesData.map(c => c.category))];

  const filteredCourses = activeCategory === 'All' 
    ? coursesData 
    : coursesData.filter(c => c.category === activeCategory);

  return (
    <div className="courses-page page-padding section-padding">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="section-title">Explore Our Pathfinders</h1>
          <p className="text-muted text-lg">
            Discover a curated selection of coding courses designed exactly for your child's age group and learning style.
          </p>
        </div>

        {/* Filters */}
        <div className="filters-container mt-8 mb-8">
          <div className="filter-scroll">
            {categories.map(category => (
              <button 
                key={category} 
                onClick={() => setActiveCategory(category)}
                className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        
        {filteredCourses.length === 0 && (
          <div className="text-center py-12 text-muted">
            No courses found for this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
