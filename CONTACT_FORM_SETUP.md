# Contact Form Setup Guide

## Overview
Your portfolio includes a fully functional contact form that sends submissions directly to your email using **Web3Forms** - a free service that doesn't require any backend code.

## Setup Steps

### 1. Get Your Web3Forms Access Key (FREE)

1. Visit [https://web3forms.com](https://web3forms.com)
2. Click "Create Access Key" or "Get Started"
3. Enter your email: **ayushkamboj46@gmail.com**
4. Verify your email (check inbox/spam)
5. Copy the Access Key provided

### 2. Update Your Configuration

Open `data/profile.json` and find the `contactForm` section:

```json
"contactForm": {
  "enabled": true,
  "email": "ayushkamboj46@gmail.com",
  "web3FormsAccessKey": "YOUR_WEB3FORMS_ACCESS_KEY",  // ← Replace this!
  ...
}
```

Replace `YOUR_WEB3FORMS_ACCESS_KEY` with the key you received from Web3Forms.

### 3. Test the Form

1. Start your development server: `npm run dev`
2. Navigate to: http://localhost:3000/contact
3. Fill out the form and submit
4. Check your email: **ayushkamboj46@gmail.com**

## How It Works

When someone submits the contact form:

1. Form data is sent to Web3Forms API
2. Web3Forms forwards the data to your email
3. You receive an email with:
   - Name
   - Email Address
   - Mobile Number
   - Query/Message

## Customization

### Change Form Fields

Edit `data/profile.json`:

```json
"contactForm": {
  "fields": [
    {
      "name": "name",
      "label": "Full Name",
      "type": "text",
      "required": true,
      "placeholder": "Enter your full name"
    },
    // Add more fields here
  ]
}
```

### Change Success/Error Messages

```json
"contactForm": {
  "successMessage": "Your custom success message",
  "errorMessage": "Your custom error message"
}
```

### Disable Contact Form

```json
"contactForm": {
  "enabled": false  // Form won't be displayed
}
```

## Web3Forms Features (FREE Plan)

✅ Unlimited form submissions
✅ Email notifications
✅ Spam protection
✅ File uploads (optional)
✅ Auto-response emails (optional)
✅ Custom subject lines
✅ No backend required

## Troubleshooting

### Form not working?
- Check if you replaced `YOUR_WEB3FORMS_ACCESS_KEY` with your actual key
- Verify your email is correct in `profile.json`
- Check browser console for errors

### Not receiving emails?
- Check spam/junk folder
- Verify email address in Web3Forms dashboard
- Make sure Web3Forms Access Key is active

### Want to use a different service?
You can modify `components/sections/contact-form.tsx` to use:
- EmailJS
- Formspree
- Your own backend API

## Support

- Web3Forms Documentation: https://docs.web3forms.com
- Web3Forms Support: support@web3forms.com

---

**Note:** Keep your Access Key private. Don't commit it to public repositories if you want to keep it secure. Consider using environment variables for production.
