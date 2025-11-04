# Stripe Payment Setup Guide

This guide explains how to set up Stripe payment links for your courses and configure them to redirect to the confirmation page.

## Prerequisites

1. A Stripe account (sign up at [stripe.com](https://stripe.com))
2. Your courses deployed on GitHub Pages

## Step 1: Create Products in Stripe

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com)
2. Go to **Products** → **Add product**
3. Create three products:

### Product 1: Introduction to AI (Beginners)
- **Name:** Introduction to AI - 4 Week Evening Course
- **Description:** Beginner-friendly AI fundamentals course. 4 weeks, one evening per week in Oxford.
- **Pricing:**
  - Standard: £149.00 GBP (one-time payment)
  - Early Bird: £129.00 GBP (optional - for promotional pricing)
- **Image:** Upload course image (optional)

### Product 2: Competent AI (Intermediate)
- **Name:** Competent AI - 4 Week Evening Course
- **Description:** Master advanced prompting and workflows. 4 weeks, one evening per week in Oxford.
- **Pricing:**
  - Standard: £179.00 GBP (one-time payment)
  - Early Bird: £159.00 GBP (optional)

### Product 3: Advanced AI (Agentic)
- **Name:** Advanced AI (Agentic) - 4 Week Evening Course
- **Description:** Build AI agents and data-driven systems. 4 weeks, one evening per week in Oxford.
- **Pricing:**
  - Standard: £229.00 GBP (one-time payment)
  - Early Bird: £209.00 GBP (optional)

## Step 2: Create Payment Links

For each product:

1. Click on the product in Stripe Dashboard
2. Click **Create payment link**
3. Configure the payment link:

### Required Settings

**Payment page settings:**
- ✅ Collect customer email address
- ✅ Collect customer name
- ✅ Collect billing address (optional but recommended for invoicing)

**After payment:**
- **Redirect to URL:** `https://latinrickshaw.github.io/oxfordaiteaching/confirmation`
- This ensures customers see the thank you page after successful payment

**Additional options:**
- ✅ Allow promotion codes (for early bird, buddy discounts)
- Quantity: Set to 1 (one person per booking)
- Message to buyer: Add course-specific details

### Example Configuration for Beginners Course

```
Payment Link Name: AI Beginners Course - [Month Year]
Description: Introduction to AI - 4 Week Evening Course starting [Start Date]
Price: £149.00
Success URL: https://latinrickshaw.github.io/oxfordaiteaching/confirmation
Allow promotion codes: Yes
Require billing address: Yes (optional)
```

4. Click **Create link**
5. Copy the payment link URL (looks like `https://buy.stripe.com/xxxxx`)

## Step 3: Add Payment Links to Your Website

Replace the placeholder booking links in these files:

### A. Course Pages

**File: `courses/beginners.html`**
```yaml
---
layout: course
booking_link: "https://buy.stripe.com/YOUR-BEGINNERS-LINK"
---
```

**File: `courses/intermediate.html`**
```yaml
---
layout: course
booking_link: "https://buy.stripe.com/YOUR-INTERMEDIATE-LINK"
---
```

**File: `courses/advanced.html`**
```yaml
---
layout: course
booking_link: "https://buy.stripe.com/YOUR-ADVANCED-LINK"
---
```

### B. Schedule Page

Edit `schedule.html` and replace `#stripe-booking-link` with your actual links:

```html
<!-- Before -->
<a href="#stripe-booking-link" class="btn btn-primary">Book Now</a>

<!-- After -->
<a href="https://buy.stripe.com/YOUR-BEGINNERS-LINK" class="btn btn-primary">Book Now</a>
```

Do this for each course listing on the schedule page.

## Step 4: Create Promotion Codes (Optional)

For early bird and buddy discounts:

1. Go to **Products** → **Coupons**
2. Create coupons:

### Early Bird Discount
- **Name:** EARLYBIRD (or unique code per cohort like `EARLYJAN`)
- **Type:** Fixed amount
- **Amount:** £20.00 GBP
- **Duration:** Once
- **Expiration:** Set to 14 days before course start

### Buddy Discount
- **Name:** BUDDY10
- **Type:** Percentage
- **Percent off:** 10%
- **Duration:** Once

### Multi-Course Packages
Create custom codes for 2-course and 3-course bundles as needed.

## Step 5: Test the Payment Flow

**IMPORTANT:** Test before going live!

1. Use **Stripe Test Mode** (toggle in top-right of dashboard)
2. Create test payment links
3. Complete a test purchase using test card: `4242 4242 4242 4242`
4. Verify you're redirected to the confirmation page
5. Check that you receive the Stripe receipt email

### Test Card Numbers

- **Success:** 4242 4242 4242 4242
- **Decline:** 4000 0000 0000 0002
- **Requires authentication:** 4000 0025 0000 3155
- **CVV:** Any 3 digits
- **Expiry:** Any future date

## Step 6: Go Live

Once testing is complete:

1. Switch to **Live Mode** in Stripe
2. Create live payment links (repeat Step 2)
3. Update your website with live payment links
4. Commit and push changes:

```bash
git add courses/ schedule.html
git commit -m "Add live Stripe payment links"
git push origin main
```

## Step 7: Configure Email Notifications

### Stripe Email Receipts
- Stripe automatically sends receipts to customers
- Customize in: **Settings** → **Customer emails** → **Successful payments**
- Add your branding/logo

### Your Follow-up Emails
Set up these automated emails (use a service like Mailchimp, ConvertKit, or manual for now):

1. **Immediate:** Stripe receipt (automatic)
2. **Within 48 hours:** Welcome email with:
   - Venue details and directions
   - What to bring
   - Discord invitation
   - Course schedule
3. **7 days before:** Pre-course materials and setup instructions
4. **Day before:** Reminder with venue address

## Monitoring & Management

### View Bookings
- **Dashboard** → **Payments** to see all successful payments
- Export customer list: **Customers** → Export
- Track revenue: **Reports** → Overview

### Issue Refunds
1. Go to **Payments**
2. Find the payment
3. Click **Refund**
4. Select full or partial amount
5. Add reason (internal note)

### Update Pricing
1. Edit the product
2. Create new price tier
3. Update payment link to use new price
4. Old links remain valid with old pricing

## Troubleshooting

### Customer didn't receive confirmation
- Check Stripe dashboard to confirm payment succeeded
- Verify redirect URL is correct (no typos)
- Ask customer to check spam folder
- Manually send confirmation email

### Payment link not working
- Verify you're in Live Mode (not Test Mode)
- Check payment link hasn't been deactivated
- Ensure product is active

### Wrong price showing
- Check you're using the correct payment link
- Verify price tier is set correctly on the product

## Multi-Course Packages

For 2-course and 3-course bundles:

1. Create new products in Stripe:
   - "2-Course Pass" - £295 (10% discount)
   - "3-Course Journey" - £470 (15% discount)
2. In description, note which courses are included
3. Manually coordinate course assignments after purchase
4. Consider using Stripe's **Checkout Sessions** for custom flows

## Support

- **Stripe Support:** https://support.stripe.com
- **Stripe Dashboard:** https://dashboard.stripe.com
- **Test Mode Docs:** https://stripe.com/docs/testing

---

## Quick Checklist

- [ ] Created 3 products in Stripe
- [ ] Created payment links with redirect to `/confirmation`
- [ ] Tested payment flow in Test Mode
- [ ] Updated all website booking links
- [ ] Created promotion codes for discounts
- [ ] Switched to Live Mode
- [ ] Tested live payment
- [ ] Configured email notifications
- [ ] Pushed changes to GitHub

**Ready to accept bookings!** 🚀
