// Cleaned and improved script.js

document.addEventListener('DOMContentLoaded', async function() {
    // Hide loader after page load
    setTimeout(function() {
        document.querySelector('.loader').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.loader').style.display = 'none';
        }, 500);
    }, 1500);

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });

    // Load works data
    let articlesData = await loadWorksData();
    articlesData.sort((a, b) => new Date(b.date) - new Date(a.date));

    const worksGrid = document.getElementById('works-grid');
    const paginationContainer = document.getElementById('pagination');
    const cardsPerPage = 6;
    let currentPage = 1;
    let currentFilter = 'all';

    function renderWorks(filter = 'all', page = 1) {
        worksGrid.innerHTML = '';
        currentPage = page;
        currentFilter = filter;

        const filteredWorks = filter === 'all' ? articlesData : articlesData.filter(work => work.category === filter);
        const totalPages = Math.ceil(filteredWorks.length / cardsPerPage);
        const startIndex = (page - 1) * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;
        const currentArticles = filteredWorks.slice(startIndex, endIndex);

        if (currentArticles.length === 0) {
            worksGrid.innerHTML = `<div class="col-12 text-center"><p class="text-muted">No articles found in this category.</p></div>`;
            paginationContainer.innerHTML = '';
            return;
        }

        currentArticles.forEach(work => {
            const workCard = document.createElement('div');
            workCard.className = 'col-md-6 col-lg-4';
            workCard.innerHTML = `
                <div class="work-card" data-category="${work.category}">
                    <div class="work-image" style="background-image: url('${work.image}')">
                        <span class="work-category">${work.category.charAt(0).toUpperCase() + work.category.slice(1)}</span>
                    </div>
                    <div class="work-info">
                        <span class="work-date">${work.date}</span>
                        <h3>${work.title}</h3>
                        <p>${work.excerpt}</p>
                        <a class="work-link" data-id="${work.id}">Read Article <i class="fas fa-arrow-right ms-2"></i></a>
                    </div>
                </div>
            `;
            worksGrid.appendChild(workCard);
            setTimeout(() => workCard.querySelector('.work-card').classList.add('visible'), 200);
        });

        document.querySelectorAll('.work-link').forEach(button => {
            button.addEventListener('click', () => openArticle(button.getAttribute('data-id')));
        });

        renderPagination(totalPages);
    }

    function renderPagination(totalPages) {
        paginationContainer.innerHTML = '';
        const addPageButton = (page, label = null, disabled = false, active = false) => {
            const li = document.createElement('li');
            li.className = 'page-item' + (disabled ? ' disabled' : '') + (active ? ' active' : '');
            li.innerHTML = `<a class="page-link" href="#">${label || page}</a>`;
            li.addEventListener('click', e => {
                e.preventDefault();
                if (!disabled && page !== currentPage) renderWorks(currentFilter, page);
            });
            paginationContainer.appendChild(li);
        };

        addPageButton(currentPage - 1, '«', currentPage === 1);

        const maxPagesToShow = 5;
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        for (let i = startPage; i <= endPage; i++) addPageButton(i, null, false, i === currentPage);

        addPageButton(currentPage + 1, '»', currentPage === totalPages);
    }

    function openArticle(articleId) {
        const article = articlesData.find(item => item.id == articleId);
        if (!article) return;
        history.pushState({ articleId }, '', `?article=${articleId}`);
        document.getElementById('full-article-title').textContent = article.title;
        document.getElementById('full-article-date').textContent = article.date;
        document.getElementById('full-article-content').innerHTML = article.content;
        document.getElementById('fullArticleView').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeFullArticle() {
        document.getElementById('fullArticleView').style.display = 'none';
        document.body.style.overflow = '';
        history.replaceState(null, '', window.location.pathname);
    }

    document.getElementById('closeFullArticle').addEventListener('click', closeFullArticle);
    document.getElementById('backToWorks').addEventListener('click', closeFullArticle);
    window.addEventListener('popstate', e => { if (!e.state || !e.state.articleId) closeFullArticle(); });

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function () {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            renderWorks(this.getAttribute('data-filter'), 1);
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    const btnText = contactForm.querySelector('.btn-text');
    const btnLoader = contactForm.querySelector('.btn-loader');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        btnLoader.classList.add('active');
        btnText.style.opacity = '0';

        emailjs.sendForm('service_g9k3i1j', 'template_90jva0k', contactForm)
            .then(() => {
                btnLoader.classList.remove('active');
                btnText.style.opacity = '1';
                formSuccess.style.display = 'block';
                contactForm.reset();
                setTimeout(() => formSuccess.style.display = 'none', 5000);
            })
            .catch(() => {
                btnLoader.classList.remove('active');
                btnText.style.opacity = '1';
                formError.style.display = 'block';
                setTimeout(() => formError.style.display = 'none', 5000);
            });
    });

    function animateOnScroll() {
        const elements = document.querySelectorAll('.contact-item, .section-header');
        elements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight / 1.3) {
                el.classList.add('visible');
            }
        });
    }

    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    renderWorks();
});

async function loadWorksData() {
    try {
        const response = await fetch('works.json');
        if (!response.ok) throw new Error('Network error');
        return await response.json();
    } catch {
        return [
            {
                id: 0,
                title: "Sample Article",
                category: "misc",
                date: "June 1, 2025",
                excerpt: "This is a fallback article.",
                image: "https://via.placeholder.com/800x500?text=Sample",
                content: "<p>This is sample content used as a fallback when data fails to load.</p>"
            }
        ];
    }
}
