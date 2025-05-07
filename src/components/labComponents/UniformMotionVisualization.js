import React from 'react';
import '../../styles/LabPage.css';

const UniformMotionVisualization = () => {
    return (
        <div className="visualization-container">
            {/* Фон */}
            <div className="car_background"></div>
            
            {/* Машинка */}
            <div className="car"></div>
        </div>
    );
};

export default UniformMotionVisualization;