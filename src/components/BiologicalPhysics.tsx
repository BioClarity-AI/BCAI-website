import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

const BiologicalPhysics = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive || !sceneRef.current) return;

    const engine = Matter.Engine.create();
    const world = engine.world;
    engineRef.current = engine;

    // Zero gravity for floating cellular environment
    engine.gravity.y = 0;
    engine.gravity.x = 0;

    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        hasBounds: true,
        wireframes: false,
        background: 'transparent',
      }
    });
    renderRef.current = render;

    // Boundaries
    const wallOptions = { isStatic: true, render: { visible: false } };
    const ground = Matter.Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 50, window.innerWidth * 2, 100, wallOptions);
    const roof = Matter.Bodies.rectangle(window.innerWidth / 2, -50, window.innerWidth * 2, 100, wallOptions);
    const leftWall = Matter.Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight * 2, wallOptions);
    const rightWall = Matter.Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight * 2, wallOptions);

    Matter.World.add(world, [ground, roof, leftWall, rightWall]);

    // Cancer Cells with PSMA receptors
    const cancerCells: { body: Matter.Body, receptors: Matter.Body[], isDying: boolean }[] = [];
    const receptors: Matter.Body[] = [];
    const conjugates: Matter.Body[] = [];

    // Helper to create a cancer cell
    const createCancerCell = (x: number, y: number) => {
      // Main cell body (darker/murky color to represent disease)
      const cellRadius = 40 + Math.random() * 20;
      const cellBody = Matter.Bodies.circle(x, y, cellRadius, {
        restitution: 0.2,
        frictionAir: 0.05,
        label: 'cancer-cell',
        render: { fillStyle: 'rgba(60, 20, 40, 0.4)', strokeStyle: 'rgba(150, 40, 80, 0.6)', lineWidth: 2 }
      });

      const numReceptors = 3 + Math.floor(Math.random() * 3);
      const cellReceptors: Matter.Body[] = [];
      const constraints: Matter.Constraint[] = [];

      for (let i = 0; i < numReceptors; i++) {
        const angle = (Math.PI * 2 / numReceptors) * i;
        const rx = x + Math.cos(angle) * (cellRadius + 10);
        const ry = y + Math.sin(angle) * (cellRadius + 10);

        const receptor = Matter.Bodies.circle(rx, ry, 6, {
          restitution: 0.5,
          frictionAir: 0.05,
          label: 'psma-receptor',
          render: { fillStyle: 'rgba(255, 60, 60, 0.8)' }
        });

        const constraint = Matter.Constraint.create({
          bodyA: cellBody,
          bodyB: receptor,
          length: cellRadius + 10,
          stiffness: 0.5,
          render: { visible: false }
        });

        cellReceptors.push(receptor);
        receptors.push(receptor);
        constraints.push(constraint);

        // Custom link to parent cell for easy access later
        (receptor as any).parentCell = cellBody;
      }

      Matter.World.add(world, [cellBody, ...cellReceptors, ...constraints]);
      cancerCells.push({ body: cellBody, receptors: cellReceptors, isDying: false });
    };

    // Initialize 6 cancer cells
    for (let i = 0; i < 6; i++) {
      createCancerCell(
        100 + Math.random() * (window.innerWidth - 200),
        100 + Math.random() * (window.innerHeight - 200)
      );
    }

    // Initial Radioconjugate
    const spawnConjugate = () => {
      const x = Math.random() > 0.5 ? 0 : window.innerWidth;
      const y = Math.random() * window.innerHeight;

      const conjugate = Matter.Bodies.polygon(x, y, 6, 12, { // Hexagon shape for the compound
        restitution: 0.8,
        frictionAir: 0.02,
        label: 'radio-conjugate',
        render: { fillStyle: 'rgba(0, 229, 255, 0.8)', strokeStyle: 'rgba(255, 255, 255, 1)', lineWidth: 2 }
      });
      Matter.Body.setVelocity(conjugate, { x: x === 0 ? 5 : -5, y: (Math.random() - 0.5) * 5 });
      Matter.World.add(world, conjugate);
      conjugates.push(conjugate);
    };

    // Spawn a few conjugates
    for (let i = 0; i < 5; i++) spawnConjugate();

    // Seeking behavior
    Matter.Events.on(engine, 'beforeUpdate', () => {
      // Brownian motion for cancer cells
      cancerCells.forEach(cell => {
        if (!cell.isDying) {
          Matter.Body.applyForce(cell.body, cell.body.position, {
            x: (Math.random() - 0.5) * 0.005,
            y: (Math.random() - 0.5) * 0.005
          });
        }
      });

      // Conjugates seek nearest available receptor
      conjugates.forEach(conj => {
        let nearest: Matter.Body | null = null;
        let minDist = Infinity;

        receptors.forEach(rec => {
          if ((rec as any).targeted) return;
          const parent = (rec as any).parentCell;
          const cellInfo = cancerCells.find(c => c.body === parent);
          if (cellInfo?.isDying) return;

          const dx = rec.position.x - conj.position.x;
          const dy = rec.position.y - conj.position.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < minDist) {
            minDist = distSq;
            nearest = rec;
          }
        });

        if (nearest) {
          const dist = Math.sqrt(minDist);
          if (dist > 0 && dist < 800) {
            const dx = (nearest as Matter.Body).position.x - conj.position.x;
            const dy = (nearest as Matter.Body).position.y - conj.position.y;
            Matter.Body.applyForce(conj, conj.position, {
              x: (dx / dist) * 0.0006,
              y: (dy / dist) * 0.0006
            });
          }
        }
      });

      // Handle shrinking cells
      cancerCells.forEach((cell, idx) => {
        if (cell.isDying) {
          // Shrink the cell body
          Matter.Body.scale(cell.body, 0.96, 0.96);

          if (cell.body.circleRadius && cell.body.circleRadius < 5) {
            // Remove receptors and body completely when small enough
            Matter.World.remove(world, cell.body);
            cell.receptors.forEach(r => {
              Matter.World.remove(world, r);
              const rIdx = receptors.indexOf(r);
              if (rIdx > -1) receptors.splice(rIdx, 1);
            });
            cancerCells.splice(idx, 1);

            // Spawn a replacement conjugate
            spawnConjugate();
            // Spawn a replacement cancer cell to keep the environment alive
            if (Math.random() > 0.4) {
              createCancerCell(
                100 + Math.random() * (window.innerWidth - 200),
                100 + Math.random() * (window.innerHeight - 200)
              );
            }
          }
        }
      });
    });

    // Collision logic for Payload Release
    Matter.Events.on(engine, 'collisionStart', (event) => {
      event.pairs.forEach(pair => {
        const isConjA = pair.bodyA.label === 'radio-conjugate';
        const isConjB = pair.bodyB.label === 'radio-conjugate';
        const isRecA = pair.bodyA.label === 'psma-receptor';
        const isRecB = pair.bodyB.label === 'psma-receptor';

        if ((isConjA && isRecB) || (isConjB && isRecA)) {
          const conj = isConjA ? pair.bodyA : pair.bodyB;
          const rec = isRecA ? pair.bodyA : pair.bodyB;

          if ((rec as any).targeted) return;
          (rec as any).targeted = true;

          // Remove the conjugate
          const conjIdx = conjugates.indexOf(conj);
          if (conjIdx > -1) conjugates.splice(conjIdx, 1);
          Matter.World.remove(world, conj);

          // Explosion particles (Payload Release)
          for (let i = 0; i < 15; i++) {
            const particle = Matter.Bodies.circle(rec.position.x, rec.position.y, 2 + Math.random() * 3, {
              frictionAir: 0.05,
              restitution: 0.8,
              render: { fillStyle: 'rgba(0, 229, 255, 0.9)', strokeStyle: 'rgba(255, 255, 255, 0.8)', lineWidth: 1 }
            });
            const angle = Math.random() * Math.PI * 2;
            const speed = 3 + Math.random() * 6;
            Matter.Body.setVelocity(particle, { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed });
            Matter.World.add(world, particle);

            // Remove particle after a short time
            setTimeout(() => {
              Matter.World.remove(world, particle);
            }, 800 + Math.random() * 800);
          }

          // Eviscerate cancer cell
          const parentCellBody = (rec as any).parentCell;
          const cellInfo = cancerCells.find(c => c.body === parentCellBody);
          if (cellInfo) {
            setTimeout(() => {
              cellInfo.isDying = true;
            }, 400); // 400ms payload absorption delay before cell death
          }
        }
      });
    });

    const runner = Matter.Runner.create();
    runnerRef.current = runner;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          Matter.Render.run(render);
          Matter.Runner.run(runner, engine);
        } else {
          Matter.Render.stop(render);
          Matter.Runner.stop(runner);
        }
      });
    }, { threshold: 0 });

    if (sceneRef.current) observer.observe(sceneRef.current);

    return () => {
      observer.disconnect();
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
      if (renderRef.current) Matter.Render.stop(renderRef.current);
      if (engineRef.current) {
        Matter.World.clear(engineRef.current.world, false);
        Matter.Engine.clear(engineRef.current);
      }
      if (renderRef.current && renderRef.current.canvas) renderRef.current.canvas.remove();
    };
  }, [isActive]);

  return (
    <>
      <div
        ref={sceneRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: isActive ? 5 : -1,
          pointerEvents: 'none',
          userSelect: 'none',
          opacity: isActive ? 1 : 0,
          transition: 'opacity 1s ease-in-out'
        }}
      />
    </>
  );
};

export default BiologicalPhysics;
