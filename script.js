 document.addEventListener('DOMContentLoaded', function() {
            const container = document.querySelector('.container');
            const yesBtn = document.getElementById('yesBtn');
            const noBtn = document.getElementById('noBtn');
            const successMessage = document.getElementById('successMessage');
            const clickCountElement = document.getElementById('clickCount');
            const body = document.body;
            
            let clickCount = 0;
            let noClicked = false;
            let yesSize = 1;
            let chaosInterval;
            
            // Create floating elements
            function createFloatingElements() {
                const elementTypes = ['heart', 'balloon', 'sticker'];
                const emotes = ['💖', '😍', '🥰', '💕', '💘', '💝', '💞', '😘', '🌸', '🌹', '💌'];
                const colors = ['#ff6b8b', '#ffafcc', '#ffd6e0', '#cdb4db', '#a2d2ff'];
                
                // Create 25 floating elements
                for (let i = 0; i < 25; i++) {
                    const element = document.createElement('div');
                    element.classList.add('floating-element');
                    
                    // Random position
                    const posX = Math.random() * 100;
                    const posY = Math.random() * 100;
                    
                    // Random size
                    const size = 20 + Math.random() * 60;
                    
                    // Random animation delay
                    const delay = Math.random() * 5;
                    
                    // Random animation duration
                    const duration = 5 + Math.random() * 10;
                    
                    // Set position and size
                    element.style.left = `${posX}vw`;
                    element.style.top = `${posY}vh`;
                    element.style.fontSize = `${size}px`;
                    element.style.animationDelay = `${delay}s`;
                    element.style.animationDuration = `${duration}s`;
                    
                    // Random element type
                    const type = elementTypes[Math.floor(Math.random() * elementTypes.length)];
                    
                    if (type === 'heart') {
                        element.classList.add('heart');
                        element.innerHTML = '<i class="fas fa-heart"></i>';
                        element.style.color = colors[Math.floor(Math.random() * colors.length)];
                    } 
                    else if (type === 'balloon') {
                        element.classList.add('balloon');
                        const balloonColor = colors[Math.floor(Math.random() * colors.length)];
                        element.classList.add(balloonColor.includes('ff6b8b') ? 'red' : 
                                            balloonColor.includes('ffafcc') ? 'pink' : 'purple');
                        element.style.backgroundColor = balloonColor;
                        element.style.width = `${size}px`;
                        element.style.height = `${size * 1.4}px`;
                    } 
                    else {
                        element.classList.add('sticker');
                        element.textContent = emotes[Math.floor(Math.random() * emotes.length)];
                    }
                    
                    document.body.appendChild(element);
                }
            }
            
            // No button click event
            noBtn.addEventListener('click', function() {
                if (!noClicked) {
                    noClicked = true;
                    body.classList.add('chaos');
                    
                    // Start chaos mode
                    chaosInterval = setInterval(function() {
                        // Create a duplicate of the yes button
                        const clone = yesBtn.cloneNode(true);
                        clone.classList.add('pulse');
                        
                        // Random position
                        const randomX = Math.random() * (window.innerWidth - 200);
                        const randomY = Math.random() * (window.innerHeight - 100);
                        
                        clone.style.position = 'fixed';
                        clone.style.left = `${randomX}px`;
                        clone.style.top = `${randomY}px`;
                        clone.style.zIndex = '1000';
                        
                        // Make it non-functional
                        clone.onclick = function(e) {
                            e.stopPropagation();
                            return false;
                        };
                        
                        document.body.appendChild(clone);
                        
                        // Remove after a few seconds to avoid too many elements
                        setTimeout(() => {
                            if (clone.parentNode) {
                                clone.parentNode.removeChild(clone);
                            }
                        }, 3000);
                        
                        // Increase the original yes button size
                        yesSize += 0.1;
                        yesBtn.style.transform = `scale(${yesSize})`;
                        
                    }, 300); // Create a new button every 300ms
                }
                
                // Update click counter
                clickCount++;
                clickCountElement.textContent = clickCount;
                
                // Make the yes button temporarily impossible to click
                yesBtn.style.pointerEvents = 'none';
                setTimeout(() => {
                    yesBtn.style.pointerEvents = 'auto';
                }, 1000);
            });
            
            // Yes button click event
            yesBtn.addEventListener('click', function() {
                if (noClicked) {
                    // If chaos mode is active, stop it
                    clearInterval(chaosInterval);
                    body.classList.remove('chaos');
                    
                    // Remove all cloned buttons
                    const clonedButtons = document.querySelectorAll('.yes-btn.pulse');
                    clonedButtons.forEach(btn => {
                        if (btn !== yesBtn && btn.parentNode) {
                            btn.parentNode.removeChild(btn);
                        }
                    });
                }
                
                // Show success message
                successMessage.style.display = 'block';
                
                // Hide buttons and counter
                document.querySelector('.buttons-container').style.display = 'none';
                document.getElementById('counter').style.display = 'none';
                
                // Add celebration effect
                celebrate();
            });
            
            // Celebration effect when Yes is clicked
            function celebrate() {
                // Create more hearts
                for (let i = 0; i < 50; i++) {
                    setTimeout(() => {
                        const heart = document.createElement('div');
                        heart.innerHTML = '<i class="fas fa-heart"></i>';
                        heart.style.position = 'fixed';
                        heart.style.color = '#ff6b8b';
                        heart.style.fontSize = `${20 + Math.random() * 30}px`;
                        heart.style.left = `${Math.random() * 100}vw`;
                        heart.style.top = `${100}vh`;
                        heart.style.zIndex = '1001';
                        heart.style.opacity = '0.9';
                        
                        document.body.appendChild(heart);
                        
                        // Animate the heart
                        const animation = heart.animate([
                            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                            { transform: `translateY(-${window.innerHeight + 100}px) rotate(${360 + Math.random() * 360}deg)`, opacity: 0 }
                        ], {
                            duration: 2000 + Math.random() * 3000,
                            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
                        });
                        
                        // Remove after animation
                        animation.onfinish = () => {
                            if (heart.parentNode) {
                                heart.parentNode.removeChild(heart);
                            }
                        };
                    }, i * 100);
                }
                
                // Add a pulsing effect to the success message
                successMessage.classList.add('pulse');
            }
            
            // Initialize floating elements
            createFloatingElements();
        });