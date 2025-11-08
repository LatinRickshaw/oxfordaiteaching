# EmailOctopus Newsletter Setup Instructions

Your website is now configured to use EmailOctopus for newsletter subscriptions. Follow these steps to complete the setup.

## Step 1: Create Your EmailOctopus Account

1. Go to [EmailOctopus](https://emailoctopus.com/)
2. Click "Get started for free"
3. Sign up with your email (use your business email for AI Evening Classes Oxford)
4. Verify your email address

## Step 2: Create a Mailing List

1. Once logged in, you should see the main dashboard
2. Look for one of these options:
   - A button that says **"Create a list"** or **"New list"** (usually in the top-right corner)
   - If you're on the "Lists" page, look for a **"+"** button or **"Create list"** button
   - On first login, EmailOctopus may prompt you to create your first list automatically
3. Click the button to create a new list
4. Fill in the details:
   - **List name**: "AI Evening Classes Newsletter" (or your preferred name)
   - **Description**: Optional (e.g., "Weekly AI insights and course updates for Oxford professionals")
5. Click **"Create list"** or **"Save"**

**Note**: If you still can't find the button, try:
- Going directly to the Lists section from the left sidebar/menu
- Looking for a large **"+"** icon
- Checking if there's a welcome tutorial that guides you through list creation

## Step 3: Get Your Form Embed Code

1. In your list, click "Forms" tab
2. Click "Create a new form" or use the default embedded form
3. Choose "Embedded" form type
4. You'll see your **List ID** - it looks like: `a1b2c3d4-e5f6-1234-5678-9abcdef01234`

## Step 4: Update Your Website Code

You need to replace `YOUR_LIST_ID` in two places in your footer:

### File: `_includes/footer.html`

Find and replace **both** instances of `YOUR_LIST_ID`:

1. **In the form action** (line 65):
   ```html
   action="https://emailoctopus.com/lists/YOUR_LIST_ID/members/embedded/add"
   ```
   Replace with:
   ```html
   action="https://emailoctopus.com/lists/a1b2c3d4-e5f6-1234-5678-9abcdef01234/members/embedded/add"
   ```

2. **In the honeypot field** (line 75):
   ```html
   <input type="text" name="hpYOUR_LIST_ID" tabindex="-1" value="">
   ```
   Replace with:
   ```html
   <input type="text" name="hpa1b2c3d4-e5f6-1234-5678-9abcdef01234" tabindex="-1" value="">
   ```

## Step 5: Test Your Form

1. Build and serve your Jekyll site locally:
   ```bash
   bundle exec jekyll serve
   ```

2. Navigate to your website's footer
3. Enter a test email address (use your own)
4. Check the consent checkbox
5. Click "Subscribe"
6. You should be redirected to EmailOctopus confirmation page
7. Check your EmailOctopus dashboard - you should see the new subscriber

## Step 6: Configure Double Opt-In (Recommended)

1. In EmailOctopus, go to your list settings
2. Enable "Double opt-in" (this is GDPR best practice)
3. Customize the confirmation email if desired

## Step 7: Customize Success/Error Messages (Optional)

EmailOctopus provides default success and error pages. To customize:

1. In your form settings on EmailOctopus
2. Add custom redirect URLs:
   - Success URL: `https://yourdomain.com/newsletter-thank-you`
   - Error URL: `https://yourdomain.com/newsletter-error`

You'll need to create these pages on your Jekyll site if you want custom messages.

## Features of Your Free Tier

- **2,500 subscribers**
- **10,000 emails per month**
- All automation features
- Analytics and reporting
- GDPR compliance tools
- Spam protection (via honeypot field)

## Email Campaign Creation

To send your first newsletter:

1. Go to "Campaigns" in EmailOctopus
2. Click "Create a campaign"
3. Choose your template or start from scratch
4. Write your content
5. Select your mailing list
6. Preview and test
7. Schedule or send immediately

## GDPR Compliance

Your form already includes:
- ✅ Consent checkbox (required)
- ✅ Link to privacy policy
- ✅ Honeypot spam protection
- ✅ EmailOctopus provides unsubscribe links automatically

Make sure your [Privacy Policy](privacy.md) mentions:
- That you collect email addresses for newsletters
- That you use EmailOctopus as your email service provider
- How users can unsubscribe
- How long you retain data

## Troubleshooting

### Form not submitting
- Check that both instances of `YOUR_LIST_ID` are replaced
- Verify the List ID is correct in your EmailOctopus dashboard
- Check browser console for JavaScript errors

### Subscribers not appearing
- Check spam folder for confirmation email (if double opt-in enabled)
- Verify the email address is valid
- Check EmailOctopus dashboard under "Subscribers" > "Pending"

### Styling issues
- All styles are in `assets/css/main.css` under `.newsletter-form` classes
- The form uses flexbox with vertical layout
- Customize colors by changing CSS variables

## Support

- **EmailOctopus Support**: [help.emailoctopus.com](https://help.emailoctopus.com)
- **EmailOctopus API Docs**: [emailoctopus.com/api-documentation](https://emailoctopus.com/api-documentation)

## Next Steps

1. Replace `YOUR_LIST_ID` with your actual List ID
2. Test the form
3. Create your first welcome email campaign
4. Set up automation (welcome series, course announcements, etc.)
5. Monitor your subscriber growth in the dashboard

---

**Note**: This setup uses the free tier. If you exceed 2,500 subscribers, you'll need to upgrade to a paid plan (around $40/month for 10,000 subscribers).
