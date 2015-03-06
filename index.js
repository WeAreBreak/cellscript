/**
 * Compiler Module Definition for the InqScript Language.
 */

module.exports = function compilerModuleDefinition() {
    this.language = "CellScript";

    this.tokens = {
        'identifier': require('./lib/tokenizer/identifier')
    };

    this.parsers = {
        'endpoint': require('./lib/parser/endpoint'),
        'respond': require('./lib/parser/respond'),
        'listen': require('./lib/parser/listen'),
        'cell': require('./lib/parser/cell'),
        'component': require('./lib/parser/component'),
        'include': require('./lib/parser/include'),
        'expression.js': require('./lib/parser/expression')
    };

    this.expressionParsers = {
        'unary': require('./lib/expressionParser/unary')
    };

    this.compilers = {
        'endpoint': require('./lib/compiler/endpoint'),
        'respond': require('./lib/compiler/respond'),
        'listen': require('./lib/compiler/listen'),
        'cell': require('./lib/compiler/cell'),
        'component': require('./lib/compiler/component'),
        'include': require('./lib/compiler/include')
    };
};