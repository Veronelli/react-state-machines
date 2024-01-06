import React from "react";
import "./Tickets.css";

export const Tickets = ({ send, context }) => {
  const finish = () => {
    send("FINISH");
  };

  return (
    <div className="Tickets">
      <p className="Tickets-description description">
        Gracias por volar con book a fly 💚
      </p>
      {context.passengers.map((passanger) => (
        <div className="Tickets-ticket">
          <div className="Tickets-country">Colombia</div>
          <div className="Tickets-passengers">
            <div>
              <p>Tripulante: {passanger}</p>
            </div>
            <span>✈</span>
          </div>
        </div>
      ))}
      <button onClick={finish} className="Tickets-finalizar button">
        Finalizar
      </button>
    </div>
  );
};
