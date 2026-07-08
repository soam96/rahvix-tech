"use client";

import React, { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
}

interface CircuitPath {
  points: Point[];
  progress: number;
  speed: number;
  color: string;
  glowColor: string;
  width: number;
}

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Respect user's OS-level motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let paths: CircuitPath[] = [];
    const isMobileDevice = window.innerWidth < 768;
    
    // Performance optimized limits based on device screens
    const pathCount = isMobileDevice ? 2 : 10; 
    const particleCount = isMobileDevice ? 5 : 15;

    let cachedGradient: CanvasGradient | null = null;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }

    let particles: Particle[] = [];
    
    const mouse = {
      x: -1000,
      y: -1000,
      radius: isMobileDevice ? 100 : 150,
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      cachedGradient = ctx.createRadialGradient(
        canvas.width * 0.7, canvas.height * 0.2, 0,
        canvas.width * 0.7, canvas.height * 0.2, canvas.width * 0.6
      );
      cachedGradient.addColorStop(0, "rgba(250, 90, 21, 0.03)"); // Orange
      cachedGradient.addColorStop(0.5, "rgba(59, 130, 246, 0.02)"); // Blue
      cachedGradient.addColorStop(1, "rgba(3, 7, 18, 0)");
      
      generatePaths();
      generateParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    // Helper to generate a path with 90-degree turns (orthogonal)
    const createOrthogonalPath = (width: number, height: number): Point[] => {
      const points: Point[] = [];
      let x = Math.random() * width;
      let y = Math.random() * height;
      points.push({ x, y });

      const segments = isMobileDevice ? 2 + Math.floor(Math.random() * 2) : 3 + Math.floor(Math.random() * 3);
      const stepSize = Math.min(width, height) * 0.15;

      let direction = Math.random() > 0.5 ? "horizontal" : "vertical";

      for (let i = 0; i < segments; i++) {
        if (direction === "horizontal") {
          const length = (Math.random() - 0.5) * stepSize * 2;
          x = Math.max(10, Math.min(width - 10, x + length));
          direction = "vertical";
        } else {
          const length = (Math.random() - 0.5) * stepSize * 2;
          y = Math.max(10, Math.min(height - 10, y + length));
          direction = "horizontal";
        }
        points.push({ x, y });
      }

      return points;
    };

    const generatePaths = () => {
      paths = [];
      const colors = [
        "rgba(255, 255, 255, 0.02)",
        "rgba(255, 255, 255, 0.02)",
        "rgba(255, 255, 255, 0.02)",
      ];
      
      const glowColors = [
        "rgba(250, 90, 21, 0.8)",  // Orange
        "rgba(59, 130, 246, 0.8)",  // Blue
        "rgba(124, 58, 237, 0.8)", // Purple
      ];

      for (let i = 0; i < pathCount; i++) {
        const colorIndex = Math.floor(Math.random() * 3);
        paths.push({
          points: createOrthogonalPath(canvas.width, canvas.height),
          progress: Math.random(),
          speed: 0.0006 + Math.random() * 0.0012,
          color: colors[colorIndex],
          glowColor: glowColors[colorIndex],
          width: Math.random() * 0.8 + 0.4,
        });
      }
    };

    const generateParticles = () => {
      particles = [];
      const particleColors = [
        "rgba(250, 90, 21, 0.12)",
        "rgba(59, 130, 246, 0.12)",
        "rgba(124, 58, 237, 0.12)",
      ];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 1.5 + 0.8,
          color: particleColors[Math.floor(Math.random() * 3)],
        });
      }
    };

    const getPointOnPath = (points: Point[], progress: number): Point => {
      if (points.length < 2) return { x: 0, y: 0 };
      
      const totalSegments = points.length - 1;
      const segmentProgress = 1 / totalSegments;
      
      const segmentIndex = Math.min(
        totalSegments - 1,
        Math.floor(progress / segmentProgress)
      );
      
      const startPoint = points[segmentIndex];
      const endPoint = points[segmentIndex + 1];
      const localProgress = (progress - segmentIndex * segmentProgress) / segmentProgress;
      
      return {
        x: startPoint.x + (endPoint.x - startPoint.x) * localProgress,
        y: startPoint.y + (endPoint.y - startPoint.y) * localProgress,
      };
    };

    const getDistanceToSegment = (p: Point, a: Point, b: Point): number => {
      const l2 = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
      if (l2 === 0) return Math.sqrt((p.x - a.x) ** 2 + (p.y - a.y) ** 2);
      
      let t = ((p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y)) / l2;
      t = Math.max(0, Math.min(1, t));
      
      return Math.sqrt(
        (p.x - (a.x + t * (b.x - a.x))) ** 2 +
        (p.y - (a.y + t * (b.y - a.y))) ** 2
      );
    };

    const getDistanceToPath = (mousePoint: Point, points: Point[]): number => {
      let minDistance = Infinity;
      for (let i = 0; i < points.length - 1; i++) {
        const dist = getDistanceToSegment(mousePoint, points[i], points[i + 1]);
        if (dist < minDistance) minDistance = dist;
      }
      return minDistance;
    };

    // Draw frame call
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Radial background glow blobs (cached)
      if (cachedGradient) {
        ctx.fillStyle = cachedGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Draw & Update Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace("0.12", "0.35");
        ctx.fill();

        // Connect to mouse (only on desktop to save mobile CPU cycles)
        if (!isMobileDevice && mouse.x > -1000) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = p.color.replace("0.12", String(alpha));
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });

      // Connect particles to each other (only on desktop, too expensive for mobile)
      if (!isMobileDevice) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 70) {
              const alpha = (1 - dist / 70) * 0.04;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = p1.color.replace("0.12", String(alpha));
              ctx.lineWidth = 0.4;
              ctx.stroke();
            }
          }
        }
      }

      // Draw circuit paths
      paths.forEach((path) => {
        let mouseInfluence = 1;
        if (mouse.x > -1000) {
          const dist = getDistanceToPath(mouse, path.points);
          if (dist < mouse.radius) {
            mouseInfluence = 1 + (1 - dist / mouse.radius) * 3;
          }
        }

        // Draw the trace line
        ctx.beginPath();
        ctx.moveTo(path.points[0].x, path.points[0].y);
        for (let i = 1; i < path.points.length; i++) {
          ctx.lineTo(path.points[i].x, path.points[i].y);
        }
        
        ctx.strokeStyle = path.color.replace(
          "0.02", 
          String(Math.min(0.15, 0.02 * mouseInfluence))
        );
        ctx.lineWidth = path.width * (mouseInfluence > 1 ? 1.1 : 1.0);
        ctx.stroke();

        // Draw microchip corner nodes
        path.points.forEach((pt, i) => {
          if (i === 0 || i === path.points.length - 1) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 1.8, 0, Math.PI * 2);
            ctx.fillStyle = path.color.replace(
              "0.02", 
              String(Math.min(0.2, 0.04 * mouseInfluence))
            );
            ctx.fill();
          }
        });

        // Update progress of the moving data packet
        path.progress += path.speed;
        if (path.progress >= 1) {
          path.progress = 0;
          path.points = createOrthogonalPath(canvas.width, canvas.height);
        }

        const packetPos = getPointOnPath(path.points, path.progress);

        // Draw the glowing packet
        ctx.beginPath();
        ctx.arc(packetPos.x, packetPos.y, 1.5, 0, Math.PI * 2);
        
        // Neon glow ring - disabled on mobile for extreme graphics speedup
        if (!isMobileDevice) {
          ctx.shadowBlur = 6 * (mouseInfluence > 1 ? 1.4 : 1.0);
          ctx.shadowColor = path.glowColor;
        }
        ctx.fillStyle = path.glowColor;
        ctx.fill();
        
        // Inner white core
        ctx.beginPath();
        ctx.arc(packetPos.x, packetPos.y, 0.6, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        
        if (!isMobileDevice) {
          ctx.shadowBlur = 0;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    handleResize();
    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      role="presentation"
      className="fixed inset-0 w-full h-full pointer-events-none -z-10"
    />
  );
}
