// ---- HERO ENTRANCE SEQUENCE ----
// Start as soon as the DOM is ready so external resources cannot block the sequence.
const startHeroEntrance = () => {
    const img = document.querySelector('.hero-image img');
    if (!img) return;

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
    const musicHint = document.querySelector('.music-hint');

    const revealAll = () => {
        img.style.opacity = '1';
        img.style.transform = 'translate(0, 0) scale(1)';
        img.style.borderColor = 'white';
        heroQuote?.classList.add('visible');
        quoteName?.classList.add('visible');
        quoteTitle?.classList.add('visible');
        quoteText?.classList.add('visible');
        seeMoreArrow?.classList.add('visible');
        seeMoreText?.classList.add('visible');
        musicHint?.classList.add('visible');
        musicBtnImg?.classList.add('visible');
        workBtn?.classList.add('visible');
    };

    // 1) Jump photo to viewport center and fade in
    setTimeout(() => {
        img.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.18)`;
        img.style.borderColor = 'transparent';

        requestAnimationFrame(() => {
            img.style.transition = 'opacity 0.32s ease-out';
            img.style.opacity = '1';

            // 2) Wait, then slide photo into its flex position
            setTimeout(() => {
                img.style.transition = 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.45s ease-out';
                img.style.transform = 'translate(0, 0) scale(1)';
                img.style.borderColor = 'white';

                // 3) Chain all remaining animations relative to this point
                setTimeout(() => {
                    heroQuote?.classList.add('visible');
                }, 120);

                setTimeout(() => {
                    quoteName?.classList.add('visible');
                }, 220);

                setTimeout(() => {
                    quoteTitle?.classList.add('visible');
                }, 320);

                setTimeout(() => {
                    quoteText?.classList.add('visible');
                }, 420);

                setTimeout(() => {
                    seeMoreArrow?.classList.add('visible');
                }, 550);

                setTimeout(() => {
                    seeMoreText?.classList.add('visible');
                }, 650);

                // Music hint, music button and work button appear
                setTimeout(() => {
                    musicHint?.classList.add('visible');
                    musicBtnImg?.classList.add('visible');
                    workBtn?.classList.add('visible');
                }, 760);

            }, 80);
        });
    }, 50);

    // Ensure content never remains hidden if a browser interrupts a transition.
    setTimeout(revealAll, 1600);
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startHeroEntrance, { once: true });
} else {
    startHeroEntrance();
}

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
