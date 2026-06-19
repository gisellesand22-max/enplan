# Product Requirements Document (PRD)
## enplan. - Marketing Landing Page

---

## 1. Overview

### Project Name
**enplan.** - Local Benefits App Marketing Landing Page

### Executive Summary
enplan. is a local benefits aggregator and management application designed specifically for Mexico's small business ecosystem. This PRD defines the requirements for a high-converting marketing landing page that serves as the primary customer acquisition channel. The landing page will educate potential users about the platform's value proposition, demonstrate how the service works, present flexible pricing options, and capture qualified leads for partnership conversion.

### Business Objectives
- Generate qualified leads from local business owners in Mexico
- Build brand awareness and establish market credibility
- Convert visitors into paying partners through a structured sales funnel
- Develop a waitlist for the official app launch
- Demonstrate business model viability through lead quality and conversion metrics

### Project Scope
A single-page marketing website that combines educational content, product showcase, pricing transparency, and multi-step lead capture mechanisms. The page will support desktop and mobile experiences with localization consideration for Spanish-language optimization.

### Target Market
- Primary: Local business owners in Mexico (restaurants, retail, services)
- Secondary: Startup founders exploring benefits management solutions
- Tertiary: HR managers and business consultants

---

## 2. Target Users

### User Personas

#### Persona 1: **Miguel - Busy Restaurant Owner**
- **Age:** 35-50
- **Business Type:** Family-owned restaurant or taqueria
- **Pain Points:** Managing employee benefits manually, high turnover due to lack of benefits, limited HR infrastructure
- **Motivation:** Wants to offer competitive benefits to retain employees without significant overhead
- **Technical Proficiency:** Low to Medium; uses WhatsApp and Facebook primarily
- **Decision Timeline:** Evaluates solutions over 2-4 weeks; seeks validation from peers

#### Persona 2: **Ana - E-commerce Entrepreneur**
- **Age:** 25-35
- **Business Type:** Online retail or marketplace seller
- **Pain Points:** Scaling business while keeping costs low, needs modern HR tools, wants employee data protection
- **Motivation:** Growing team and needs integrated benefits management; influenced by tech trends
- **Technical Proficiency:** Medium to High; comfortable with digital tools and apps
- **Decision Timeline:** Quick adopter if value is clear; prefers freemium or trial options

#### Persona 3: **Carlos - Non-Technical Startup Founder**
- **Age:** 28-40
- **Business Type:** Early-stage startup in various sectors
- **Pain Points:** Managing compliance, employee satisfaction, keeping benefits affordable
- **Motivation:** Wants to punch above his weight with employee benefits; building company culture
- **Technical Proficiency:** Medium; uses standard business tools
- **Decision Timeline:** Values peer recommendations; wants to see case studies and success stories

#### Persona 4: **Elena - HR Manager**
- **Age:** 35-55
- **Business Type:** Medium-sized company HR department
- **Pain Points:** Benefits administration complexity, vendor management, employee queries
- **Motivation:** Simplify HR workflows, improve employee satisfaction, reduce manual work
- **Technical Proficiency:** Medium to High; frequent software user
- **Decision Timeline:** Longer sales cycle with multiple stakeholders; needs detailed ROI analysis

---

## 3. Core Features

### 3.1 Hero Section with Value Proposition

**Purpose:** Immediate engagement and clear communication of core benefit

**Acceptance Criteria:**
- Headline communicates primary benefit within 5 seconds of page load
- Supporting tagline explains what enplan. does in plain language
- Call-to-action button (primary: "Únete Ahora" / "See Plans") is immediately visible
- Background visual (video, animated graphic, or high-quality image) depicts the problem or solution
- Mobile responsive: Stack properly on small screens with readable text (minimum 16px)
- Loading performance: Hero section renders within 2 seconds on 4G networks
- Includes trust signal (badges, partner logos, or social proof if available)

**Content Requirements:**
- Spanish-first messaging with English as secondary language option
- Accessibility compliant (WCAG 2.1 AA minimum)

---

### 3.2 How It Works Section

**Purpose:** Demystify the product and show the path from business owner to registered partner

**Acceptance Criteria:**
- 3-5 step process clearly illustrated with icons, numbers, and brief descriptions
- Each step includes:
  - Clear icon or visual
  - Headline (5 words or fewer)
  - Description (15-30 words explaining the action and benefit)
  - Minimal jargon; appropriate for non-technical users
- Vertical layout on mobile; horizontal/grid on desktop
- Interactive elements optional (hover effects, animation on scroll) but not required for MVP
- Timeline or progression indicator shows users where they are in the journey
- Tone is conversational and encouraging, not intimidating

**Step Examples (suggested):**
1. Sign up and create your profile
2. Explore and customize benefits plans
3. Share with your team
4. Monitor usage and satisfaction
5. Scale as your business grows

---

### 3.3 Pricing Plans Display

**Purpose:** Present transparent pricing to help users self-qualify and choose a plan

**Acceptance Criteria:**
- At least 2-3 pricing tiers visible (e.g., Starter, Professional, Enterprise)
- Each plan card displays:
  - Plan name
  - Price (monthly or annual, clearly labeled)
  - Number of employee slots or core features included
  - Feature list (3-5 key features per tier with checkmarks)
  - Call-to-action button specific to that plan
  - Visual differentiation (highlighted tier, color coding, or badge for popular choice)
- Currency clearly stated (MXN, USD, or both with toggle)
- Annual billing discount clearly shown if applicable
- Small print or info tooltip explaining billing terms
- "Contacto" or "Custom Quote" option for enterprise inquiries
- Mobile: Stack vertically with easily tappable buttons

**Feature Requirements:**
- Comparison table available via toggle ("Ver Comparación") showing all plans side-by-side
- No surprises: hidden fees explicitly absent

---

### 3.4 Partner Registration Form

**Purpose:** Convert interested prospects into registered partners with contact and business information

**Acceptance Criteria:**
- Single-page form (not multi-step for MVP) with sections clearly delineated
- Required fields only:
  - Business name
  - Owner/Contact name
  - Email address
  - Phone number (with country code pre-filled to Mexico)
  - Business type (dropdown: restaurant, retail, services, startup, other)
  - Employee count (single-select range: 1-10, 11-50, 51-100, 100+)
  - Preferred plan tier (optional, pre-selected based on employee count)
- Optional fields:
  - Company website
  - Message or specific interest
- Form validation:
  - Email format verified in real-time
  - Phone number accepts local Mexican formats
  - Required fields marked with asterisk and show error on submission if empty
  - Error messages in Spanish, clear and helpful
- Submit button changes to loading state during submission (e.g., "Registrando...")
- CAPTCHA or honeypot to prevent spam (not reCAPTCHA v2 popup for mobile UX)
- Privacy notice visible at form bottom: "Protegemos tu privacidad. Ver política de privacidad."
- Form embedded directly on page or in modal (not separate page for MVP)

---

### 3.5 Lead Capture and Email Notification

**Purpose:** Capture inquiry data and trigger internal alerts for sales team

**Acceptance Criteria:**
- Form submissions captured in database with timestamp
- Email notification sent to admin within 1 minute of submission containing:
  - All submitted fields
  - Timestamp and timezone
  - IP address (for fraud detection)
  - Referral source (if available via UTM parameters)
  - Auto-assigned lead score based on plan tier and employee count (optional for MVP)
- Duplicate detection: Check if email already exists and update record or flag as duplicate
- Webhook integration available for CRM sync (e.g., Zapier, Make, or direct API)
- Data encrypted in transit (HTTPS only)
- GDPR/CCPA/Mexican privacy law compliance: Clear opt-in for communications

---

### 3.6 Business Types Showcase

**Purpose:** Help prospects see themselves in the product through relevant industry examples

**Acceptance Criteria:**
- Minimum 6-8 business type categories displayed (restaurants, retail, tech startups, services, etc.)
- Each category card includes:
  - Industry icon or image
  - Industry name
  - 1-2 sentence description of why enplan. fits this industry
  - Success metric or benefit callout (e.g., "Reduce turnover by 30%")
  - Link to industry-specific case study or example (if available; optional for MVP)
- Cards are clickable and expand or navigate to more details (nice-to-have; not required for MVP)
- Responsive grid: 2 columns on mobile, 3-4 on tablet, 4 on desktop
- Spanish-language descriptions; no placeholder content

---

### 3.7 Confirmation/Thank You Page

**Purpose:** Acknowledge submission, set expectations, and reduce post-submit anxiety

**Acceptance Criteria:**
- Displayed immediately after form submission
- Contains:
  - Friendly confirmation message: "¡Gracias! Tu solicitud fue recibida."
  - Expectation-setting: "Nos pondremos en contacto dentro de 24-48 horas."
  - Next steps clearly outlined
  - Email confirmation sent to user with submitted info and follow-up details
  - Optional: Downloadable resource (PDF brief, roadmap, or one-pager) as thank-you
  - Social proof: Testimonial or stat from existing partners
  - Option to return to home or explore pricing again
- URL or URL parameter reflects submission success (e.g., /thankyou or ?success=true)
- Page accessible after submission; not cleared by browser back button

---

### 3.8 Waitlist Signup for App Launch

**Purpose:** Build momentum and engaged audience for official app launch phase

**Acceptance Criteria:**
- Separate modal, widget, or dedicated section (e.g., bottom of page or exit-intent popup)
- Simple form: Email address + optional business name
- Value prop clearly stated: "Sé de los primeros en acceder a enplan. app. Déjanos tu email."
- Referral incentive optional (e.g., "Invita a otros y sube en la lista")
- Confirmation: "¡Ya estás en la lista! Recibirás actualizaciones sobre el lanzamiento."
- Duplicate prevention: Check email against both partner and waitlist databases
- Separate from partner registration form (simpler, lower friction)
- Mobile: Responsive without obscuring main content

---

## 4. Technical Requirements

### 4.1 Technology Stack (Recommended)

#### Frontend
- **Framework:** Next.js 14+ or React 18+ with TypeScript
- **Styling:** Tailwind CSS for responsive design and rapid prototyping
- **UI Components:** Shadcn/ui, Radix UI, or equivalent accessible component library
- **Animations:** Framer Motion for scroll-triggered animations (optional but recommended)
- **Forms:** React Hook Form with Zod validation
- **State Management:** Zustand or React Context for simple state (avoid Redux for this scale)

#### Backend/API
- **Runtime:** Node.js (Express, Fastify) or serverless functions (AWS Lambda, Vercel Functions)
- **Database:** PostgreSQL for relational data (leads, business info) with Prisma ORM
- **Authentication:** Not required for MVP (public site), but prepare architecture for future admin panel
- **Email Service:** SendGrid, Mailgun, or Brevo (formerly Sendinblue) for transactional emails
- **CRM Integration:** Zapier, Make.com, or custom webhook handlers for lead routing

#### Infrastructure
- **Hosting:** Vercel, Netlify, or AWS Amplify for ease of deployment and scalability
- **CDN:** Built-in with hosting provider
- **SSL/TLS:** Required (HTTPS); auto-provisioned by hosting provider
- **Performance Monitoring:** Sentry for error tracking, Vercel Analytics or Hotjar for user behavior

#### DevOps & Deployment
- **Version Control:** Git (GitHub, GitLab, or Bitbucket)
- **CI/CD:** GitHub Actions, Vercel CI, or GitLab CI for automated testing and deployment
- **Staging Environment:** Separate staging domain for QA before production release
- **Database:** Managed PostgreSQL service (AWS RDS, Supabase, or Railway)

### 4.2 Non-Functional Requirements

#### Performance
- **Page Load:** Hero section renders in ≤2 seconds on 4G (First Contentful Paint)
- **Largest Contentful Paint (LCP):** ≤2.5 seconds
- **Cumulative Layout Shift (CLS):** ≤0.1 for visual stability
- **Time to Interactive:** ≤3.5 seconds
- **Build Size:** Total JavaScript bundle ≤150KB (gzipped)

#### Accessibility
- **Standard:** WCAG 2.1 AA minimum
- **Color Contrast:** 4.5:1 for text, 3:1 for graphics
- **Keyboard Navigation:** Full site navigable via Tab key
- **Screen Reader:** Tested with NVDA and VoiceOver
- **Focus Indicators:** Visible on all interactive elements
- **Alt Text:** All images have descriptive alt text in Spanish

#### Security
- **HTTPS/TLS 1.2+:** Required for all pages
- **Form Security:** CSRF tokens on all POST requests
- **Input Validation:** Server-side validation of all user inputs
- **Rate Limiting:** API endpoints rate-limited to prevent abuse (e.g., 10 registrations per IP per hour)
- **Data Encryption:** Personally identifiable information (PII) encrypted at rest
- **Privacy Compliance:** GDPR, CCPA, and Mexican data protection law (LFPDPPP) compliant

#### Internationalization (i18n)
- **Primary Language:** Spanish (Mexico)
- **Secondary:** English
- **Language Selector:** Toggle in header or footer
- **All Content:** Translated and culturally adapted (not machine translation)
- **Number/Date Formats:** Localized for Mexican preferences (e.g., DD/MM/YYYY)

#### SEO
- **Meta Tags:** Unique title and description for each page section
- **Open Graph:** Image and description for social sharing
- **Sitemap:** Auto-generated XML sitemap
- **robots.txt:** Configured to allow indexing
- **Schema Markup:** JSON-LD for Organization, LocalBusiness, and Product types
- **Mobile Optimization:** Mobile-first indexing readiness

#### Browser Support
- **Desktop:** Chrome, Firefox, Safari (latest 2 versions)
- **Mobile:** iOS Safari (14+), Chrome Android (latest 2 versions)
- **Fallback:** Graceful degradation for older browsers (no hard crashes)

### 4.3 API Requirements

#### Form Submission Endpoint
```
POST /api/partners/register
Request: { businessName, contactName, email, phone, businessType, employeeCount, plan }
Response: { success: boolean, leadId: string, message: string }
```

#### Waitlist Signup Endpoint
```
POST /api/waitlist/signup
Request: { email, businessName? }
Response: { success: boolean, message: string }
```

#### Email Notifications
- **Transactional Email:** Confirmation to user
- **Internal Notification:** Lead alert to sales team
- **Templating:** HTML email templates with brand consistency

---

## 5. Success Criteria

### Quantitative Metrics

#### Lead Generation
- **Target:** 500+ qualified leads captured in first 30 days post-launch
- **Definition of Qualified:** Completed registration with valid business info and employee count ≥1
- **Baseline Assumption:** 2-3% conversion rate from visitor to lead

#### Website Performance
- **Bounce Rate:** ≤55% (visitors who leave without scrolling)
- **Time on Page:** ≥2 minutes average session duration
- **Page Views per Session:** ≥2 (visitors explore multiple sections)

#### Conversion Funnel
- **Hero CTA Click Rate:** ≥8% of visitors click primary CTA
- **Form Completion Rate:** ≥60% of users who scroll to form complete submission
- **Pricing Plan Selection:** Tracked via form data; Starter/Professional should represent ≥70% of selections

#### User Acquisition Cost (UAC)
- **Organic Traffic Target:** ≥40% of traffic from organic search within 3 months
- **Paid Advertising ROI:** Cost per lead ≤$5 USD (subject to budget and strategy)

### Qualitative Metrics

#### Brand Perception
- **Messaging Clarity:** User testing shows ≥85% of test users can explain what enplan. does after visiting
- **Trust Building:** Visitors report confidence in the product and company credibility
- **Industry Relevance:** Feedback indicates messaging resonates with target personas

#### Lead Quality
- **Sales Follow-up Feedback:** ≥70% of leads are genuinely interested and fit target profile
- **Meeting Scheduling Rate:** ≥30% of leads result in scheduled follow-up calls
- **Conversion to Partner:** ≥10% of leads convert to paying partners (post-MVP, subject to sales process)

### Technical Metrics
- **Uptime:** 99.9% availability
- **Error Rate:** ≤0.1% of form submissions result in system errors
- **Form Abandonment Rate:** ≤25% (users click submit but close before completion)

---

## 6. Out of Scope (v1)

### Features Not Included in MVP

#### User Accounts & Authentication
- Login/signup for partners before they are officially onboarded
- Dashboard or user panel (planned for post-launch app)
- Password recovery or account management

#### E-Commerce Integration
- Direct subscription payment processing on landing page
- Shopping cart or billing management
- Invoice generation or payment history

#### Advanced Analytics
- Real-time conversion funnel visualization
- Custom event tracking beyond form submission
- Heat mapping or session recording (can use third-party tools like Hotjar if added post-MVP)
- A/B testing infrastructure (can use Google Optimize or Optimizely if prioritized)

#### Localization Beyond Spanish/English
- Additional language translations
- Region-specific pricing (by state within Mexico)
- Multi-currency support beyond MXN/USD

#### Content Management
- Blog or resource library (can be added in Phase 2)
- Case studies or detailed customer testimonials (content creation is separate project)
- Video content (beyond optional hero video)

#### Advanced Lead Scoring
- Behavioral tracking to predict intent
- AI-powered lead prioritization
- Lead nurturing email sequences (can use Mailchimp or Brevo if added)

#### Third-Party Integrations (Phase 2+)
- Direct Salesforce, HubSpot, or other CRM sync (basic webhook support only in MVP)
- Slack notifications for new leads (can use Zapier or Make.com)
- Calendar integration for scheduling calls
- Social login (Google, Facebook sign-in)

#### Mobile App
- Native iOS or Android app (web-responsive only for MVP)

#### Compliance & Legal (Pre-Configured, Not Managed via Landing Page)
- Terms of Service or Privacy Policy editor (assume static pages)
- Cookie consent banner is planned but not interactive preference management (simple notice only)
- CCPA/GDPR opt-out workflows beyond email unsubscribe

#### Accessibility Features Beyond WCAG 2.1 AA
- WCAG 2.1 AAA compliance (highest standard)
- Real-time transcription or video captions
- AI-powered accessibility enhancements

---

## Appendix A: Success Measurement Dashboard

### Recommended Metrics to Track
- **Daily Active Visitors:** Unique sessions per day
- **Leads Generated:** Daily/weekly signup count
- **Conversion Rate by Funnel Stage:**
  - Hero CTA clicks / total visitors
  - Form starts / hero CTA clicks
  - Form completions / form starts
- **Source Attribution:** Organic, direct, paid, referral traffic
- **Device Breakdown:** Mobile vs. desktop performance and conversion rates
- **Geographic Distribution:** State-level breakdown of leads (if available)
- **Business Type Distribution:** Which industries are converting best
- **Form Completion Time:** Average time to fill out registration form
- **Bounce Rate by Page Section:** Where users are dropping off
- **Email Deliverability:** Confirmation emails successfully delivered (>95%)

### Recommended Tools
- **Analytics:** Google Analytics 4 (GA4) for visitor tracking
- **Form Analytics:** Hotjar, Microsoft Clarity, or built-in dashboard
- **Lead Management:** Pipedrive, Airtable, or Google Sheets (initially)
- **Funnel Tracking:** Mixpanel or Amplitude (optional for MVP)

---

## Appendix B: User Research & Validation Plan

### Pre-Launch Research
1. **Stakeholder Interviews:** 5-10 target personas (business owners) to validate messaging
2. **Competitor Analysis:** Research 3-5 similar landing pages and their messaging approach
3. **Messaging Testing:** A/B test 2-3 hero copy variations with target audience

### Post-Launch Validation
1. **User Testing Sessions:** Schedule 5-10 usability tests with target personas at weeks 2-4
2. **Survey:** Post-submission survey asking "What convinced you to sign up?" and "What held you back?"
3. **Feedback Loop:** Monthly review of lead quality feedback from sales team

---

## Appendix C: Timeline & Phases

### Phase 1: MVP Launch (Weeks 1-4)
- Core features: Hero, How it Works, Pricing, Registration Form, Thank You
- Basic design and responsiveness
- Email notifications and lead capture

### Phase 2: Optimization (Weeks 5-8)
- Business Types Showcase
- Waitlist signup integration
- A/B testing and conversion optimization
- SEO optimization

### Phase 3: Enhancement (Weeks 9+)
- Advanced analytics and reporting
- Expanded content (case studies, testimonials)
- Third-party integrations (Salesforce, Slack, etc.)
- Multi-regional customization

---

**Document Version:** 1.0  
**Last Updated:** June 2026  
**Status:** Ready for Development
