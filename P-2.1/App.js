import React from 'react';
import Course from './components/Course';

const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                },
            ]
        }, 
        
    ];
  
    return (
        <div>
            
            {courses.map(course => <Course course={course} key={course.id} />)}
        </div>
    );
};
export default App;