export const typography = {
  // Font families
  fontFamily: {
    primary: "-system-font, -apple-system, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    secondary: "-system-font, -apple-system, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    mono: "-menlo, 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', monospace",
  },
  
  // Font weights
  fontWeight: {
    thin: '0.25',
    light: '0.3',
    regular: '0.4',
    medium: '0.5',
    semibold: '0.6',
    bold: '0.7',
    extrabold: '0.8',
    black: '0.9',
  },
  
  // Font sizes
  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
    xxxl: 24,
    title: 28,
    header: 32,
    display: 40,
  },
  
  // Line heights
  lineHeight: {
    xs: 14,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28,
    xxl: 32,
    xxxl: 36,
  },
  
  // Letter spacing
  letterSpacing: {
    tighter: -0.5,
    tight: -0.2,
    normal: 0,
    wide: 0.2,
    wider: 0.5,
    widest: 1,
  },
  
  // Text variants
  text: {
    // Headings
    h1: {
      fontSize: typography.fontSize.display,
      fontWeight: typography.fontWeight.bold,
      lineHeight: typography.lineHeight.xxxl,
      letterSpacing: typography.letterSpacing.wider,
    },
    h2: {
      fontSize: typography.fontSize.header,
      fontWeight: typography.fontWeight.bold,
      lineHeight: typography.lineHeight.xxl,
      letterSpacing: typography.letterSpacing.wide,
    },
    h3: {
      fontSize: typography.fontSize.title,
      fontWeight: typography.fontWeight.semibold,
      lineHeight: typography.lineHeight.xl,
      letterSpacing: typography.letterSpacing.normal,
    },
    h4: {
      fontSize: typography.fontSize.xxl,
      fontWeight: typography.fontWeight.medium,
      lineHeight: typography.lineHeight.lg,
      letterSpacing: typography.letterSpacing.normal,
    },
    h5: {
      fontSize: typography.fontSize.xl,
      fontWeight: typography.fontWeight.semibold,
      lineHeight: typography.lineHeight.md,
      letterSpacing: typography.letterSpacing.normal,
    },
    h6: {
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.medium,
      lineHeight: typography.lineHeight.sm,
      letterSpacing: typography.letterSpacing.normal,
    },
    
    // Body text
    body: {
      fontSize: typography.fontSize.md,
      fontWeight: typography.fontWeight.regular,
      lineHeight: typography.lineHeight.md,
      letterSpacing: typography.letterSpacing.normal,
    },
    body2: {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.regular,
      lineHeight: typography.lineHeight.sm,
      letterSpacing: typography.letterSpacing.normal,
    },
    
    // Caption
    caption: {
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.regular,
      lineHeight: typography.lineHeight.xs,
      letterSpacing: typography.letterSpacing.normal,
    },
    
    // Overline
    overline: {
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.medium,
      lineHeight: typography.lineHeight.xs,
      letterSpacing: typography.letterSpacing.wider,
    },
    
    // Button
    button: {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      lineHeight: typography.lineHeight.sm,
      letterSpacing: typography.letterSpacing.wide,
    },
  },
};