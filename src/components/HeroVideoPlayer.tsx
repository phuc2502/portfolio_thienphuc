import React, { useRef, useState, useEffect } from 'react';

interface HeroVideoPlayerProps {
    videoUrl: string;
    onBack?: () => void;
}

const HeroVideoPlayer: React.FC<HeroVideoPlayerProps> = ({ videoUrl, onBack }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isLooping, setIsLooping] = useState(false); // For smooth loop transition
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => setCurrentTime(video.currentTime);
        const handleLoadedMetadata = () => setDuration(video.duration);

        // Smooth loop transition
        const handleEnded = () => {
            setIsLooping(true);
            // Fade out, wait, then restart
            setTimeout(() => {
                video.currentTime = 0;
                video.play();
                setTimeout(() => {
                    setIsLooping(false);
                }, 300); // Fade in duration
            }, 500); // Pause duration at end
        };

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('ended', handleEnded);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('ended', handleEnded);
        };
    }, []);

    // Auto-hide controls after 3 seconds of no mouse movement
    const handleMouseMove = () => {
        setIsHovered(true);
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
        hoverTimeoutRef.current = setTimeout(() => {
            setIsHovered(false);
        }, 3000);
    };

    const handleMouseLeave = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
        setIsHovered(false);
    };

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            video.play();
            setIsPaused(false);
        } else {
            video.pause();
            setIsPaused(true);
        }
    };

    const formatTime = (time: number) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.floor(time % 60);
        return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div
            className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Video Container */}
            <div
                className={`relative transition-all duration-700 ease-[0.33,1,0.68,1] ${isHovered
                    ? 'w-[60%] h-[60%] rounded-lg overflow-hidden'
                    : 'w-full h-full'
                    }`}
            >
                <video
                    ref={videoRef}
                    src={videoUrl}
                    autoPlay
                    playsInline
                    className={`w-full h-full object-cover transition-opacity duration-500 ${isLooping ? 'opacity-0' : 'opacity-100'}`}
                    style={{
                        imageRendering: 'crisp-edges',
                        filter: 'contrast(1.05) saturate(1.08) brightness(1.02)',
                        WebkitBackfaceVisibility: 'hidden',
                        backfaceVisibility: 'hidden',
                        transform: 'translateZ(0)',
                    }}
                    onClick={togglePlay}
                />
            </div>

            {/* Controls Overlay - visible on hover */}
            <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
            >
                {/* Back Button */}
                <button
                    onClick={onBack}
                    className="absolute top-8 left-8 mono text-[11px] tracking-[0.3em] uppercase text-white/60 hover:text-white transition-colors pointer-events-auto flex items-center gap-2"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    BACK
                </button>

                {/* Bottom Controls */}
                <div className="absolute bottom-0 left-0 right-0 p-8 pointer-events-auto">
                    {/* Title */}
                    <p className="mono text-[10px] tracking-[0.4em] uppercase text-white/50 mb-2">
                        INTRODUCTION
                    </p>

                    {/* Time and Progress */}
                    <div className="flex items-center gap-6">
                        {/* Play/Pause Button */}
                        <button
                            onClick={togglePlay}
                            className="text-white hover:text-white/80 transition-colors"
                        >
                            {isPaused ? (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <polygon points="5 3 19 12 5 21 5 3" />
                                </svg>
                            ) : (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <rect x="6" y="4" width="4" height="16" />
                                    <rect x="14" y="4" width="4" height="16" />
                                </svg>
                            )}
                        </button>

                        {/* Time Display */}
                        <span className="mono text-[24px] md:text-[32px] font-light text-white tracking-wide">
                            {formatTime(currentTime)}
                        </span>

                        {/* Progress Bar */}
                        <div className="flex-1 h-[2px] bg-white/20 relative cursor-pointer group"
                            onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const percentage = x / rect.width;
                                if (videoRef.current) {
                                    videoRef.current.currentTime = percentage * duration;
                                }
                            }}
                        >
                            <div
                                className="absolute top-0 left-0 h-full bg-white transition-all duration-100"
                                style={{ width: `${progress}%` }}
                            />
                            <div
                                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroVideoPlayer;
