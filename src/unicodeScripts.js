// @flow

/**
 * This file defines the Unicode scripts and script families that we
 * support.  To add new scripts or families, just map the script or family
 * name to an array of numbers. The arrays must have an even number of
 * elements and each element pair must define the start and end (inclusive)
 * of a block of codepoints that are part of the script.
 */
const scriptData = {
    // Chinese and Japanese.
    // The "k" in cjk is for Korean, but we've separated Korean out
    cjk: [
        0x3000, 0x30FF,  // CJK symbols and punctuation, Hiragana, Katakana
        0x4E00, 0x9FAF,  // CJK ideograms
        0xFF00, 0xFF60,  // Fullwidth punctuation
        // TODO: add halfwidth Katakana and Romanji glyphs
    ],

    // Korean
    hangul: [0xAC00, 0xD7AF],

    // The Brahmic scripts of South and Southeast Asia
    // Devanagari (0900–097F)
    // Bengali (0980–09FF)
    // Gurmukhi (0A00–0A7F)
    // Gujarati (0A80–0AFF)
    // Oriya (0B00–0B7F)
    // Tamil (0B80–0BFF)
    // Telugu (0C00–0C7F)
    // Kannada (0C80–0CFF)
    // Malayalam (0D00–0D7F)
    // Sinhala (0D80–0DFF)
    // Thai (0E00–0E7F)
    // Lao (0E80–0EFF)
    // Tibetan (0F00–0FFF)
    // Myanmar (1000–109F)
    brahmic: [ 0x0900, 0x109F ],
};

const scripts = Object.keys(scriptData);

export function scriptFromCodepoint(codepoint: number): ?string {
    for (const script of scripts) {
        const ranges = scriptData[script];
        for (let i = 0; i < ranges.length; i += 2) {
            if (codepoint >= ranges[i] && codepoint <= ranges[i + 1]) {
                return script;
            }
        }
    }
    return null;
}

export function supportedCodepoint(codepoint: number): boolean {
    return scriptFromCodepoint(codepoint) !== null;
}

