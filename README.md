# Portfolio Website

A production-ready portfolio website template with an Apple-like aesthetic—clean, spacious, and premium. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Apple-like Design**: Clean layouts, generous whitespace, refined typography, subtle animations
- **Full-Stack Architecture**: Next.js App Router with API routes for content management
- **Content-as-Data**: All content stored in local JSON files (no database required)
- **Type-Safe**: Full TypeScript support with runtime validation
- **Responsive**: Mobile-first design that looks great on all devices
- **Accessible**: Semantic HTML, ARIA labels, keyboard navigation, focus management
- **Performance**: Optimized with Next.js static generation and in-memory caching

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Content**: Local JSON files in `/content`
- **Styling**: Tailwind CSS with custom Apple-inspired design system

## Prerequisites

- **Node.js**: Version 18.0.0 or higher (current ±1)
- **npm**: Comes with Node.js
- **Windows**: PowerShell 5.1+ (included with Windows 10/11)

## Installation

### Step 1: Verify Node.js Installation

Open PowerShell and check your Node.js version:

```powershell
node --version
```

You should see `v18.x.x` or higher. If not, download and install Node.js from [nodejs.org](https://nodejs.org/).

### Step 2: Navigate to Project Directory

```powershell
cd portfolio
```

### Step 3: Install Dependencies

```powershell
npm install
```

This will install all required packages listed in `package.json`. This may take a few minutes.

## Development

### Start Development Server

```powershell
npm run dev
```

The site will be available at `http://localhost:3000`

Open your browser and navigate to the URL to see your portfolio.

### Development Features

- Hot module replacement (changes appear instantly)
- TypeScript type checking
- ESLint for code quality
- Automatic API route reloading

## Building for Production

### Create Production Build

```powershell
npm run build
```

This creates an optimized production build in the `.next` directory.

### Start Production Server

```powershell
npm run start
```

The production server will start on `http://localhost:3000`

**Note**: Make sure to run `npm run build` before `npm run start`.

## Testing

### Run Linter

```powershell
npm run lint
```

This checks your code for common errors and style issues.

### Test API Endpoints

First, make sure your development server is running (`npm run dev` in a separate terminal), then:

```powershell
npm test
```

Or test manually with PowerShell:

```powershell
# Test health endpoint
curl.exe http://localhost:3000/api/health

# Test profile endpoint
curl.exe http://localhost:3000/api/profile

# Test projects list
curl.exe http://localhost:3000/api/projects

# Test single project
curl.exe http://localhost:3000/api/projects/ecommerce-platform
```

### Manual API Testing (PowerShell)

Here are curl examples using PowerShell's `curl.exe` (or use `Invoke-WebRequest`):

```powershell
# Health check
curl.exe -Method GET http://localhost:3000/api/health

# Get profile
curl.exe -Method GET http://localhost:3000/api/profile | ConvertFrom-Json

# Get all projects
curl.exe -Method GET http://localhost:3000/api/projects | ConvertFrom-Json

# Get specific project
curl.exe -Method GET http://localhost:3000/api/projects/ecommerce-platform | ConvertFrom-Json
```

Using `Invoke-WebRequest` (alternative):

```powershell
# Health check
$response = Invoke-WebRequest -Uri http://localhost:3000/api/health
$response.Content

# Get profile (JSON)
$response = Invoke-WebRequest -Uri http://localhost:3000/api/profile
$response.Content | ConvertFrom-Json
```

## Project Structure

```
portfolio/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── health/
│   │   ├── profile/
│   │   └── projects/
│   ├── about/
│   ├── contact/
│   ├── work/
│   │   └── [slug]/        # Dynamic project pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── not-found.tsx      # 404 page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Nav.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ProjectCard.tsx
│   └── Section.tsx
├── content/               # Content JSON files
│   ├── profile.json
│   └── projects.json
├── lib/                   # Utility functions
│   ├── types.ts          # TypeScript type definitions
│   ├── validators.ts     # Runtime validation
│   └── content.ts        # Content loaders
├── public/                # Static assets
│   └── images/           # Project images
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

## Customization

### Update Your Profile

Edit `content/profile.json` with your information:

```json
{
  "name": "Your Name",
  "title": "Your Title",
  "location": "Your Location",
  "summary": "Your summary...",
  "skills": { ... },
  "social": { ... }
}
```

### Add/Edit Projects

Edit `content/projects.json` to add or modify projects. Each project should include:

- `slug`: URL-friendly identifier (e.g., "my-project")
- `title`: Project name
- `tagline`: Short description
- `year`: Completion year
- `role`: Your role in the project
- `stack`: Array of technologies used
- `coverImage`: Path to cover image
- `highlights`: Array of key achievements
- `problem`, `approach`, `results`: Case study content
- `galleryImages`: Array of image paths
- `links`: Object with links (live, caseStudy, etc.)

### Adding Images

1. Place images in `public/images/` directory
2. Reference them in your JSON files using paths like `/images/your-image.jpg`
3. The images will be served from the root `/images/` path

### Styling

The design system is configured in `tailwind.config.ts`. Key customizations:

- **Colors**: Modify the color palette in the `theme.extend.colors` section
- **Typography**: Adjust font families and letter spacing
- **Spacing**: Customize max-width, padding, and gaps
- **Effects**: Modify backdrop blur, shadows, and transitions

### Contact Form Email

Update the email address in `app/contact/page.tsx`:

```tsx
const mailtoLink = `mailto:your-email@example.com?subject=${subject}&body=${body}`;
```

## API Endpoints

All endpoints return JSON and are read-only:

- `GET /api/health` - Health check endpoint
- `GET /api/profile` - Get profile information
- `GET /api/projects` - Get list of all projects (summary)
- `GET /api/projects/[slug]` - Get full project details by slug

## Pages

- `/` - Home page with hero and featured projects
- `/work` - All projects with filtering and search
- `/work/[slug]` - Individual project detail page
- `/about` - About page with profile and skills
- `/contact` - Contact form (opens email client)
- `/404` - Custom 404 page

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Static generation for all pages
- In-memory caching for API responses
- Optimized images (when using Next.js Image component)
- Minimal JavaScript bundle size
- Efficient CSS with Tailwind's purging

## Security

The application includes security headers:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` restrictions

## Troubleshooting

### Port Already in Use

If port 3000 is already in use:

```powershell
# Windows: Find and kill process using port 3000
Get-NetTCPConnection -LocalPort 3000 | Select-Object -ExpandProperty OwningProcess | ForEach-Object { Stop-Process -Id $_ -Force }
```

Or change the port:

```powershell
$env:PORT=3001; npm run dev
```

### Module Not Found Errors

If you see module not found errors:

```powershell
# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```

### TypeScript Errors

If TypeScript shows errors, make sure you've installed all dependencies:

```powershell
npm install
```

### Build Errors

If the build fails:

1. Check Node.js version: `node --version` (should be 18+)
2. Clear Next.js cache: `Remove-Item -Recurse -Force .next`
3. Reinstall dependencies: `Remove-Item -Recurse -Force node_modules; npm install`
4. Try building again: `npm run build`

## License

This is a template project. Feel free to use it for your own portfolio.

## Support

For issues or questions:

1. Check the troubleshooting section above
2. Review Next.js documentation: [nextjs.org/docs](https://nextjs.org/docs)
3. Review Tailwind CSS documentation: [tailwindcss.com/docs](https://tailwindcss.com/docs)

---

**Built with [Next.js](https://nextjs.org/)**
