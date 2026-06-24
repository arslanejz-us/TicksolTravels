# 📸 Image Upload & Setup Guide

## Quick Setup Instructions

### Step 1: Create Directories (if they don't exist)

```bash
# Create directories in your public folder
mkdir -p public/destinations
mkdir -p public/religious-tours
```

---

## Step 2: Upload International Tour Destination Images

Place these images in `/public/destinations/`:

| Filename | Destination | Required |
|----------|-------------|----------|
| `uae.jpg` | United Arab Emirates | ✅ |
| `ksa.jpg` | Saudi Arabia | ✅ |
| `gulf.jpg` | Gulf Countries | ✅ |
| `baku.jpg` | Baku, Azerbaijan | ✅ |
| `turkey.jpg` | Turkey | ✅ |
| `malaysia.jpg` | Malaysia | ✅ |
| `thailand.jpg` | Thailand | ✅ |

**Image Specifications:**
- Format: JPG (recommended) or PNG
- Dimensions: 1200x800px or 16:9 aspect ratio
- File size: Optimized (under 500KB each)
- Quality: High resolution for professional look

---

## Step 3: Upload Religious Tour Images

Place these images in `/public/religious-tours/`:

| Filename | Destination | Required |
|----------|-------------|----------|
| `hajj-umrah.jpg` | Hajj & Umrah | ✅ |
| `najaf-karbala.jpg` | Najaf & Karbala | ✅ |
| `mashhad-iran.jpg` | Mashhad, Iran | ✅ |

**Image Specifications:**
- Format: JPG (recommended) or PNG
- Dimensions: 1200x900px or 4:3 aspect ratio
- File size: Optimized (under 500KB each)
- Quality: High resolution for professional look

---

## File Structure After Setup

```
public/
├── destinations/
│   ├── uae.jpg
│   ├── ksa.jpg
│   ├── gulf.jpg
│   ├── baku.jpg
│   ├── turkey.jpg
│   ├── malaysia.jpg
│   └── thailand.jpg
├── religious-tours/
│   ├── hajj-umrah.jpg
│   ├── najaf-karbala.jpg
│   └── mashhad-iran.jpg
├── Arslan Ejaz.jpeg
├── Imtiaz-Ahmad-Malik.jpeg
├── Saeed-Ashraf-Malik.jpeg
└── [other files...]
```

---

## Image Display Logic

### Automatic Behavior:
1. ✅ Component looks for image in `/public/destinations/{id}.jpg`
2. ✅ If image exists → displays with smooth animations
3. ✅ If image missing → shows emoji + gradient fallback
4. ✅ All hover animations work regardless

### No Code Changes Needed!
Once you upload images with the correct filenames, they'll automatically appear in the cards.

---

## Image Optimization Tips

### Before Upload:
1. **Resize to appropriate dimensions:**
   ```bash
   # For destination cards (International Tours)
   Convert-ImageSize input.jpg 1200x800 output.jpg
   
   # For religious tour cards
   Convert-ImageSize input.jpg 1200x900 output.jpg
   ```

2. **Compress for web:**
   ```bash
   # Using ImageMagick or similar
   convert input.jpg -quality 85 -strip output.jpg
   ```

3. **Verify file size:**
   - Target: Under 500KB per image
   - Recommended: 200-400KB

### Recommended Tools:
- **Online:** TinyPNG, ImageOptim Online
- **CLI:** ImageMagick, ffmpeg
- **GUI:** Adobe Lightroom, GIMP

---

## Testing After Upload

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Visit http://localhost:3000**

3. **Check each section:**
   - ✅ Hero section - service cards
   - ✅ Destinations tab - International Tours cards should show images
   - ✅ Destinations tab - Religious Tours cards should show images
   - ✅ All hover animations working
   - ✅ Images scale smoothly on hover
   - ✅ Mobile responsive

4. **If images don't appear:**
   - Check file exists in correct directory
   - Verify filename matches exactly (case-sensitive)
   - Clear browser cache and reload
   - Check browser console for errors

---

## Current Status

### ✅ Already Working:
- Theme color icons (gold)
- Button animations
- Contact section
- Hero service cards
- Leadership section (fixed photo cropping)
- Responsive design

### ⏳ Waiting for Images:
- Destination card images
- Religious tour card images
- Image hover animations (emoji fallback works for now)

---

## Troubleshooting

### Images not showing?
1. Check file exists in `/public/destinations/` or `/public/religious-tours/`
2. Verify exact filename (including extension): `uae.jpg` not `UAE.jpg`
3. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
4. Clear .next build cache: `rm -rf .next`

### Images blurry?
1. Increase original image dimensions
2. Use higher quality JPG (85+ quality)
3. Verify image has correct aspect ratio

### Images not scaling on hover?
1. Browser cache issue - hard refresh
2. Check if image file is actually loading
3. Open DevTools Console to see any errors

---

## Next Steps

1. **Prepare Images:**
   - Gather high-quality destination photos
   - Resize to correct dimensions
   - Compress for web performance

2. **Upload to Public Folder:**
   - Create necessary directories
   - Place images with exact filenames

3. **Test:**
   - Run dev server
   - Verify images appear
   - Check all animations

4. **Deploy:**
   - Build: `npm run build`
   - Deploy to production

---

## Questions?

If images still don't appear after following these steps:
1. Check browser DevTools (F12) → Console for errors
2. Verify file names exactly match the filenames in the guide
3. Ensure images are in correct directories
4. Try clearing `.next` build folder: `rm -rf .next`

**Everything else is already implemented and working! 🚀**
