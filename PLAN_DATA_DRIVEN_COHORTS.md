# Implementation Plan: Full Data-Driven Course & Cohort System

## Overview
Transform the Oxford AI Teaching site from hardcoded course and cohort information to a fully data-driven system using Jekyll's `_data` directory. This will enable easy management of multiple cohorts per course from a single data source.

---

## 1. Data Structure Design

### 1.1 Create `_data/courses.yml`
This file will contain static course information (curriculum, pricing, descriptions).

```yaml
- id: beginners
  title: Introduction to AI
  level: Beginners
  tagline: Build confidence with AI fundamentals and learn to use AI safely and effectively in your daily work
  description: Perfect for newcomers to AI. Learn the foundations, safety principles, and practical everyday applications.
  price: 149
  early_bird: 129
  color: indigo  # for styling
  duration: 4 weeks
  max_students: 12

- id: intermediate
  title: Intermediate AI
  level: Intermediate
  tagline: Master advanced prompting techniques, build multi-step workflows, and integrate AI into your professional toolkit
  description: For those with AI basics who want to prompt like a pro and build sophisticated workflows.
  price: 179
  early_bird: 159
  color: blue
  duration: 4 weeks
  max_students: 12

- id: advanced
  title: Advanced AI (Agentic)
  level: Advanced
  tagline: Build AI agents, master data-driven workflows, and create sophisticated agentic systems with MCPs
  description: For experienced practitioners ready to build autonomous agents and data-driven AI systems.
  price: 229
  early_bird: 209
  color: amber
  duration: 4 weeks
  max_students: 12
```

### 1.2 Create `_data/cohorts.yml`
This file will contain all upcoming cohort instances with booking links.

```yaml
# January 2026 Cohorts
- course_id: beginners
  cohort_number: 1
  month: January 2026
  year: 2026
  dates: "Mondays, 6, 13, 20 & 27 January"
  start_date: 2026-01-06  # for sorting/filtering
  day_of_week: Monday
  time: "18:30-19:30"
  spots_available: 12
  spots_total: 12
  booking_link: "https://book.stripe.com/test_14A9AU0cQePf1g62Kr3VC00"
  status: open  # open, full, cancelled, completed

# February 2026 Cohorts - Multiple cohorts for same course!
- course_id: beginners
  cohort_number: 2
  month: February 2026
  year: 2026
  dates: "Tuesdays, 3, 10, 17 & 24 February"
  start_date: 2026-02-03
  day_of_week: Tuesday
  time: "18:30-19:30"
  spots_available: 12
  spots_total: 12
  booking_link: "https://book.stripe.com/test_XXXXXXXXXXXXXXXX"  # New Stripe link
  status: open

- course_id: intermediate
  cohort_number: 1
  month: February 2026
  year: 2026
  dates: "Mondays, 3, 10, 17 & 24 February"
  start_date: 2026-02-03
  day_of_week: Monday
  time: "18:30-19:30"
  spots_available: 12
  spots_total: 12
  booking_link: "https://book.stripe.com/test_28E28sgbO6iJaQG98P3VC01"
  status: open

# March 2026 Cohorts
- course_id: advanced
  cohort_number: 1
  month: March 2026
  year: 2026
  dates: "Mondays, 3, 10, 17 & 24 March"
  start_date: 2026-03-03
  day_of_week: Monday
  time: "18:30-19:30"
  spots_available: 12
  spots_total: 12
  booking_link: "https://book.stripe.com/test_00w3cw4t6ePf7Eu2Kr3VC02"
  status: open
```

**Key Benefits:**
- Single source of truth for all cohorts
- Easy to add multiple cohorts for the same course
- Can filter by course, date, status
- Centralized booking link management

---

## 2. Update Course Page Frontmatter

### 2.1 Simplify Course Files
Remove static data from `courses/beginners.html`, `courses/intermediate.html`, `courses/advanced.html`.

**Before:**
```yaml
---
layout: course
title: Introduction to AI
level: Beginners
tagline: Build confidence with...
price: 149
early_bird: 129
booking_link: "https://book.stripe.com/..."
---
```

**After:**
```yaml
---
layout: course
course_id: beginners
---
```

The template will look up all course data from `_data/courses.yml` and available cohorts from `_data/cohorts.yml`.

---

## 3. Update `_layouts/course.html` Template

### 3.1 Load Course Data
Add Liquid logic to find the course and its cohorts:

```liquid
{% assign course = site.data.courses | where: "id", page.course_id | first %}
{% assign course_cohorts = site.data.cohorts | where: "course_id", page.course_id | where: "status", "open" | sort: "start_date" %}
```

### 3.2 Update Hero Section
Replace hardcoded values:

```liquid
<span class="course-level">{{ course.level }}</span>
<h1>{{ course.title }}</h1>
<p class="course-tagline">{{ course.tagline }}</p>
```

### 3.3 Replace Single Booking Button with Cohort Options

**Option A: Dropdown Selector**
```liquid
{% if course_cohorts.size > 0 %}
  <div class="pricing-card">
    <div class="price">
      <span class="currency">£</span>
      <span class="amount">{{ course.price }}</span>
    </div>
    <p class="early-bird">Early bird: £{{ course.early_bird }}</p>

    {% if course_cohorts.size == 1 %}
      <!-- Single cohort - direct link -->
      <a href="{{ course_cohorts[0].booking_link }}" class="btn btn-primary btn-large">
        Book Your Spot - {{ course_cohorts[0].month }}
      </a>
    {% else %}
      <!-- Multiple cohorts - show selector -->
      <label for="cohort-select">Select your cohort:</label>
      <select id="cohort-select" class="form-select" onchange="window.location.href=this.value">
        <option value="">Choose a date...</option>
        {% for cohort in course_cohorts %}
          <option value="{{ cohort.booking_link }}">
            {{ cohort.month }} - {{ cohort.day_of_week }}s
          </option>
        {% endfor %}
      </select>
    {% endif %}

    <p class="guarantee">Full refund if cancelled ≥7 days before start</p>
  </div>
{% else %}
  <!-- No cohorts available -->
  <div class="pricing-card">
    <p>No upcoming cohorts scheduled.</p>
    <a href="{{ site.baseurl }}/schedule#waitlist" class="btn btn-outline">Join Waitlist</a>
  </div>
{% endif %}
```

**Option B: Stacked Buttons (Recommended if only 2-3 cohorts)**
```liquid
{% if course_cohorts.size > 0 %}
  <div class="pricing-card">
    <div class="price">
      <span class="currency">£</span>
      <span class="amount">{{ course.price }}</span>
    </div>
    <p class="early-bird">Early bird: £{{ course.early_bird }}</p>

    <p style="margin: 1rem 0 0.5rem; font-weight: 600;">Available cohorts:</p>
    {% for cohort in course_cohorts limit: 3 %}
      <a href="{{ cohort.booking_link }}" class="btn btn-primary" style="margin-bottom: 0.5rem; width: 100%;">
        {{ cohort.month }} - {{ cohort.day_of_week }}s ({{ cohort.spots_available }}/{{ cohort.spots_total }} spots)
      </a>
    {% endfor %}

    {% if course_cohorts.size > 3 %}
      <a href="{{ site.baseurl }}/schedule#{{ page.course_id }}" class="btn btn-outline">
        View All {{ course_cohorts.size }} Cohorts
      </a>
    {% endif %}

    <p class="guarantee">Full refund if cancelled ≥7 days before start</p>
  </div>
{% endif %}
```

---

## 4. Update `schedule.html` Page

### 4.1 Replace Hardcoded HTML with Dynamic Liquid
Transform the manually coded cohort blocks into a dynamic loop:

```liquid
<section class="section section-accent">
  <div class="container">
    <div style="max-width: 900px; margin: 0 auto;">
      <h2 id="book">Book Your Course</h2>
      <p>All courses run for 4 weeks, one evening per week (18:30-19:30) in Oxford. Maximum 12 students per cohort.</p>

      {% assign cohorts_by_month = site.data.cohorts | where: "status", "open" | group_by: "month" %}

      {% for month_group in cohorts_by_month %}
        <div style="background-color: var(--color-white); padding: var(--spacing-xl); border-radius: var(--border-radius-lg); margin-bottom: var(--spacing-xl); box-shadow: var(--shadow-md);">
          <h3 style="margin-bottom: var(--spacing-sm);">{{ month_group.name }}</h3>

          {% for cohort in month_group.items %}
            {% assign course = site.data.courses | where: "id", cohort.course_id | first %}

            <div id="{{ cohort.course_id }}" style="border-left: 3px solid var(--color-{{ course.color }}); padding-left: var(--spacing-md); margin-bottom: var(--spacing-lg);">
              <div style="display: flex; justify-content: space-between; align-items: start; flex-wrap: wrap; margin-bottom: var(--spacing-sm);">
                <div>
                  <h4 style="margin-bottom: 0.25rem;">{{ course.title }}</h4>
                  <p style="color: var(--color-gray-600); margin-bottom: var(--spacing-xs); font-size: 0.9rem;">
                    Cohort #{{ cohort.cohort_number }}
                  </p>
                </div>
                <div style="text-align: right;">
                  <div style="font-size: 1.5rem; font-weight: 700; color: var(--color-slate);">£{{ course.price }}</div>
                  <div style="font-size: 0.875rem; color: var(--color-success);">Early bird: £{{ course.early_bird }}</div>
                </div>
              </div>

              <p>
                <strong>Dates:</strong> {{ cohort.dates }}<br>
                <strong>Time:</strong> {{ cohort.time }}<br>
                <strong>Spots available:</strong>
                <span style="color: {% if cohort.spots_available > 0 %}var(--color-success){% else %}var(--color-error){% endif %}; font-weight: 600;">
                  {{ cohort.spots_available }} / {{ cohort.spots_total }}
                </span>
              </p>

              {% if cohort.spots_available > 0 %}
                <a href="{{ cohort.booking_link }}" class="btn btn-primary">Book Now</a>
              {% else %}
                <button class="btn btn-outline" disabled>Fully Booked</button>
              {% endif %}

              <a href="{{ site.baseurl }}/courses/{{ cohort.course_id }}" class="btn btn-outline">Course Details</a>
            </div>
          {% endfor %}
        </div>
      {% endfor %}

      <!-- Multi-Course Packages section stays the same -->
      <!-- Waitlist form stays the same -->
    </div>
  </div>
</section>
```

**Benefits:**
- Automatically groups cohorts by month
- Dynamically generates all booking cards
- No need to manually update HTML for each cohort
- Can easily show "Fully Booked" status

---

## 5. Update `courses/index.html` Page

### 5.1 Replace Hardcoded Course Cards
Transform the manually coded course cards into a dynamic loop:

```liquid
<div class="courses-grid">
  {% for course in site.data.courses %}
    {% assign upcoming_cohorts = site.data.cohorts | where: "course_id", course.id | where: "status", "open" | sort: "start_date" %}
    {% assign next_cohort = upcoming_cohorts | first %}

    <div class="course-card" style="border-top: 4px solid var(--color-{{ course.color }});">
      <span class="course-level" style="background-color: var(--color-{{ course.color }});">{{ course.level }}</span>
      <h2>{{ course.title }}</h2>
      <p class="course-tagline">{{ course.tagline }}</p>

      <!-- Meta info stays the same -->
      <div class="course-meta" style="margin: var(--spacing-lg) 0;">
        <!-- ... SVG icons ... -->
      </div>

      <!-- Highlights would come from course.yml or stay hardcoded in this file -->
      <ul class="course-highlights">
        <li>AI fundamentals & how LLMs work</li>
        <!-- ... -->
      </ul>

      <div class="course-price">
        <span class="price-amount">£{{ course.price }}</span>
        <span class="price-note">Early bird: £{{ course.early_bird }}</span>
      </div>

      <div style="display: flex; flex-direction: column; gap: var(--spacing-sm); margin-top: var(--spacing-lg);">
        <a href="{{ site.baseurl }}/courses/{{ course.id }}" class="btn btn-primary">View Course</a>

        {% if next_cohort %}
          <a href="{{ next_cohort.booking_link }}" class="btn btn-outline">
            Book Now - {{ next_cohort.month }}
          </a>
        {% else %}
          <a href="{{ site.baseurl }}/schedule#waitlist" class="btn btn-outline">
            Join Waitlist
          </a>
        {% endif %}
      </div>
    </div>
  {% endfor %}
</div>
```

**Benefits:**
- Automatically shows next available cohort
- Falls back to waitlist if no cohorts available
- No manual updates needed when adding courses

---

## 6. Migration Steps

### Phase 1: Setup (No Breaking Changes)
1. ✅ Create `_data/` directory
2. ✅ Create `_data/courses.yml` with all course information
3. ✅ Create `_data/cohorts.yml` with current cohorts
4. ✅ Test data files are valid YAML (no syntax errors)

### Phase 2: Update Templates (Breaking Changes - Do in Order)
1. ✅ Update `_layouts/course.html` to use data files
   - Test with one course page first
2. ✅ Update course frontmatter files (`courses/beginners.html`, etc.)
   - Change to just `course_id: beginners`
   - Remove all other frontmatter fields
3. ✅ Update `schedule.html` with dynamic Liquid
   - Comment out old HTML first
   - Add new dynamic code
   - Compare output
4. ✅ Update `courses/index.html` with dynamic Liquid
   - Same approach: comment old, add new

### Phase 3: Test & Verify
1. ✅ Build Jekyll site locally: `bundle exec jekyll serve`
2. ✅ Verify all course pages render correctly
3. ✅ Verify schedule page shows all cohorts
4. ✅ Verify courses index page renders correctly
5. ✅ Click all booking links to ensure Stripe URLs work
6. ✅ Test adding a new cohort (just edit `cohorts.yml`)

### Phase 4: Add New Cohorts
1. ✅ Create new Stripe payment link for Feb 2026 Beginners cohort
2. ✅ Add entry to `_data/cohorts.yml`
3. ✅ Commit and deploy
4. ✅ Verify new cohort appears on all relevant pages

---

## 7. Future Enhancements

### 7.1 Automatic Status Updates
Use Jekyll's date filters to automatically mark cohorts as "past" or "full":

```liquid
{% assign today = site.time | date: "%Y-%m-%d" %}
{% if cohort.start_date < today %}
  {% assign cohort_status = "past" %}
{% elsif cohort.spots_available == 0 %}
  {% assign cohort_status = "full" %}
{% else %}
  {% assign cohort_status = "open" %}
{% endif %}
```

### 7.2 Course Highlights in Data File
Move course highlights to `_data/courses.yml`:

```yaml
- id: beginners
  # ... other fields ...
  highlights:
    - AI fundamentals & how LLMs work
    - Effective prompting techniques
    - Practical everyday applications
    - Safety & ethical considerations
```

### 7.3 Instructor Information
Add instructor data if multiple instructors teach different cohorts:

```yaml
# _data/cohorts.yml
- course_id: beginners
  instructor: Christian Heilmann
  # ... other fields ...
```

### 7.4 Dynamic Spot Availability
Integrate with Stripe or a booking system to auto-update `spots_available`.

---

## 8. Example: Adding a New Cohort

**Old way (manual HTML editing):**
1. Open `schedule.html`
2. Copy/paste 30+ lines of HTML
3. Update 8+ fields manually (dates, links, prices, etc.)
4. Risk of typos, inconsistent styling
5. Update 3 other files if needed

**New way (data-driven):**
1. Open `_data/cohorts.yml`
2. Add 12 lines:
```yaml
- course_id: beginners
  cohort_number: 3
  month: March 2026
  year: 2026
  dates: "Wednesdays, 4, 11, 18 & 25 March"
  start_date: 2026-03-04
  day_of_week: Wednesday
  time: "18:30-19:30"
  spots_available: 12
  spots_total: 12
  booking_link: "https://book.stripe.com/NEW_LINK"
  status: open
```
3. Done! Automatically appears everywhere

---

## 9. Estimated Effort

- **Data file creation:** 30-45 minutes
- **Template updates:** 2-3 hours
- **Testing & debugging:** 1-2 hours
- **Documentation:** 30 minutes

**Total: 4-6 hours**

---

## 10. Rollback Plan

If something breaks during migration:

1. Keep original files in git history
2. Create a branch: `git checkout -b data-driven-cohorts`
3. Make all changes in branch
4. Test thoroughly before merging to main
5. If issues: `git checkout main` to revert

---

## Conclusion

This data-driven approach provides:
- ✅ Single source of truth for courses and cohorts
- ✅ Easy to add multiple cohorts per course
- ✅ Reduced duplication and manual errors
- ✅ Automatic propagation of changes across all pages
- ✅ Scalable for future growth

The initial investment of 4-6 hours will save significant time going forward, especially when managing multiple cohorts per course.
