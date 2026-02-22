"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typography = void 0;
exports.typography = {
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
            fontSize: exports.typography.fontSize.display,
            fontWeight: exports.typography.fontWeight.bold,
            lineHeight: exports.typography.lineHeight.xxxl,
            letterSpacing: exports.typography.letterSpacing.wider,
        },
        h2: {
            fontSize: exports.typography.fontSize.header,
            fontWeight: exports.typography.fontWeight.bold,
            lineHeight: exports.typography.lineHeight.xxl,
            letterSpacing: exports.typography.letterSpacing.wide,
        },
        h3: {
            fontSize: exports.typography.fontSize.title,
            fontWeight: exports.typography.fontWeight.semibold,
            lineHeight: exports.typography.lineHeight.xl,
            letterSpacing: exports.typography.letterSpacing.normal,
        },
        h4: {
            fontSize: exports.typography.fontSize.xxl,
            fontWeight: exports.typography.fontWeight.medium,
            lineHeight: exports.typography.lineHeight.lg,
            letterSpacing: exports.typography.letterSpacing.normal,
        },
        h5: {
            fontSize: exports.typography.fontSize.xl,
            fontWeight: exports.typography.fontWeight.semibold,
            lineHeight: exports.typography.lineHeight.md,
            letterSpacing: exports.typography.letterSpacing.normal,
        },
        h6: {
            fontSize: exports.typography.fontSize.lg,
            fontWeight: exports.typography.fontWeight.medium,
            lineHeight: exports.typography.lineHeight.sm,
            letterSpacing: exports.typography.letterSpacing.normal,
        },
        // Body text
        body: {
            fontSize: exports.typography.fontSize.md,
            fontWeight: exports.typography.fontWeight.regular,
            lineHeight: exports.typography.lineHeight.md,
            letterSpacing: exports.typography.letterSpacing.normal,
        },
        body2: {
            fontSize: exports.typography.fontSize.sm,
            fontWeight: exports.typography.fontWeight.regular,
            lineHeight: exports.typography.lineHeight.sm,
            letterSpacing: exports.typography.letterSpacing.normal,
        },
        // Caption
        caption: {
            fontSize: exports.typography.fontSize.xs,
            fontWeight: exports.typography.fontWeight.regular,
            lineHeight: exports.typography.lineHeight.xs,
            letterSpacing: exports.typography.letterSpacing.normal,
        },
        // Overline
        overline: {
            fontSize: exports.typography.fontSize.xs,
            fontWeight: exports.typography.fontWeight.medium,
            lineHeight: exports.typography.lineHeight.xs,
            letterSpacing: exports.typography.letterSpacing.wider,
        },
        // Button
        button: {
            fontSize: exports.typography.fontSize.sm,
            fontWeight: exports.typography.fontWeight.medium,
            lineHeight: exports.typography.lineHeight.sm,
            letterSpacing: exports.typography.letterSpacing.wide,
        },
    },
};
