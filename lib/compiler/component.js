/**
 * Function Processor for the CellScript to JS Compiler.
 */

/// public interface ///
module.exports = {

    canProcess: function(leaf) {
        return leaf.type === "component";
    },

    process: function(leaf, state) {
        state.print("module.exports");
        state.print(" = ");
        state.print('function(cell) ');
        state.println("{");
        state.levelDown();
        /*state.print('with(cell.components) ');
        state.println("{");
        state.levelDown();*/
        state.println("var exports={},express=cell.components.express,app=cell.components.app;");

        state.processor.level(leaf.items, state);

        /*state.levelUp();
        state.println("}");*/
        state.println("return exports;");
        state.levelUp();
        state.println("}");
    }

};