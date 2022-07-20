import { Container, Sprite } from 'pixi.js';

const symbolSize = 50;

export default class SlotReel extends Container {
  constructor(assets, symbolSize, currentSymbolId) {
    super();
    this.assets = assets;
    this.symbols = [];
    this.symbolSize = symbolSize;
    this.currentSymbolId = currentSymbolId;
  };

  init() {
    for (let i = 0; i < this.assets.length; i++) {
      const symbol = new Sprite(this.assets[i]);
      symbol.scale.x = symbol.scale.y = Math.min(this.symbolSize / symbol.width, this.symbolSize / symbol.height);
      symbol.x = (this.symbolSize - symbol.width) / 2;
      symbol.y = (this.symbolSize - symbol.height) / 2;
      symbol.anchor.set(0.5);
      this.symbols.push(symbol);
      this.addChild(symbol);
    }
    return this;
  }

  randomiseSymbol() {
    const randomisedSymbol = this.symbols[Math.floor(Math.random() * this.symbols.length)];
    this.currentSymbolId = randomisedSymbol._texture.textureCacheIds[0];
  }

  getCurrentSymbol() {
    return this.symbols.filter(function (obj) {
      return obj._texture.textureCacheIds[0] === this.currentSymbolId;
    }, this)[0];
  }
}
