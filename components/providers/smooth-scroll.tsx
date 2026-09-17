'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({
            lerp: 0.08,
            smoothWheel: true,
            wheelMultiplier: 0.9,
        });
        lenisRef.current = lenis;

        lenis.on('scroll', ScrollTrigger.update);

        const updateTicker = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(updateTicker);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(updateTicker);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    // The root layout (and this provider) stays mounted across client-side
    // navigations, so Lenis's own scroll offset otherwise carries over from
    // whatever page you were just on. Snap it — and the native scroll
    // position it's meant to mirror — back to the top on every route change.
    useEffect(() => {
        lenisRef.current?.scrollTo(0, { immediate: true });
        window.scrollTo(0, 0);
    }, [pathname]);

    return <>{children}</>;
}
