# Google Tag Manager & GA4 Setup Guide

This guide will help you set up Google Tag Manager (GTM), Google Analytics 4 (GA4), and Google Ads conversion tracking for your Uniq Customz website.

## Step 1: Get Your GTM Container ID

1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Create a new container or select an existing one
3. Copy your Container ID (format: `GTM-XXXXXXX`)
4. Replace `GTM-XXXXXXX` in `index.html` (lines 9 and 15) with your actual GTM Container ID

## Step 2: Set Up GA4 in Google Tag Manager

### 2.1 Create GA4 Property
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property (or use existing)
3. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### 2.2 Add GA4 Configuration Tag in GTM
1. In GTM, go to **Tags** → **New**
2. Tag Configuration: Choose **Google Analytics: GA4 Configuration**
3. Enter your **Measurement ID** (G-XXXXXXXXXX)
4. Triggering: Select **All Pages**
5. Save and name it "GA4 Configuration"

### 2.3 Add GA4 Event Tags for Conversions

Create separate tags for each conversion event:

#### Call Click Conversion Tag (PRIMARY CONVERSION)
**This tracks ALL call buttons/links across the entire landing page**
1. **Tags** → **New**
2. Tag Type: **Google Analytics: GA4 Event**
3. Configuration Tag: Select your GA4 Configuration tag
4. Event Name: `call_click`
5. **Mark as Conversion**: Check "Send conversion events to Google Ads"
6. Triggering: Create new trigger → **Custom Event**
   - Event name: `call_click`
7. Save as "GA4 - Call Click Conversion"

#### WhatsApp Click Conversion Tag (PRIMARY CONVERSION)
**This tracks ALL WhatsApp buttons/links across the entire landing page**
1. **Tags** → **New**
2. Tag Type: **Google Analytics: GA4 Event**
3. Configuration Tag: Select your GA4 Configuration tag
4. Event Name: `whatsapp_click`
5. **Mark as Conversion**: Check "Send conversion events to Google Ads"
6. Triggering: Create new trigger → **Custom Event**
   - Event name: `whatsapp_click`
7. Save as "GA4 - WhatsApp Click Conversion"

#### Get Directions Conversion Tag (Optional)
1. **Tags** → **New**
2. Tag Type: **Google Analytics: GA4 Event**
3. Configuration Tag: Select your GA4 Configuration tag
4. Event Name: `get_directions_click`
5. Triggering: Create new trigger → **Custom Event**
   - Event name: `get_directions_click`
6. Save as "GA4 - Get Directions"

## Step 3: Set Up Google Ads Conversion Tracking

### 3.1 Create Conversion Actions in Google Ads
1. Go to [Google Ads](https://ads.google.com/)
2. Navigate to **Tools & Settings** → **Conversions**
3. Click **+ New conversion action**
4. Create **TWO PRIMARY CONVERSIONS**:

   **Conversion 1: Call Click**
   - Select **"Website"**
   - Category: **"Contact"**
   - Conversion name: **"Call Click"**
   - Value: Set your conversion value (e.g., $10, $20, etc.)
   - Count: **"Every"** (to track all clicks accurately)
   - Click-through window: 30 days (recommended)
   - Attribution model: **"Data-driven"** (recommended) or "Last click"
   - Click **Create and continue**

   **Conversion 2: WhatsApp Click**
   - Select **"Website"**
   - Category: **"Contact"**
   - Conversion name: **"WhatsApp Click"**
   - Value: Set your conversion value (e.g., $10, $20, etc.)
   - Count: **"Every"** (to track all clicks accurately)
   - Click-through window: 30 days (recommended)
   - Attribution model: **"Data-driven"** (recommended) or "Last click"
   - Click **Create and continue**

### 3.2 Get Conversion Labels
After creating each conversion action:
1. Click on the conversion action
2. Scroll to **"Tag setup"**
3. Copy the **Conversion Label** (format: `AW-XXXXXXXXX/AbCdEfGhIjKlMnOpQrStUvWxYz`)
4. Also note your **Conversion ID** (format: `AW-XXXXXXXXX`)

### 3.3 Add Google Ads Conversion Tags in GTM

#### Call Click Conversion Tag (Google Ads) - PRIMARY
1. **Tags** → **New**
2. Tag Type: **Google Ads: Conversion Tracking**
3. Conversion ID: Enter your Google Ads ID (format: `AW-XXXXXXXXX`)
4. Conversion Label: Enter the conversion label for **Call Click**
5. Conversion Value: Leave empty (will use value from Google Ads)
6. Triggering: Create new trigger → **Custom Event**
   - Event name: `call_click`
7. Save as "Google Ads - Call Click Conversion"

#### WhatsApp Click Conversion Tag (Google Ads) - PRIMARY
1. **Tags** → **New**
2. Tag Type: **Google Ads: Conversion Tracking**
3. Conversion ID: Enter your Google Ads ID (format: `AW-XXXXXXXXX`)
4. Conversion Label: Enter the conversion label for **WhatsApp Click**
5. Conversion Value: Leave empty (will use value from Google Ads)
6. Triggering: Create new trigger → **Custom Event**
   - Event name: `whatsapp_click`
7. Save as "Google Ads - WhatsApp Click Conversion"

## Step 4: Link GA4 to Google Ads

### 4.1 Link GA4 Property to Google Ads
1. In Google Ads, go to **Tools & Settings** → **Linked accounts**
2. Click **Google Analytics (GA4)**
3. Select your GA4 property and click **Link**
4. Enable **Import site metrics**

### 4.2 Import GA4 Events as Conversions (Alternative Method)
**Note**: If you've already set up Google Ads conversion tags in GTM (Step 3.3), you can skip this step. However, importing GA4 events provides additional insights.

1. In Google Ads, go to **Tools & Settings** → **Conversions**
2. Click **+ New conversion action**
3. Select **Import** → **Google Analytics (GA4)**
4. Select your GA4 property
5. Import these events as conversions:
   - `call_click` (PRIMARY - tracks all call buttons)
   - `whatsapp_click` (PRIMARY - tracks all WhatsApp buttons)
   - `get_directions_click` (Optional)

## Step 5: Test Your Setup

### 5.1 Test GTM
1. Install [Google Tag Assistant](https://tagassistant.google.com/) Chrome extension
2. Visit your website
3. Click on phone links, contact buttons, etc.
4. Verify events are firing in Tag Assistant

### 5.2 Test GA4 Events
1. Go to GA4 → **Reports** → **Realtime**
2. Perform actions on your website (click phone, contact button, etc.)
3. Verify events appear in realtime reports

### 5.3 Test Google Ads Conversions
1. In Google Ads, go to **Tools & Settings** → **Conversions**
2. Click on a conversion action
3. Check **Recent conversions** to see if events are being recorded

## Step 6: Publish GTM Container

Once everything is tested:
1. In GTM, click **Submit**
2. Add version name and description
3. Click **Publish**

## Tracked Events

The following events are automatically tracked:

### PRIMARY CONVERSION EVENTS (For Google Ads Optimization)

| Event Name | Description | Conversion Type | Tracks |
|------------|-------------|-----------------|--------|
| **`call_click`** | **User clicks ANY call button/link** | **Call Conversion** | All tel: links, phone buttons, Contact Us buttons with phone numbers |
| **`whatsapp_click`** | **User clicks ANY WhatsApp button/link** | **WhatsApp Conversion** | All WhatsApp links (wa.me, api.whatsapp.com, etc.) |

### SECONDARY EVENTS (For Analytics & Insights)

| Event Name | Description | Conversion Type |
|------------|-------------|-----------------|
| `get_directions_click` | User clicks Get Directions button | Directions Click |
| `service_card_click` | User clicks on a service card | Engagement |
| `review_interaction` | User interacts with reviews | Engagement |
| `faq_interaction` | User opens/closes FAQ items | Engagement |
| `form_submit` | User submits contact form | Form Submission |
| `scroll_depth` | User scrolls 25%, 50%, 75%, or 100% | Engagement |
| `page_view` | Page load event | Page View |

### Conversion Tracking Accuracy Features

✅ **Duplicate Prevention**: Each click is tracked only once using unique identifiers  
✅ **Comprehensive Coverage**: Tracks all call and WhatsApp buttons regardless of location  
✅ **Detailed Metadata**: Includes button location, section ID, button text for better reporting  
✅ **Dynamic Tracking**: Automatically tracks WhatsApp links added dynamically to the page  
✅ **Validation**: All events include timestamp and page information for accurate attribution

## Troubleshooting

### Events Not Firing
- Check browser console for JavaScript errors
- Verify GTM container ID is correct
- Use GTM Preview mode to debug
- Check that dataLayer is being populated (use browser console: `dataLayer`)

### Conversions Not Showing in Google Ads
- Wait 24-48 hours for conversion data to appear
- Verify conversion labels are correct
- Check that GA4 is linked to Google Ads
- Ensure conversion actions are set to "Count: Every" if testing

### GTM Not Loading
- Verify GTM container ID is correct
- Check browser console for errors
- Ensure GTM code is in both `<head>` and `<body>` sections

## Support

For more help:
- [GTM Documentation](https://support.google.com/tagmanager)
- [GA4 Documentation](https://support.google.com/analytics/answer/9304153)
- [Google Ads Help](https://support.google.com/google-ads)
