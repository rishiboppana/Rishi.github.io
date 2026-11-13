// Shared header/footer so every page stays in sync without a build step.
(function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  const section = page.startsWith('project-') ? 'index.html#projects' : page;
  const links = [
    ['index.html', 'Home'],
    ['index.html#projects', 'Projects'],
    ['experience.html', 'Experience'],
    ['education.html', 'Education'],
    ['resume.html', 'Resume'],
  ];
  const nav = links.map(([href, label]) =>
    `<a href="${href}"${href === section ? ' class="active" aria-current="page"' : ''}${href === 'resume.html' ? ' target="_blank" rel="noopener"' : ''}>${label}</a>`).join('');

  const head = document.createElement('header');
  head.className = 'site-head';
  head.innerHTML =
    `<nav class="pill" aria-label="Main">${nav}` +
    `<a class="cta" href="${page === 'index.html' ? '#contact' : 'index.html#contact'}"><span class="dot"></span><span class="cta-text">Contact</span></a></nav>` +
    `<a class="brand" href="index.html">Rishi <span>Visweswar</span></a>`;
  document.body.prepend(head);

  const foot = document.createElement('footer');
  foot.textContent = '© 2026 Rishi Visweswar Boppana · San Jose, CA';
  document.body.append(foot);

  // Contact button turns into "Available to work" once the visitor scrolls.
  const ctaText = head.querySelector('.cta-text');
  const onScroll = () => {
    const s = window.scrollY > 120;
    head.classList.toggle('scrolled', s);
    ctaText.textContent = s ? 'Available to work' : 'Contact';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); }
  }), { threshold: 0.08 });
  document.querySelectorAll('.fi').forEach(el => io.observe(el));
})();
