
module.exports = function (str) {
    return new Keyplace(str);
};

function Keyplace(str)
{
    function toString() { return str.toString(); };
    this.valueOf = this.toString = toString;
    this.length = str.length;
};

Keyplace.prototype = new String();

Keyplace.prototype.format = function (params, targetOnly) {
    params = params || {};

    var regex = /:(\w+)/;

    var str = this.toString();
    var result = "";

    var safety = str.length;
    var hit = 0;
    var match, index, key, value;

    while ( (match = str.match(regex))) {
        if (hit > safety) {
            throw Error('judged in loop and stop for safety, okay?');
        }

        key = match[1];
        value = (params[ key ] !== undefined) ? params[ key ] : ( targetOnly ? match[0] : "" );
        index = match.index;

        result += str.substr(0, match.index) + value;

        str = str.substr(index + match[0].length);
        hit += 1;
    }

    result += str;

    return result;
};
