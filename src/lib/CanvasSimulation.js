
/* global Vec2, VerletJS */

import { useEffect, useRef } from "react";

// Предположим, что VerletJS и Vec2 загружены через теги <script> в HTML,
// или вы подключаете их как модули, если у вас есть их версии в npm.

const CanvasSimulation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    const width = 800;
    const height = 500;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    const sim = new VerletJS(width, height, canvas);
    sim.friction = 1;

    const point = sim.lineSegments(
      [
        new Vec2(20, 10),
        new Vec2(25, 10),
        new Vec2(30, 10),
        new Vec2(35, 10),
        new Vec2(40, 10),
        new Vec2(45, 10),
      ],
      0.05
    );
    point.pin(0);

    // кастомная отрисовка одной частицы
    point.drawParticles = function (ctx, composite) {
      for (let i = 0; i < composite.particles.length; ++i) {
        const particle = composite.particles[i];
        if (i === 3) {
          ctx.beginPath();
          ctx.arc(particle.pos.x, particle.pos.y, 10, 0, 2 * Math.PI);
          ctx.fillStyle = "#123554";
          ctx.fill();
        }
      }
    };

    const loop = () => {
      sim.frame(16);
      sim.draw();
      requestAnimationFrame(loop);
    };

    loop();

    // Очистка при размонтировании
    return () => cancelAnimationFrame(loop);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "800px",
        height: "500px",
        border: "1px solid black",
      }}
    />
  );
};

export default CanvasSimulation;
