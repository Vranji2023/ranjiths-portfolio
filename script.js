/* ===================================================================
   Ranjith Kumar V - Portfolio Script
   Natural interactions, copy-to-clipboard, toast and modals
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Toast Notification Helper
  const toast = document.getElementById('toast');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // --- Copy Email to Clipboard ---
  const copyButtons = document.querySelectorAll('.copy-email-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'vranjith2023@gmail.com';
      
      navigator.clipboard.writeText(email).then(() => {
        showToast('✓ Copied vranjith2023@gmail.com to clipboard!');
      }).catch(() => {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('✓ Copied vranjith2023@gmail.com to clipboard!');
      });
    });
  });

  // --- Theme Toggle ---
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme') || 'dark';

  if (storedTheme === 'light') {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.body.classList.contains('light-theme');
      if (isLight) {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        showToast('Switched to dark theme');
      } else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
        showToast('Switched to light theme');
      }
    });
  }

  // --- Mobile Navigation ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // --- Active Nav on Scroll ---
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollPos = window.pageYOffset + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const navItem = document.querySelector(`.nav-links a[href*='${id}']`);

      if (navItem) {
        if (scrollPos >= top && scrollPos < top + height) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  });

  // --- Resume Modal ---
  const resumeModal = document.getElementById('resume-modal');
  const openResumeBtn = document.getElementById('open-resume-btn');
  const closeResumeBtn = document.getElementById('close-resume-btn');
  const resumeBackdrop = document.getElementById('resume-backdrop');

  function openResume() {
    if (resumeModal) {
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResume() {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (openResumeBtn) openResumeBtn.addEventListener('click', openResume);
  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeResume);
  if (resumeBackdrop) resumeBackdrop.addEventListener('click', closeResume);

  // --- Project Deep-Dive Modal ---
  const projModal = document.getElementById('proj-modal');
  const projModalHeading = document.getElementById('proj-modal-heading');
  const projModalBody = document.getElementById('proj-modal-body');
  const closeProjBtn = document.getElementById('close-proj-btn');
  const projBackdrop = document.getElementById('proj-backdrop');

  const projectStories = {
    landcase: {
      title: 'LandCase AI — Technical Breakdown & Hackathon Learnings',
      body: `
        <div style="margin-bottom: 1.2rem;">
          <span style="display:inline-block; font-size:0.8rem; background:rgba(251,191,36,0.15); color:#fbbf24; border:1px solid rgba(251,191,36,0.3); padding:0.25rem 0.65rem; border-radius:999px; font-weight:700;">
            HACKASTORM 2.0 Finalist
          </span>
        </div>
        
        <h4 style="font-size:1.1rem; margin-bottom:0.4rem; color:var(--text-main);">The Motivation Behind the Project</h4>
        <p style="color:var(--text-muted); margin-bottom:1rem;">
          Indian land records often date back decades, with handwritten revenue documents, gazette notifications, and complex state laws. When disputes reach the High Court or Sub-Registrar, the average citizen is paralyzed by legal documentation fees. We asked: <em>"Can an LLM read this record and tell the user who is actually claiming what, without fabricating legal claims?"</em>
        </p>

        <h4 style="font-size:1.1rem; margin-bottom:0.4rem; color:var(--text-main);">My Specific Role: Prompt Architect</h4>
        <ul style="padding-left:1.2rem; margin-bottom:1.2rem; color:var(--text-muted);">
          <li style="margin-bottom:0.45rem;"><strong>Anti-Hallucination Prompts:</strong> Normal prompting leads LLMs to guess case numbers and survey plots. I implemented boundary guards that force the model to quote exact paragraph numbers or return a <code>null</code> flag if ambiguous.</li>
          <li style="margin-bottom:0.45rem;"><strong>Strict JSON Formatting:</strong> Wrapped all extractions inside validated schemas so our Flask backend could parse survey bounds and litigation status directly into our UI tables.</li>
          <li style="margin-bottom:0.45rem;"><strong>Google Antigravity IDE:</strong> We used Antigravity IDE to iterate quickly, inspect reasoning traces, and patch edge cases live under the 24-hour hackathon timer.</li>
        </ul>

        <h4 style="font-size:1.1rem; margin-bottom:0.4rem; color:var(--text-main);">What the Evaluators Loved</h4>
        <p style="color:var(--text-muted); margin-bottom:1.4rem;">
          The judges singled out the determinism of our output — rather than just spitting out a chat summary, our app rendered a clean timeline of disputes with citations.
        </p>

        <div style="display:flex; gap:0.75rem;">
          <a href="https://github.com/Vranji2023" target="_blank" class="btn btn-sm btn-primary">
            <i class="fa-brands fa-github"></i> Repository
          </a>
          <a href="mailto:vranjith2023@gmail.com?subject=Discussing%20LandCase%20AI" class="btn btn-sm btn-ghost">
            <i class="fa-regular fa-envelope"></i> Ask Me About It
          </a>
        </div>
      `
    },
    drdine: {
      title: 'Dr.Dine — Evolution from Web Rule Engine to ML + OCR',
      body: `
        <div style="margin-bottom: 1.2rem;">
          <span style="display:inline-block; font-size:0.8rem; background:rgba(56,189,248,0.15); color:#38bdf8; border:1px solid rgba(56,189,248,0.3); padding:0.25rem 0.65rem; border-radius:999px; font-weight:700;">
            Computer Vision + Scikit-Learn
          </span>
        </div>

        <h4 style="font-size:1.1rem; margin-bottom:0.4rem; color:var(--text-main);">Why Build It Twice?</h4>
        <p style="color:var(--text-muted); margin-bottom:1rem;">
          When I first built Dr.Dine, users had to manually type in what they were eating. While the Flask-based rule engine accurately scored meals against daily nutrient quotas, nobody wants to type out "maltodextrin, high-fructose corn syrup, soy lecithin" on a phone keyboard while standing in a supermarket aisle.
        </p>

        <h4 style="font-size:1.1rem; margin-bottom:0.4rem; color:var(--text-main);">Version 2 Engineering Highlights:</h4>
        <ul style="padding-left:1.2rem; margin-bottom:1.2rem; color:var(--text-muted);">
          <li style="margin-bottom:0.45rem;"><strong>Tesseract OCR Pipeline:</strong> Pre-processed food packaging images using grayscale, thresholding, and contrast adjustments to reliably extract tiny print from reflective plastic packets.</li>
          <li style="margin-bottom:0.45rem;"><strong>Logistic Regression Classifier:</strong> Trained a model in Jupyter Notebook using Pandas and NumPy to categorize risk profiles (safe vs. alert ingredients) according to conditions like Hypertension, Diabetes, or Celiac Disease.</li>
          <li style="margin-bottom:0.45rem;"><strong>Streamlit Frontend:</strong> Ported the UI to Streamlit to enable fast interactive uploads and live feedback visualizations.</li>
        </ul>

        <div style="display:flex; gap:0.75rem;">
          <a href="https://github.com/Vranji2023" target="_blank" class="btn btn-sm btn-primary">
            <i class="fa-brands fa-github"></i> Repository
          </a>
          <a href="mailto:vranjith2023@gmail.com?subject=Discussing%20Dr.Dine" class="btn btn-sm btn-ghost">
            <i class="fa-regular fa-envelope"></i> Ask Me About It
          </a>
        </div>
      `
    }
  };

  document.querySelectorAll('.open-details-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      if (projectStories[projKey]) {
        projModalHeading.textContent = projectStories[projKey].title;
        projModalBody.innerHTML = projectStories[projKey].body;
        projModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeProjModal() {
    if (projModal) {
      projModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (closeProjBtn) closeProjBtn.addEventListener('click', closeProjModal);
  if (projBackdrop) projBackdrop.addEventListener('click', closeProjModal);

  // Close modals on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeResume();
      closeProjModal();
    }
  });
});

// --- Direct Message Form Handler ---
function handleDirectMessage(e) {
  e.preventDefault();

  const name = document.getElementById('sender-name').value.trim();
  const email = document.getElementById('sender-email').value.trim();
  const message = document.getElementById('sender-message').value.trim();
  const btn = document.getElementById('send-btn');

  if (!name || !email || !message) {
    alert('Please fill out all fields.');
    return;
  }

  const originalContent = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Opening Email Client...';
  btn.disabled = true;

  const mailtoUrl = `mailto:vranjith2023@gmail.com?subject=${encodeURIComponent(
    `[Portfolio Inquiry] from ${name}`
  )}&body=${encodeURIComponent(
    `Hi Ranjith,\n\n${message}\n\nBest regards,\n${name}\nEmail: ${email}`
  )}`;

  setTimeout(() => {
    window.location.href = mailtoUrl;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Email Draft Prepared!';
    
    setTimeout(() => {
      btn.innerHTML = originalContent;
      btn.disabled = false;
      document.getElementById('contact-form').reset();
    }, 2500);
  }, 450);
}
