# 🧪 Visual Testing & Verification Guide

## Before You Start Testing

1. **Run the dev server:**
   ```bash
   npm run dev
   ```

2. **Open in browser:**
   ```
   http://localhost:3000
   ```

3. **Open DevTools** (F12) to check for console errors

---

## 🎯 Section-by-Section Testing

### 1. HERO SECTION ✨

**Desktop View (1024px+):**
- [ ] Left side: Main headline "Your Trusted Travel Partner"
- [ ] Left side: Subheadline visible
- [ ] Left side: "Explore Services" and "Get Quote" buttons visible
- [ ] Left side: Stats displayed in 2x2 grid
- [ ] Right side: 4 service cards visible:
  - [ ] ✈️ Air Ticketing
  - [ ] 🏨 Hotel Reservations
  - [ ] 🛂 Visa Processing
  - [ ] 🚗 Domestic Travel

**Hover Effects (Desktop):**
- [ ] Service cards lift up smoothly (-6px)
- [ ] Service card icons scale up 110%
- [ ] Background glow intensifies
- [ ] All animations are smooth (no stuttering)

**Mobile View (<768px):**
- [ ] Service cards are hidden (hide on mobile)
- [ ] Content stacks vertically
- [ ] Text is readable
- [ ] Stats are in 2x2 grid

---

### 2. SERVICES SECTION 🛂

**Layout:**
- [ ] 6 services displayed in 3-column grid (desktop)
- [ ] Each service card visible:
  - [ ] Icon (emoji)
  - [ ] Title
  - [ ] Description
  - [ ] 3 category badges (3★, 4★, 5★)
  - [ ] Email button
  - [ ] WhatsApp button

**Button Styling:**
- [ ] Email button:
  - [ ] Has 📧 icon with gold color
  - [ ] Text says "Email"
  - [ ] Gold border and background
  - [ ] Link goes to: ticksoltravelpk@gmail.com
  
- [ ] WhatsApp button:
  - [ ] Has 💬 icon with gold color
  - [ ] Text says "WhatsApp"
  - [ ] Gold border and background
  - [ ] Link opens WhatsApp with company number

**Hover Effects:**
- [ ] Cards lift up smoothly
- [ ] Icons scale up 110%
- [ ] Background glow appears
- [ ] Button colors brighten on hover

**Mobile View:**
- [ ] Grid becomes 1 or 2 columns
- [ ] Cards remain readable
- [ ] Buttons stack properly

---

### 3. DESTINATIONS SECTION 🌍

**Tab Navigation:**
- [ ] Two tabs visible: "🕋 Religious Tours" | "🌍 International Tours"
- [ ] Tabs have gold border when active
- [ ] Clicking tabs switches content smoothly
- [ ] Current tab is highlighted in gold

**Religious Tours Tab:**
- [ ] 3 destination cards visible:
  - [ ] 🕋 Hajj & Umrah
  - [ ] 🏛️ Najaf & Karbala
  - [ ] 🇮🇷 Mashhad, Iran

- [ ] Each card has:
  - [ ] Destination image (or emoji + gradient if image missing)
  - [ ] Title
  - [ ] 4 highlight bullets
  - [ ] Email button (📧)
  - [ ] Chat button (💬)

**International Tours Tab:**
- [ ] 7 destination cards visible:
  - [ ] UAE, KSA, Gulf, Baku, Turkey, Malaysia, Thailand
  
- [ ] Each card has:
  - [ ] Destination image (or emoji + gradient if image missing)
  - [ ] Country flag emoji
  - [ ] Country code badge (gold background)
  - [ ] Description
  - [ ] 3 contact buttons: Email (📧), Phone (📱), WhatsApp (💬)

**Card Hover Effects:**
- [ ] Cards lift up smoothly
- [ ] Cards scale slightly (1.02x)
- [ ] Images display/brighten on hover
- [ ] Emoji scales and brightens
- [ ] Overlay becomes more transparent

**Buttons:**
- [ ] All icons are gold (#e6af1a) - NOT red, green, or blue
- [ ] Phone icon: 📱 (gold) - NOT red
- [ ] Email icon: 📧 (gold) - NOT blue
- [ ] WhatsApp icon: 💬 (gold) - NOT green
- [ ] Icons scale 110% on hover
- [ ] Buttons have gold borders

**Mobile View:**
- [ ] Tabs work on mobile
- [ ] Cards stack vertically
- [ ] Country badge visible
- [ ] Buttons are properly sized (44px+ for touch)

---

### 4. PACKAGES SECTION 📦

**Layout:**
- [ ] 3 package cards visible in a row:
  1. [ ] 3 Star (300,000 PKR)
  2. [ ] 4 Star (400,000 PKR) - RECOMMENDED
  3. [ ] 5 Star (500,000 PKR)

**4-Star Package (Featured):**
- [ ] Has gold ring border (2px)
- [ ] Has "Recommended" badge in top right
- [ ] Slightly larger than other cards (scale 1.05 on desktop)
- [ ] Stands out visually

**Each Card Contains:**
- [ ] Star tier indicator (★ 3/4/5 Star)
- [ ] Package title
- [ ] Package description
- [ ] Price in large text: XXX,000 PKR
- [ ] Highlights list (5-7 bullets)
- [ ] Two buttons:
  - [ ] Primary: 💬 "Chat on WhatsApp" (gold, larger)
  - [ ] Secondary: 📧 Email (compact, icon-only)

**Button Styling:**
- [ ] WhatsApp button:
  - [ ] Has 💬 icon
  - [ ] Text: "Chat on WhatsApp"
  - [ ] Takes up more space (primary action)
  - [ ] Link includes pre-filled message with package tier
  - [ ] Hover: brightens gold background
  
- [ ] Email button:
  - [ ] Has 📧 icon
  - [ ] Compact size (secondary action)
  - [ ] Link includes subject line with package info

**Hover Effects:**
- [ ] Cards lift up smoothly (-8px)
- [ ] Background glow intensifies
- [ ] Button colors brighten
- [ ] Icons scale on hover

**Mobile View:**
- [ ] Cards stack vertically
- [ ] Price remains visible and large
- [ ] Buttons stack properly
- [ ] All text readable

---

### 5. LEADERSHIP SECTION 👥

**Layout:**
- [ ] 3 team member cards visible in a row:
  1. [ ] Saeed Ashraf Malik (CEO)
  2. [ ] Imtiaz Ahmad Malik (Managing Director)
  3. [ ] Arslan Ejaz (Support Manager)

**Each Card Contains:**
- [ ] Circular profile image (200x200px)
  - [ ] Gold border (2px)
  - [ ] Gold glow effect
  - [ ] Image properly centered (NOT cropping head)
  - [ ] Professional appearance
  
- [ ] Below image:
  - [ ] Name in white bold text
  - [ ] Position in gold text
  - [ ] Brief description in smaller text
  - [ ] Glass card background

**Photo Verification:**
- [ ] Saeed Ashraf Malik: Head centered, visible
- [ ] **Imtiaz Ahmad Malik: Head NOT cropped** ✅ FIXED
  - [ ] Photo properly centered in circular frame
  - [ ] No head cutoff
  - [ ] Professional appearance
- [ ] Arslan Ejaz: Head centered, visible

**Hover Effects:**
- [ ] Cards lift up smoothly
- [ ] Images scale up 105%
- [ ] Glow intensifies
- [ ] All text remains readable
- [ ] Smooth animations (no jank)

**Mobile View:**
- [ ] Cards stack vertically (single column)
- [ ] Images remain properly sized
- [ ] Text readable and centered
- [ ] Responsive design maintained

---

### 6. CONTACT SECTION 📞

**Layout:**
- [ ] Left: Contact form with fields
- [ ] Right: Contact information cards

**Contact Information Cards:**
- [ ] Phone card:
  - [ ] Icon: 📱 (gold)
  - [ ] Title: "Phone"
  - [ ] Number: +923018407179 (clickable link)
  - [ ] Link type: tel: (calls phone)
  
- [ ] Email card:
  - [ ] Icon: 📧 (gold)
  - [ ] Title: "Email"
  - [ ] Address: ticksoltravelpk@gmail.com (clickable link)
  - [ ] Link type: mailto: (opens email)
  
- [ ] WhatsApp card:
  - [ ] Icon: 💬 (gold)
  - [ ] Title: "WhatsApp"
  - [ ] Number: +923018407179 (clickable link)
  - [ ] Link opens WhatsApp

**Icon Verification:**
- [ ] All icons are gold (#e6af1a)
- [ ] Phone icon: 📱 (NOT red)
- [ ] Email icon: 📧 (NOT blue)
- [ ] WhatsApp icon: 💬 (NOT green)

**Hover Effects:**
- [ ] Cards have subtle gold background on hover
- [ ] Icons scale up 110%
- [ ] Text brightens slightly
- [ ] Smooth transitions

**Animation:**
- [ ] Cards appear with staggered delay
- [ ] Phone card: 0.4s delay
- [ ] Email card: 0.45s delay
- [ ] WhatsApp card: 0.5s delay
- [ ] Smooth entrance animations

**Contact Form:**
- [ ] All fields visible and styled
- [ ] Input fields have gold focus borders
- [ ] Submit button is gold gradient
- [ ] Form submits successfully
- [ ] Success message appears

**Mobile View:**
- [ ] Form and info cards stack
- [ ] Contact info cards visible
- [ ] Touch targets are 44px+
- [ ] Responsive layout

---

### 7. FOOTER 🦶

**Layout:**
- [ ] Four columns visible on desktop
  - [ ] Brand logo and info
  - [ ] Quick Links
  - [ ] Services
  - [ ] Contact

**Contact Information in Footer:**
- [ ] Phone: +923018407179 (clickable)
- [ ] WhatsApp: +923018407179 (clickable)
- [ ] Email: ticksoltravelpk@gmail.com (clickable)
- [ ] All links work correctly

**Social Icons:**
- [ ] Social media links present
- [ ] Professional styling

**Mobile View:**
- [ ] Columns stack into fewer columns
- [ ] Text remains readable
- [ ] Links are clickable

---

### 8. ADMIN REMOVAL ✅

**Header Verification:**
- [ ] No "Admin" button/link visible
- [ ] Only "Get Quote" button visible in top right
- [ ] Navigation is clean and professional
- [ ] No admin-related content visible anywhere

---

## 🎨 Color Verification

### Gold Theme Color Verification:
Check that ALL of these use GOLD (#e6af1a), NOT platform colors:

- [ ] ✈️ Air Ticketing icon (gold)
- [ ] 🏨 Hotel icon (gold)
- [ ] 🛂 Visa icon (gold)
- [ ] 🚗 Transport icon (gold)
- [ ] Email buttons (gold)
- [ ] WhatsApp buttons (gold)
- [ ] Phone buttons (gold)
- [ ] Contact form border (gold on focus)
- [ ] Tab borders (gold when active)
- [ ] Package card borders (gold)
- [ ] All icons should be gold - NOT:
  - [ ] Red 🔴
  - [ ] Green 🟢
  - [ ] Blue 🔵

---

## 🔗 Link Verification

**All contact links should work:**

- [ ] Phone link: `tel:+923018407179`
- [ ] WhatsApp link: `https://wa.me/923018407179`
- [ ] Email link: `mailto:ticksoltravelpk@gmail.com`
- [ ] Services section buttons navigate correctly
- [ ] Destinations section buttons navigate correctly
- [ ] Navigation tabs work smoothly

---

## 📱 Responsive Testing

**Breakpoints to test:**

1. **Mobile** (375px - iPhone SE):
   - [ ] Content readable
   - [ ] Service cards hidden
   - [ ] Cards stack vertically
   - [ ] Buttons properly sized
   - [ ] No horizontal scroll

2. **Tablet** (768px - iPad):
   - [ ] 2-column layouts
   - [ ] Cards display well
   - [ ] Touch targets adequate
   - [ ] Text readable

3. **Desktop** (1024px+):
   - [ ] All features visible
   - [ ] Hover effects work
   - [ ] 2-column hero layout
   - [ ] Service cards on right

4. **Large Desktop** (1440px+):
   - [ ] Content centered
   - [ ] Max-width applied
   - [ ] Optimal viewing experience

---

## ⚡ Performance Checks

- [ ] Page loads quickly
- [ ] No layout shift (CLS = 0)
- [ ] Images load smoothly
- [ ] Animations are smooth (60fps)
- [ ] No console errors
- [ ] No console warnings
- [ ] Responsive images load appropriately

---

## 🖼️ Image Status Check

**Images Currently Missing (add when ready):**

International Tours:
- [ ] uae.jpg - if missing, emoji shows
- [ ] ksa.jpg - if missing, emoji shows
- [ ] gulf.jpg - if missing, emoji shows
- [ ] baku.jpg - if missing, emoji shows
- [ ] turkey.jpg - if missing, emoji shows
- [ ] malaysia.jpg - if missing, emoji shows
- [ ] thailand.jpg - if missing, emoji shows

Religious Tours:
- [ ] hajj-umrah.jpg - if missing, emoji shows
- [ ] najaf-karbala.jpg - if missing, emoji shows
- [ ] mashhad-iran.jpg - if missing, emoji shows

**Note:** Emojis will disappear automatically once images are added to correct directories!

---

## ✅ Final Checklist

Before going live:

- [ ] All sections styled correctly
- [ ] All icons are gold theme color
- [ ] All buttons work correctly
- [ ] All links navigate properly
- [ ] Hero service cards visible
- [ ] Destinations tabs work smoothly
- [ ] Package section displays correctly
- [ ] 4-star package is highlighted
- [ ] WhatsApp button is primary in packages
- [ ] Leadership photos display correctly
- [ ] Imtiaz photo NOT cropped ✅
- [ ] Contact section has all info
- [ ] Footer updated with new contact info
- [ ] Admin links removed
- [ ] Mobile responsive works
- [ ] Hover animations smooth
- [ ] No console errors
- [ ] All images ready or graceful fallback

---

## 📸 Screenshot Recommendations

Take screenshots of these to verify design:

1. **Hero Section** - Desktop (service cards visible)
2. **Hero Section** - Mobile (responsive)
3. **Services Cards** - Desktop (hover state)
4. **Destinations - Religious Tours** - Desktop
5. **Destinations - International Tours** - Desktop
6. **Packages Section** - Desktop (4-star featured)
7. **Leadership Section** - Desktop (photos centered)
8. **Contact Section** - Desktop
9. **Footer** - Desktop
10. **Full Page** - Mobile (responsive)

---

## 🎬 Animation Checks

- [ ] Hero service cards lift smoothly
- [ ] Service card icons scale smoothly
- [ ] Destinations tabs transition smoothly
- [ ] Package cards lift smoothly
- [ ] Leadership cards lift smoothly
- [ ] Leadership images scale smoothly
- [ ] Contact icons scale smoothly
- [ ] Contact cards have background transition
- [ ] All animations are ~300ms or less
- [ ] No animations cause layout shift

---

**Status:** ✅ All improvements implemented!  
**Next Step:** Upload your images and verify design!

Good luck! 🚀
