# Deployment Guide - AI Evening Classes Oxford

This guide will help you deploy your website to GitHub Pages.

## Option 1: Direct GitHub Pages Deployment (RECOMMENDED - Easiest)

GitHub Pages has Jekyll built-in, so you don't need to install anything locally!

### Step 1: Update Configuration

Edit `_config.yml` and update these lines:

```yaml
url: "https://YOUR-GITHUB-USERNAME.github.io"
email: your-actual-email@example.com
```

For example, if your GitHub username is `johnsmith`:
```yaml
url: "https://johnsmith.github.io"
email: john@example.com
```

### Step 2: Push to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: AI Evening Classes Oxford website"

# Create a new repository on GitHub named 'oxfordaiteaching'
# Then link it:
git remote add origin https://github.com/YOUR-USERNAME/oxfordaiteaching.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under "Source":
   - Select **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**
4. Click **Save**

### Step 4: Wait for Deployment

- GitHub will automatically build your site (takes 1-3 minutes)
- Check the **Actions** tab to see build progress
- Once complete, your site will be live at: `https://YOUR-USERNAME.github.io/oxfordaiteaching/`

**Note:** The first build may take a few minutes. Subsequent updates deploy in ~30 seconds.

---

## Option 2: Local Jekyll Development (For Advanced Users)

If you want to preview changes locally before pushing to GitHub:

### Prerequisites

You need:
- Ruby 2.7 or higher
- Bundler
- Xcode Command Line Tools (macOS): `xcode-select --install`

### Install Dependencies

```bash
# Install gems locally
bundle install --path vendor/bundle

# If you get permission errors on macOS, try:
bundle config set --local path 'vendor/bundle'
bundle install
```

### Run Local Server

```bash
bundle exec jekyll serve

# Or with live reload:
bundle exec jekyll serve --livereload

# Site will be available at http://localhost:4000
```

---

## Customization Before Deployment

### 1. Update Contact Information

Edit `_config.yml`:
```yaml
email: your-email@example.com
location: "Oxford, UK"
social:
  linkedin: "https://linkedin.com/in/yourprofile"
  twitter: "https://twitter.com/yourhandle"
```

### 2. Configure Forms (Formspree)

1. Sign up at [formspree.io](https://formspree.io) (free plan works fine)
2. Create a new form
3. Get your Form ID (looks like `xyzabc123`)
4. Find and replace `YOUR_FORM_ID` in these files:
   - `contact.html`
   - `_includes/footer.html` (newsletter form)
   - `schedule.html` (waitlist form)
   - `corporate.html` (corporate inquiry form)

Replace:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

With:
```html
<form action="https://formspree.io/f/xyzabc123" method="POST">
```

### 3. Add Stripe Payment Links

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Create products for each course:
   - Introduction to AI - £149
   - Competent AI - £179
   - Advanced AI - £229
3. Generate **Payment Links** for each
4. Replace `#stripe-booking-link` and `#book` with your actual Stripe URLs in:
   - `courses/beginners.html`
   - `courses/intermediate.html`
   - `courses/advanced.html`
   - `schedule.html`

Example:
```html
<!-- Before -->
<a href="#book" class="btn btn-primary">Book Now</a>

<!-- After -->
<a href="https://buy.stripe.com/your-actual-link" class="btn btn-primary">Book Now</a>
```

### 4. Add Your Instructor Bio

Edit `about.html` and replace the placeholder text in the "Our Instructor" section with your actual bio, credentials, and experience.

### 5. Update Course Schedule

Edit `schedule.html` with your actual cohort dates and availability.

---

## Custom Domain (Optional)

If you want to use a custom domain like `www.aieveningclasses.com`:

### 1. Add CNAME File

Create a file named `CNAME` in the root directory:
```
www.aieveningclasses.com
```

### 2. Configure DNS

At your domain registrar, add these DNS records:

**Option A: Subdomain (www)**
```
Type: CNAME
Name: www
Value: YOUR-USERNAME.github.io
```

**Option B: Apex domain (no www)**
```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

### 3. Enable in GitHub Pages

1. Go to Settings → Pages
2. Enter your custom domain in the "Custom domain" field
3. Check "Enforce HTTPS" (may take a few minutes to become available)
4. Save

DNS changes can take 24-48 hours to propagate worldwide.

---

## Troubleshooting

### CSS/JS Not Loading

**Problem:** Styles and scripts don't work when opening HTML files directly in browser.

**Solution:** This is normal! Jekyll needs to process the files. Either:
1. Push to GitHub Pages (processes automatically), OR
2. Run Jekyll locally: `bundle exec jekyll serve`

Don't open the HTML files directly—use `http://localhost:4000` or your deployed GitHub Pages URL.

### Build Failing on GitHub

1. Check the **Actions** tab for error messages
2. Common issues:
   - Syntax error in YAML front matter
   - Missing closing tags in HTML
   - Invalid Liquid template syntax

### Forms Not Working

Make sure you:
1. Replaced `YOUR_FORM_ID` with your actual Formspree ID
2. Verified the form on formspree.io
3. Checked spam folder for confirmation emails

### Mobile Menu Not Working

The mobile menu requires JavaScript. Make sure:
1. `/assets/js/main.js` exists
2. The file is being loaded (check browser DevTools → Network tab)
3. No JavaScript errors (check browser Console)

---

## Testing Checklist

Before going live, test:

- [ ] All navigation links work
- [ ] All course pages load correctly
- [ ] Forms submit successfully (test with your email)
- [ ] Mobile menu works on phone/tablet
- [ ] Payment links go to correct Stripe pages
- [ ] Contact information is correct
- [ ] Social media links work
- [ ] Site loads on mobile devices
- [ ] All images/icons display
- [ ] No broken links (use a link checker)

---

## Quick Deploy Checklist

✅ Updated `_config.yml` with your URL and email
✅ Replaced `YOUR_FORM_ID` in all forms
✅ Added Stripe payment links
✅ Added instructor bio to About page
✅ Updated course schedule dates
✅ Pushed to GitHub
✅ Enabled GitHub Pages in Settings
✅ Tested live site

---

## Support

Questions about deployment? Check the [main README.md](README.md) or contact the developer.

**Jekyll Documentation:** https://jekyllrb.com/docs/
**GitHub Pages Documentation:** https://docs.github.com/en/pages
