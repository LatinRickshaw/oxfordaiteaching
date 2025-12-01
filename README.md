# AI Evening Classes Oxford

Professional AI training courses in Oxford. Small evening cohorts for busy professionals.

## 🎓 About

AI Evening Classes Oxford delivers practical, hands-on AI training in three progressive levels:

- **Introduction to AI (Beginners)** - £149
- **Intermediate AI** - £179
- **Advanced AI (Agentic)** - £229

All courses run for 4 weeks, one evening per week (18:30-19:30) in Oxford.

## 🚀 Quick Start

This is a Jekyll-based static website designed for GitHub Pages.

### Prerequisites

- Ruby 2.7+ and Bundler
- Git

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/oxfordaiteaching.git
   cd oxfordaiteaching
   ```

2. Install dependencies:
   ```bash
   bundle install
   ```

3. Run the local server:
   ```bash
   bundle exec jekyll serve
   ```

4. Open [http://localhost:4000](http://localhost:4000) in your browser

### Making Changes

- **Content pages**: Edit `.html` files in the root or `/courses` directory
- **Layouts**: Modify files in `/_layouts` and `/_includes`
- **Styling**: Update `/assets/css/main.css`
- **JavaScript**: Edit `/assets/js/main.js`
- **Configuration**: Update `_config.yml`

## 📂 Project Structure

```
oxfordaiteaching/
├── _config.yml              # Jekyll configuration
├── _layouts/                # Page layouts
│   ├── default.html         # Base layout
│   └── course.html          # Course page layout
├── _includes/               # Reusable components
│   ├── header.html          # Site header/navigation
│   └── footer.html          # Site footer
├── assets/
│   ├── css/
│   │   └── main.css         # Main stylesheet
│   ├── js/
│   │   └── main.js          # Interactive elements
│   └── images/
│       └── favicon.svg      # Site icon
├── courses/                 # Course pages
│   ├── beginners.html
│   ├── intermediate.html
│   └── advanced.html
├── index.html               # Homepage
├── about.html               # About page
├── schedule.html            # Course schedule
├── corporate.html           # Corporate training
├── faq.html                 # FAQ
├── contact.html             # Contact form
├── terms.html               # Terms & Conditions
├── privacy.html             # Privacy Policy
├── code-of-conduct.html     # Code of Conduct
├── accessibility.html       # Accessibility Statement
├── 404.html                 # 404 error page
├── robots.txt               # SEO crawler instructions
└── README.md                # This file
```

## 🎨 Brand Palette

- **Indigo**: `#283593` - Primary brand color
- **Blue**: `#1E88E5` - Secondary/accent
- **Amber**: `#FFB300` - Highlights/CTAs
- **Slate**: `#0F172A` - Text
- **Off-white**: `#F5F7FA` - Background

## 🌐 Deploying to GitHub Pages

1. **Update configuration**:
   - Edit `_config.yml` and update the `url` field to your GitHub Pages URL
   - Example: `url: "https://yourusername.github.io"`

2. **Enable GitHub Pages**:
   - Go to your repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` / `root`
   - Save

3. **Push changes**:
   ```bash
   git add .
   git commit -m "Initial website deployment"
   git push origin main
   ```

4. **Wait for deployment**:
   - GitHub will automatically build and deploy your site
   - Check the Actions tab for build status
   - Your site will be live at `https://yourusername.github.io/oxfordaiteaching` (or custom domain)

### Custom Domain (Optional)

1. Add a `CNAME` file to the root with your domain:
   ```
   www.aieveningclasses.oxford
   ```

2. Configure DNS records at your domain registrar:
   - `A` records pointing to GitHub Pages IPs, or
   - `CNAME` record pointing to `yourusername.github.io`

3. Enable HTTPS in GitHub Pages settings

## 🔧 Customization

### Update Contact Information

Edit `_config.yml`:
```yaml
email: your-email@example.com
social:
  linkedin: "https://linkedin.com/in/yourprofile"
  twitter: "https://twitter.com/yourhandle"
```

### Configure Forms

All forms use Formspree. To connect them:

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Replace `YOUR_FORM_ID` in contact forms with your Formspree form ID:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

Forms that need updating:
- Contact page (`contact.html`)
- Newsletter subscription (footer in `_includes/footer.html`)
- Waitlist (`schedule.html`)
- Corporate inquiry (`corporate.html`)

### Configure Payments

Add Stripe payment links:

1. Create products in Stripe Dashboard
2. Generate payment links for each course
3. **Set redirect URL to:** `https://oxfordaitraining.com/confirmation`
4. Update booking links in:
   - Course pages (`courses/*.html`)
   - Schedule page (`schedule.html`)
   - Replace `#stripe-booking-link` with actual Stripe URLs

**See [STRIPE_SETUP.md](STRIPE_SETUP.md) for complete step-by-step instructions.**

### Add Instructor Bio

Edit `about.html` and replace the placeholder text in the "Our Instructor" section with your actual bio and credentials.

### Update Course Schedule

Edit `schedule.html` to add real cohort dates, availability, and booking links.

## 📱 Testing

### Cross-browser Testing

Test on:
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (iOS Safari, Chrome Android)

### Accessibility Testing

- Run Lighthouse audit (Chrome DevTools)
- Test with screen readers (NVDA, JAWS, VoiceOver)
- Verify keyboard navigation works
- Check color contrast ratios

### SEO Checklist

- [ ] Update meta descriptions on all pages
- [ ] Add Open Graph images
- [ ] Verify sitemap generates correctly
- [ ] Submit sitemap to Google Search Console
- [ ] Test rich snippets with Schema markup validator

## 📊 Analytics (Optional)

To add Google Analytics:

1. Get your GA4 Measurement ID
2. Add to `_config.yml`:
   ```yaml
   google_analytics: G-XXXXXXXXXX
   ```
3. Add tracking code to `_layouts/default.html` (before `</head>`):
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id={{ site.google_analytics }}"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', '{{ site.google_analytics }}');
   </script>
   ```

## 🤝 Support

Questions or issues? Contact us at info@aieveningclasses.oxford

## 📄 License

© 2025 AI Evening Classes Oxford. All rights reserved.

---

Built with [Jekyll](https://jekyllrb.com/) • Hosted on [GitHub Pages](https://pages.github.com/)
