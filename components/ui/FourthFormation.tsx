'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface FourthFormationProps {
    title?: string;
    subtitle?: string;
    images?: string[];
    children?: React.ReactNode;
    className?: string;
    overlayClassName?: string;
    variant?: 'spaced' | 'depth';
}

export const DEFAULT_FOURTH_IMAGES = [
    '/print/packaging.jpg',
    'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&auto=format&fit=crop&q=80',
    '/print/stickers.jpg',
    'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&auto=format&fit=crop&q=80',
    '/print/cards.jpg',
    'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=80',
];

/**
 * Calculates radial 3D rotation and translation relative to the center of the viewport
 * Keeps transforms within safe limits so cards never clip behind the camera.
 */
function calculateInitialTransform(
    element: HTMLElement,
    container: HTMLElement,
    offsetDistance = 220,
    maxRotation = 45,
    maxZTranslation = 400
) {
    const containerRect = container.getBoundingClientRect();
    const cWidth = containerRect.width || window.innerWidth;
    const cHeight = containerRect.height || window.innerHeight;

    const viewportCenter = {
        width: cWidth / 2,
        height: cHeight / 2,
    };

    const elRect = element.getBoundingClientRect();
    const elementCenter = {
        x: elRect.left + elRect.width / 2 - containerRect.left,
        y: elRect.top + elRect.height / 2 - containerRect.top,
    };

    const deltaX = elementCenter.x - viewportCenter.width;
    const deltaY = elementCenter.y - viewportCenter.height;
    const angle = Math.atan2(deltaY, deltaX);

    const maxDistance = Math.sqrt(
        Math.pow(viewportCenter.width, 2) + Math.pow(viewportCenter.height, 2)
    ) || 1;

    const currentDistance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    const distanceFactor = Math.min(1.2, currentDistance / maxDistance);

    const translateX = Math.cos(angle) * offsetDistance * distanceFactor;
    const translateY = Math.sin(angle) * offsetDistance * distanceFactor;

    const rotationX = (deltaY > 0 ? 1 : -1) * (Math.abs(deltaY) / viewportCenter.height) * maxRotation;
    const rotationY = (deltaX > 0 ? -1 : 1) * (Math.abs(deltaX) / viewportCenter.width) * maxRotation;
    const translateZ = maxZTranslation * distanceFactor;

    return {
        x: translateX,
        y: translateY,
        z: translateZ,
        rotateX: rotationX,
        rotateY: rotationY,
    };
}

export const FourthFormation: React.FC<FourthFormationProps> = ({
    title = 'Outprint',
    subtitle = 'Tactile Print Studio System',
    images = DEFAULT_FOURTH_IMAGES,
    children,
    className,
    overlayClassName,
    variant = 'spaced',
}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const gridRef = useRef<HTMLDivElement | null>(null);

    // Generate 36 items (4 rows × 9 columns)
    const mosaicItems = React.useMemo(() => {
        const totalTiles = 36;
        return Array.from({ length: totalTiles }, (_, index) => images[index % images.length]);
    }, [images]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        let tl: gsap.core.Timeline | null = null;

        const ctx = gsap.context(() => {
            if (!gridRef.current || !containerRef.current) return;

            const gridCards = gridRef.current.querySelectorAll<HTMLElement>('.mosaic-card');
            const isDepth = variant === 'depth';

            // Set perspective on 3D container
            gsap.set(gridRef.current, {
                perspective: 1200,
                transformStyle: 'preserve-3d',
            });

            // Codrops Fourth Formation: Section pins, 3D cards fly in from depth and assemble into mosaic
            tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: '+=200%',
                    pin: containerRef.current,
                    pinSpacing: true,
                    scrub: 0.3,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            tl.fromTo(
                gridCards,
                {
                    x: (_, el) => calculateInitialTransform(el, containerRef.current!, isDepth ? 420 : 280).x,
                    y: (_, el) => calculateInitialTransform(el, containerRef.current!, isDepth ? 320 : 200).y,
                    z: (_, el) => calculateInitialTransform(el, containerRef.current!, 200, 45, isDepth ? -1400 : -850).z,
                    rotateX: (_, el) => calculateInitialTransform(el, containerRef.current!, 200, isDepth ? 70 : 40).rotateX,
                    rotateY: (_, el) => calculateInitialTransform(el, containerRef.current!, 200, isDepth ? 70 : 40).rotateY,
                    scale: 0.45,
                    opacity: 0.25,
                },
                {
                    x: 0,
                    y: 0,
                    z: 0,
                    rotateX: 0,
                    rotateY: 0,
                    scale: 1,
                    opacity: 1,
                    ease: 'none',
                    stagger: {
                        amount: 0.25,
                        from: 'center',
                        grid: [4, 9],
                    },
                }
            );
        }, containerRef);

        // Refresh ScrollTrigger after DOM measurement
        const refreshTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 150);

        return () => {
            clearTimeout(refreshTimer);
            ctx.revert();
        };
    }, [variant]);

    return (
        <section
            ref={containerRef}
            className={cn(
                "relative grid min-h-[calc(100vh-4rem)] w-full place-items-center overflow-hidden bg-[#FAFAF9] [grid-template-areas:'stack'] [grid-template-columns:100%] [grid-template-rows:100%]",
                className
            )}
        >
            {/* 4x9 Mosaic 3D Grid */}
            <div
                ref={gridRef}
                className={cn(
                    "[grid-area:stack] grid h-full w-full max-w-[100vw] pointer-events-none select-none",
                    "grid-cols-6 sm:grid-cols-9 grid-rows-6 sm:grid-rows-4 aspect-[16/9]",
                    variant === 'spaced' ? 'gap-2.5 sm:gap-3.5 p-3 sm:p-6' : 'gap-1 p-2'
                )}
            >
                {mosaicItems.map((imgUrl, index) => (
                    <div
                        key={index}
                        className={cn(
                            "mosaic-card h-full w-full bg-cover bg-center will-change-transform transition-opacity",
                            "rounded-xl border border-black/[0.08] shadow-[0_12px_28px_-6px_rgba(0,0,0,0.12)] bg-neutral-100"
                        )}
                        style={{ backgroundImage: `url(${imgUrl})` }}
                    />
                ))}
            </div>

            {/* Subtle Vignette Mask: Kept translucent so cards pop vibrantly around and behind copy */}
            <div
                className="[grid-area:stack] pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.6)_55%,rgba(255,255,255,0.15)_100%)]"
                aria-hidden="true"
            />

            {/* Foreground Overlay (Hero Copy or Title) */}
            <div
                className={cn(
                    "[grid-area:stack] relative z-10 flex flex-col items-center justify-center text-center px-4 pointer-events-auto",
                    overlayClassName
                )}
            >
                {children ? (
                    children
                ) : (
                    <div className="pointer-events-none select-none">
                        <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-medium uppercase tracking-tighter text-[#111111] drop-shadow-sm">
                            {title}
                        </h2>
                        <p className="mt-2 text-xs sm:text-sm md:text-base font-medium uppercase tracking-[0.25em] text-neutral-500">
                            {subtitle}
                        </p>
                    </div>
                )}
            </div>

            {/* Interactive Scroll Cue */}
            <div className="[grid-area:stack] pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 opacity-75">
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-neutral-500">
                    Scroll to explore
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400 animate-bounce" />
            </div>
        </section>
    );
};

export default FourthFormation;

