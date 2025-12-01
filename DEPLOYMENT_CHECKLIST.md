# Deployment Checklist

## Pre-Deployment Testing

### 1. Build Jekyll Site Locally
```bash
bundle install  # If not already done
bundle exec jekyll serve
```

Visit http://localhost:4000 and verify:

- [ ] Homepage loads correctly
- [ ] [/courses](http://localhost:4000/courses) - All 3 course cards display
- [ ] [/courses/beginners](http://localhost:4000/courses/beginners) - Shows 2 booking options (Jan & Feb)
- [ ] [/courses/intermediate](http://localhost:4000/courses/intermediate) - Shows 1 booking option (Feb)
- [ ] [/courses/advanced](http://localhost:4000/courses/advanced) - Shows 1 booking option (Mar)
- [ ] [/schedule](http://localhost:4000/schedule) - Shows all 4 cohorts grouped by month
- [ ] All booking links are clickable and go to Stripe

### 2. Visual Inspection

Check that the course pages display:
- [ ] Correct course title and tagline
- [ ] Correct pricing (£149/£179/£229 with early bird)
- [ ] Multiple booking buttons for courses with multiple cohorts
- [ ] Proper button styling (primary/outline colors match course theme)

Check that the schedule page:
- [ ] Groups cohorts by month (January, February, March)
- [ ] Shows course colors correctly (indigo, blue, amber)
- [ ] Displays dates, times, and availability correctly
- [ ] "Book Now" buttons work

### 3. Test Booking Flow

- [ ] Click "Book Now" on Introduction to AI (January) - should go to Stripe
- [ ] Click "Book Now" on Introduction to AI (February) - should go to Stripe
- [ ] Click "Book Now" on Intermediate (February) - should go to Stripe
- [ ] Click "Book Now" on Advanced (March) - should go to Stripe

**Note:** You may need to create a new Stripe payment link for the February Introduction to AI cohort if it should have a different link than the January cohort.

### 4. Mobile Responsiveness

- [ ] View on mobile/tablet size
- [ ] Multiple booking buttons stack vertically
- [ ] Course cards are responsive
- [ ] Schedule page is readable on mobile

## Stripe Setup (If Needed)

The February Introduction to AI cohort currently uses the same booking link as January:
```
booking_link: "https://book.stripe.com/14AaEX6M8bSVdb028O8bS00"
```

If you need a separate payment link:

1. [ ] Create new Stripe Payment Link for Feb 2026 cohort
2. [ ] Update `_data/cohorts.yml` line 27 with new link
3. [ ] Test new link works

## Deployment

### Option 1: GitHub Pages (Automatic)
```bash
git add .
git commit -m "Implement data-driven cohorts system with multiple booking dates"
git push origin main
```

GitHub Pages will automatically rebuild the site.

### Option 2: Manual Deploy
1. [ ] Run `bundle exec jekyll build`
2. [ ] Deploy `_site` folder to hosting
3. [ ] Clear CDN cache if applicable

## Post-Deployment Verification

Visit your live site and verify:

- [ ] All pages load without errors
- [ ] Course pages show correct cohorts
- [ ] Schedule page displays all cohorts
- [ ] Booking links work on production
- [ ] No console errors (check browser DevTools)

## Add More Cohorts

To add future cohorts, edit `_data/cohorts.yml`:

```yaml
# Example: Adding April 2026 Advanced course
- course_id: advanced
  cohort_number: 2
  month: April 2026
  year: 2026
  dates: "Thursdays, 1, 8, 15 & 22 April"
  start_date: 2026-04-01
  day_of_week: Thursday
  time: "18:30-19:30"
  spots_available: 12
  spots_total: 12
  booking_link: "https://book.stripe.com/NEW_LINK"
  status: open
```

Then:
```bash
git add _data/cohorts.yml
git commit -m "Add April 2026 Advanced AI cohort"
git push
```

Done!

## Troubleshooting

### Problem: Course page shows no booking buttons
**Solution:** Check that cohort `status: open` in `_data/cohorts.yml`

### Problem: Cohorts not grouped by month on schedule page
**Solution:** Verify `month` field is consistent (e.g., "January 2026" not "Jan 2026")

### Problem: Booking link doesn't work
**Solution:** Check Stripe link is correct and payment link is active

### Problem: Jekyll build errors
**Solution:**
1. Check YAML syntax: `ruby -e "require 'yaml'; YAML.load_file('_data/cohorts.yml')"`
2. Check for liquid syntax errors in templates
3. Review Jekyll build logs for specific errors

## Rollback Plan

If something goes wrong:

```bash
git log --oneline  # Find last good commit
git revert HEAD    # Revert latest commit
git push
```

Or restore from previous commit:
```bash
git reset --hard <commit-hash>
git push --force  # Only if safe to do so
```

## Documentation

Files created for reference:
- `PLAN_DATA_DRIVEN_COHORTS.md` - Full implementation plan
- `IMPLEMENTATION_SUMMARY.md` - What was changed
- `BEFORE_VS_AFTER.md` - Visual comparison
- `DEPLOYMENT_CHECKLIST.md` - This file

---

**Ready to deploy?** Start with "Pre-Deployment Testing" above! ✅
