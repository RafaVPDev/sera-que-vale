import { useEffect, useRef } from "react";

interface Particula {
  x: number;
  y: number;
  vx: number;
  vy: number;
  raio: number;
  cor: string;
  opacidade: number;
}

function Particulas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cores = ["#009C3B", "#FFDF00", "#002776"];
    const particulas: Particula[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      raio: Math.random() * 3 + 1,
      cor: cores[Math.floor(Math.random() * cores.length)],
      opacidade: Math.random() * 0.3 + 0.05,
    }));

    let animId: number;

    function animar() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particulas) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.raio, 0, Math.PI * 2);
        ctx.fillStyle = p.cor;
        ctx.globalAlpha = p.opacidade;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animar);
    }

    animar();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

export default Particulas;
