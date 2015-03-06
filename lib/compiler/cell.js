/**
 * Function Processor for the CellScript to JS Compiler.
 */

/// public interface ///
module.exports = {

    canProcess: function(leaf) {
        return leaf.type === "cell";
    },

    process: function(leaf, state) {
        state.print('!function(cell, express, app) ');
        state.println("{");
        state.levelDown();
        state.print('express');
        state.print(' = ');
        state.print('cell.components.express');
        state.print(' = ');
        state.println('require("express");');
        state.println('app = cell.components.app = express();');
        state.line_break();

        state.processor.level(leaf.items, state);

        state.levelUp();
        state.println("}({ path: __dirname, components: {} })");
    }

};