import React from "react";

const Card = (props) => {
  return(

    <section className="card">

      <h4>{props.data.name}</h4>

        <div className="card__sprite">
          <p>Default form:</p>
          <img src={props.data.sprites.front_default} alt={props.data.name} />
        </div>

      <div className="card__types">
        <p>Type:</p>
        
        <p> {props.data.types[0].type.name} </p>

        { props.data.types[1] 
        ? <p> {props.data.types[1].type.name} </p> 
        : [] } 

      </div>

    </section>
  )
}

export default Card;
