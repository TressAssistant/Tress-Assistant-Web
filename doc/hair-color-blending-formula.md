# Formal Explanation of Hair Color Blending Formulas (Revised for Realism)

## Introduction

This document presents a mathematically rigorous model for simulating the blending of natural and artificial (dyed) hair colors. The model reflects the physical limitations of hair dyeing: lightness (brightness) of natural hair strongly limits the achievable lightness after dyeing, while hue and saturation are more blendable, especially for light hair or yellow-based dyes. The formulation is suitable for computer graphics implementations (e.g., OpenGL, GLSL).

## Variables and Ranges

Let:

- **Natural hair color in HSL:**  
  \(N = (N_h, N_s, N_l)\)  
  - \(N_h\): Hue in radians, \( [0, 2\pi) \)  
  - \(N_s\): Saturation, \( [0, 1] \)  
  - \(N_l\): Lightness, \( [0, 1] \)
- **Natural hair color in RGB:**  
  \( (N_r, N_g, N_b) \) from HSL→RGB, each \( [0, 1] \)
- **Natural brightness:**  
  \( NB = 0.299 N_r + 0.587 N_g + 0.114 N_b \)
- **Artificial color in HSL:**  
  \(A = (A_h, A_s, A_l)\), same ranges as above
- **Final blended color in HSL:**  
  \(F = (F_h, F_s, F_l)\)

## Blending Equations

The final blended color is a weighted average of natural and artificial HSL components, but with **distinct blending factors for hue, saturation, and lightness**:

\[
\begin{align*}
F_h &= \alpha \cdot A_h + (1 - \alpha) \cdot N_h \\
F_s &= \beta \cdot A_s + (1 - \beta) \cdot N_s \\
F_l &= \gamma \cdot A_l + (1 - \gamma) \cdot N_l \\
\end{align*}
\]

Where  

- \(\alpha\): blending factor for hue  
- \(\beta\): blending factor for saturation  
- \(\gamma\): blending factor for lightness (special constraints, see below)

## Blending Factor Definitions

### 1. Circular Hue Proximity

Dyeing is most effective when the artificial hue is near yellow (\(\mu = \frac{\pi}{3}\)). We use the cosine for proper circular handling:

\[
\text{proximity} = \left( \frac{1 + \cos(A_h - \mu)}{2} \right)^p
\]

- \(\mu = \frac{\pi}{3}\) (yellow)
- \(p\): sharpness parameter

### 2. Nonlinear Brightness Response (Sigmoid)

Artificial color dominance increases with natural brightness, but **nonlinearly**:

\[
S(NB) = \frac{1}{1 + e^{-k(NB - c)}}
\]

- \(k\): controls steepness (e.g., 5)
- \(c\): midpoint (e.g., 0.5)

### 3. Channel-Specific Blending Factors

- **Hue & Saturation** (can be replaced by artificial color if brightness allows, especially for yellowish dyes):
  \[
  \alpha = \beta = S(NB) + (1 - S(NB)) \cdot \text{proximity}
  \]
- **Lightness** (smoothly transitions: artificial color can darken light hair, but cannot lighten dark hair):
  \\
  \gamma = S_{dark}(A_l - N_l) + (1 - S_{dark}(A_l - N_l)) \cdot NB^q
  \\
  where
  \[
  S_{dark}(x) = \frac{1}{1 + e^{d x}} \quad (d \gg 1)
  \]
  is a steep sigmoid (e.g., \(d = 20\)), so when \(A_l < N_l\), \(\gamma \approx 1\), and when \(A_l > N_l\), \(\gamma \approx NB^q\).
  - This ensures a smooth transition between the two regimes.

## Full Blending Formula

\[
\begin{align*}
F_h &= \alpha \cdot A_h + (1 - \alpha) \cdot N_h \\
F_s &= \alpha \cdot A_s + (1 - \alpha) \cdot N_s \\
F_l &= \gamma \cdot A_l + (1 - \gamma) \cdot N_l \\
\\
\alpha &= S(NB) + (1 - S(NB)) \left( \frac{1 + \cos(A_h - \frac{\pi}{3})}{2} \right)^p \\
\gamma &= S_{dark}(A_l - N_l) + (1 - S_{dark}(A_l - N_l)) NB^q \\
\end{align*}
\]
where
\[
S(NB) = \frac{1}{1 + e^{-k(NB - c)}}
\]
\[
S_{dark}(x) = \frac{1}{1 + e^{d x}} \quad (d \gg 1)
\]

## Parameter Recommendations

- \(p = 2\): sharp proximity for yellow range
- \(k = 5\), \(c = 0.5\): sigmoid transition at mid-brightness
- \(q = 1\) (linear) or \(2\) (quadratic, more realistic for lightness anchoring)
- \(d = 20\): steepness for darkening transition
- All HSL values normalized to \([0,1]\) except hue in \([0, 2\pi)\)

## Practical Effects

- **Dark hair**:  
  - Final lightness stays low, regardless of dye lightness.
  - Only yellow-based dyes shift hue/saturation noticeably.
- **Light hair**:  
  - Artificial color can smoothly darken hair (e.g., blonde to black becomes black), with no abrupt transition.
  - Artificial color cannot lighten hair beyond its natural brightness.
- **Intermediate hair**:  
  - Gradual, nonlinear, and smooth transition in dominance.

## Implementation Notes

- Always handle hue blending circularly (e.g., via trigonometric interpolation or modular arithmetic).
- For graphics code, ensure all variables are clamped to valid ranges after computation.

## Summary

This revised model ensures realistic simulation:  

- **Hue and saturation** can shift with dye, especially for compatible colors and light hair.  
- **Lightness** is strongly anchored to the natural base, reflecting real-world dye limitations.  
- **Nonlinear transitions** ensure that extreme results (like light yellow on black hair) are impossible.

This model is robust for digital hair color preview and simulation applications.
