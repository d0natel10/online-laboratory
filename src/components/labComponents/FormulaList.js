import React from 'react';

const FormulaList = ({ formulas }) => {
    return (
        <div className="formula-list">
            <h4>Основные формулы:</h4>
            <ul>
                {formulas.map((section, index) => {
                    // Разделяем заголовок (например, "1. Общая формула для перемещения:")
                    // и содержимое (остальные строки)
                    const [title, ...content] = section.split('\n');
                    return (
                        <li key={index}>
                            <strong>{title}</strong> {/* Заголовок */}
                            <ul>
                                {content.map((item, idx) => (
                                    <li key={idx}>{item}</li> // Вложенный список
                                ))}
                            </ul>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default FormulaList;