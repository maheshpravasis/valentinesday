let currentStep = 1;
let noClickCount = 0;
const noTexts = ["No", "Are you sure?", "Really?", "Think again!", "Last chance!", "Pretty please?", "Don't do this!", "I'm gonna cry...", "You're breaking my heart ;("];

function nextStep(step) {
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    document.getElementById(`step-${currentStep}`).classList.add('hidden');

    currentStep = step;

    document.getElementById(`step-${currentStep}`).classList.remove('hidden');
    document.getElementById(`step-${currentStep}`).classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const successContent = document.getElementById('success-content');

    const moveButton = () => {
        const container = document.querySelector('.container');
        const btnRect = noBtn.getBoundingClientRect();

        const maxX = window.innerWidth - btnRect.width - 50;
        const maxY = window.innerHeight - btnRect.height - 50;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        noBtn.style.position = 'fixed';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';

        // Increase Yes button size
        let currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
        let currentPadding = parseFloat(window.getComputedStyle(yesBtn).paddingTop);

        yesBtn.style.fontSize = (currentSize * 1.2) + 'px';
        yesBtn.style.padding = (currentPadding * 1.2) + 'px ' + (currentPadding * 2.5) + 'px';

        // Change No button text
        noClickCount++;
        if (noClickCount < noTexts.length) {
            noBtn.innerText = noTexts[noClickCount];
        } else {
            noBtn.innerText = noTexts[Math.floor(Math.random() * noTexts.length)];
        }
    };

    noBtn.addEventListener('mouseover', moveButton);
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moveButton();
    });
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveButton();
    });

    yesBtn.addEventListener('click', () => {
        document.getElementById(`step-${currentStep}`).classList.add('hidden');
        successContent.classList.remove('hidden');
        successContent.classList.add('active');

        var duration = 5 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInOut(min, max) {
            return Math.random() * (max - min) + min;
        }

        var interval = setInterval(function () {
            var timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            var particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInOut(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInOut(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);

        createFloatingHearts();
    });

    function createFloatingHearts() {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 2 + 3 + 's';
            document.body.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, 300);
    }
});
