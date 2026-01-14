'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface NeuroSphereProps {
    width?: number;
    height?: number;
    color?: string; // Main accent color (hex)
    scale?: number; // Size of sphere relative to canvas
    speed?: number; // Rotation speed
    interactive?: boolean;
}

export const NeuroSphere = ({
    width = 400,
    height = 400,
    color = "#10B981", // Emerald-500 default
    scale = 1,
    speed = 1,
    interactive = true
}: NeuroSphereProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Configuration
        const particleCount = 60 * scale; // Fewer particles for smaller spheres
        const connectionDistance = 80 * scale;
        const sphereRadius = (Math.min(width, height) / 3) * scale;

        let animationFrameId: number;
        let rotationX = 0;
        let rotationY = 0;

        // Particle System
        interface Particle3D {
            x: number;
            y: number;
            z: number;
            baseX: number;
            baseY: number;
            baseZ: number;
            size: number;
        }

        const particles: Particle3D[] = [];

        // Initialize points on a sphere
        for (let i = 0; i < particleCount; i++) {
            const phi = Math.acos(-1 + (2 * i) / particleCount);
            const theta = Math.sqrt(particleCount * Math.PI) * phi;

            particles.push({
                x: 0, y: 0, z: 0, // Current projected position (calculated in loop)
                baseX: sphereRadius * Math.sin(phi) * Math.cos(theta),
                baseY: sphereRadius * Math.sin(phi) * Math.sin(theta),
                baseZ: sphereRadius * Math.cos(phi),
                size: Math.random() * 1.5 + 0.5
            });
        }

        const draw = () => {
            // Clear canvas
            ctx.clearRect(0, 0, width, height);

            // Auto rotation + Mouse influence
            rotationY += 0.003 * speed;
            rotationX += 0.001 * speed;

            // Optional: Interactive rotation
            if (interactive) {
                rotationY += mouseRef.current.x * 0.00005;
                rotationX -= mouseRef.current.y * 0.00005;
            }

            const centerX = width / 2;
            const centerY = height / 2;

            // Project and Rotate points
            const projectedParticles = particles.map(p => {
                // Rotation Y
                let x = p.baseX * Math.cos(rotationY) - p.baseZ * Math.sin(rotationY);
                let z = p.baseX * Math.sin(rotationY) + p.baseZ * Math.cos(rotationY);

                // Rotation X
                let y = p.baseY * Math.cos(rotationX) - z * Math.sin(rotationX);
                z = p.baseY * Math.sin(rotationX) + z * Math.cos(rotationX);

                // Perspective Projection
                const perspective = 300 / (300 + z);

                return {
                    x: centerX + x * perspective,
                    y: centerY + y * perspective,
                    z: z, // For z-indexing/opacity
                    size: p.size * perspective,
                    opacity: (z + sphereRadius) / (2 * sphereRadius) // Fade back particles
                };
            });

            // Draw Connections first (behind nodes)
            ctx.lineWidth = 0.5;
            for (let i = 0; i < projectedParticles.length; i++) {
                const p1 = projectedParticles[i];
                if (p1.opacity < 0.1) continue;

                for (let j = i + 1; j < projectedParticles.length; j++) {
                    const p2 = projectedParticles[j];
                    if (p2.opacity < 0.1) continue;

                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        const alpha = (1 - dist / connectionDistance) * Math.min(p1.opacity, p2.opacity) * 0.4;
                        ctx.strokeStyle = HEXtoRGBA(color, alpha);
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            // Draw Nodes
            projectedParticles.forEach(p => {
                ctx.fillStyle = color;
                ctx.globalAlpha = Math.max(0.1, p.opacity);
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                // Glow effect for closer particles
                if (p.opacity > 0.8) {
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = color;
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }
            });
            ctx.globalAlpha = 1;

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [width, height, color, scale, speed, interactive]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!interactive) return;
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
            mouseRef.current = {
                x: e.clientX - rect.left - width / 2,
                y: e.clientY - rect.top - height / 2
            };
        }
    };

    return (
        <motion.canvas
            ref={canvasRef}
            width={width}
            height={height}
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="cursor-crosshair pointer-events-auto"
            style={{
                width: width,
                height: height,
                maxWidth: '100%',
                maxHeight: '100%'
            }}
        />
    );
};

// Helper: Hex + Alpha to RGBA
function HEXtoRGBA(hex: string, alpha: number) {
    let c: any;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length === 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
    }
    // Fallback or named colors logic could go here, assuming strict Hex for now
    return `rgba(16, 185, 129, ${alpha})`; // Default Emerald
}
