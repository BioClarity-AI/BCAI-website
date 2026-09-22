import React, { useEffect, useState } from 'react';

const DNACursor = () => {
    const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);
    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });

            // Check if hovering over clickable elements to give a little visual feedback
            const target = e.target as HTMLElement;
            if (target.closest('a') || target.closest('button') || target.closest('.cursor-pointer')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    // Colors for the base pairs as seen in the reference image
    const basePairColors = [
        ['#00BFA5', '#FF6D00'], // Teal / Orange
        ['#651FFF', '#FFD600'], // Purple / Yellow
        ['#00BFA5', '#FF6D00'], // Teal / Orange
        ['#FFD600', '#651FFF'], // Yellow / Purple
    ];

    const numRungs = 10;
    const rungs = Array.from({ length: numRungs });

    return (
        <div
            className="pointer-events-none fixed top-0 left-0 w-full h-full z-[100]"
        >
            <style>
                {`
                /* Only hide default cursor and show custom cursor on devices with a real pointer (mouse) */
                @media (hover: hover) and (pointer: fine) {
                    body, a, button, input, select, textarea {
                        cursor: none !important;
                    }
                    .custom-cursor-container {
                        display: block !important;
                    }
                }
                
                /* Hide the custom cursor completely on touch devices */
                @media (hover: none), (pointer: coarse) {
                    .custom-cursor-container {
                        display: none !important;
                    }
                }

                @keyframes dnaSpin3D {
                    0 % { transform: rotateY(0deg); }
            100% {transform: rotateY(360deg); }
          }
                .dna-rung {
                    display: flex;
                align-items: center;
                justify-content: space-between;
                width: 20px;
                height: 3px;
                margin-bottom: 2px;
                transform-style: preserve-3d;
                animation: dnaSpin3D 2s linear infinite;
          }
                .dna-backbone {
                    width: 4px;
                height: 4px;
                border-radius: 50%;
                background-color: #B0BEC5; /* Light blue-grey backbone */
                box-shadow: 0 0 5px rgba(176, 190, 197, 0.8);
          }
                .dna-backbone-left {transform: translateZ(2px); }
                .dna-backbone-right {transform: translateZ(-2px); }
                .dna-pair {
                    display: flex;
                flex: 1;
                height: 2px;
          }
        `}
            </style>

            {/* Unified Cursor Wrapper: Tracks mouse instantly with no CSS transition lag */}
            <div
                className="absolute pointer-events-none custom-cursor-container hidden" /* Hidden by default, shown by CSS media query */
                style={{
                    transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
                    zIndex: 9999
                }}
            >
                {/* The Custom 3D DNA trailing the cursor, offset relative to the pointer */}
                <div
                    className="absolute flex flex-col items-center justify-center transition-transform duration-150 ease-out"
                    style={{
                        transform: `translate(12px, 12px) scale(${isHovering ? 0.95 : 0.6})`,
                        perspective: '100px'
                    }}
                >
                    {rungs.map((_, i) => {
                        const colors = basePairColors[i % basePairColors.length];
                        return (
                            <div
                                key={i}
                                className="dna-rung"
                                style={{
                                    // Stagger the animation delay to create the twisting helix shape
                                    animationDelay: `-${i * 0.2}s`
                                }}
                            >
                                <div className="dna-backbone dna-backbone-left" />
                                <div className="dna-pair">
                                    <div style={{ flex: 1, backgroundColor: colors[0] }} />
                                    <div style={{ flex: 1, backgroundColor: colors[1] }} />
                                </div>
                                <div className="dna-backbone dna-backbone-right" />
                            </div>
                        );
                    })}
                </div>

                {/* Exact click point - Standard Arrow Pointer */}
                <div className="absolute pointer-events-none">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="white"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                        style={{
                            transform: isHovering ? 'scale(1.1)' : 'scale(1)',
                            transition: 'transform 0.15s ease-out',
                            transformOrigin: 'top left'
                        }}
                    >
                        {/* Classic Cursor Arrow Path */}
                        <path d="M4 4L11 20L14 14L20 11L4 4Z" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default DNACursor;
