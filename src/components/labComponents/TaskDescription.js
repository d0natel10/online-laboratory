import React from 'react';

const TaskDescription = ({ taskNumber, totalTasks, question }) => {
    return (
        <div className="task-description">
            <h4>Задание {taskNumber} из {totalTasks}</h4>
            <p>{question}</p>
        </div>
    );
};

export default TaskDescription;