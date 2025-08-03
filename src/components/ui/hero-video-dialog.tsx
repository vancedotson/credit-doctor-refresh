"use client"

import { useState, useRef, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Play, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

// Mobile Calendar Popup Component
function MobileCalendarPopup() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button 
        size="lg"
        onClick={() => setIsOpen(true)}
        className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 text-lg"
      >
        Book A Call
      </Button>
      
      {isOpen && (
        <div className="fixed inset-0 z-[999] bg-white">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-[1000] bg-black/80 hover:bg-black text-white rounded-full p-2"
          >
            <XIcon className="size-5" />
          </button>
          
          {/* Simple Full Screen Iframe */}
          <iframe 
            src="https://api.leadconnectorhq.com/widget/booking/wIj3efrLkHV48JTqc2Rs" 
            className="w-full h-full border-0"
            title="Book a Call"
          />
        </div>
      )}
    </>
  )
}

type AnimationStyle =
  | "from-bottom"
  | "from-center"
  | "from-top"
  | "from-left"
  | "from-right"
  | "fade"
  | "top-in-bottom-out"
  | "left-in-right-out"

interface HeroVideoProps {
  animationStyle?: AnimationStyle
  videoSrc: string
  thumbnailSrc: string
  thumbnailAlt?: string
  className?: string
}

const animationVariants = {
  "from-bottom": {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "from-center": {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
  },
  "from-top": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
  "from-left": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  },
  "from-right": {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "top-in-bottom-out": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "left-in-right-out": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
}

export function HeroVideoDialog({
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className,
}: HeroVideoProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const thumbnailVideoRef = useRef<HTMLVideoElement>(null)
  const modalVideoRef = useRef<HTMLVideoElement>(null)
  const selectedAnimation = animationVariants[animationStyle]

  const handleOpenModal = () => {
    setIsVideoOpen(true)
  }

  const handleCloseModal = () => {
    setIsVideoOpen(false)
    // Reset modal video when closing
    if (modalVideoRef.current) {
      modalVideoRef.current.currentTime = 0
      modalVideoRef.current.pause()
    }
  }

  useEffect(() => {
    if (isVideoOpen && modalVideoRef.current) {
      // Reset video to beginning and play with sound
      modalVideoRef.current.currentTime = 0
      modalVideoRef.current.muted = false
      modalVideoRef.current.play()
    }
  }, [isVideoOpen])

  return (
    <div className={cn("relative", className)}>
      <div
        className="relative cursor-pointer group"
        onClick={handleOpenModal}
      >
        {/* Autoplay muted compressed video */}
        <video
          ref={thumbnailVideoRef}
          src="/Vancetutorialcompress.mp4"
          className="w-full transition-all duration-200 group-hover:brightness-[0.8] ease-out rounded-md shadow-lg border"
          autoPlay
          muted
          loop
          playsInline
          onError={() => {
            // Fallback to thumbnail image if video fails to load
            if (thumbnailVideoRef.current) {
              thumbnailVideoRef.current.style.display = 'none';
              const img = document.createElement('img');
              img.src = thumbnailSrc;
              img.alt = thumbnailAlt;
              img.className = "w-full transition-all duration-200 group-hover:brightness-[0.8] ease-out rounded-md shadow-lg border";
              thumbnailVideoRef.current.parentNode?.appendChild(img);
            }
          }}
        />
        <div className="absolute inset-0 flex flex-col group-hover:scale-100 scale-[0.9] transition-all duration-200 ease-out rounded-2xl">
          {/* Overlay Text - Moved Higher */}
          <div 
            className="text-white text-3xl md:text-4xl font-black text-center px-4 mt-8 mb-auto uppercase"
            style={{ 
              textShadow: '2px 2px 0 black, -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 2px 0 0 black, -2px 0 0 black, 0 2px 0 black, 0 -2px 0 black'
            }}
          >
            Click here to watch the video
          </div>
          
          {/* Play Button - Positioned in Center-Bottom Area */}
          <div className="flex justify-center mb-16">
            <div className="bg-primary/10 flex items-center justify-center rounded-full backdrop-blur-md size-28">
              <div
                className={`flex items-center justify-center bg-gradient-to-b from-primary/30 to-primary shadow-md rounded-full size-20 transition-all ease-out duration-200 relative group-hover:scale-[1.2] scale-100`}
              >
                <Play
                  className="size-8 text-white fill-white group-hover:scale-105 scale-100 transition-transform duration-200 ease-out"
                  style={{
                    filter:
                      "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleCloseModal}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
          >
            <motion.div
              {...selectedAnimation}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-4xl mx-4 md:mx-0"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button 
                onClick={handleCloseModal}
                className="absolute -top-16 right-0 text-white text-xl bg-neutral-900/50 ring-1 backdrop-blur-md rounded-full p-2 dark:bg-neutral-100/50 dark:text-black"
              >
                <XIcon className="size-5" />
              </motion.button>
              <div className="flex flex-col">
                <div className="w-full border-2 border-white rounded-2xl overflow-hidden isolate z-[1] relative">
                  {/* Use local compressed video file for consistent quality and proper sizing */}
                  <video
                    ref={modalVideoRef}
                    src="/Vancetutorialcompress.mp4"
                    className="w-full h-auto rounded-2xl"
                    controls
                    playsInline
                    preload="metadata"
                  />
                </div>
                
                {/* Book A Call Button with 40px margin */}
                <div className="flex justify-center mt-10">
                  {/* Desktop Dialog */}
                  <div className="hidden sm:block">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="lg"
                          className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 text-lg"
                        >
                          Book A Call
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[1200px] max-h-[90vh] p-0">
                        <div className="w-full h-[800px] pointer-events-auto">
                          <iframe 
                            src="https://api.leadconnectorhq.com/widget/booking/wIj3efrLkHV48JTqc2Rs" 
                            style={{ width: '100%', border: 'none', overflow: 'hidden', height: '100%', pointerEvents: 'auto' }} 
                            scrolling="no" 
                            id="wIj3efrLkHV48JTqc2Rs_desktop"
                            className="pointer-events-auto"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  
                  {/* Mobile Custom Popup */}
                  <div className="block sm:hidden">
                    <MobileCalendarPopup />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
