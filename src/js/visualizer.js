import bogosort from './algorithms/bogosort.js';

export default class Visualizer {
    constructor(algorithm, delay, n, canvasEl) {
        this.algorithm = algorithm;
        this.delay = delay;
        this.canvasEl = canvasEl;
        this.n = n;
        this.isWorking = false;
        this.step = 0;
        this.checkStep = 0;
        this.prevTimestamp = Date.now();

        this.ctx = this.canvasEl.getContext('2d');

        this.blocks = Array.from({ length: n }, (_, i) => i + 1);
        this.allSteps = [this.blocks];

        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.maxFreq = 600;
        this.minFreq = 200;
        this.gain = 0.1;
        this.waveform = "triangle";

        this.currentOscillator = null;
        this.currentVolume = null;

        this.resize();
        this.newCanvas();

        window.addEventListener("resize", () => this.resize());
    }

    playNote(freq, duration, gain) {
        if (this.currentOscillator) {
            this.currentOscillator.stop();
            this.currentVolume.disconnect();
        }

        const osc = this.audioCtx.createOscillator();
        const vol = this.audioCtx.createGain();
        vol.connect(this.audioCtx.destination);
        vol.gain.value = gain;

        osc.type = this.waveform;
        osc.frequency.value = freq;
        osc.connect(vol);
        osc.start();

        this.currentOscillator = osc;
        this.currentVolume = vol;

        setTimeout(() => {
            osc.stop();
            vol.disconnect();
        }, duration);
    }

    start() {
        this.step = 0;
        this.blocks = bogosort(this.blocks);
        this.allSteps = this.algorithm(this.blocks);
        this.isWorking = true;
        this.animation();
    }

    stop() {
        this.isWorking = false;
    }

    complete() {
        this.isWorking = false;

        const interval = setInterval(() => {
            if (this.checkStep < this.n) {
                this.checkStep += this.n / 100;
                this.check();
            } else {
                this.checkStep = 0;
                this.newCanvas()
                clearInterval(interval);
            }
        }, 0.1);
    }

    resize() {
        this.canvasEl.width = window.innerWidth;
        this.canvasEl.height = window.innerHeight;

        this.blockWidth = window.innerWidth / this.n;
        this.blockHeight = window.innerHeight / this.n;
    }

    animation() {
        this.now = Date.now();
        this.delta = this.now - this.prevTimestamp;

        if (this.delta > this.delay) {
            this.step++;
            if (this.allSteps[this.step]) this.render();
            else this.complete();

            this.prevTimestamp = this.now - (this.delta % this.delay);
        }

        if (this.isWorking) {
            requestAnimationFrame(() => this.animation());
        }
    }

    hslToRgb(h, s, l) {
        let r, g, b;

        if (s === 0) {
            r = g = b = l;
        } else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = this.hueToRgb(p, q, h + 1 / 3);
            g = this.hueToRgb(p, q, h);
            b = this.hueToRgb(p, q, h - 1 / 3);
        }

        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

    hueToRgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
        if (this.allSteps[this.step][this.n + 1]) {
            if (this.allSteps[this.step][this.n + 1][0] >= 0) {
                this.playNote(this.minFreq + ((this.maxFreq - this.minFreq) * (this.allSteps[this.step][this.allSteps[this.step][this.n + 1][0]] / this.n)), 50, this.gain);
            }
        }

        for (let i = 0; i < this.n; i++) {
            if (this.allSteps[this.step][this.n + 1]) {
                const item = this.allSteps[this.step][i];
                if (this.allSteps[this.step][this.n + 1].includes(i) && this.step < this.allSteps.length - 1) {
                    this.ctx.fillStyle = "white";
                } else {
                    const hslColor = this.hslToRgb(item / this.n, 1, 0.6);
                    this.ctx.fillStyle = `rgb(${hslColor.join(",")})`;
                }
                this.ctx.fillRect(i * (this.blockWidth), this.canvasEl.height, this.blockWidth, (-this.blockHeight * item));
            }
        }
    }

    check() {
        this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
        this.playNote(this.minFreq + ((this.maxFreq - this.minFreq) * (this.checkStep / this.n)), 50, this.gain);
        for (let i = 0; i < this.n; i++) {
            if (i < this.checkStep) {
                this.ctx.fillStyle = "rgb(200,255,200)";
            } else {
                const hslColor = this.hslToRgb(i / this.n, 1, 0.6);
                this.ctx.fillStyle = `rgb(${hslColor.join(",")})`;
            }
            this.ctx.fillRect(i * (this.blockWidth), this.canvasEl.height, this.blockWidth, (-this.blockHeight * (i + 1)));
        }
    }

    newCanvas() {
        this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height)
        for (let i = 0; i < this.n; i++) {
            const hslColor = this.hslToRgb(i / this.n, 1, 0.6);
            this.ctx.fillStyle = `rgb(${hslColor.join(",")})`;
            this.ctx.fillRect(i * (this.blockWidth), this.canvasEl.height, this.blockWidth, (-this.blockHeight * (i + 1)));
        }
    }
}