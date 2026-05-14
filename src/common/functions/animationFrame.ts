type animationFrame = {
    duration: number, // milliseconds
    animationFrameAction: (progress: number) => void
}

type AnimateFrameCancel = { cancel: (handle: number) => void }

export function animationFrame({ duration, animationFrameAction }: animationFrame): AnimateFrameCancel {
    // Timestamp of window
    let start: number | null = null
    let animationFrameId: number;

    const updateFrame = (timestamp: number) => {
        // Timestamp parameter is default from window.
        // Set it to start if the function is not started
        if (!start) start = timestamp;

        // Progress calc (%)
        const progress = Math.min((timestamp - start) / duration, 1);

        // Do action in frame
        animationFrameAction(progress);

        // if progress < 100% then keep running (Đệ quy - Recursive)
        if (progress < 1) {
            animationFrameId = requestAnimationFrame(updateFrame);
        } else {
            cancelAnimationFrame(animationFrameId)
        }
    }
    // Start
    animationFrameId = requestAnimationFrame(updateFrame);
    return { cancel: () => cancelAnimationFrame(animationFrameId) }
}
