document.addEventListener('DOMContentLoaded', function() {
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

            // Initialize works
            const worksData = [
{
    id: 2,
    title: "Understanding RPM: A Key Metric in Digital Monetization",
    category: "features",
    date: "June 2, 2025",
    excerpt: "A clear explanation of RPM, why it matters for publishers, and how it influences digital revenue strategies.",
    image: "https://images.unsplash.com/photo-1565372912404-e29b6a20b295?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
    content: `
        <p>As digital content grows exponentially, understanding how revenue is generated has become crucial for content creators and publishers. One of the most important metrics in this landscape is RPM — Revenue Per Mille, or revenue per thousand impressions.</p>

        <img src="https://images.unsplash.com/photo-1581093588401-c68c6b66f15c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80" alt="Digital Revenue">

        <p>RPM measures how much money a website or platform earns for every 1,000 page views or ad impressions. It provides a more realistic picture of how well monetization strategies are working, especially when dealing with advertising networks like Google AdSense or other programmatic platforms.</p>

        <div class="article-quote">
            "RPM doesn't just track revenue — it tells the story of how efficiently your audience is being monetized."
        </div>

        <p>Unlike CPC (Cost Per Click) or CPM (Cost Per Mille), which focus on advertiser spending, RPM focuses on the publisher’s earnings. It's calculated by dividing the estimated earnings by the number of impressions, then multiplying by 1,000.</p>

        <h4>How to Calculate RPM</h4>

        <p>The formula is straightforward:</p>

        <pre><code>RPM = (Estimated Earnings / Number of Impressions) × 1000</code></pre>

        <p>For example, if you earned ₹500 from 25,000 page views, your RPM would be ₹20. This helps compare different revenue sources or evaluate the impact of changes in website layout, ad formats, or traffic sources.</p>

        <h4>Why RPM Matters</h4>

        <p>RPM acts as a diagnostic tool. A rising RPM indicates that your traffic is being monetized more effectively — possibly due to better ad placements, higher quality traffic, or increased user engagement. On the other hand, a low or declining RPM could suggest issues such as:</p>

        <ul>
            <li><strong>Low Ad Engagement:</strong> Visitors may not be interacting with ads.</li>
            <li><strong>Poor Targeting:</strong> Ads are not relevant to the audience.</li>
            <li><strong>Unoptimized Layout:</strong> Ads aren't placed strategically on the page.</li>
            <li><strong>Traffic Source Quality:</strong> Some sources may deliver low-paying traffic.</li>
        </ul>

        <h4>Strategies to Improve RPM</h4>

        <p>To increase your RPM, consider the following strategies:</p>

        <ul>
            <li>Experiment with different ad formats and placements.</li>
            <li>Improve content quality to increase session duration.</li>
            <li>Use lazy loading to improve page speed without hurting ad viewability.</li>
            <li>Target high-value keywords and audience segments.</li>
            <li>Enable header bidding or work with premium ad networks.</li>
        </ul>

        <p>In the dynamic world of digital publishing, RPM stands out as a core metric to evaluate and enhance revenue generation. Understanding it is the first step toward building a sustainable content business online.</p>
    `
}
,
                {
                    id: 2,
                    title: "Youth and Politics: The Disconnect",
                    category: "opinion",
                    date: "May 22, 2025",
                    excerpt: "Exploring why young voters feel alienated from the political process and what can be done.",
                    image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
                    content: `
                        <p>India has the world's largest youth population, with over 600 million people under the age of 25. Yet, political engagement among young voters remains surprisingly low. In the last general election, only 58% of eligible voters aged 18-25 cast their ballots, compared to 67% of the overall electorate.</p>
                        
                        <p>This disconnect between youth and politics is a growing concern for the health of our democracy. As a journalism student who has interviewed dozens of young Indians across the country, I've identified several key reasons for this alienation:</p>
                        
                        <h4>Perceived Irrelevance</h4>
                        
                        <p>Many young people feel that mainstream politics doesn't address issues that matter to them. While politicians debate ideological positions, young voters are concerned about practical issues like employment opportunities, educational quality, mental health support, and climate change.</p>
                        
                        <img src="https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80" alt="Youth and Politics">
                        
                        <h4>Lack of Representation</h4>
                        
                        <p>The average age of Members of Parliament in India is 54, while the median age of the population is 28. This generational gap creates a representation problem. Young voters struggle to see themselves reflected in the political leadership.</p>
                        
                        <div class="article-quote">
                            "When I look at Parliament, I see people who could be my grandparents, not people who understand my life experiences."
                        </div>
                        
                        <p>This sentiment was echoed by many students I spoke with at universities across India.</p>
                        
                        <h4>Digital Disconnect</h4>
                        
                        <p>While political parties have embraced digital campaigning, their engagement often feels superficial. Bombarding young voters with WhatsApp forwards and social media ads isn't the same as meaningful engagement. Many young people see political communication as one-way broadcasting rather than genuine dialogue.</p>
                        
                        <h4>Bridging the Gap</h4>
                        
                        <p>How can we engage young voters more effectively? Based on my research, several approaches show promise:</p>
                        
                        <ul>
                            <li><strong>Issue-Based Campaigning:</strong> Focus on concrete policy proposals rather than personality cults.</li>
                            <li><strong>Youth Wings with Real Power:</strong> Give young party members meaningful roles in decision-making.</li>
                            <li><strong>Civic Education:</strong> Strengthen civics curriculum in schools and colleges.</li>
                            <li><strong>Digital Town Halls:</strong> Create platforms for genuine dialogue between candidates and young voters.</li>
                        </ul>
                        
                        <p>Engaging young voters isn't just about securing their votes; it's about ensuring the long-term health of our democracy. When young people feel disconnected from the political process, we all lose the fresh perspectives and innovative ideas that could address India's most pressing challenges.</p>
                    `
                },
                {
                    id: 3,
                    title: "Local Heroes: Community Response During Floods",
                    category: "news",
                    date: "April 10, 2025",
                    excerpt: "Documenting the extraordinary efforts of ordinary citizens during the recent floods in Bihar.",
                    image: "https://images.unsplash.com/photo-1583321500900-82807e458f3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
                    content: `
                        <p>BIHAR - When the Koshi River breached its banks last month, flooding dozens of villages in Bihar's Supaul district, the government response was slow to arrive. But long before official rescue teams reached the area, ordinary citizens had already sprung into action, creating an inspiring story of community resilience.</p>
                        
                        <p>I spent two weeks documenting these efforts, traveling by boat through flooded villages to capture stories of courage and compassion in the face of disaster.</p>
                        
                        <h4>The Fishermen Turned Rescuers</h4>
                        
                        <p>Mohammad Asif, a 42-year-old fisherman from Murliganj, became an unlikely hero when the floods hit. Using his small fishing boat, he rescued over 120 people from submerged homes in the first 48 hours of flooding.</p>
                        
                        <img src="https://images.unsplash.com/photo-1501426026826-31c667bdf23d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1952&q=80" alt="Flood Rescue">
                        
                        <p>"I've lived by this river all my life," Asif told me. "I know its moods and dangers. When I saw the water rising so fast, I knew people would need help."</p>
                        
                        <p>Asif worked non-stop for three days, sleeping only in brief naps between rescue missions. His small boat, designed for catching fish, became a lifeline for entire families stranded on rooftops.</p>
                        
                        <h4>The Community Kitchen</h4>
                        
                        <p>In Saharsa, 65-year-old Saroj Devi transformed her partially flooded home into a community kitchen. With help from neighbors, she cooked meals for over 500 displaced people daily, using whatever supplies they could salvage or collect through donations.</p>
                        
                        <div class="article-quote">
                            "In times of crisis, food is more than nutrition—it's comfort, community, and hope."
                        </div>
                        
                        <p>Despite water reaching waist-level in her courtyard, Saroj and her team continued cooking, wading through water to distribute meals to relief camps and stranded families.</p>
                        
                        <h4>The Student Volunteers</h4>
                        
                        <p>College students from Patna formed a volunteer network that became crucial in coordinating relief efforts. Using social media and messaging apps, they created real-time maps of affected areas, identified people in need of rescue, and directed resources where they were most needed.</p>
                        
                        <p>Riya Sharma, a 21-year-old engineering student, led a team that developed a simple but effective flood tracking system using Google Maps and WhatsApp. "Technology gave us a way to help when we couldn't be there physically," she explained.</p>
                        
                        <h4>Lessons in Resilience</h4>
                        
                        <p>These stories highlight a powerful truth: in times of crisis, community bonds often prove stronger than any disaster. While government systems are essential for large-scale response, it's the local heroes like Asif, Saroj, and Riya who provide the immediate, life-saving assistance when disaster strikes.</p>
                        
                        <p>As climate change makes extreme weather events more frequent, these stories of community resilience offer both inspiration and a model for how we might better prepare for future disasters.</p>
                    `
                }
            ];

            const worksGrid = document.getElementById('works-grid');
            
            // Function to render works
            function renderWorks(filter = 'all') {
                worksGrid.innerHTML = '';
                
                const filteredWorks = filter === 'all' 
                    ? worksData 
                    : worksData.filter(work => work.category === filter);
                
                filteredWorks.forEach(work => {
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
            }
            
            // Function to open article in modal
            function openArticle(articleId) {
                const article = worksData.find(item => item.id == articleId);
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
                    renderWorks(filter);
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