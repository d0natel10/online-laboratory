import React, { useState, useEffect } from 'react';
import '../styles/profile.css';
import { getUserById } from '../components/Api';

// Шаблоны для всех лабораторных работ
const labTemplates = {
  1: {
    title: "Равномерное движение",
    columns: ["№ опыта", "Путь в долях", "Путь s, м", "Время t, с", "Скорость v, м/с"],
    fractions: ["1", "½", "⅓", "¼"],
    calculationTitle: "v = s/t",
    getRowData: (row) => [row.path, row.time, row.speed]
  },
  2: {
    title: "Равноускоренное движение",
    columns: ["№ опыта", "Путь s, м", "Время t, с", "Время t, с", "Число колебаний N"],
    calculationTitle: "a = (v-v₀)/t",
    getRowData: (row) => [row.path, row.time, row.speed, row.acceleration]
  },
  3: {
    title: "Свободное падение",
    columns: ["№ опыта", "Путь s, м", "Время t, с", "Время t, с", "Число колебаний N"],
    calculationTitle: "g = 2h/t²",
    getRowData: (row) => [row.height, row.time, row.speed]
  },
  4: {
    title: "Движение под углом",
    columns: ["№ опыта", "Дальность L, м", "Высота h, м", "Время t, с", "Угол α, град"],
    fractions: ["1", "½", "⅓", "¼"],
    calculationTitle: "v₀ = L/(t·cosα)",
    getRowData: (row) => [row.distance, row.height, row.time, row.angle]
  },
  5: {
    title: "Колебания маятника",
    columns: ["№ опыта", "Длина l, м", "Период T, с", "Частота ν, Гц"],
    fractions: ["1", "½", "⅓", "¼"],
    calculationTitle: "T = 2π√(l/g)",
    getRowData: (row) => [row.length, row.period, row.frequency]
  },
  6: {
    title: "Закон сохранения энергии",
    columns: ["№ опыта", "Высота h, м", "Скорость v, м/с", "Кинетическая энергия, Дж", "Потенциальная энергия, Дж"],
    fractions: ["1", "½", "⅓", "¼"],
    calculationTitle: "mgh = mv²/2",
    getRowData: (row) => [row.height, row.speed, row.kinetic, row.potential]
  }
};

const ProfilePage = ({ user, onUpdateUser }) => {
    const [selectedLab, setSelectedLab] = useState(null);
    const [formData, setFormData] = useState({ 
        email: user?.email || '', 
        login: user?.login || '' 
    });

    useEffect(() => {
        if (user) {
            setFormData({
                email: user.email,
                login: user.login
            });
        }
    }, [user]);

    const handleViewAnswers = (lab) => {
        // Нормализуем данные перед отображением
        const template = labTemplates[lab.labId] || labTemplates[1];
        const normalizedLab = {
            ...lab,
            measurements: lab.measurements.map(measurement => {
                const values = template.getRowData(measurement);
                return {
                    path: values[0] || '-',
                    time: values[1] || '-',
                    speed: values[2] || '-',
                    ...measurement
                };
            })
        };
        setSelectedLab(normalizedLab);
    };

    const renderLabDetails = (lab) => {
        const template = labTemplates[lab.labId] || labTemplates[1];
        
        return (
            <>
                <h4>{lab.title || template.title}</h4>
                
                {lab.measurements && (
                    <>
                        <h5>Таблица измерений:</h5>
                        <table>
                            <thead>
                                <tr>
                                    {template.columns.map((col, idx) => (
                                        <th key={idx}>{col}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {lab.measurements.map((row, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{template.fractions[i] || "-"}</td>
                                        {template.getRowData(row).map((value, j) => (
                                            <td key={j}>{value || "-"}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
                
                {lab.calculation && (
                    <div className="lab-calculation">
                        <h5>Расчеты:</h5>
                        <p>{template.calculationTitle} = {lab.calculation}</p>
                    </div>
                )}
                
                {lab.conclusion && (
                    <div className="lab-conclusion">
                        <h5>Вывод:</h5>
                        <p>{lab.conclusion}</p>
                    </div>
                )}
            </>
        );
    };

    return (
        <div>
            <main className="profile-page">
                <section className="user-info">
                    <h2>Профиль</h2>
                    <p><strong>ФИО:</strong> {user.lastName} {user.firstName}</p>
                    <p><strong>Класс:</strong> {user.classNumber} класс</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Логин:</strong> {user.login}</p>
                </section>

                <section className="completed-labs">
                    <h3>Пройденные лабораторные работы:</h3>
                    {user.completedLabs && user.completedLabs.length > 0 ? (
                        <ul>
                            {user.completedLabs.map((lab, index) => (
                                <li key={index}>
                                    <button onClick={() => handleViewAnswers(lab)}>
                                        {lab.title || labTemplates[lab.labId]?.title || `Лабораторная ${lab.labId}`}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Вы еще не прошли ни одной лабораторной работы</p>
                    )}
                </section>

                {selectedLab && (
                    <div className="modal">
                        <div className="modal-content">
                            {renderLabDetails(selectedLab)}
                            <button onClick={() => setSelectedLab(null)}>Закрыть</button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ProfilePage;