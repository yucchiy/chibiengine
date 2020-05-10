import { Game } from './chibi/js/Game';

import { HelloTriangle } from './scene/HelloTriangle';
import { HelloIndexedBuffer } from './scene/HelloIndexedBuffer';
import { HelloTorus } from './scene/HelloTorus';

window.onload = function() {
    var game = new Game();
    document.body.appendChild(game.domElement);

    // game.run(new HelloTriangle());
    // game.run(new HelloIndexedBuffer());
    game.run(new HelloTorus());
};
