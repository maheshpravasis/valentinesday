document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const proposalContent = document.getElementById('proposal-content');
    const successContent = document.getElementById('success-content');

    // Messages to cycle through on hover/click of No button (optional enhancement)
    const noTexts = ["No", "Are you sure?", "Really?", "Think again!", "Last chance!", "Pretty please?", "Don't do this!", "I'm gonna cry...", "You're breaking my heart ;("];
    let noClickCount = 0;

    // Mobile: Move mostly on touch start to prevent clicking
    // Desktop: Move on mouseover

    const moveButton = () => {
        const container = document.querySelector('.container');
        const containerRect = container.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();

        // Calculate maximum bounds within the container
        // We want the button to stay roughly within the container but move around randomly
        // Let's use the window size for more freedom if needed, or stick to container.
        // Sticking to container is safer for UX so it doesn't disappear off screen.

        // However, standard "evade" buttons often go wild. Let's keep it somewhat contained but wide.
        const maxX = window.innerWidth - btnRect.width - 50;
        const maxY = window.innerHeight - btnRect.height - 50;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        // Apply absolute positioning to move it
        noBtn.style.position = 'fixed'; // Break out of flow to move freely
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';

        // Optional: Change text
        // noClickCount++;
        // if (noClickCount < noTexts.length) {
        //     noBtn.textContent = noTexts[noClickCount];
        // }
    };

    noBtn.addEventListener('mouseover', moveButton);
    noBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Verify this isn't triggered by keyboard or fast taps
        moveButton();
    });
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent default tap behavior
        moveButton();
    });

    yesBtn.addEventListener('click', () => {
        // Celebration!
        proposalContent.classList.add('hidden');
        successContent.classList.remove('hidden');

        // Trigger confetti
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
            // since particles fall down, start a bit higher than random
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
            heart.style.animationDuration = Math.random() * 2 + 3 + 's'; // 3-5s
            document.body.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, 300);
    }
});
