# GTM/GA4 Event Names Reference

This document lists all event names tracked on the Uniq Customz landing page.

## 🎯 Primary Conversion Events (For Google Ads)

### 1. `call_click`
**Description**: Tracks ALL call button/link clicks across the entire page  
**Conversion Type**: Primary conversion for Google Ads  
**When It Fires**: 
- User clicks phone icon button (`.phone-btn`)
- User clicks any `tel:` link
- User clicks Contact Us buttons with phone numbers
- User clicks any button/link that triggers a phone call

**Event Parameters**:
- `event_category`: "Conversion"
- `event_label`: "Call Click"
- `conversion_type`: "call"
- `conversion_value`: 1
- `button_type`: "phone_icon" | "tel_link" | "contact_button"
- `button_location`: Section ID where button is located
- `phone_number`: Phone number being called
- `section_id`: ID of the section containing the button
- `element_class`: CSS classes of the button
- `button_index`: Index of the button

**Use Case**: Track all phone call conversions in one unified event

---

### 2. `whatsapp_click`
**Description**: Tracks ALL WhatsApp button/link clicks across the entire page  
**Conversion Type**: Primary conversion for Google Ads  
**When It Fires**:
- User clicks any WhatsApp link (`wa.me`, `api.whatsapp.com`, `web.whatsapp.com`)
- User clicks buttons with WhatsApp URLs
- User clicks dynamically added WhatsApp links

**Event Parameters**:
- `event_category`: "Conversion"
- `event_label`: "WhatsApp Click"
- `conversion_type`: "whatsapp"
- `conversion_value`: 1
- `button_type`: "whatsapp_link" | "whatsapp_link_dynamic"
- `button_text`: Text content of the button
- `button_location`: Section ID where button is located
- `whatsapp_url`: Full WhatsApp URL
- `phone_number`: Extracted phone number from URL
- `section_id`: ID of the section containing the button
- `element_class`: CSS classes of the button
- `button_index`: Index of the button

**Use Case**: Track all WhatsApp conversions in one unified event

---

## 📊 Secondary Events (For Analytics & Insights)

### 3. `page_view`
**Description**: Tracks page load/view  
**When It Fires**: When the page loads (DOMContentLoaded)

**Event Parameters**:
- `page_title`: Document title
- `page_location`: Full URL
- `page_path`: URL pathname

---

### 4. `get_directions_click`
**Description**: Tracks clicks on "Get Directions" button  
**When It Fires**: User clicks Get Directions link

**Event Parameters**:
- `event_category`: "Conversion"
- `event_label`: "Get Directions"
- `conversion_type`: "directions_click"
- `link_location`: Section ID (usually "hero")

---

### 5. `service_card_click`
**Description**: Tracks clicks on service cards  
**When It Fires**: User clicks on any service card

**Event Parameters**:
- `event_category`: "Engagement"
- `event_label`: Service title (e.g., "Paint Protection Film")
- `conversion_type`: "service_interest"

---

### 6. `review_interaction`
**Description**: Tracks clicks on review cards  
**When It Fires**: User clicks on any review card

**Event Parameters**:
- `event_category`: "Engagement"
- `event_label`: Reviewer name
- `conversion_type`: "review_view"

---

### 7. `faq_interaction`
**Description**: Tracks FAQ accordion opens/closes  
**When It Fires**: User clicks on FAQ question to open/close

**Event Parameters**:
- `event_category`: "Engagement"
- `event_label`: FAQ question text
- `faq_action`: "open" | "close"
- `conversion_type`: "faq_view"

---

### 8. `scroll_depth`
**Description**: Tracks scroll depth milestones  
**When It Fires**: User scrolls to 25%, 50%, 75%, or 100% of page

**Event Parameters**:
- `event_category`: "Engagement"
- `event_label`: "25% Scroll Depth" | "50% Scroll Depth" | "75% Scroll Depth" | "100% Scroll Depth"
- `scroll_depth`: 25 | 50 | 75 | 100

---

### 9. `form_submit`
**Description**: Tracks form submissions (if contact form exists)  
**When It Fires**: User submits contact form

**Event Parameters**:
- `event_category`: "Conversion"
- `event_label`: "Contact Form"
- `conversion_type`: "form_submission"
- `form_id`: "contactForm"

---

## 📋 Event Summary Table

| Event Name | Type | Primary Use | Fires When |
|------------|------|-------------|------------|
| `call_click` | **Conversion** | Google Ads | Any call button/link clicked |
| `whatsapp_click` | **Conversion** | Google Ads | Any WhatsApp link clicked |
| `page_view` | Page View | Analytics | Page loads |
| `get_directions_click` | Engagement | Analytics | Get Directions clicked |
| `service_card_click` | Engagement | Analytics | Service card clicked |
| `review_interaction` | Engagement | Analytics | Review card clicked |
| `faq_interaction` | Engagement | Analytics | FAQ opened/closed |
| `scroll_depth` | Engagement | Analytics | User scrolls 25/50/75/100% |
| `form_submit` | Conversion | Analytics | Form submitted |

---

## 🔧 GTM Configuration

### For Google Ads Conversions:
Create triggers for these events:
1. **Call Click Conversion**: Custom Event → `call_click`
2. **WhatsApp Click Conversion**: Custom Event → `whatsapp_click`

### For GA4 Events:
Create event tags for all events listed above using Custom Event triggers.

---

## 📝 Notes

- All events include `timestamp`, `page_url`, and `page_path` automatically
- Conversion events (`call_click`, `whatsapp_click`) have duplicate prevention
- Events are pushed to `dataLayer` for GTM to pick up
- Debug logging is enabled for localhost/127.0.0.1

---

**Last Updated**: Ready for Deployment  
**GTM Container**: GTM-57C5CXMM  
**GA4 Measurement ID**: G-0JJRL7GNJT
