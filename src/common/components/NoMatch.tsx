import React from 'react';

const NoMatch = ({ location }: any) => {
  return (
    <div>
      <h3>
        No route matches <code>{location.pathname}</code>
      </h3>
    </div>
  );
};

export default NoMatch;
