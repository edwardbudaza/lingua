# Root Layout Documentation

## Overview

The root layout is the top-level component in our Next.js application, providing global configuration, metadata, and layout structure for the Lingua language learning platform.

## Layout Structure

```typescript
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en">
        <body className={font.className}>
          <Toaster />
          <ExitModal />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
```

### Key Components

1. `ClerkProvider`: Authentication wrapper with post-logout redirection
2. `Toaster`: Global toast notifications component
3. `ExitModal`: Application exit confirmation modal
4. `Nunito` font integration from Google Fonts

## Metadata Configuration

### Basic Information

```typescript
export const metadata: Metadata = {
  title: {
    default: 'Lingua - AI-Powered Language Learning Platform',
    template: '%s | Lingua', // Used for dynamic page titles
  },
  description:
    "Master new languages naturally with Lingua's AI-powered platform...",
  category: 'education',
};
```

### Keywords

```typescript
keywords: [
  'language learning',
  'AI language tutor',
  'learn languages online',
  'language practice',
  'language learning app',
  'interactive language learning',
  'online language courses',
];
```

### Branding Information

```typescript
authors: [{ name: 'Lingua' }],
creator: 'Lingua',
publisher: 'Lingua',
```

### Icons Configuration

```typescript
icons: {
  icon: [
    {
      url: '/mascot.svg',
      type: 'image/svg+xml',
    },
  ],
  shortcut: ['/mascot.svg'],
  apple: [
    {
      url: '/mascot.svg',
      type: 'image/svg+xml',
    },
  ],
}
```

### Open Graph Settings

```typescript
openGraph: {
  type: 'website',
  locale: 'en_US',
  url: 'https://lingua.com',
  title: 'Lingua - AI-Powered Language Learning Platform',
  description: "Master new languages naturally...",
  siteName: 'Lingua',
  images: [
    {
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Lingua - Language Learning Platform',
    },
  ],
}
```

### SEO Configuration

#### Robots Settings

```typescript
robots: {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
}
```

#### Format Detection

```typescript
formatDetection: {
  email: false,
  address: false,
  telephone: false,
}
```

## Usage Guidelines

### Page Title Configuration

```typescript
// Default title
'Lingua - AI-Powered Language Learning Platform';

// Page-specific titles using the template
// Example: "Spanish Course | Lingua"
```

### Adding New Pages

```typescript
// pages/course.tsx
export const metadata = {
  title: 'Course Overview', // Will render as "Course Overview | Lingua"
};
```

## Required Assets

1. Images:
   - `/mascot.svg`: Platform mascot/icon
   - `/og-image.jpg`: Open Graph preview image (1200x630px)

## SEO Best Practices

1. **Title Template**

   - Uses consistent branding
   - Includes main keyword
   - Limited to 60 characters

2. **Meta Description**

   - Includes target keywords
   - Clear value proposition
   - Optimal length (150-160 characters)

3. **OpenGraph**
   - Complete social sharing metadata
   - Optimized preview image
   - Proper URL configuration

## Authentication Integration

The layout integrates Clerk authentication:

```typescript
<ClerkProvider afterSignOutUrl="/">
  {/* Application content */}
</ClerkProvider>
```

Key features:

- Automatic sign-out handling
- Redirect to home page after sign-out
- Global authentication state management

## UI Components

### Toast Notifications

```typescript
<Toaster />
```

- Global toast message handling
- Consistent notification styling
- Accessible alerts

### Exit Modal

```typescript
<ExitModal />
```

- Confirmation dialog for exit actions
- Prevents accidental navigation
- Consistent user experience

## Font Configuration

```typescript
const font = Nunito({ subsets: ['latin'] });
```

- Uses Nunito font family
- Loads Latin character subset
- Applied globally via className

## Performance Considerations

1. **Font Loading**

   - Subset optimization
   - Next.js font optimization
   - Auto font display optimization

2. **Metadata**
   - Static generation of meta tags
   - Optimized image dimensions
   - Proper cache control

## Maintenance Guidelines

1. **Updating Metadata**

   - Regularly review and update keywords
   - Monitor description effectiveness
   - Update OG image when branding changes

2. **Asset Management**

   - Maintain consistent icon versions
   - Optimize new images
   - Update social preview images

3. **SEO Monitoring**
   - Regular lighthouse audits
   - Meta tag validation
   - Social media card testing

## Security Considerations

1. **Authentication**

   - Secure authentication provider setup
   - Protected routes configuration
   - Proper sign-out handling

2. **Content Security**
   - Proper CSP headers
   - Secure asset loading
   - XSS prevention measures

## Future Enhancements

1. Additional metadata for:

   - Twitter cards
   - Schema.org markup
   - Alternative languages

2. Performance improvements:
   - Dynamic imports optimization
   - Asset preloading strategies
   - Caching policies
