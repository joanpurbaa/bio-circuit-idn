let audioCtx: AudioContext | null = null;

function getCtx() {
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
}

export function playSound(type: "success" | "error" | "complete" | "drop") {
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.value = 0.08;

    switch (type) {
      case "success":
        osc.frequency.value = 880;
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
        break;
      case "error":
        osc.frequency.value = 200;
        osc.type = "sawtooth";
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
        break;
      case "complete": {
        osc.frequency.value = 523;
        osc.start();
        osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2);
        osc.frequency.setValueAtTime(1047, ctx.currentTime + 0.3);
        osc.stop(ctx.currentTime + 0.4);
        break;
      }
      case "drop":
        osc.frequency.value = 600;
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
        break;
    }
  } catch {
    // Audio not available
  }
}
