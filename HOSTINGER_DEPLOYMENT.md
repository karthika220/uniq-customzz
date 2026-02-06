# Hostinger Deployment Guide

## ✅ Yes, Your Site is Ready for Hostinger!

All files are properly configured and ready to upload to Hostinger.

## 📁 Files to Upload

Upload these files/folders to your Hostinger hosting:

```
uniq-Customz-main/
├── index.html          ← Main HTML file
├── style.css           ← Stylesheet
├── main.js             ← JavaScript file
└── assets/             ← All images, videos, icons
    ├── Banner Video.mp4
    ├── Unique Customz - Logo 1.png
    ├── phone-icon.png
    ├── icon1.png
    ├── icon2.png
    ├── google.svg
    ├── gallery/
    │   ├── image-1.jpg
    │   └── image-2.jpg
    ├── images/
    │   ├── car-painting.jpg
    │   ├── ceramic-coating.jpg
    │   ├── graphene-coating.jpg
    │   ├── interior-cleaning.jpg.jpeg
    │   ├── ppf-service.jpg
    │   └── sunflim-protection.jpg
    └── result/
        └── Image.jpg
```

## 🚀 Step-by-Step Upload Instructions

### Method 1: Using File Manager (Easiest)

1. **Login to Hostinger**
   - Go to hpanel.hostinger.com
   - Login with your credentials

2. **Access File Manager**
   - Click on "File Manager" in the control panel
   - Navigate to `public_html` folder (or `www` folder)

3. **Upload Files**
   - Click "Upload" button
   - Select all files from `uniq-Customz-main` folder:
     - `index.html`
     - `style.css`
     - `main.js`
   - Upload the entire `assets` folder with all its contents
   - Wait for upload to complete

4. **Verify Structure**
   Your `public_html` should look like:
   ```
   public_html/
   ├── index.html
   ├── style.css
   ├── main.js
   └── assets/
       └── (all subfolders and files)
   ```

5. **Test Your Site**
   - Visit your domain (e.g., `https://yourdomain.com`)
   - The site should load immediately!

### Method 2: Using FTP (FileZilla)

1. **Get FTP Credentials**
   - In Hostinger hPanel, go to "FTP Accounts"
   - Note your FTP host, username, and password

2. **Connect with FileZilla**
   - Host: `ftp.yourdomain.com` or IP address
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21

3. **Upload Files**
   - Navigate to `public_html` on remote server
   - Upload all files maintaining the folder structure

## ⚙️ Important Configuration

### 1. Update Domain URLs (If Needed)

If your domain is different from `www.uniqcustomz.com`, update these in `index.html`:

**Lines to Update:**
- Line 13: `<link rel="canonical" href="https://www.uniqcustomz.com/">`
- Line 17: `<meta property="og:url" content="https://www.uniqcustomz.com/">`
- Line 21: `<meta property="og:image" content="https://www.uniqcustomz.com/assets/...">`
- Line 24: `<meta property="twitter:url" content="https://www.uniqcustomz.com/">`
- Line 27: `<meta property="twitter:image" content="https://www.uniqcustomz.com/assets/...">`

Replace `www.uniqcustomz.com` with your actual domain.

### 2. SSL Certificate (HTTPS)

- Hostinger provides free SSL certificates
- Enable SSL in hPanel → SSL section
- Your site will work on both `http://` and `https://`

### 3. GTM & GA4 Configuration

Your GTM and GA4 are already configured:
- ✅ GTM Container: `GTM-57C5CXMM` (already in HTML)
- ✅ GA4 Measurement ID: `G-0JJRL7GNJT` (configure in GTM)

**After upload, verify:**
1. GTM is loading (check browser console)
2. GA4 events are firing
3. Conversion tracking works

## ✅ Pre-Upload Checklist

- [x] All HTML files are ready
- [x] All CSS files are ready
- [x] All JavaScript files are ready
- [x] All assets folder with images/videos
- [x] GTM container ID configured
- [x] All paths are relative (no absolute paths)
- [x] No localhost references
- [x] FAQ section working
- [x] Call buttons working
- [x] Mobile responsive

## 🔍 Post-Upload Verification

After uploading, check:

1. **Homepage Loads**
   - Visit your domain
   - Check if page loads correctly

2. **Images Display**
   - Verify all images load
   - Check logo, service images, gallery images

3. **Video Plays**
   - Hero video should autoplay (muted)

4. **Buttons Work**
   - Test call buttons (should open phone dialer)
   - Test "Get Directions" button
   - Test FAQ accordion

5. **Mobile View**
   - Test on mobile device
   - Verify hamburger menu works
   - Check responsive design

6. **GTM/GA4**
   - Open browser console (F12)
   - Check for GTM loading
   - Verify no JavaScript errors

## 🐛 Troubleshooting

### Images Not Loading
- Check file paths are correct
- Verify `assets` folder is uploaded
- Check file permissions (should be 644)

### CSS Not Loading
- Verify `style.css` is in root directory
- Check browser console for 404 errors
- Clear browser cache

### JavaScript Not Working
- Verify `main.js` is in root directory
- Check browser console for errors
- Ensure GTM is loading first

### GTM Not Loading
- Verify GTM container ID is correct
- Check browser console for errors
- Test in incognito mode

## 📞 Support

If you encounter issues:
1. Check browser console (F12) for errors
2. Verify all files uploaded correctly
3. Check file permissions
4. Contact Hostinger support if needed

## ✨ Your Site is Production-Ready!

Everything is optimized and ready for Hostinger:
- ✅ Performance optimized
- ✅ Mobile responsive
- ✅ SEO ready
- ✅ Analytics configured
- ✅ Conversion tracking ready

**Good luck with your deployment! 🚀**
