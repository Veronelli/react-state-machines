import React from 'react';
import { Welcome } from '../Components/Welcome';
import { Search } from '../Components/Search';
import { Passengers } from '../Components/Passengers';
import { Tickets } from '../Components/Tickets';
import './StepsLayout.css';

export const StepsLayout = ({ state, send }) => {
  const renderContent = () => {
    if(state.matches('initial')) return <Welcome send={send}/>;
    if(state.matches('search')) return <Search send={send} context={state.context}/>;
    if(state.matches('tickets')) return <Tickets send={send} context={state.context}/>;
    if(state.matches('passengers')) return <Passengers send={send} />;
    return null;
  };
  console.log(state);

  return (
    <div className='StepsLayout'>
      {renderContent()}
    </div>
  );
}; 