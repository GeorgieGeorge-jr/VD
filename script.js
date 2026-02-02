document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const body = document.body;
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const successMessage = document.getElementById('successMessage');
    const clickCountElement = document.getElementById('clickCount');
    const floatingElementsContainer = document.getElementById('floatingElements');
    
    // State variables
    let clickCount = 0;
    let noClicked = false;
    let yesSize = 1;
    let chaosInterval = null;
    let floatingElements = [];
    
    // Initialize the website
    initWebsite();
    
    function initWebsite() {
        // Create floating elements
        createFloatingElements();
        
        // Setup event listeners
        setupEventListeners();
        
        // Handle window resize
        setupResizeHandler();
    }
    
    function createFloatingElements() {
        // Clear any existing floating elements
        floatingElementsContainer.innerHTML = '';
        floatingElements = [];
        
        const elementTypes = ['heart', 'balloon', 'sticker'];
        const emotes = ['💖', '😍', '🥰', '💕', '💘', '💝', '💞', '😘', '🌸', '🌹', '💌'];
        const colors = ['#ff6b8b', '#ffafcc', '#ffd6e0', '#cdb4db', '#a2d2ff'];
        
        // Calculate number of elements based on screen size
        const screenArea = window.innerWidth * window.innerHeight;
        const elementCount = Math.min(Math.max(Math.floor(screenArea / 15000), 15), 30);
        
        for (let i = 0; i < elementCount; i++) {
            createFloatingElement(elementTypes, emotes, colors, i);
        }
    }
    
    function createFloatingElement(elementTypes, emotes, colors, index) {
        const element = document.createElement('div');
        element.classList.add('floating-element');
        
        // Random type
        const type = elementTypes[Math.floor(Math.random() * elementTypes.length)];
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random size
        const size = 20 + Math.random() * 60;
        
        // Random animation properties
        const delay = Math.random() * 5;
        const duration = 5 + Math.random() * 10;
        
        // Set position and size
        element.style.left = `${posX}vw`;
        element.style.top = `${posY}vh`;
        element.style.animationDelay = `${delay}s`;
        element.style.animationDuration = `${duration}s`;
        
        if (type === 'heart') {
            element.classList.add('heart');
            element.innerHTML = '<i class="fas fa-heart"></i>';
            element.style.color = colors[Math.floor(Math.random() * colors.length)];
            element.style.fontSize = `${size}px`;
        } 
        else if (type === 'balloon') {
            element.classList.add('balloon');
            const balloonColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Assign color class
            if (balloonColor.includes('ff6b8b')) {
                element.classList.add('red');
            } else if (balloonColor.includes('ffafcc')) {
                element.classList.add('pink');
            } else {
                element.classList.add('purple');
            }
            
            element.style.backgroundColor = balloonColor;
            element.style.width = `${size}px`;
            element.style.height = `${size * 1.4}px`;
        } 
        else {
            element.classList.add('sticker');
            element.textContent = emotes[Math.floor(Math.random() * emotes.length)];
            element.style.fontSize = `${size}px`;
        }
        
        floatingElementsContainer.appendChild(element);
        floatingElements.push(element);
    }
    
    function setupEventListeners() {
        // No button click event
        noBtn.addEventListener('click', handleNoClick);
        
        // Yes button click event
        yesBtn.addEventListener('click', handleYesClick);
        
        // Prevent context menu on buttons
        yesBtn.addEventListener('contextmenu', e => e.preventDefault());
        noBtn.addEventListener('contextmenu', e => e.preventDefault());
    }
    
    function handleNoClick() {
        if (!noClicked) {
            noClicked = true;
            body.classList.add('chaos');
        }
        
        // Update click counter
        clickCount++;
        clickCountElement.textContent = clickCount;
        
        // Start or intensify chaos mode
        startChaosMode();
        
        // Temporarily disable yes button
        disableYesButtonTemporarily();
        
        // Increase yes button size
        increaseYesButtonSize();
    }
    
    function startChaosMode() {
        // Clear existing interval if any
        if (chaosInterval) {
            clearInterval(chaosInterval);
        }
        
        // Set interval based on click count (faster with more clicks)
        const intervalTime = Math.max(100, 500 - (clickCount * 20));
        
        chaosInterval = setInterval(() => {
            createChaosButton();
            
            // Speed up floating elements
            floatingElements.forEach(el => {
                const currentDuration = parseFloat(el.style.animationDuration) || 8;
                el.style.animationDuration = `${Math.max(0.5, currentDuration * 0.9)}s`;
            });
            
        }, intervalTime);
    }
    
    function createChaosButton() {
        // Create a duplicate of the yes button
        const clone = yesBtn.cloneNode(true);
        clone.classList.add('chaos-btn');
        
        // Random position within viewport
        const randomX = Math.random() * (window.innerWidth - 200);
        const randomY = Math.random() * (window.innerHeight - 100);
        
        clone.style.position = 'fixed';
        clone.style.left = `${randomX}px`;
        clone.style.top = `${randomY}px`;
        clone.style.zIndex = '1000';
        clone.style.transform = `scale(${0.5 + Math.random()}) rotate(${Math.random() * 360}deg)`;
        
        // Make it non-functional
        clone.onclick = function(e) {
            e.stopPropagation();
            e.preventDefault();
            return false;
        };
        
        // Add to body
        document.body.appendChild(clone);
        
        // Remove after some time to avoid too many elements
        setTimeout(() => {
            if (clone.parentNode) {
                clone.parentNode.removeChild(clone);
            }
        }, 3000);
    }
    
    function disableYesButtonTemporarily() {
        yesBtn.style.pointerEvents = 'none';
        yesBtn.style.opacity = '0.7';
        
        setTimeout(() => {
            yesBtn.style.pointerEvents = 'auto';
            yesBtn.style.opacity = '1';
        }, 1000);
    }
    
    function increaseYesButtonSize() {
        yesSize += 0.1;
        yesBtn.style.transform = `scale(${Math.min(yesSize, 3)})`;
    }
    
    function handleYesClick() {
        // Stop chaos mode
        stopChaosMode();
        
        // Show success message
        showSuccessMessage();
        
        // Start celebration
        startCelebration();
    }
    
    function stopChaosMode() {
        if (chaosInterval) {
            clearInterval(chaosInterval);
            chaosInterval = null;
        }
        
        body.classList.remove('chaos');
        
        // Remove all chaos buttons
        const chaosButtons = document.querySelectorAll('.chaos-btn');
        chaosButtons.forEach(btn => {
            if (btn.parentNode) {
                btn.parentNode.removeChild(btn);
            }
        });
        
        // Reset floating elements speed
        floatingElements.forEach(el => {
            el.style.animationDuration = '';
        });
    }
    
    function showSuccessMessage() {
        // Hide buttons and counter
        document.querySelector('.buttons-container').style.display = 'none';
        document.getElementById('counter').style.display = 'none';
        
        // Show success message
        successMessage.style.display = 'block';
        successMessage.classList.add('pulse');
    }
    
    function startCelebration() {
        // Create celebration elements
        const celebrationCount = Math.min(50, Math.floor(window.innerWidth * window.innerHeight / 5000));
        
        for (let i = 0; i < celebrationCount; i++) {
            setTimeout(() => {
                createCelebrationElement(i);
            }, i * 50);
        }
        
        // Add confetti effect
        createConfetti();
    }
    
    function createCelebrationElement(index) {
        const heart = document.createElement('div');
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        heart.style.position = 'fixed';
        heart.style.color = getRandomColor();
        heart.style.fontSize = `${15 + Math.random() * 25}px`;
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.top = `100vh`;
        heart.style.zIndex = '1001';
        heart.style.opacity = '0.9';
        heart.style.pointerEvents = 'none';
        
        document.body.appendChild(heart);
        
        // Animate the heart
        const animation = heart.animate([
            { 
                transform: 'translateY(0) rotate(0deg)', 
                opacity: 1 
            },
            { 
                transform: `translateY(-${window.innerHeight + 100}px) rotate(${360 + Math.random() * 360}deg)`, 
                opacity: 0 
            }
        ], {
            duration: 1500 + Math.random() * 2000,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
        });
        
        // Remove after animation
        animation.onfinish = () => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        };
    }
    
    function createConfetti() {
        const confettiCount = 100;
        const colors = ['#ff6b8b', '#ffafcc', '#4a9eff', '#ffd166', '#06d6a0'];
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.top = '-10px';
            confetti.style.zIndex = '1000';
            confetti.style.opacity = '0.8';
            confetti.style.pointerEvents = 'none';
            
            document.body.appendChild(confetti);
            
            // Animate confetti
            const animation = confetti.animate([
                { 
                    transform: 'translateY(0) rotate(0deg)', 
                    opacity: 1 
                },
                { 
                    transform: `translateY(${window.innerHeight + 20}px) rotate(${360 + Math.random() * 360}deg) translateX(${(Math.random() - 0.5) * 200}px)`, 
                    opacity: 0 
                }
            ], {
                duration: 2000 + Math.random() * 2000,
                easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
            });
            
            // Remove after animation
            animation.onfinish = () => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            };
        }
    }
    
    function getRandomColor() {
        const colors = ['#ff6b8b', '#ff4d7e', '#ffafcc', '#cdb4db', '#a2d2ff', '#ffd166'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    function setupResizeHandler() {
        let resizeTimeout;
        
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            
            resizeTimeout = setTimeout(() => {
                // Recreate floating elements on resize
                createFloatingElements();
                
                // Reset yes button size
                yesBtn.style.transform = `scale(${yesSize})`;
                
                // If in chaos mode, stop and restart to clean up
                if (noClicked) {
                    stopChaosMode();
                    startChaosMode();
                }
            }, 250);
        });
    }
    
    // Prevent zoom on mobile
    document.addEventListener('touchstart', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
    
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(e) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
});