# Before vs After: Adding Multiple Cohorts

## The Question
> "How difficult is it to add multiple booking dates for each course? e.g. a Jan 2026 and Feb 2026 booking for the Introduction to AI course."

## Before: Manual HTML Editing ❌

To add a February cohort for "Introduction to AI", you would need to:

### Step 1: Edit `schedule.html` (30+ lines of HTML)
```html
<!-- Copy this entire block -->
<div style="background-color: var(--color-white); padding: var(--spacing-xl); border-radius: var(--border-radius-lg); margin-bottom: var(--spacing-xl); box-shadow: var(--shadow-md);">
    <h3 style="color: var(--color-indigo); margin-bottom: var(--spacing-sm);">February 2026</h3>
    <div style="border-left: 3px solid var(--color-indigo); padding-left: var(--spacing-md); margin-bottom: var(--spacing-lg);">
        <div style="display: flex; justify-content: space-between; align-items: start; flex-wrap: wrap; margin-bottom: var(--spacing-sm);">
            <div>
                <h4 style="margin-bottom: 0.25rem;">Introduction to AI (Beginners)</h4>
                <p style="color: var(--color-gray-600); margin-bottom: var(--spacing-xs); font-size: 0.9rem;">Cohort #2</p>
            </div>
            <div style="text-align: right;">
                <div style="font-size: 1.5rem; font-weight: 700; color: var(--color-slate);">£149</div>
                <div style="font-size: 0.875rem; color: var(--color-success);">Early bird: £129</div>
            </div>
        </div>
        <p><strong>Dates:</strong> Mondays, 2, 9, 16 & 23 February<br>
        <strong>Time:</strong> 18:30-19:30<br>
        <strong>Spots available:</strong> <span style="color: var(--color-success); font-weight: 600;">12 / 12</span></p>
        <a href="https://book.stripe.com/NEW_LINK" class="btn btn-primary">Book Now</a>
        <a href="{{ site.baseurl }}/courses/beginners" class="btn btn-outline">Course Details</a>
    </div>
</div>
```

### Step 2: Update `courses/index.html`
Update the booking link manually

### Step 3: Update course page booking link?
Figure out how to show multiple booking options...

**Problems:**
- 😫 30+ lines of HTML to copy/paste
- 😫 Easy to make typos or inconsistent styling
- 😫 Need to update multiple files
- 😫 No clear way to handle multiple cohorts on course pages
- 😫 Hard to maintain as cohorts grow

---

## After: Data-Driven System ✅

To add a February cohort for "Introduction to AI":

### Step 1: Edit `_data/cohorts.yml` (12 lines of YAML)
```yaml
- course_id: beginners
  cohort_number: 2
  month: February 2026
  year: 2026
  dates: "Mondays, 2, 9, 16 & 23 February"
  start_date: 2026-02-02
  day_of_week: Monday
  time: "18:30-19:30"
  spots_available: 12
  spots_total: 12
  booking_link: "https://book.stripe.com/NEW_LINK"
  status: open
```

### Step 2: There is no step 2! 🎉

**Automatically appears on:**
- ✅ [/courses/beginners](courses/beginners.html) - Shows multiple booking buttons
- ✅ [/schedule](schedule.html) - Listed under February 2026
- ✅ [/courses](courses/index.html) - Shows next available cohort

**Benefits:**
- 😊 Just 12 lines of simple, readable YAML
- 😊 Impossible to have inconsistent styling
- 😊 Single source of truth
- 😊 Automatic multi-cohort handling
- 😊 Scales to unlimited cohorts

---

## Real Example: Current State

### Introduction to AI Course Now Has 2 Cohorts:

1. **January 2026** - Tuesdays
2. **February 2026** - Mondays ⭐ NEW!

### What This Looks Like:

#### On Course Page ([/courses/beginners](courses/beginners.html)):
```
┌─────────────────────────────┐
│  Introduction to AI         │
│  £149                       │
│                             │
│  Available cohorts:         │
│  ┌─────────────────────┐   │
│  │ January 2026 - Tuesdays│ │
│  └─────────────────────┘   │
│  ┌─────────────────────┐   │
│  │ February 2026 - Mondays│ │
│  └─────────────────────┘   │
└─────────────────────────────┘
```

#### On Schedule Page ([/schedule](schedule.html)):
```
┌─────────────────────────────────────────┐
│ January 2026                            │
│ ───────────────────────────────────────│
│ Introduction to AI (Beginners)          │
│ Cohort #1                               │
│ Dates: Tuesdays, 6, 13, 20 & 27 January│
│ [Book Now] [Course Details]             │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ February 2026                           │
│ ───────────────────────────────────────│
│ Introduction to AI (Beginners)          │
│ Cohort #2                               │
│ Dates: Mondays, 2, 9, 16 & 23 February │
│ [Book Now] [Course Details]             │
│                                         │
│ Intermediate AI                         │
│ Cohort #1                               │
│ Dates: Wednesdays, 3, 10, 17 & 24 Feb  │
│ [Book Now] [Course Details]             │
└─────────────────────────────────────────┘
```

---

## Difficulty Rating

### Before: 🔴 Medium-High Difficulty
- Time: 30-45 minutes per cohort
- Risk: High (manual HTML errors)
- Maintenance: Difficult

### After: 🟢 Very Easy
- Time: 2-3 minutes per cohort
- Risk: Low (simple YAML, validated)
- Maintenance: Simple

---

## Adding a Third Cohort?

Just add another entry to `cohorts.yml`:

```yaml
- course_id: beginners
  cohort_number: 3
  month: March 2026
  dates: "Wednesdays, 4, 11, 18 & 25 March"
  # ... rest of the fields
```

Done! 🎉

---

## The Answer

**"How difficult is it to add multiple booking dates for each course?"**

**After this implementation: Very easy! Just 2-3 minutes of editing a single YAML file.**
