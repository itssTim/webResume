# webResume
# Personal Resume Website — Analytics & Automation Stack

A personal resume website built with HTML, CSS, and JavaScript, 
instrumented with a full analytics and automation stack using 
Google Tag Manager, GA4, and Zapier.

## Project Overview

The site hosts a resume, contact form, and resume download button. 
Beyond the core site, the project implements a complete event tracking 
architecture and data pipeline — capturing user interactions via GTM, 
routing form submission data to Google Sheets via a custom AppScript 
integration, and triggering automated email notifications via Zapier 
when new contact data is received.

## Technical Architecture
```
User interaction on site
        ↓
GTM container intercepts events via triggers
        ↓
DataLayer push captures structured form field data
        ↓
GA4 receives event data for interaction tracking
        ↓
Google Apps Script routes form submission data to Google Sheets
(GA4 does not store raw PII fields like email and phone number,
making a separate data pipeline necessary for contact capture)
        ↓
Zapier monitors Google Sheet for new rows
        ↓
Email notification sent with contact details formatted
for immediate follow-up
```

## GTM Implementation

### Container Structure

The GTM container manages four categories of tracking: 
form submission, file download, click tracking, and error monitoring. 
All user-defined data is passed through the DataLayer rather than 
scraped from the DOM — this approach is more reliable across 
DOM changes and allows structured, typed data to be passed 
alongside each event.

### Tags

| Tag | Type | Trigger |
|-----|------|---------|
| GA4 Init | Google Tag | All Pages — Initialization |
| contact_form_submit | GA4 Event | Contact Form Submit |
| resume_download | GA4 Event | Resume file_download Click |
| GA4 Button Clicks Event | GA4 Event | Button Clicks |
| GA4 All Clicks Event | GA4 Event | All Elements |
| JS Error Event | GA4 Event | JavaScript Error |

### Triggers

| Trigger | Type | Description |
|---------|------|-------------|
| Contact Form Submit | Custom Event | Listens for `contact_form_submit` event name pushed to DataLayer on form submission |
| Resume file_download Click | Custom Event | Uses GTM's built-in file_download event for the resume download button |
| Button Clicks | Click | Fires on elements containing the `.btn` class |
| All Elements | Click | Broad click tracking across all page elements |
| JS Error | JavaScript Error | Fires on any JavaScript error for debugging transparency |

### Key Variables

**Auto-collected (built-in):**
- Page URL, Page Path, Page Hostname — for page-level context
- Click URL, Click Text, Click ID, Click Classes — for click event detail
- Scroll Depth Threshold, Scroll Direction — for scroll tracking
- Error Message, Error Line, Error URL — for JS error tracking

**User-defined DataLayer variables (form field capture):**

| Variable | Description |
|----------|-------------|
| dL - First Name | Visitor first name from contact form |
| dL - Last Name | Visitor last name from contact form |
| dL - Email | Visitor email address |
| dL - Telephone | Visitor phone number |
| dL - Company | Visitor company name |
| dL - Cust Data | Combined contact data object |
| dL - Customer Id | Unique identifier per submission |
| GA4 ID | Constant — GA4 Measurement ID |

### Why DataLayer over DOM scraping

GA4 event parameters are designed for behavioural data, not PII 
storage. Email addresses, phone numbers, and names are not retained 
in GA4 reporting by default and cannot be reliably retrieved 
after the session ends. A DataLayer push was implemented to capture 
raw form field data at submission time and route it to a persistent 
store (Google Sheets) via AppScript, keeping the contact record 
accessible for follow-up independent of GA4's data retention model.

## GA4 Event Schema

| Event Name | Trigger | Key Parameters |
|------------|---------|----------------|
| page_view | All pages | page_location, page_title |
| contact_form_submit | Form submission | first_name, last_name, email, telephone, company |
| resume_download | Download button click | file_name, link_url |
| button_click | .btn class elements | click_text, click_url, click_id |
| js_error | JavaScript error | error_message, error_line, error_url |
| scroll | Scroll depth threshold | percent_scrolled |

## Google Sheets + AppScript Integration

On form submission, a custom Google Apps Script is triggered via 
the GA4 event pipeline. The script receives the DataLayer payload 
and appends a new row to a designated Google Sheet with the 
contact's details — name, email, phone number, company, and 
submission timestamp. This was written using the Sheets API 
with reference to Google's Apps Script documentation.

## Zapier Automation

**Trigger:** New or updated row in Google Sheets contact log  
**Action:** Send email notification via Gmail  
**Data passed:** First name, last name, email, phone number, 
company, submission timestamp  
**Format:** Custom email template arranged for immediate 
readability — all contact fields visible without opening a 
separate document

## Challenges and Decisions

**Form data persistence:** GA4 does not retain raw PII fields 
after the session. The decision to route form data through 
AppScript to Google Sheets solved this — contact information 
is now stored persistently and independently of GA4's 
data retention settings.

**Form tracking implementation:** Implementing reliable form 
submission tracking required a custom event trigger listening 
for the `contact_form_submit` DataLayer push rather than 
relying on GTM's native form submission trigger, which can 
behave inconsistently with custom form handlers.

**Notification latency:** Zapier polling introduces a short 
delay between form submission and email notification. 
This is acceptable for the use case but would be replaced 
with a direct AppScript email trigger in a production environment.

## Tools Used

- Google Tag Manager
- Google Analytics 4 (GA4)
- Google Apps Script
- Google Sheets
- Zapier
- JavaScript (ES6+)
- HTML / CSS
- GitHub / GitHub Pages


