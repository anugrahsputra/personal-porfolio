# Public Directory

This directory contains static files that are served directly by Next.js.

## Resume File

To add your resume for the download functionality:

1. **Add your resume PDF file** to this directory:
   - Name it `resume.pdf`
   - Or update the filename in `src/components/Hero.tsx` if you use a different name

2. **Update the download filename** in `src/components/Hero.tsx`:
   ```javascript
   link.download = 'YourName_Resume.pdf'; // Change to your actual name
   ```

3. **File format**: PDF is recommended for best compatibility across all devices and browsers.

## Current Files

- `next.svg` - Next.js logo
- `vercel.svg` - Vercel logo
- `file.svg` - File icon
- `globe.svg` - Globe icon
- `window.svg` - Window icon
