import * as ex from 'excalibur';

export class MillionaireGame {
  public engine: ex.Engine;

  private onStateChangeCallback: (step: number, hasLost: boolean) => void;

  private currentStep = 0;

  constructor(
    canvasElement: HTMLCanvasElement,
    onStateChange: (step: number, hasLost: boolean) => void,
  ) {
    this.onStateChangeCallback = onStateChange;

    // Background matches Infoverse's dark surface token (--background-dark)
    this.engine = new ex.Engine({
      canvasElement,
      width: 800,
      height: 300,
      backgroundColor: ex.Color.fromHex('#2C5F75'),
      displayMode: ex.DisplayMode.FitScreen,
    });

    this.start();
  }

  private start() {
    this.engine.start();
    this.onStateChangeCallback(this.currentStep, false);
  }

  public submitAnswer(isCorrect: boolean) {
    if (!isCorrect) {
      this.onStateChangeCallback(this.currentStep, true);
      return;
    }
    this.currentStep += 1;
    this.onStateChangeCallback(this.currentStep, false);
  }

  public reset() {
    this.currentStep = 0;
    this.onStateChangeCallback(this.currentStep, false);
  }

  public destroy() {
    this.engine.stop();
  }
}
