document.addEventListener('DOMContentLoaded', function () {
    // Hide loader after page loads
    setTimeout(function () {
        document.querySelector('.loader').style.opacity = '0';
        setTimeout(function () {
            document.querySelector('.loader').style.display = 'none';
        }, 500);
    }, 1000);

    // Header scroll effect
    window.addEventListener('scroll', function () {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            if (this.hash !== "") {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });

    // Intersection Observer for section animations
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Article Viewer (modal-style)
    const articleViewer = document.createElement('div');
    articleViewer.id = 'articleViewer';
    articleViewer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        color: black;
        z-index: 99999;
        overflow-y: auto;
        display: none;
        padding: 50px;
    `;
    document.body.appendChild(articleViewer);

    // Articles data
    const articles = [
        {
            id: 'winning-the-war',
            title: 'Winning the War',
            publication: 'Bespoke Magazine',
            date: 'Sep 12, 2030',
            image: 'images/cover.jpg',
            content: `
                <p class="lead">The conflict that shaped a generation finally reached its turning point last week as peace accords were signed in Geneva.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                <h2>The Turning Point</h2>
                <p>Vestibulum auctor dapibus neque...</p>
                <blockquote>
                    "We knew this was our moment to make a difference."
                    <footer>– General Sarah Chen</footer>
                </blockquote>
                <h2>Lessons Learned</h2>
                <p>Praesent dapibus, neque id cursus faucibus...</p>
            `
        },
        {
            id: 'foundation-day-festivities',
            title: 'Foundation Day Festivities',
            publication: 'The Reporter',
            date: 'Jul 25, 2030',
            image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=500&q=60',
            content: `
                <p class="lead">The campus lit up with joy and pride during the Foundation Day celebrations.</p>
                <p>Students showcased their talent through dance, music, and drama. The event concluded with a speech by the dean.</p>
            `
        },
        {
            id: 'the-golden-age',
            title: 'The Golden Age',
            publication: 'The Current Times',
            date: 'May 09, 2030',
            image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=500&q=60',
            content: `
                <p class="lead">Exploring how this decade reshaped journalism and revived ethical storytelling.</p>
                <p>As technology advanced, so did the responsibility to stay truthful in reporting.</p>
            `
        }
    ];

    // Function to create article cards
    function createArticleCards() {
        const worksGrid = document.getElementById('works-grid');
        worksGrid.innerHTML = '';

        articles.forEach((article, index) => {
            const col = document.createElement('div');
            col.className = 'col-md-6 col-lg-4';

            const articleCard = document.createElement('div');
            articleCard.className = 'work-card';
            articleCard.style.transitionDelay = `${index * 0.2}s`;

            articleCard.innerHTML = `
                <div class="work-image" style="background-image: url('${article.image}')"></div>
                <div class="work-info">
                    <h3>${article.title}</h3>
                    <p>${article.publication}</p>
                    <span class="work-date">${article.date}</span>
                   <a href="article.html?id=${article.id}" class="read-more">Read Article →</a>
                </div>
            `;

            col.appendChild(articleCard);
            worksGrid.appendChild(col);

            setTimeout(() => {
                articleCard.classList.add('visible');
            }, index * 200);
        });

        // Attach read more functionality
        document.querySelectorAll('.read-more').forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                const articleId = this.getAttribute('data-id');
                const article = articles.find(a => a.id === articleId);
                if (article) {
                    articleViewer.innerHTML = `
                        <button style="position:absolute;top:20px;right:30px;font-size:2rem;background:none;border:none;">&times;</button>
                        <h1 class="article-title text-center">${article.title}</h1>
                        <div class="article-meta text-center">
                            <span>${article.publication}</span>
                            <span>${article.date}</span>
                        </div>
                        <div class="article-image my-4">
                            <img src="${article.image}" class="img-fluid rounded" />
                        </div>
                        <div class="article-text">${article.content}</div>
                    `;
                    articleViewer.style.display = 'block';

                    // Close button
                    articleViewer.querySelector('button').addEventListener('click', () => {
                        articleViewer.style.display = 'none';
                    });

                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        });
    }

    // Load articles
    createArticleCards();

    // EmailJS Contact Form Functionality
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        emailjs.init('lFH2NXbYE_YSwua6m'); // Your EmailJS public key
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!this.checkValidity()) {
                e.stopPropagation();
                this.classList.add('was-validated');
                return;
            }

            const submitBtn = this.querySelector('button[type="submit"]');
            const submitText = submitBtn.querySelector('.submit-text');
            const spinner = submitBtn.querySelector('.spinner-border');

            submitText.textContent = 'Sending...';
            spinner.classList.remove('d-none');
            submitBtn.disabled = true;

            document.getElementById('formSuccess').classList.add('d-none');
            document.getElementById('formError').classList.add('d-none');

            emailjs.sendForm('service_g9k3i1j', 'template_90jva0k', this)
                .then(() => {
                    document.getElementById('formSuccess').classList.remove('d-none');
                    document.getElementById('formError').classList.add('d-none');
                    contactForm.reset();
                    contactForm.classList.remove('was-validated');
                })
                .catch((error) => {
                    document.getElementById('formError').classList.remove('d-none');
                    document.getElementById('formSuccess').classList.add('d-none');
                    console.error('EmailJS Error:', error);
                })
                .finally(() => {
                    submitText.textContent = 'Send Message';
                    spinner.classList.add('d-none');
                    submitBtn.disabled = false;

                    setTimeout(() => {
                        document.getElementById('formSuccess').classList.add('d-none');
                        document.getElementById('formError').classList.add('d-none');
                    }, 5000);
                });
        });

        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function () {
                if (this.checkValidity()) {
                    this.classList.remove('is-invalid');
                } else {
                    this.classList.add('is-invalid');
                }
            });
        });
    }
});
