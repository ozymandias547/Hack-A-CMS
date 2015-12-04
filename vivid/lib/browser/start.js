
module.exports.start = function() {

    this._setupEcosystems();
    this._setupStore();

    document.addEventListener('DOMContentLoaded', this._setupDOM.bind(this), false);

};
