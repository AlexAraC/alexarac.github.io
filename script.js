// ---- HERO ENTRANCE SEQUENCE ----
// Photo appears at viewport center, then moves to its flex position.
// All subsequent text/button animations are chained via JS so they
// stay in sync regardless of image load time.
window.addEventListener('load', () => {
    const img = document.querySelector('.hero-image img');
    const rect = img.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = window.innerWidth / 2 - centerX;
    const offsetY = window.innerHeight / 2 - centerY;

    const heroQuote = document.querySelector('.hero-quote');
    const quoteName = document.querySelector('.quote-name');
    const quoteTitle = document.querySelector('.quote-title');
    const quoteText = document.querySelector('.quote-text');
    const seeMoreArrow = document.querySelector('.see-more-arrow');
    const seeMoreText = document.querySelector('.see-more-text');
    const musicBtnImg = document.querySelector('#music-btn img');
    const workBtn = document.querySelector('#work-btn');

    // 1) Jump photo to viewport center and fade in
    setTimeout(() => {
        img.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.35)`;
        img.style.borderColor = 'transparent';

        requestAnimationFrame(() => {
            img.style.transition = 'opacity 0.3s ease-out';
            img.style.opacity = '1';

            // 2) Wait, then slide photo into its flex position
            setTimeout(() => {
                img.style.transition = 'transform 0.6s ease-out 0.1s, border-color 0.6s ease-out 0.1s';
                img.style.transform = 'translate(0, 0) scale(1)';
                img.style.borderColor = 'rgba(0, 0, 0, 0.6)';

                // 3) Chain all remaining animations relative to this point
                setTimeout(() => {
                    heroQuote.classList.add('visible');
                }, 400);

                setTimeout(() => {
                    quoteName.classList.add('visible');
                }, 600);

                setTimeout(() => {
                    quoteTitle.classList.add('visible');
                }, 700);

                setTimeout(() => {
                    quoteText.classList.add('visible');
                }, 800);

                setTimeout(() => {
                    seeMoreArrow.classList.add('visible');
                }, 1000);

                setTimeout(() => {
                    seeMoreText.classList.add('visible');
                }, 1200);

                // Music hint, music button and work button appear
                setTimeout(() => {
                    document.querySelector('.music-hint').classList.add('visible');
                    musicBtnImg.classList.add('visible');
                    workBtn.classList.add('visible');
                }, 1400);

            }, 200);
        });
    }, 500);
});

// ---- NAVBAR SCROLL TRANSPARENCY ----
// Transparent at top, gets background when scrolled past hero
const navbar = document.querySelector('.NavbarMain');
if (navbar) {
    const handleScroll = () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}

// ---- NAVBAR FALL-DOWN ANIMATION ----
// Each link falls from above with a staggered delay
document.querySelectorAll('.listClass a:not(#music-btn)').forEach((link, i) => {
    link.style.animation = `fallDown 0.5s ease-out ${i * 0.15}s forwards`;
    link.style.opacity = '0';
});

// ---- BACKGROUND MUSIC TOGGLE ----
// Click the music button to play/pause Minecraft Calm 2
const audio = document.getElementById('bg-music');
audio.volume = 0.3;

const musicBtn = document.getElementById('music-btn');
const musicIcon = document.getElementById('music-icon');
let isPlaying = false;

musicBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (isPlaying) {
        audio.pause();
        musicIcon.src = 'Pics/icon_musicOff.png';
    } else {
        audio.play();
        musicIcon.src = 'Pics/icon_musicOn.png';
    }
    isPlaying = !isPlaying;
});

// ---- SCROLL-IN FADE FOR TECHNOLOGIES SECTION ----
const techSection = document.querySelector('.technologies-section');
if (techSection) {
    const techObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                techSection.classList.add('visible');
                techObserver.unobserve(techSection);
            }
        });
    }, { threshold: 0.25 });
    techObserver.observe(techSection);
}

// ---- SCROLL-IN FADE FOR PROJECTS TITLE ----
// When .ProyectsConteiner enters viewport, trigger color-cycle + fade-in
const projectsSection = document.querySelector('.ProyectsConteiner');
if (projectsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                projectsSection.classList.add('visible');
                observer.unobserve(projectsSection);
            }
        });
    }, { threshold: 0.3 });
    observer.observe(projectsSection);
}

// ---- SCROLL-IN ANIMATION FOR PROJECT CARDS ----
// When a project card enters the viewport, trigger border + content fall-in
const projectCards = document.querySelectorAll('.project-card');
if (projectCards.length > 0) {
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    projectCards.forEach(card => cardObserver.observe(card));
}

// ---- SCROLL-IN FOR GOALS SECTION ----
const goalsSection = document.querySelector('.goals-section');
if (goalsSection) {
    const goalsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                goalsSection.classList.add('visible');
                goalsObserver.unobserve(goalsSection);
            }
        });
    }, { threshold: 0.2 });
    goalsObserver.observe(goalsSection);
}

// ---- ABOUT CAROUSEL ----
const aboutSection = document.querySelector('.about-section');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                aboutSection.classList.add('visible');
                aboutObserver.unobserve(aboutSection);

                const cards = aboutSection.querySelectorAll('.about-card');
                const prevBtn = aboutSection.querySelector('.about-arrow-left');
                const nextBtn = aboutSection.querySelector('.about-arrow-right');
                let currentIndex = 0;
                let animating = false;

                const showCard = (index, direction) => {
                    if (animating) return;
                    animating = true;

                    const current = cards[currentIndex];
                    const next = cards[index];

                    current.classList.remove('active', 'exit-left', 'exit-right', 'enter-left', 'enter-right');
                    next.classList.remove('active', 'exit-left', 'exit-right', 'enter-left', 'enter-right');

                    if (direction === 'next') {
                        current.classList.add('exit-left');
                        next.classList.add('enter-right');
                    } else {
                        current.classList.add('exit-right');
                        next.classList.add('enter-left');
                    }

                    const onAnimationEnd = () => {
                        current.classList.remove('exit-left', 'exit-right', 'enter-left', 'enter-right');
                        next.classList.remove('exit-left', 'exit-right', 'enter-left', 'enter-right');
                        next.classList.add('active');
                        currentIndex = index;
                        animating = false;
                        next.removeEventListener('animationend', onAnimationEnd);
                    };

                    next.addEventListener('animationend', onAnimationEnd);
                };

                requestAnimationFrame(() => {
                    cards[0].classList.add('active');
                });

                prevBtn.addEventListener('click', () => {
                    const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
                    showCard(prevIndex, 'prev');
                });

                nextBtn.addEventListener('click', () => {
                    const nextIndex = (currentIndex + 1) % cards.length;
                    showCard(nextIndex, 'next');
                });
            }
        });
    }, { threshold: 0.2 });
    aboutObserver.observe(aboutSection);
}

// ---- SCROLL-IN FOR SKILLS SECTION ----
const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillsSection.classList.add('visible');
                skillsObserver.unobserve(skillsSection);
            }
        });
    }, { threshold: 0.2 });
    skillsObserver.observe(skillsSection);
}

// ---- CLICK CURSOR VARIANT ----
// Switch to a pressed-state cursor while the mouse is held down
document.addEventListener('mousedown', () => {
    document.body.style.cursor = "url('cursorset/sm_Normal_1.cur'), auto";
});

document.addEventListener('mouseup', () => {
    document.body.style.cursor = "url('cursorset/sm_Normal.cur'), auto";
});
