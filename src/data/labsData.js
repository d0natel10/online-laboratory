const labsData = {
   "1": {
        title: "Равномерное прямолинейное движение",
        description: "Движение, при котором точка (тело), двигаясь по прямой в одном направлении, за любые равные промежутки времени проходит равные пути, называется равномерным прямолинейным движением. Иными словами, при равномерном прямолинейном движении перемещения, совершаемые точкой (телом) в любые равные промежутки времени, равны между собой. Скорость равномерного прямолинейного движения постоянна по величине и направлению. Для характеристики движения точки (тела) выбирается система координат, в которой записывается уравнение, описывающее траекторию движения точки (тела)в зависимости от времени. Это уравнение называется уравнением движения. Как правило, выбирается прямоугольная система координат.",
        visualization: "lab1",
        formulas: [
            "1. Общая формула для перемещения:\nΔs = v · Δt",
            "2. Средняя скорость:\nv = const\nv = Δs / Δt",
            "3. Проецирование на оси координат:\nΔx = vx · Δt\nΔy = vy · Δt",
            "4. Координатная форма:\nx1 - x0 = vx · Δt\ny1 - y0 = vy · Δt"
        ],
        tasks: [
            {
                question: "Можно ли считать равномерным движение автомобиля, едущего по прямому шоссе, если в начальный момент времени показания одометра (счетчик пробега, подсчитывающий число оборотов, совершаемых колесом во время движения) были 35765 км, через пять минут - 35770 км, через 10 минут - 35775 км, через 15 минут - 35780 км и так далее?",
                answer: "Да",
                type: "checkbox", // Тип вопроса: чекбоксы
                options: ["Да", "Нет"]
            },
            {
                question: "Лифт жилого дома поднимается равномерно со скоростью 1,5 м/с. Считая высоту каждого этажа 3 м, напишите уравнение его движения и вычислите время подъема с 3 на 16 этаж.",
                answer: "39", // Время в секундах
                type: "text" // Тип вопроса: текстовый ввод
            },
            {
                question: "Определите координаты равномерно катящегося шарика в момент времени t, равный 5 секундам, если в ноль времени он находился в нуле координат. Шарик катится со скоростью 2 см/с по прямому желобу, расположенному под углом 30 градусов к оси ординат (ось Y). ОТВЕТ ЗАПИШИТЕ В ВИДЕ: x=95.6, y=35 ЧЕРЕЗ ЗАПЯТУЮ И ПРОБЕЛ",
                answer: "x=5, y=8.66", // Координаты x и y
                type: "text"
            }
        ]
    },
    "2": {
        title: "Анализ равноускоренного движения тел",
        description: "Изучение характеристик равноускоренного движения",
        visualization: "lab2",
        formulas: ["v = v0 + at", "s = v0t + (at²)/2", "a = Δv / Δt"],
        tasks: [
            { question: "Лыжник начинает движение со скоростью 2 м/с и ускоряется до 5 м/с за 3 секунды. Найдите ускорение.", answer: "1" },
            { question: "Какое расстояние пройдет лыжник за первые 4 секунды?", answer: "16" },
            { question: "Какова будет скорость лыжника через 5 секунд?", answer: "7" }
        ]
    },
    "3": {
        title: "Исследование свободного падения тел",
        description: "Изучение характеристик свободного падения",
        visualization: "lab3",
        formulas: ["h = gt²/2", "v = gt", "g ≈ 9.8 м/с²"],
        tasks: [
            { question: "Сколько времени будет падать тело с высоты 20 метров? (Ответ округлить до десятых)", answer: "2.0" },
            { question: "Какова будет скорость тела при падении с высоты 45 метров?", answer: "30" },
            { question: "С какой высоты упало тело, если время падения составило 3 секунды?", answer: "44.1" }
        ]
    }
};

export default labsData;