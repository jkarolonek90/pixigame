import { Container, Sprite, Text } from 'pixi.js';
import gsap from 'gsap';
import SlotReel from "./SlotReel";

export default class Game extends Container {
  constructor(initialData, reelSymbols, reelNumber, sceneAssets, symbolSize) {
    super();
    this.initialData = initialData;
    this.reelSymbols = reelSymbols;
    this.reelNumber = reelNumber;
    this.sceneAssets = sceneAssets;
    this.symbolSize = symbolSize;

    this.reels = [];
    this.button = null;
    this.buttonText = null;
    this.currentSymbolIds = this.initialData.symbols;
    this.prizeCount = 0;
    this.prizeText = null;
    this.winStar = null;
    this.winMessage = null;
    this.spinning = false;
    this.firstSpin = true;
  }

  spin() {
    this.button.interactive = false;
    this.updateButtonText('Spinning!');
    this.currentSymbolIds = [];

    const spinTimeline = gsap.timeline({ onComplete: () => this.handleOutcome() });


    if (!this.firstSpin) {
      for (let i = 0; i < this.reels.length; i++) {
        spinTimeline.to(
          this.reels[i].getCurrentSymbol(),
          {
            x: (this.symbolSize - this.reels[i].getCurrentSymbol().width) / 2,
            y: (this.symbolSize - this.reels[i].getCurrentSymbol().height) / 2,
            duration: 1.5,
            ease: "power2.out"
          },
          "<"
        );
      }
    }

    spinTimeline.addLabel('animlabel');

    for (let i = 0; i < this.reels.length; i++) {
      this.reels[i].randomiseSymbol();
      this.currentSymbolIds.push(this.reels[i].currentSymbolId);

      const horizontalAnimOffset = i - (this.reels.length - 1) / 2;

      spinTimeline.to(
        this.reels[i].getCurrentSymbol(),
        {
          x: horizontalAnimOffset * 100,
          y: -120,
          duration: 2,
          ease: "back.out(1.7)"
        },
        'animlabel',
      );
    }

    this.firstSpin = false;
  }

  handleOutcome() {
    let outcome = false;

    for (let i = 0; i < this.currentSymbolIds.length; i++) {
      for (let j = i + 1; j < this.currentSymbolIds.length; j++) {
        if (this.currentSymbolIds[i] === this.currentSymbolIds[j]) {
          outcome = true;
        } 
      }
    }

    if (outcome) {
      this.win();
    } else {
      this.lose();
    }
  }

  win() {
    const winTimeline = gsap.timeline();
    winTimeline.to(this.winStar, { y: 100, duration: 2, ease: "power2.out" });
    winTimeline.to(this.winStar, { angle: 1080, duration: 2 }, "<");
    winTimeline.to(this.winStar, {
      alpha: 0, duration: 0.5,
      onComplete: () => {
        this.winStar.position.y = 450;
        this.winStar.angle = 0;
        this.winStar.alpha = 1;
        winTimeline.to(this.winMessage, {
          alpha: 1, duration: 0.5,
          onComplete: () => {
            this.updatePrizeCount();
            winTimeline.to(this.winMessage, {
              alpha: 0, duration: 0.5, delay: 1,
              onComplete: () => {
                this.button.interactive = true;
                this.updateButtonText('Spin!');
              }
            });
          }
        });
      }
    });
  }

  lose() {
    this.button.interactive = true;
    this.updateButtonText('Spin!');
  }

  updatePrizeCount() {
    this.prizeCount = this.prizeCount + this.initialData.prize;
    this.prizeText.text = `Prize: ${this.prizeCount}`;
  }

  updateButtonText(text) {
    this.buttonText.text = text;
  }

  init() {
    const background = new Sprite(this.sceneAssets.background);
    background.scale.set(0.7);
    this.addChild(background);

    const button = new Sprite(this.sceneAssets.button);
    button.scale.set(0.5);
    button.anchor.set(0.5);
    button.interactive = true;
    button.buttonMode = true;
    button.position.x = 1280 / 2;
    button.position.y = 600;
    button.on('pointerdown', this.spin, this);
    this.button = button;
    this.addChild(button);

    const buttonText = new Text('Spin!', { fontSize: 36, fill: '#ffdb16' });
    buttonText.anchor.set(0.5);
    buttonText.position.x = 1280 / 2;
    buttonText.position.y = 600;
    this.buttonText = buttonText;
    this.addChild(buttonText);

    for (let i = 0; i < this.reelNumber; i++) {
      const reel = new SlotReel(this.reelSymbols, 50, this.initialData.symbols[i]);
      reel.position.x = 1280 / 2;
      reel.position.y = 850 / 2;
      this.reels.push(reel);
      this.addChild(reel.init());
    }

    const winStar = new Sprite(this.sceneAssets.star);
    winStar.anchor.set(0.5);
    winStar.position.x = 1280 / 2;
    winStar.position.y = 450;
    this.winStar = winStar;
    this.addChild(winStar);

    const winMessage = new Sprite(this.sceneAssets.winMessage);
    winMessage.anchor.set(0.5);
    winMessage.scale.set(0.7);
    winMessage.alpha = 0;
    winMessage.position.x = 1280 / 2;
    winMessage.position.y = 125;
    this.winMessage = winMessage;
    this.addChild(winMessage);

    const hat = new Sprite(this.sceneAssets.hat);
    hat.anchor.set(0.5);
    hat.scale.set(0.8);
    hat.angle = 180;
    hat.position.x = 1280 / 2;
    hat.position.y = 450;
    this.addChild(hat);

    const prizeText = new Text(`Prize: ${this.prizeCount}`, { fontSize: 36, fill: '#ffdb16' });
    prizeText.position.x = 975;
    prizeText.position.y = 500;
    this.prizeText = prizeText;
    this.addChild(prizeText);

    return this;
  }
}
