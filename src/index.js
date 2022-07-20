import { Application, Loader } from 'pixi.js';
import bag from './assets/symbols/bag.png';
import blue from './assets/symbols/blue.png';
import coins from './assets/symbols/coins.png';
import diamond from './assets/symbols/diamond.png';
import gold from './assets/symbols/gold.png';
import goldbars from './assets/symbols/goldbars.png';
import green from './assets/symbols/green.png';
import orange from './assets/symbols/orange.png';
import rainbow from './assets/symbols/rainbow.png';
import red from './assets/symbols/red.png';
import ring from './assets/symbols/ring.png';
import silver from './assets/symbols/silver.png';
import violet from './assets/symbols/violet.png';
import skyBg from './assets/bg/bg.png';
import button from './assets/button.png';
import hat from './assets/hat.png';
import star from './assets/star.png';
import winMessage from './assets/winscreen.png';
import Game from "./js/components/Game";

let app = new Application({ width: 1280, height: 720 });

document.body.append(app.view);

const loader = new Loader();

const onAssetLoad = () => {

  const initialDataset = {
    symbols: ['coins', 'diamond', 'gold'],
    prize: 100,
  };

  const slotReelSymbols = [
    loader.resources.bag.texture,
    loader.resources.blue.texture,
    loader.resources.coins.texture,
    loader.resources.diamond.texture,
    loader.resources.gold.texture,
    loader.resources.goldbars.texture,
    loader.resources.green.texture,
    loader.resources.orange.texture,
    loader.resources.rainbow.texture,
    loader.resources.red.texture,
    loader.resources.ring.texture,
    loader.resources.silver.texture,
    loader.resources.violet.texture,
  ];

  const sceneAssets = {
    background: loader.resources.background.texture,
    button: loader.resources.button.texture,
    hat: loader.resources.hat.texture,
    star: loader.resources.star.texture,
    winMessage: loader.resources.winMessage.texture,
  }

  const game = new Game(
    initialDataset,
    slotReelSymbols,
    initialDataset.symbols.length,
    sceneAssets,
    50,
  );

  app.stage.addChild(game.init());
};

loader.add('bag', bag)
  .add('blue', blue)
  .add('coins', coins)
  .add('diamond', diamond)
  .add('gold', gold)
  .add('goldbars', goldbars)
  .add('green', green)
  .add('orange', orange)
  .add('rainbow', rainbow)
  .add('red', red)
  .add('ring', ring)
  .add('silver', silver)
  .add('violet', violet)
  .add('background', skyBg)
  .add('button', button)
  .add('hat', hat)
  .add('star', star)
  .add('winMessage', winMessage)
  .load(onAssetLoad);



