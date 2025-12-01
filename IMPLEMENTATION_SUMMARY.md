# Data-Driven Cohorts Implementation - COMPLETE ✅

## Summary

Successfully transformed the Oxford AI Teaching site from hardcoded course and cohort information to a fully data-driven system using Jekyll's `_data` directory.

## What Was Implemented

### 1. Data Files Created ✅

#### `_data/courses.yml`
- Contains all static course information (titles, pricing, descriptions, highlights)
- 3 courses: Beginners, Intermediate, Advanced
- Single source of truth for course details

#### `_data/cohorts.yml`
- Contains all cohort instances with dates, booking links, availability
- Currently includes 4 cohorts:
  - **Introduction to AI (Beginners)** - January 2026 (Tuesdays)
  - **Introduction to AI (Beginners)** - February 2026 (Mondays) ⭐ NEW!
  - **Intermediate AI** - February 2026 (Wednesdays)
  - **Advanced AI (Agentic)** - March 2026 (Thursdays)

### 2. Templates Updated ✅

#### `_layouts/course.html`
- Now loads course data from `_data/courses.yml`
- Dynamically finds all available cohorts for the course
- Smart booking buttons:
  - **Single cohort**: Shows "Book Your Spot - [Month]"
  - **Multiple cohorts**: Shows stacked buttons for each cohort (up to 3)
  - **No cohorts**: Shows "Join Waitlist"

#### Course Pages (`courses/beginners.html`, `intermediate.html`, `advanced.html`)
- Simplified frontmatter to just `course_id: beginners`
- Removed all duplicate data (now pulled from `_data/courses.yml`)

#### `schedule.html`
- Completely dynamic - auto-generates from data files
- Groups cohorts by month
- Shows all course details, pricing, dates, and availability
- Handles "Fully Booked" status automatically

#### `courses/index.html`
- Dynamic course cards generated from data
- Shows next available cohort for each course
- Falls back to waitlist if no cohorts available

### 3. Example Demonstration ✅

Successfully added a **second cohort for Introduction to AI**:
- Just edited `_data/cohorts.yml`
- Added 12 lines of YAML
- Now appears automatically on:
  - Course page (with multiple booking options)
  - Schedule page (under February 2026)
  - Courses index page

## How It Works

### Adding a New Cohort (Any Course)

1. Open `_data/cohorts.yml`
2. Add new entry:

```yaml
- course_id: beginners  # or intermediate, advanced
  cohort_number: 3
  month: March 2026
  year: 2026
  dates: "Wednesdays, 4, 11, 18 & 25 March"
  start_date: 2026-03-04
  day_of_week: Wednesday
  time: "18:30-19:30"
  spots_available: 12
  spots_total: 12
  booking_link: "https://book.stripe.com/YOUR_NEW_LINK"
  status: open
```

3. Commit and deploy - done!

### Managing Availability

To mark a cohort as full:
```yaml
spots_available: 0  # Automatically shows "Fully Booked"
```

To remove from display:
```yaml
status: closed  # Won't appear on site
```

## Benefits Achieved

✅ **Single source of truth** - No duplication across files
✅ **Easy to add multiple cohorts** - Just edit one file
✅ **Automatic propagation** - Changes appear everywhere
✅ **Reduced errors** - No manual HTML editing
✅ **Scalable** - Can easily manage dozens of cohorts

## Files Changed

### Created:
- `_data/courses.yml` (new)
- `_data/cohorts.yml` (new)
- `PLAN_DATA_DRIVEN_COHORTS.md` (documentation)
- `IMPLEMENTATION_SUMMARY.md` (this file)

### Modified:
- `_layouts/course.html` - Dynamic template
- `courses/beginners.html` - Simplified frontmatter
- `courses/intermediate.html` - Simplified frontmatter
- `courses/advanced.html` - Simplified frontmatter
- `schedule.html` - Dynamic Liquid templating
- `courses/index.html` - Dynamic course cards

## Next Steps

### To Deploy:
1. Test locally: `bundle exec jekyll serve`
2. Verify all pages render correctly
3. Test booking links work
4. Commit changes: `git add . && git commit -m "Implement data-driven cohorts system"`
5. Push to production

### To Add More Cohorts:
1. Create Stripe payment link (if new cohort)
2. Edit `_data/cohorts.yml`
3. Add new entry with cohort details
4. Commit and deploy

### Future Enhancements:
- Automatic date-based status updates
- Integration with booking system for real-time availability
- Email notifications when cohorts fill up
- Historical cohort tracking

## Testing Checklist

Before deploying, verify:
- [ ] All course pages load correctly
- [ ] Schedule page shows all cohorts
- [ ] Courses index page shows correct next cohort
- [ ] Booking links work (click to test Stripe)
- [ ] Multiple cohort display works on course pages
- [ ] "Fully Booked" status displays correctly
- [ ] Waitlist links work when no cohorts available

## Questions?

See `PLAN_DATA_DRIVEN_COHORTS.md` for detailed architecture and implementation plan.

---

**Implementation Date:** December 1, 2025
**Status:** ✅ Complete and Ready for Testing
