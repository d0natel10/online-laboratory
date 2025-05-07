import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LabCard = ({ id, title, description, image }) => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate(`/${id}`);
    };

    return (
        <motion.div 
            className="lab-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.03 }}
        >
            <img src={image} alt={title} />
            <div className="lab-card-content">
                <h4>{title}</h4>
                <p>{description}</p>
            </div>
            <button className="start-btn" onClick={handleStart}>
                    Начать
            </button>
        </motion.div>
    );
};

export default LabCard;