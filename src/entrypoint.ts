import { Game } from './chibi/js/Game';

import { HelloTriangle } from './scene/HelloTriangle';
import { HelloIndexedBuffer } from './scene/HelloIndexedBuffer';
import { HelloTorus } from './scene/HelloTorus';
import { DirectionalLight } from './scene/DirectionalLight';

window.onload = function() {
    var game = new Game();
    document.body.appendChild(game.domElement);

    // game.run(new HelloTriangle());
    // game.run(new HelloIndexedBuffer());
    // game.run(new HelloTorus());
    game.run(new DirectionalLight());
};
