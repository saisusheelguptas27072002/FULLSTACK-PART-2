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
        <Total parts={props.parts}></Total>
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
  
  const Total = (props) => {
    const reducer = (s, p) => {
      return s + p.exercises
    }
    const total = props.parts.reduce(reducer, 0)
  
    return (
      <div>
        <b>total of {total} exercises</b>
      </div>
    )
  }
  
  export default Course