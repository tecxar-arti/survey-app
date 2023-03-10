import React from 'react';
import '../../../assets/scss/components/app-loader.scss';

export default function SpinnerComponent() {
  return (
    <div className="fallback-spinner">
      <div className="loading">
        <div className="effect-1 effects" />
        <div className="effect-2 effects" />
        <div className="effect-3 effects" />
      </div>
    </div>
  );
}
