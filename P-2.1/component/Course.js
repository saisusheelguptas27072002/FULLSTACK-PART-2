import React from 'react'


  const Course = (props) => {
    return (
      <div>
        <Header name={props.course.name}/>
        <Content parts={props.course.parts}/>
      </div>
    )
  }
  
  const Header = (props) => {
    return (
      <div>
        <h1>{props.name}</h1>
      </div>
    )
  }

  const Content = (props) => {
    return (
      <div>
        {props.parts.map(part => 
        <div key={part.id}> 
            <Part name={part.name} exercises={part.exercises}/> 
        </div>)}
       
      </div>
    )
  }
  
  const Part= (props) => {
    return (
      <p>
        {props.name}: {props.exercises}
      </p>
    )
  }
  
  
  
  export default Course