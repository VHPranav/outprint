'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VanillaTilt from 'vanilla-tilt';
import { ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CardConfig {
    image: string;
    rotateX: number; // Spherical pitch on the dome (-30deg to +30deg)
    rotateY: number; // Spherical yaw on the dome (-30deg to +30deg)
    rotateZ?: number; // Planar organic roll/rotation (-8deg to +8deg)
    translateZ?: number; // 3D depth offset on the dome (-70px to +20px)
    parallaxFactor?: number; // Multiplier for smooth mouse & scroll parallax (0.4 to 1.8)
    max: number;
    fromX?: number;
    fromY?: number;
    fromScale?: number;
    className?: string;
    style: React.CSSProperties;
}

export interface TenthFormationProps {
    badge?: string;
    title?: string | React.ReactNode;
    description?: string;
    buttonText?: string;
    onButtonClick?: () => void;
    secondaryButtonText?: string;
    onSecondaryButtonClick?: () => void;
    images?: string[];
    children?: React.ReactNode;
    className?: string;
}

export const DEFAULT_TENTH_IMAGES = [
    '/images/1.webp',
    '/images/2.webp',
    '/images/3.webp',
    '/images/4.webp',
    '/images/5.webp',
    '/images/6.webp',
    '/images/7.webp',
    '/images/8.webp',
    '/images/9.webp',
    '/images/10.webp',
];

export const TenthFormation: React.FC<TenthFormationProps> = ({
    badge = 'Outprint Studio',
    title = (
        <>
            Tactile objects,<br />
            on demand.
        </>
    ),
    description = 'Engineered print, luxury packaging, and archival stationery for modern brands.',
    buttonText = 'Order Sample Box',
    onButtonClick,
    secondaryButtonText = undefined,
    onSecondaryButtonClick,
    images = DEFAULT_TENTH_IMAGES,
    children,
    className,
}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const gridRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLDivElement | null>(null);

    // Exactly 10 cards: 3D Dome Canopy with smooth parallax depth multipliers
    const cardConfigs = React.useMemo<CardConfig[]>(() => [
        // ========================================================
        // 1. TOP DOME ARC (Curving down from top sky)
        // ========================================================
        // 1. Top Arc Center (Swooping from upper sky above title)
        {
            image: images[0] || DEFAULT_TENTH_IMAGES[0],
            rotateX: 24,
            rotateY: -4,
            rotateZ: 2,
            translateZ: -35,
            parallaxFactor: 0.9,
            max: 26,
            fromX: 0,
            fromY: -380, // swooping down from top sky
            fromScale: 0.7,
            className: 'hidden sm:block',
            style: {
                top: '2%',
                left: '42%',
                width: 'clamp(145px, 14vw, 220px)',
                aspectRatio: '16 / 10',
                zIndex: 2,
            },
        },

        // ========================================================
        // 2. INNER ORBIT (Bursting outward from middle of viewport)
        // ========================================================
        // 2. Inner Waist Left (Bursting directly out from middle of viewport!)
        {
            image: images[1] || DEFAULT_TENTH_IMAGES[1],
            rotateX: 10,
            rotateY: 16,
            rotateZ: -5,
            translateZ: 15,
            parallaxFactor: 1.55,
            max: 24,
            fromX: 0,
            fromY: 0, // exact middle of viewport!
            fromScale: 0.08,
            className: 'hidden md:block',
            style: {
                top: '20%',
                left: '18%',
                width: 'clamp(135px, 13vw, 205px)',
                aspectRatio: '1 / 1',
                zIndex: 4,
            },
        },
        // 3. Inner Waist Right (Bursting directly out from middle of viewport!)
        {
            image: images[2] || DEFAULT_TENTH_IMAGES[2],
            rotateX: -8,
            rotateY: -16,
            rotateZ: 5,
            translateZ: 15,
            parallaxFactor: 1.55,
            max: 24,
            fromX: 0,
            fromY: 0, // exact middle of viewport!
            fromScale: 0.08,
            className: 'hidden md:block',
            style: {
                top: '56%',
                right: '18%',
                width: 'clamp(140px, 13vw, 210px)',
                aspectRatio: '3 / 4',
                zIndex: 4,
            },
        },

        // ========================================================
        // 3. LEFT DOME HEMISPHERE (3 uneven cards)
        // ========================================================
        // 4. Far Top-Left Dome Anchor (Diving from upper-left deep space)
        {
            image: images[3] || DEFAULT_TENTH_IMAGES[3],
            rotateX: 20,
            rotateY: 24,
            rotateZ: -4,
            translateZ: -60,
            parallaxFactor: 0.5,
            max: 28,
            fromX: -340,
            fromY: -220, // diving from upper-left
            fromScale: 0.6,
            style: {
                top: '-3%',
                left: '-3%',
                width: 'clamp(190px, 20vw, 340px)',
                aspectRatio: '16 / 10',
                zIndex: 1,
            },
        },
        // 5. Outer Mid-Left (Sweeping in horizontally from far left edge)
        {
            image: images[4] || DEFAULT_TENTH_IMAGES[4],
            rotateX: 2,
            rotateY: 25,
            rotateZ: 3,
            translateZ: -40,
            parallaxFactor: 0.85,
            max: 28,
            fromX: -380,
            fromY: 0, // sweeping horizontally
            fromScale: 0.65,
            style: {
                top: '32%',
                left: '-4%',
                width: 'clamp(170px, 17vw, 270px)',
                aspectRatio: '3 / 4',
                zIndex: 1,
            },
        },
        // 6. Far Bottom-Left Dome Anchor (Blasting in from bottom-left abyss)
        {
            image: images[5] || DEFAULT_TENTH_IMAGES[5],
            rotateX: -20,
            rotateY: 20,
            rotateZ: 3,
            translateZ: -60,
            parallaxFactor: 0.5,
            max: 30,
            fromX: -300,
            fromY: 260, // blasting from bottom-left
            fromScale: 0.6,
            style: {
                bottom: '-5%',
                left: '-2%',
                width: 'clamp(190px, 20vw, 330px)',
                aspectRatio: '4 / 3',
                zIndex: 1,
            },
        },

        // ========================================================
        // 4. RIGHT DOME HEMISPHERE (3 uneven cards)
        // ========================================================
        // 7. Far Top-Right Dome Anchor (Diving from upper-right deep space)
        {
            image: images[6] || DEFAULT_TENTH_IMAGES[6],
            rotateX: 20,
            rotateY: -24,
            rotateZ: 4,
            translateZ: -60,
            parallaxFactor: 0.5,
            max: 28,
            fromX: 340,
            fromY: -220, // diving from upper-right
            fromScale: 0.6,
            style: {
                top: '-4%',
                right: '-2%',
                width: 'clamp(190px, 20vw, 340px)',
                aspectRatio: '4 / 3',
                zIndex: 1,
            },
        },
        // 8. Outer Mid-Right (Sweeping in horizontally, offset lower than left)
        {
            image: images[7] || DEFAULT_TENTH_IMAGES[7],
            rotateX: -2,
            rotateY: -25,
            rotateZ: -3,
            translateZ: -40,
            parallaxFactor: 0.85,
            max: 28,
            fromX: 380,
            fromY: 0, // sweeping horizontally
            fromScale: 0.65,
            style: {
                top: '38%',
                right: '-4%',
                width: 'clamp(170px, 17vw, 270px)',
                aspectRatio: '16 / 10',
                zIndex: 1,
            },
        },
        // 9. Far Bottom-Right Dome Anchor (Blasting in from bottom-right abyss)
        {
            image: images[8] || DEFAULT_TENTH_IMAGES[8],
            rotateX: -20,
            rotateY: -20,
            rotateZ: -4,
            translateZ: -60,
            parallaxFactor: 0.5,
            max: 30,
            fromX: 300,
            fromY: 260, // blasting from bottom-right
            fromScale: 0.6,
            style: {
                bottom: '-4%',
                right: '-2%',
                width: 'clamp(190px, 20vw, 330px)',
                aspectRatio: '16 / 10',
                zIndex: 1,
            },
        },

        // ========================================================
        // 5. BOTTOM DOME ARC (Curving upward from bottom floor)
        // ========================================================
        // 10. Bottom Arc Center (Curving up under CTA, shooting up from floor)
        {
            image: images[9] || DEFAULT_TENTH_IMAGES[9],
            rotateX: -24,
            rotateY: 2,
            rotateZ: -2,
            translateZ: -35,
            parallaxFactor: 0.9,
            max: 26,
            fromX: 0,
            fromY: 380, // shooting straight up from bottom
            fromScale: 0.7,
            className: 'hidden sm:block',
            style: {
                bottom: '2%',
                left: '44%',
                width: 'clamp(145px, 14vw, 220px)',
                aspectRatio: '16 / 10',
                zIndex: 2,
            },
        },
    ], [images]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // 1. Initialize VanillaTilt programmatically per card with inverted startX for internal formula
        const cards = container.querySelectorAll<HTMLElement>('.vanilla-tilt-card');
        cards.forEach((cardEl, idx) => {
            const config = cardConfigs[idx];
            if (!config) return;

            VanillaTilt.init(cardEl, {
                startX: -config.rotateY, // Account for VanillaTilt internal rotateY = -startX sign inversion
                startY: config.rotateX,
                max: config.max,
                'reset-to-start': true,
                perspective: 900,
                speed: 400,
                scale: 1.05,
                glare: true,
                'max-glare': 0.22,
            });
        });

        // 2. Initialize GSAP ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            if (!gridRef.current || !containerRef.current) return;

            const wrappers = gridRef.current.querySelectorAll('.tilt-wrapper');

            // A. Initial entrance on mount so cards are immediately 100% visible and settled
            gsap.from(wrappers, {
                scale: 0.78,
                autoAlpha: 0,
                x: (i) => (cardConfigs[i]?.fromX ?? 0) * 0.35,
                y: (i) => (cardConfigs[i]?.fromY ?? 0) * 0.35,
                duration: 1.2,
                stagger: {
                    amount: 0.3,
                    from: 'random',
                },
                ease: 'power3.out',
            });

            if (titleRef.current) {
                gsap.from(titleRef.current, {
                    scale: 0.92,
                    autoAlpha: 0,
                    y: 25,
                    duration: 1.1,
                    ease: 'power3.out',
                });
            }

            // B. Continuous, silky Scroll Parallax (Scrubbed across page scroll)
            const scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.8, // Smooth 0.8s inertial scrub
                },
            });

            // Each card moves at a distinct rate according to its depth/parallax factor
            wrappers.forEach((wrapper, idx) => {
                const factor = cardConfigs[idx]?.parallaxFactor ?? 1;
                // Foreground moves significantly faster up (-260px) than background (-70px)
                const scrollDistY = -60 - factor * 130;
                // Subtle horizontal drift away from center as you scroll past
                const spreadX = ((cardConfigs[idx]?.rotateY ?? 0) > 0 ? -1 : 1) * factor * 35;

                scrollTl.to(
                    wrapper,
                    {
                        y: scrollDistY,
                        x: spreadX,
                        ease: 'none',
                    },
                    0
                );
            });

            if (titleRef.current) {
                scrollTl.to(
                    titleRef.current,
                    {
                        y: -110,
                        opacity: 0.65,
                        ease: 'none',
                    },
                    0
                );
            }
        }, containerRef);

        // 3. Responsive, Silky Mouse Parallax with gsap.quickTo (Instant feel, zero lag)
        const mouseLayers = container.querySelectorAll<HTMLElement>('.parallax-mouse-layer');
        const xQuickTos: Array<(val: number) => void> = [];
        const yQuickTos: Array<(val: number) => void> = [];

        mouseLayers.forEach((layer) => {
            xQuickTos.push(gsap.quickTo(layer, 'x', { duration: 0.65, ease: 'power2.out' }));
            yQuickTos.push(gsap.quickTo(layer, 'y', { duration: 0.65, ease: 'power2.out' }));
        });

        // Counter-parallax on title for pronounced focal depth
        const titleXQuickTo = titleRef.current
            ? gsap.quickTo(titleRef.current, 'x', { duration: 0.85, ease: 'power2.out' })
            : null;
        const titleYQuickTo = titleRef.current
            ? gsap.quickTo(titleRef.current, 'y', { duration: 0.85, ease: 'power2.out' })
            : null;

        const handleMouseMove = (e: MouseEvent) => {
            // Full-screen normalized coordinates (-1 to +1)
            const nx = (e.clientX / window.innerWidth - 0.5) * 2;
            const ny = (e.clientY / window.innerHeight - 0.5) * 2;

            mouseLayers.forEach((_, idx) => {
                const factor = cardConfigs[idx]?.parallaxFactor ?? 1;
                // Clearly visible physical parallax displacement (up to ~65px)
                const px = nx * factor * 42;
                const py = ny * factor * 34;
                xQuickTos[idx]?.(px);
                yQuickTos[idx]?.(py);
            });

            titleXQuickTo?.(nx * -14);
            titleYQuickTo?.(ny * -10);
        };

        const handleMouseLeave = () => {
            mouseLayers.forEach((_, idx) => {
                xQuickTos[idx]?.(0);
                yQuickTos[idx]?.(0);
            });
            titleXQuickTo?.(0);
            titleYQuickTo?.(0);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.addEventListener('mouseleave', handleMouseLeave);

        // 4. Subtle Organic Idle Levitation (Continuous Micro-Parallax)
        const floatLayers = container.querySelectorAll<HTMLElement>('.parallax-float-layer');
        const floatTweens: gsap.core.Tween[] = [];

        floatLayers.forEach((layer, idx) => {
            const floatAmp = 5 + (idx % 3) * 2; // 5px to 9px amplitude
            const floatDuration = 3.6 + (idx % 4) * 0.5; // 3.6s to 5.1s period
            const tw = gsap.to(layer, {
                y: `+=${floatAmp}`,
                duration: floatDuration,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: (idx * 0.16) % 1.2,
            });
            floatTweens.push(tw);
        });

        const refreshTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 150);

        return () => {
            clearTimeout(refreshTimer);
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            floatTweens.forEach((tw) => tw.kill());
            ctx.revert();
            cards.forEach((cardEl) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (cardEl as any).vanillaTilt?.destroy();
            });
        };
    }, [cardConfigs]);

    return (
        <section
            ref={containerRef}
            className={cn(
                "relative grid min-h-screen w-full place-items-center overflow-hidden bg-[#FFFFFF] [grid-template-areas:'stack'] [grid-template-columns:100%] [grid-template-rows:100%]",
                className
            )}
        >
            {/* 3D Tilted Cards Canvas - Spherical Dome Canopy */}
            <div
                ref={gridRef}
                className="[grid-area:stack] relative h-full w-full pointer-events-none overflow-hidden [perspective:1200px]"
            >
                {cardConfigs.map((config, index) => (
                    <div
                        key={index}
                        style={config.style}
                        className={cn(
                            "tilt-wrapper absolute [perspective:1000px] pointer-events-auto will-change-[transform,opacity]",
                            config.className
                        )}
                    >
                        {/* 1. Mouse Parallax Layer (Smooth GSAP quickTo follow) */}
                        <div className="parallax-mouse-layer h-full w-full will-change-transform">
                            {/* 2. Ambient Floating Layer (Subtle organic sine levitation) */}
                            <div className="parallax-float-layer h-full w-full will-change-transform">
                                {/* 3. Dome Spherical Transform */}
                                <div
                                    className="h-full w-full will-change-transform"
                                    style={{
                                        transform: `translateZ(${config.translateZ ?? 0}px) rotate(${config.rotateZ ?? 0}deg)`,
                                    }}
                                >
                                    {/* 4. Direct Hover 3D Tilt Card */}
                                    <div
                                        className="vanilla-tilt-card h-full w-full rounded-2xl bg-cover bg-center border border-black/[0.08] shadow-[0_20px_45px_-12px_rgba(0,0,0,0.16)] bg-white cursor-pointer [transform-style:preserve-3d] will-change-transform transition-shadow duration-300 hover:shadow-[0_28px_55px_-10px_rgba(0,0,0,0.22)]"
                                        style={{
                                            backgroundImage: `url(${config.image})`,
                                            transform: `perspective(900px) rotateX(${config.rotateX}deg) rotateY(${config.rotateY}deg)`,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Center Typography & CTA */}
            <div
                ref={titleRef}
                className="[grid-area:stack] relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto pointer-events-auto"
            >
                {children ? (
                    children
                ) : (
                    <>
                        {badge && (
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100/90 text-neutral-800 text-xs font-semibold uppercase tracking-wider border border-neutral-200 backdrop-blur-sm shadow-sm mb-6">
                                <Sparkles className="w-3.5 h-3.5 text-[#0B5D3B]" />
                                <span>{badge}</span>
                            </div>
                        )}

                        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-[-0.04em] text-[#111111] leading-[1.02] max-w-4xl mx-auto">
                            {title}
                        </h1>

                        {description && (
                            <p className="mt-6 text-base sm:text-lg md:text-xl text-neutral-600 font-sans max-w-2xl mx-auto leading-relaxed text-balance font-light">
                                {description}
                            </p>
                        )}

                        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                            {buttonText && (
                                <button
                                    type="button"
                                    onClick={onButtonClick}
                                    className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#0B5D3B] text-white font-semibold text-sm sm:text-base shadow-[0_4px_16px_rgba(11,93,59,0.35)] hover:bg-[#084C30] hover:scale-105 transition-all duration-200"
                                >
                                    <span>{buttonText}</span>
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                </button>
                            )}

                            {secondaryButtonText && (
                                <button
                                    type="button"
                                    onClick={onSecondaryButtonClick}
                                    className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-neutral-50 text-neutral-900 font-semibold text-sm sm:text-base border border-neutral-300 shadow-sm hover:scale-105 transition-all duration-200"
                                >
                                    <span>{secondaryButtonText}</span>
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

// Aliases for seamless imports
export const UnspokenFormation = TenthFormation;
export type UnspokenFormationProps = TenthFormationProps;

export default TenthFormation;
