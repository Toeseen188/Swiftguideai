import React from 'react';
import RouteCard from './RouteCard.jsx';

function RouteList({ routes, selectedIndex, onSelect }) {
  if (!routes || routes.length === 0) {
    return (
      <div className="mt-4 text-xs text-slate-600">
        We could not find a safe route. Call emergency services: <strong>112</strong>.
      </div>
    );
  }

  return (
    <div className="space-y-3 mt-2">
      {routes.map((route, index) => (
        <RouteCard
          key={index}
          route={route}
          index={index}
          isSelected={index === selectedIndex}
          onSelect={() => onSelect(index)}
        />
      ))}
    </div>
  );
}

export default RouteList;

