const path = require('path');

const _root = path.resolve(__dirname, '..');

function root(value) {
    if (!value) {
        return _root;
    }

    let splits = value.replace(/^\/+/, '').replace(/\/+$/, '').split('/');

    return path.join.apply(path, [ _root ].concat(splits));
}

module.exports.root = root;