    // Typing Animation
        const typedTextElement = document.getElementById('typed-text');
        const textArray = ['Youtube Automation Expert', 'Graphic Designer', 'Business Data Analyst', 'Video Editor', 'Entreprenuership Enthusiast'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeText() {
            const currentText = textArray[textIndex];
            
            if (isDeleting) {
                typedTextElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedTextElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = 20;
            if (isDeleting) typeSpeed /= 2;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % textArray.length;
                typeSpeed = 500;
            }

            setTimeout(typeText, typeSpeed);
        }

        // Start typing animation
        typeText();

        // Navigation functionality
        const mobileMenu = document.getElementById('mobile-menu');
        const navLinks = document.getElementById('nav-links');
        const navbar = document.getElementById('navbar');

        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Smooth scrolling and active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Close mobile menu
                navLinks.classList.remove('active');
                
                // Update active link
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Update active nav link based on scroll position
            const sections = document.querySelectorAll('section');
            const navLinksAll = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinksAll.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // Skills progress animation
        function animateSkills() {
            const skillBars = document.querySelectorAll('.skill-progress-bar');
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            });
        }

        // Project filtering
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(30px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animate skills when skills section is visible
                    if (entry.target.classList.contains('skills')) {
                        setTimeout(animateSkills, 300);
                    }
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Observe sections for skills animation
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        // Scroll to top button
        const scrollTopBtn = document.getElementById('scroll-top');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Contact form submission
        document.getElementById('contact-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const form = e.target;
            const formData = new FormData(form);
            const submitBtn = form.querySelector('button[type="submit"]');
            const name = formData.get('name');
            
            // Show loading state
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    alert(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon!`);
                    form.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                alert('Oops! There was a problem sending your message. Please try again or contact me directly at u4usmanmajeed313@gmail.com');
            } finally {
                // Restore button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });

        // Add some interactive effects
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Initialize animations on page load
        window.addEventListener('load', () => {
            // Trigger initial animations
            document.querySelectorAll('.fade-in').forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('visible');
                }, index * 100);
            });
        });

        // Project Slider functionality
        const slider = document.querySelector('.slider');
        const prevButton = document.querySelector('.prev-btn');
        const nextButton = document.querySelector('.next-btn');
        let slideIndex = 0;

        function updateSlider() {
            const slides = document.querySelectorAll('.slider img');
            if (slideIndex >= slides.length) slideIndex = 0;
            if (slideIndex < 0) slideIndex = slides.length - 1;
            slider.style.transform = `translateX(-${slideIndex * 100}%)`;
        }

        prevButton.addEventListener('click', () => {
            slideIndex--;
            updateSlider();
        });

        nextButton.addEventListener('click', () => {
            slideIndex++;
            updateSlider();
        });

        // Auto slide every 5 seconds
        setInterval(() => {
            slideIndex++;
            updateSlider();
        }, 5000);
