let seconds = 30; // default duration
let timerInterval;
let isRunning = false;

function setInitialDuration() {
    const urlParams = new URLSearchParams(window.location.search);
    const duration = urlParams.get('duration');
    if (duration) {
        seconds = parseInt(duration);
    }
}

function celebrateCompletion() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function startTimer() {
    if (isRunning) return; // Prevent multiple timer instances
    
    const timerElement = document.getElementById('timer');
    if (!timerElement) {
        console.error('Timer element not found!');
        return;
    }

    isRunning = true;
    console.log("Timer started");
    
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
        seconds--;
        updateTimerDisplay();
        
        if (seconds <= 0) {
            stopTimer();
            celebrateCompletion(); // Add celebration before redirect
            setTimeout(() => {
                window.location.href = '1stpage.html';
            }, 2000); // Delay redirect to show confetti
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        isRunning = false;
    }
}

function pauseTimer() {
    stopTimer();
}

function resumeTimer() {
    if (seconds > 0) {
        startTimer();
    }
}

function resetTimer() {
    stopTimer();
    seconds = 30;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timerElement.textContent = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
}

function initializeTimer() {
    setInitialDuration();
    stopTimer();
    updateTimerDisplay();
    startTimer();
}

// Cleanup when page unloads
window.addEventListener('beforeunload', stopTimer);

export { initializeTimer, pauseTimer, resumeTimer, resetTimer };
