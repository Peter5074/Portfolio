document.addEventListener('DOMContentLoaded', async function() { // Add async here
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
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
            
            // Scroll to target
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });


            // Initialize articles
           let articlesData = []; // Declare articlesData at the top level
    
    async function loadWorksData() {
        try {
            const response = await fetch('works.json');
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Error loading works data:', error);
            // Fallback data in case JSON fails to load
            return [
                {
                    id: 1,
                    title: "Sample Article",
                    category: "news",
                    date: "June 1, 2025",
                    excerpt: "This is a sample article that appears when the JSON file fails to load.",
                    image: "https://via.placeholder.com/800x500?text=Sample+Image",
                    content: "<p>This is sample content that appears when the JSON file fails to load.</p>"
                }
            ];
        }
    }

    // Load works data first, then initialize the rest
    articlesData = await loadWorksData();


            // Pagination variables
            const worksGrid = document.getElementById('works-grid');
            const paginationContainer = document.getElementById('pagination');
            const cardsPerPage = 6;
            let currentPage = 1;
            let currentFilter = 'all';
            
            // Function to render works with pagination
            function renderWorks(filter = 'all', page = 1) {
                worksGrid.innerHTML = '';
                currentPage = page;
                currentFilter = filter;
                
                const filteredWorks = filter === 'all' 
                    ? articlesData 
                    : articlesData.filter(work => work.category === filter);
                
                // Calculate total pages
                const totalPages = Math.ceil(filteredWorks.length / cardsPerPage);
                
                // Get current page of articles
                const startIndex = (page - 1) * cardsPerPage;
                const endIndex = startIndex + cardsPerPage;
                const currentArticles = filteredWorks.slice(startIndex, endIndex);
                
                // Render articles
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
                    
                    // Make card visible after a short delay for animation
                    setTimeout(() => {
                        workCard.querySelector('.work-card').classList.add('visible');
                    }, 200);
                });
                
                // Add event listeners to the "Read Article" buttons
                document.querySelectorAll('.work-link').forEach(button => {
                    button.addEventListener('click', function() {
                        const articleId = this.getAttribute('data-id');
                        openArticle(articleId);
                    });
                });
                
                // Render pagination
                renderPagination(totalPages);
            }
            
            // Function to render pagination controls
            function renderPagination(totalPages) {
                paginationContainer.innerHTML = '';
                
                // Previous button
                const prevButton = document.createElement('li');
                prevButton.className = 'page-item' + (currentPage === 1 ? ' disabled' : '');
                prevButton.innerHTML = `<a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>`;
                prevButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (currentPage > 1) {
                        renderWorks(currentFilter, currentPage - 1);
                    }
                });
                paginationContainer.appendChild(prevButton);
                
                // Page numbers
                const maxPagesToShow = 5;
                let startPage, endPage;
                
                if (totalPages <= maxPagesToShow) {
                    startPage = 1;
                    endPage = totalPages;
                } else {
                    const maxPagesBeforeCurrent = Math.floor(maxPagesToShow / 2);
                    const maxPagesAfterCurrent = Math.ceil(maxPagesToShow / 2) - 1;
                    
                    if (currentPage <= maxPagesBeforeCurrent) {
                        startPage = 1;
                        endPage = maxPagesToShow;
                    } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
                        startPage = totalPages - maxPagesToShow + 1;
                        endPage = totalPages;
                    } else {
                        startPage = currentPage - maxPagesBeforeCurrent;
                        endPage = currentPage + maxPagesAfterCurrent;
                    }
                }
                
                for (let i = startPage; i <= endPage; i++) {
                    const pageItem = document.createElement('li');
                    pageItem.className = 'page-item' + (i === currentPage ? ' active' : '');
                    pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
                    pageItem.addEventListener('click', (e) => {
                        e.preventDefault();
                        renderWorks(currentFilter, i);
                    });
                    paginationContainer.appendChild(pageItem);
                }
                
                // Next button
                const nextButton = document.createElement('li');
                nextButton.className = 'page-item' + (currentPage === totalPages ? ' disabled' : '');
                nextButton.innerHTML = `<a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>`;
                nextButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) {
                        renderWorks(currentFilter, currentPage + 1);
                    }
                });
                paginationContainer.appendChild(nextButton);
            }
            
            // Function to open article in modal
            function openArticle(articleId) {
                const article = articlesData.find(item => item.id == articleId);
                if (!article) return;
                
                document.getElementById('article-title').textContent = article.title;
                document.getElementById('article-date').textContent = article.date;
                document.getElementById('article-content').innerHTML = article.content;
                
                const modal = document.querySelector('.article-modal');
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
            
            // Function to close modal
            function closeModal() {
                const modal = document.querySelector('.article-modal');
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Close modal when clicking on close button or outside content
            document.querySelector('.close-modal').addEventListener('click', closeModal);
            document.querySelector('.article-modal').addEventListener('click', function(e) {
                if (e.target === this) {
                    closeModal();
                }
            });
            
            // Close modal with Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeModal();
                }
            });
            
            // Initial render
            renderWorks();
            
            // Work filter functionality
            document.querySelectorAll('.filter-btn').forEach(button => {
                button.addEventListener('click', function() {
                    document.querySelectorAll('.filter-btn').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    this.classList.add('active');
                    
                    const filter = this.getAttribute('data-filter');
                    renderWorks(filter, 1);
                });
            });
            
           // Contact form submission
            const contactForm = document.getElementById('contactForm');
            const submitBtn = contactForm.querySelector('.btn-submit');
            const btnText = contactForm.querySelector('.btn-text');
            const btnLoader = contactForm.querySelector('.btn-loader');
            const formSuccess = document.getElementById('formSuccess');
            const formError = document.getElementById('formError');

            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();

                // Show loading state
                btnLoader.classList.add('active');
                btnText.style.opacity = '0';

                // Send email using EmailJS
                emailjs.sendForm('service_g9k3i1j', 'template_90jva0k', contactForm)
                    .then(() => {
                        // Hide loading state
                        btnLoader.classList.remove('active');
                        btnText.style.opacity = '1';

                        // Show success message
                        formSuccess.style.display = 'block';

                        // Reset form
                        contactForm.reset();

                        // Hide success message after 5 seconds
                        setTimeout(() => {
                            formSuccess.style.display = 'none';
                        }, 5000);
                    })
                    .catch((error) => {
                        console.error('EmailJS Error:', error);

                        // Hide loading state
                        btnLoader.classList.remove('active');
                        btnText.style.opacity = '1';

                        // Show error message
                        formError.style.display = 'block';

                        // Hide error message after 5 seconds
                        setTimeout(() => {
                            formError.style.display = 'none';
                        }, 5000);
                    });
            });

            
            // Animation on scroll
            function animateOnScroll() {
                const elements = document.querySelectorAll('.contact-item, .section-header');
                
                elements.forEach(element => {
                    const elementPosition = element.getBoundingClientRect().top;
                    const screenPosition = window.innerHeight / 1.3;
                    
                    if (elementPosition < screenPosition) {
                        element.classList.add('visible');
                    }
                });
            }
            
            // Initial check
            animateOnScroll();
            
            // Listen for scroll events
            window.addEventListener('scroll', animateOnScroll);
        });