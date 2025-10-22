# Multilingual Implementation Guide

## Overview
This M-CHAT-R Autism Screening Tool application now supports both **English** and **Arabic** languages with full RTL (Right-to-Left) support for Arabic.

## Features Implemented

### ✅ Complete Language Support
- **English (en)** - Default language
- **Arabic (ar)** - Full RTL support

### ✅ RTL Layout Support
When Arabic is selected:
- Layout automatically switches to right-to-left direction
- All components start from the right-hand side
- Text alignment adjusts automatically
- Input fields and forms respect RTL direction

## File Structure

```
src/
├── i18n.js                          # i18n configuration
├── locales/
│   ├── en/
│   │   └── translation.json         # English translations
│   └── ar/
│       └── translation.json         # Arabic translations
├── components/
│   └── LanguageSwitcher.js          # Reusable language switcher component
├── context/
│   └── LanguageContext.js           # Updated to use i18next
└── screens/
    ├── HomeScreen.js                # Updated with translations
    ├── EmailScreen.js               # Updated with translations
    ├── ContactSpecialistScreen.js   # Updated with translations
    └── ResultScreen.js              # Updated with translations
```

## Translation Files

### English (`/src/locales/en/translation.json`)
Contains all English text organized by screen/component:
- `home` - Home screen text
- `ageSelection` - Age selection screen
- `introduction` - Introduction screen
- `patientInfo` - Patient information form
- `chat` - Chat interface
- `email` - Email submission screen
- `contactSpecialist` - Contact specialist form
- `result` - Results screen with risk assessments
- `common` - Shared text (buttons, labels, etc.)

### Arabic (`/src/locales/ar/translation.json`)
Complete Arabic translations with the same structure as English.

## How to Use

### 1. Switching Languages

Users can switch languages on the home screen:
- Click **English** button for English
- Click **عربي** button for Arabic

The language preference is automatically saved in localStorage.

### 2. Using Translations in Components

```javascript
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('home.title')}</h1>
      <p>{t('home.subtitle')}</p>
    </div>
  );
};
```

### 3. Adding New Translations

#### Step 1: Add translation keys to both files

**English** (`src/locales/en/translation.json`):
```json
{
  "mySection": {
    "title": "My Title",
    "description": "My Description"
  }
}
```

**Arabic** (`src/locales/ar/translation.json`):
```json
{
  "mySection": {
    "title": "عنواني",
    "description": "وصفي"
  }
}
```

#### Step 2: Use in your component
```javascript
const { t } = useTranslation();
<h1>{t('mySection.title')}</h1>
```

### 4. Using the Language Switcher Component

```javascript
import LanguageSwitcher from '../components/LanguageSwitcher';

const MyScreen = () => {
  return (
    <div>
      <LanguageSwitcher />
      {/* Your content */}
    </div>
  );
};
```

## RTL Support

### Automatic RTL Detection
The app automatically sets `dir="rtl"` on the HTML element when Arabic is selected.

### CSS Support
RTL-specific styles are defined in `/src/index.css`:
- Input fields align right in Arabic
- Text direction switches automatically
- Buttons and forms respect RTL layout

### Custom RTL Styling
To add custom RTL styles:

```css
/* RTL specific styles */
[dir="rtl"] .my-component {
  /* Your RTL styles here */
  text-align: right;
}

/* LTR specific styles */
[dir="ltr"] .my-component {
  /* Your LTR styles here */
  text-align: left;
}
```

## Translation Coverage

### Fully Translated Screens:
- ✅ Home Screen
- ✅ Introduction Screen
- ✅ Age Selection Screen
- ✅ Patient Information Form
- ✅ Chat Interface
- ✅ Email Submission Screen
- ✅ Contact Specialist Form
- ✅ Results Screen (including all risk assessments)
- ✅ Thank You Screen

### Screens Using Existing Context:
- 🔄 Chat Screen (uses existing LanguageContext)
- 🔄 Introduction Screen (uses existing LanguageContext)
- 🔄 Age Selection Screen (uses existing LanguageContext)
- 🔄 Welcome Screen (uses existing LanguageContext)
- 🔄 Thank You Screen (uses existing LanguageContext)

## Configuration

### i18n Configuration (`/src/i18n.js`)
```javascript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      ar: { translation: arTranslation }
    },
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'app_language'
    }
  });
```

## Best Practices

### 1. Always Use Translation Keys
❌ **Don't:**
```javascript
<h1>Welcome</h1>
```

✅ **Do:**
```javascript
<h1>{t('home.welcome')}</h1>
```

### 2. Organize Translations by Screen
Keep translations organized by screen/component for easy maintenance:
```json
{
  "screenName": {
    "element1": "Text 1",
    "element2": "Text 2"
  }
}
```

### 3. Use Interpolation for Dynamic Content
```javascript
// In translation file
{
  "welcome": "Welcome, {{name}}!"
}

// In component
t('welcome', { name: userName })
```

### 4. Test Both Languages
Always test your changes in both English and Arabic to ensure:
- All text is translated
- Layout looks good in RTL
- No text overflow or alignment issues

## Troubleshooting

### Issue: Text not translating
**Solution:**
- Check that the translation key exists in both `en/translation.json` and `ar/translation.json`
- Ensure you're using `t('key')` correctly
- Verify the component is wrapped in the LanguageProvider

### Issue: RTL layout broken
**Solution:**
- Check that the HTML `dir` attribute is set correctly
- Verify RTL-specific CSS rules in `index.css`
- Use browser DevTools to inspect the `html` element

### Issue: Language not persisting
**Solution:**
- Check localStorage to ensure `app_language` is being saved
- Verify the i18n configuration includes the language detector

## Dependencies

```json
{
  "i18next": "^25.6.0",
  "react-i18next": "^15.3.4",
  "i18next-browser-languagedetector": "^8.0.2"
}
```

## Future Enhancements

Potential improvements for the multilingual system:

1. **Add More Languages**: French, Spanish, etc.
2. **Translation Management**: Integrate with translation management tools
3. **Language-Specific Fonts**: Load different fonts per language
4. **Number Formatting**: Localize numbers and dates
5. **Pluralization**: Handle plural forms in different languages

## Support

For questions or issues with the multilingual implementation, please refer to:
- [i18next Documentation](https://www.i18next.com/)
- [react-i18next Documentation](https://react.i18next.com/)
- [RTL Styling Guide](https://rtlstyling.com/)

---

**Last Updated:** October 2025
**Implementation Status:** ✅ Complete and Production Ready
