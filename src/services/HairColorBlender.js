const TAU = 2 * Math.PI;

class HairColorBlender {
  constructor(params = {}) {
    this.p = params.p ?? 2.0;
    this.k = params.k ?? 2.0;
    this.c = params.c ?? 0.5;
    this.q = params.q ?? 2.0;
    this.d = params.d ?? 20;
    this.yellow = Math.PI / 3; // μ = π/3
  }

  #clamp01(x) {
    return Math.max(0, Math.min(1, x));
  }

  #modTau(x) {
    // Wraps angle to [0, 2π)
    return ((x % TAU) + TAU) % TAU;
  }

  #sigmoid(x, k = this.k, c = this.c) {
    return 1 / (1 + Math.exp(-k * (x - c)));
  }

  #steepSigmoid(x, d = this.d) {
    return 1 / (1 + Math.exp(d * x));
  }

  /**
   * Blends natural and artificial hair colors in HSL, following the model.
   * @param {Object} natural - { h, s, l } (h in [0,2π), s,l in [0,1])
   * @param {Object} artificial - { h, s, l } (h in [0,2π), s,l in [0,1])
   * @param {number} [brightness] - Optional brightness value (NB), if not provided, defaults to 0.5
   * @returns {Object} { h, s, l } - blended HSL
   */
  blend(natural, artificial, brightness = 0.5) {
    const safeNaturalH = natural.h || 0;
    const safeArtificialH = artificial.h || 0;
    const NB = brightness; // Use provided brightness
    const proximity = Math.pow((1 + Math.cos(safeArtificialH - this.yellow)) / 2, this.p);
    const S_NB = this.#sigmoid(NB, this.k, this.c);
    const alpha = S_NB + (1 - S_NB) * proximity;
    const bata = alpha;
    const S_dark = this.#steepSigmoid(artificial.l - natural.l, this.d);
    const gamma = S_dark + (1 - S_dark) * Math.pow(NB, this.q);
    const h = safeArtificialH;
    const s = this.#clamp01(bata * artificial.s + (1 - bata) * natural.s);
    const l = this.#clamp01(gamma * artificial.l + (1 - gamma) * natural.l);
    return { h: this.#modTau(h), s, l };
  }
}

export default HairColorBlender;