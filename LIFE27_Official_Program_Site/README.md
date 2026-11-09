# LIFE’27 Official Event Portal

A responsive, frontend-only event website for **LIFE’27 — Equipped for Success**, organised by NIFES, Kogi State Polytechnic, Lokoja.

## Included features

- Event landing page with the LIFE’27 navy-blue, gold and white identity.
- Personalized attendance flyer generator.
  - Enter a name.
  - Upload a portrait photograph.
  - Preview the design.
  - Download a PNG flyer.
  - The photo is processed locally in the browser; it is not uploaded to a server.
- Fundraising section with the supplied artwork, bank details, copy-account-number action and WhatsApp receipt link.
- Merchandise section with Polo, Face Cap and Headband placeholders, prices, quantity controls and WhatsApp ordering.
- Responsive navigation and layouts for phones, tablets and desktop screens.

## Folder structure

```text
LIFE27_Official_Event_Portal/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── flyer.js
│   └── merchandise.js
└── assets/
    └── images/
        ├── logos/
        │   ├── nifes-logo.png
        │   └── institution-logo.png
        ├── templates/
        │   ├── attendance-template.jpg
        │   └── fundraising-design.jpg
        └── merchandise/
            ├── polo.png
            ├── face-cap.png
            └── headband.png
```

## How to add your official merchandise designs

You do not need to edit the code.

1. Open `assets/images/merchandise/`.
2. Replace `polo.png` with your official Polo design.
3. Replace `face-cap.png` with your official Face Cap design.
4. Replace `headband.png` with your official Headband design.
5. Keep the exact filenames and extensions shown above.

Recommended: use clear, high-quality PNG or JPG images. Square images (1:1) display best in the product cards. If your artwork is a different size, the website will crop it to fit the product card without stretching it. Keep a backup of the placeholder files if you may need them later.

## How to replace the event logos

The two logo images were cropped from the supplied attendance flyer for use in the website header and footer. If you have higher-resolution official logo files, replace:

- `assets/images/logos/nifes-logo.png`
- `assets/images/logos/institution-logo.png`

Keep the same filenames.

## How to replace the event artwork

To update the attendance flyer template, replace:

`assets/images/templates/attendance-template.jpg`

Keep the same filename and image dimensions if possible. The photo and name positions in `js/flyer.js` are calibrated to the supplied 1229 × 1536 artwork. If you use a redesigned template, the placement coordinates may need adjustment.

To update the fundraising artwork, replace:

`assets/images/templates/fundraising-design.jpg`

## Important contact-number check before publishing

The fundraising receipt WhatsApp number was supplied as **0812779085**. This appears shorter than a standard Nigerian 11-digit mobile number. The website currently uses the digits exactly as supplied when forming the WhatsApp link. **Please confirm the complete number in `js/main.js` before publishing**, otherwise the receipt link may not open the intended WhatsApp account.

The merchandise WhatsApp numbers are set as supplied:

- 0913 541 7223
- 0811 078 8544

## Event information currently included

- Event: LIFE’27
- Theme: Equipped for Success
- Scripture: Hebrews 13:21
- Date: 26–29 November 2026
- Time: 4:00 PM
- Venue: Chapel of Peace Auditorium, Kogi State Polytechnic, Lokoja
- Bank: UBA
- Account name: NIFES KSP, L
- Account number: 2199602304
- Polo: ₦6,000
- Face Cap: ₦3,500
- Headband: ₦3,000

Please verify all account and contact details with the organisers before publishing.

## Run the website on your computer

This is a static HTML/CSS/JavaScript project. You can open `index.html` directly in a browser for a quick preview. For the best experience, run it using a local development server such as VS Code Live Server.

No npm installation, database, PHP, Node.js backend or API key is required.

## Deploy on Vercel without GitHub

1. Extract the ZIP file.
2. Open Vercel and sign in.
3. Choose the option to deploy a project using the Vercel CLI or the available manual deployment/upload workflow in your Vercel dashboard.
4. If using the CLI, install Vercel CLI and run `vercel` from this project folder, then follow the prompts.
5. For production deployment, run `vercel --prod`.

Vercel's dashboard upload options can change; if the dashboard does not offer direct folder upload, use the CLI deployment method. GitHub is not required for CLI deployment.

## Limitations

- This is a frontend-only website. It does not collect or store orders in a central database.
- WhatsApp ordering opens a pre-filled message; the customer sends it manually.
- Bank transfers and receipts are handled manually by the organisers.
- Flyer photographs are processed locally in the visitor's browser.
- There is no admin dashboard or online payment gateway in this version.
