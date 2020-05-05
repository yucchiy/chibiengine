import Game from './chibi/js/Game.js';

import HelloTriangle from './scene/HelloTriangle.js';

window.onload = function() {
    var game = new Game();
    document.body.appendChild(game.domElement);

    game.run(new HelloTriangle());
};
