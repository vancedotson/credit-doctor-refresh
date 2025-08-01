"use client";

import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import vanceHeadshot from "@/assets/VANCE DOTSON BG (2) (1).png";

function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute", className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-[2px] border-2 border-white/[0.15]",
                        "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
                    )}
                />
            </motion.div>
        </motion.div>
    );
}

function HeroGeometric({
    badge = "Credit Repair Expert",
    title1 = "Fix Your Credit Score",
    title2 = "Fast & Guaranteed",
    description = "Expert credit repair services that get results. Improve your credit score and unlock better financial opportunities with our proven 4-step process.",
    children,
}: {
    badge?: string;
    title1?: string;
    title2?: string;
    description?: string;
    children?: React.ReactNode;
}) {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1] as const,
            },
        }),
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303] pt-24 md:pt-0">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/[0.05] via-transparent to-blue-500/[0.05] blur-3xl" />

            <div className="absolute inset-0 overflow-hidden">
                <ElegantShape
                    delay={0.3}
                    width={600}
                    height={140}
                    rotate={12}
                    gradient="from-green-500/[0.15]"
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                />

                <ElegantShape
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    gradient="from-blue-500/[0.15]"
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                />

                <ElegantShape
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-8}
                    gradient="from-emerald-500/[0.15]"
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                />

                <ElegantShape
                    delay={0.6}
                    width={200}
                    height={60}
                    rotate={20}
                    gradient="from-yellow-500/[0.15]"
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                />

                <ElegantShape
                    delay={0.7}
                    width={150}
                    height={40}
                    rotate={-25}
                    gradient="from-cyan-500/[0.15]"
                    className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                />
            </div>

            {/* Vance Headshot - Desktop: Large dramatic presence, Mobile: In content flow */}
            <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                    duration: 1.2,
                    delay: 0.8,
                    ease: [0.23, 0.86, 0.39, 0.96],
                }}
                className="hidden md:block absolute right-[-15%] top-[25%] transform -translate-y-1/2 z-20"
            >
                <div className="relative">
                    <img 
                        src={vanceHeadshot} 
                        alt="Vance Dotson - Credit Repair Expert" 
                        className="h-[85vh] w-auto object-contain"
                    />
                    {/* Gradient fade overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/60 to-transparent pointer-events-none" 
                         style={{ maskImage: 'linear-gradient(to top, black 0%, black 75%, transparent 100%)' }} />
                </div>
            </motion.div>

            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        custom={0}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.08] border border-white/[0.20] mb-4 md:mb-4 md:mt-16"
                    >
                        <Circle className="h-2 w-2 fill-green-500/80" />
                        <span className="text-sm text-white/80 tracking-wide">
                            {badge}
                        </span>
                    </motion.div>

                    <motion.div
                        custom={1}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight leading-none sm:leading-tight">
                            <span className="text-white drop-shadow-lg block">
                                {title1}
                            </span>
                            <span
                                className={cn(
                                    "bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-white/90 to-blue-300 drop-shadow-lg block"
                                )}
                            >
                                {title2}
                            </span>
                        </h1>
                    </motion.div>

                    <motion.div
                        custom={2}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <p className="text-lg sm:text-xl md:text-xl text-white/90 mb-8 leading-relaxed font-medium tracking-wide max-w-2xl mx-auto px-4 drop-shadow-md">
                            {description}
                        </p>
                    </motion.div>

                    {children && (
                        <motion.div
                            custom={3}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {children}
                        </motion.div>
                    )}
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
        </div>
    );
}

export { HeroGeometric };
