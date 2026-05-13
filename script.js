    // ===== ROUTING =====
    const pages = {
      'home':           'page-home',
      'blogs':          'page-blogs',
      'blog-react-seo': 'page-blog-react-seo',
      'blog-js-tips':   'page-blog-js-tips',
      'blog-seo-basics':'page-blog-seo-basics',
      'about':          'page-about',
      'contact':        'page-contact',
    };

    const pageMeta = {
      'home':           { title: 'NextGen DevHub — Developer Blog & Resources', desc: 'Deep dives into React, JavaScript, SEO, and web performance.' },
      'blogs':          { title: 'Blog — NextGen DevHub', desc: 'All articles on React, JavaScript, SEO, CSS, and performance.' },
      'blog-react-seo': { title: 'The Complete React SEO Guide — NextGen DevHub', desc: 'SSR, dynamic meta tags, and everything for React SEO in 2024.' },
      'blog-js-tips':   { title: '10 JavaScript Performance Tips — NextGen DevHub', desc: 'Debouncing, tree shaking, and practical JS optimizations.' },
      'blog-seo-basics':{ title: 'Semantic HTML Is Your Best SEO Strategy — NextGen DevHub', desc: 'Why proper HTML structure beats any meta tag trick.' },
      'about':          { title: 'About — NextGen DevHub', desc: 'A developer learning project — building an SEO blog from scratch.' },
      'contact':        { title: 'Contact — NextGen DevHub', desc: 'Get in touch with NextGen DevHub.' },
    };

    let current = 'home';

    function navigate(page) {
      if (!pages[page]) return;

      // Hide current
      const prev = document.getElementById(pages[current]);
      if (prev) prev.classList.remove('active');

      // Show new
      const next = document.getElementById(pages[page]);
      if (next) next.classList.add('active');

      current = page;

      // Update meta tags
      const meta = pageMeta[page] || pageMeta['home'];
      document.getElementById('page-title').textContent = meta.title;
      document.getElementById('page-desc').setAttribute('content', meta.desc);
      document.getElementById('og-title').setAttribute('content', meta.title);
      document.getElementById('og-desc').setAttribute('content', meta.desc);
      document.getElementById('tw-title').setAttribute('content', meta.title);
      document.getElementById('tw-desc').setAttribute('content', meta.desc);

      // Update nav active state
      document.querySelectorAll('.nav-links a').forEach(a => {
        const p = a.getAttribute('data-page');
        a.classList.toggle('active', p === page || (page.startsWith('blog') && p === 'blogs'));
      });

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ===== BLOG FILTERING =====
    function filterBlogs(cat, btn) {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.blog-row').forEach(row => {
        const rowCat = row.getAttribute('data-cat');
        row.style.display = (cat === 'all' || rowCat === cat) ? 'flex' : 'none';
      });
    }

    // ===== CONTACT FORM =====
    function submitForm() {
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const msg = document.getElementById('contact-message').value.trim();
      if (!name || !email || !msg) {
        alert('Please fill in your name, email, and message.');
        return;
      }
      document.getElementById('contact-form').style.display = 'none';
      document.getElementById('form-success').style.display = 'block';
    }

    // ===== HAMBURGER MENU =====
    function toggleMenu() {
      const links = document.querySelector('.nav-links');
      const cta = document.querySelector('.nav-cta');
      const isOpen = links.style.display === 'flex';
      links.style.display = isOpen ? 'none' : 'flex';
      links.style.flexDirection = 'column';
      links.style.position = 'absolute';
      links.style.top = '64px';
      links.style.left = '0'; links.style.right = '0';
      links.style.background = 'var(--bg2)';
      links.style.padding = '16px';
      links.style.borderBottom = '1px solid var(--border)';
      if (isOpen) links.style.display = 'none';
      else links.style.display = 'flex';
    }

    // Keyboard accessibility for cards
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target.hasAttribute('tabindex')) {
        e.target.click();
      }
    });

    // Init nav
    navigate('home');