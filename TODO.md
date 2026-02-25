# Analytics Pages Implementation Plan

## Task: Create Analytics pages for CMS Full Form Dashboard

### Pages Created:

- [x] 1. Create `app/analytics/page.tsx` - Main analytics page (redirects to overview)
- [x] 2. Create `app/analytics/overview/page.tsx` - Analytics Overview with:
  - KPI cards (page views, unique visitors, bounce rate, avg time on site)
  - Line chart for traffic over time
  - Bar chart for traffic sources
  - Top pages table
- [x] 3. Create `app/analytics/performance/page.tsx` - Performance metrics with:
  - Page load times, Core Web Vitals
  - Device breakdown charts
  - Browser stats
- [x] 4. Create `app/analytics/audience/page.tsx` - Audience analytics with:
  - User demographics
  - Geographic distribution
  - User segments

### Components Created:
- `components/analytics/overview-content.tsx`
- `components/analytics/performance-content.tsx`
- `components/analytics/audience-content.tsx`

### Pattern:
Each page uses the Layout from `@/components/cmsfullform/layout` and imports content from corresponding component.

### Verification:
Run `npm run dev` and navigate to:
- /analytics (redirects to /analytics/overview)
- /analytics/overview
- /analytics/performance
- /analytics/audience
