import React from 'react';
import UniformMotionVisualization from './UniformMotionVisualization';

const Visualization = ({ type }) => {
    const renderVisualization = () => {
        switch (type) {
            case 'lab1':
                return <UniformMotionVisualization/>;
            case 'lab2':
                return '/accelerated_motion.gif';
            case 'lab3':
                return '/free_fall.gif';
            default:
                return '/default.gif';
        }
    };

    return (
        <div className="visualization">
            {renderVisualization()}
        </div>
    );
};

export default Visualization;