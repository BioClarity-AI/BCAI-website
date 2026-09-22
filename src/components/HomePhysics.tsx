import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

const HomePhysics = () => {
    const sceneRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const renderRef = useRef<Matter.Render | null>(null);
    // Optional: For performance, we can track mouse pos manually without Matter's internal constraint
    const mousePosRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    useEffect(() => {
        if (!sceneRef.current) return;

        // 1. Setup Engine & World
        const engine = Matter.Engine.create();
        const world = engine.world;
        engineRef.current = engine;

        // Anti-gravity floaty feel
        engine.gravity.y = 0;
        engine.gravity.x = 0;

        // 2. Setup Renderer
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

        // 3. Boundaries
        const wallOptions = { isStatic: true, render: { visible: false } };
        const ground = Matter.Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 50, window.innerWidth * 2, 100, wallOptions);
        const ceiling = Matter.Bodies.rectangle(window.innerWidth / 2, -50, window.innerWidth * 2, 100, wallOptions);
        const leftWall = Matter.Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight * 2, wallOptions);
        const rightWall = Matter.Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight * 2, wallOptions);
        Matter.World.add(world, [ground, ceiling, leftWall, rightWall]);

        // 4. Create Amino Acids
        const aminoAcids: Matter.Body[] = [];
        const elementColors = [
            'rgba(0, 229, 255, 0.25)',    // Electric Blue - More transparent
            'rgba(29, 233, 182, 0.25)',   // Neon Teal - More transparent
            'rgba(255, 255, 255, 0.2)'    // White - More transparent
        ];

        const numAminoAcids = 80; // More particles to form structures

        for (let i = 0; i < numAminoAcids; i++) {
            const radius = Math.random() * 2 + 1.5; // Very small: 1.5 to 3.5
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;

            const aminoAcid = Matter.Bodies.circle(x, y, radius, {
                restitution: 0.9,
                frictionAir: 0.1,
                friction: 0.1,
                label: 'amino-acid',
                render: {
                    fillStyle: elementColors[Math.floor(Math.random() * elementColors.length)]
                }
            });

            // Initial scatter velocity
            Matter.Body.setVelocity(aminoAcid, {
                x: (Math.random() - 0.5) * 4,
                y: (Math.random() - 0.5) * 4
            });

            aminoAcids.push(aminoAcid);
        }
        Matter.World.add(world, aminoAcids);

        // 5. Bonding Logic (Double Helix / Ladder Formation)
        const bonds: Matter.Constraint[] = [];

        // Helper to count bonds of a specific 'type' (length)
        const getBonds = (body: Matter.Body) => bonds.filter(b => b.bodyA === body || b.bodyB === body);

        Matter.Events.on(engine, 'collisionStart', (event) => {
            const pairs = event.pairs;

            for (let i = 0; i < pairs.length; i++) {
                const bodyA = pairs[i].bodyA;
                const bodyB = pairs[i].bodyB;

                if (bodyA.label === 'amino-acid' && bodyB.label === 'amino-acid') {
                    const bondsA = getBonds(bodyA);
                    const bondsB = getBonds(bodyB);

                    const alreadyBonded = bonds.some(b =>
                        (b.bodyA === bodyA && b.bodyB === bodyB) ||
                        (b.bodyA === bodyB && b.bodyB === bodyA)
                    );

                    if (alreadyBonded) continue;

                    // DNA Formation Rules:
                    // 1. Base Pair (Rung): Tighter bond between two nodes (length 8)
                    // 2. Backbone: Looser bonds connecting pairs linearly (length 20)

                    const hasBasePairA = bondsA.some(b => b.length === 8);
                    const hasBasePairB = bondsB.some(b => b.length === 8);

                    const backboneBondsA = bondsA.filter(b => b.length === 20).length;
                    const backboneBondsB = bondsB.filter(b => b.length === 20).length;

                    let newBond: Matter.Constraint | null = null;

                    // Rule 1: Form Base Pairs first (if neither has a pair)
                    if (!hasBasePairA && !hasBasePairB) {
                        if (Math.random() > 0.5) { // 50% chance to pair on contact
                            newBond = Matter.Constraint.create({
                                bodyA: bodyA,
                                bodyB: bodyB,
                                length: 8, // Very close (the 'rung' of the ladder)
                                stiffness: 0.9,
                                render: { strokeStyle: 'rgba(0, 229, 255, 0.4)', lineWidth: 1 }
                            });
                        }
                    }
                    // Rule 2: If BOTH are already paired, they can link backbones (up to 2 backbone links each)
                    else if (hasBasePairA && hasBasePairB && backboneBondsA < 2 && backboneBondsB < 2) {
                        // To prevent blob-forming triangles, ensure they aren't connecting to their own pair's backbone
                        const pairA = bondsA.find(b => b.length === 8);
                        const pairB = bondsB.find(b => b.length === 8);

                        const siblingA = pairA?.bodyA === bodyA ? pairA.bodyB : pairA?.bodyA;
                        const siblingB = pairB?.bodyA === bodyB ? pairB.bodyB : pairB?.bodyA;

                        if (siblingA !== bodyB && siblingB !== bodyA) {
                            if (Math.random() > 0.7) { // Harder to form backbone links
                                newBond = Matter.Constraint.create({
                                    bodyA: bodyA,
                                    bodyB: bodyB,
                                    length: 20, // Wider gap for the backbone
                                    stiffness: 0.5, // slightly flexible
                                    render: { strokeStyle: 'rgba(29, 233, 182, 0.3)', lineWidth: 1 }
                                });
                                // Also optionally try to link their siblings to complete the ladder rung
                                if (siblingA && siblingB && Math.random() > 0.3) {
                                    const siblingBond = Matter.Constraint.create({
                                        bodyA: siblingA,
                                        bodyB: siblingB,
                                        length: 20,
                                        stiffness: 0.5,
                                        render: { strokeStyle: 'rgba(29, 233, 182, 0.3)', lineWidth: 1 }
                                    });
                                    bonds.push(siblingBond);
                                    Matter.World.add(world, siblingBond);
                                }
                            }
                        }
                    }

                    if (newBond) {
                        bonds.push(newBond);
                        Matter.World.add(world, newBond);

                        // Visual update when bonded
                        (bodyA.render as any).fillStyle = 'rgba(255, 255, 255, 0.5)';
                        (bodyB.render as any).fillStyle = 'rgba(255, 255, 255, 0.5)';
                    }
                }
            }
        });

        // 6. Cursor Attraction Logic
        const handleMouseMove = (e: MouseEvent) => {
            mousePosRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);

        Matter.Events.on(engine, 'beforeUpdate', () => {
            const mx = mousePosRef.current.x;
            const my = mousePosRef.current.y;

            aminoAcids.forEach(acid => {
                // 1. Add subtle brownian floating motion
                Matter.Body.applyForce(acid, acid.position, {
                    x: (Math.random() - 0.5) * 0.00005,
                    y: (Math.random() - 0.5) * 0.00005
                });

                // 2. Swarm towards cursor
                const dx = mx - acid.position.x;
                const dy = my - acid.position.y;
                const distSq = dx * dx + dy * dy;

                // If cursor is within a certain radius, pull them in
                if (distSq > 0 && distSq < 400000) { // ~600px radius
                    const dist = Math.sqrt(distSq);
                    // Force scales conversely with distance (closer = stronger pull up to a point)
                    // But not *too* strong, we want a dreamy swarm
                    const forceMagnitude = 0.00003 * (dist / 100);

                    Matter.Body.applyForce(acid, acid.position, {
                        x: (dx / dist) * forceMagnitude,
                        y: (dy / dist) * forceMagnitude
                    });
                }
            });
        });

        // 8. Run Engine
        Matter.Render.run(render);
        const runner = Matter.Runner.create();
        Matter.Runner.run(runner, engine);

        // 9. Resize Handling
        const handleResize = () => {
            render.canvas.width = window.innerWidth;
            render.canvas.height = window.innerHeight;
            Matter.Body.setPosition(ground, { x: window.innerWidth / 2, y: window.innerHeight + 50 });
            Matter.Body.setPosition(ceiling, { x: window.innerWidth / 2, y: -50 });
            Matter.Body.setPosition(rightWall, { x: window.innerWidth + 50, y: window.innerHeight / 2 });
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
            if (engineRef.current) {
                Matter.World.clear(engineRef.current.world, false);
                Matter.Engine.clear(engineRef.current);
            }
            if (renderRef.current) {
                renderRef.current.canvas.remove();
            }
        };
    }, []);

    return (
        <div
            ref={sceneRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0, // Behind the hero text but above the background gradient/image
                pointerEvents: 'none', // Critical: Let clicks pass through to UI buttons
                opacity: 0.8, // Subtle ambient integration
            }}
        />
    );
};

export default HomePhysics;
