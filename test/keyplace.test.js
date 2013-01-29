var expect = require('chai').expect;
var keyplace = require('../');

describe('Keyplace', function () {
    it('prototype should be a String', function () {
        var v = keyplace('foobarbaz');
        expect(v).to.be.an.instanceof(String);
    });

    it('should return origin string if toString()', function () {
        var str = 'foobarbaz';
        var v = keyplace(str);

        expect(v).not.be.equal(str);
        expect(v.toString()).be.equal(str);
        expect(String(v)).be.equal(str);
    });

    it('should have a string length', function () {
        var str = 'foobarbaz';
        var v = keyplace(str);

        expect(v.length).be.equal(str.length);
    });

    it('should use String methods', function () {
        var str = 'foobarbaz';
        var v = keyplace(str);

        expect(v.replace(/o/g, 'a')).be.equal( 'faabarbaz' );
        expect(v.substr(2, 7)).be.equal(str.substr(2, 7));
    });

    describe('formater', function () {
        var str1 = ":foo";
        var str2 = ":foo/bar";
        var str3 = "/path/to/:foo";
        var str4 = "/path/to/:foo/:bar/:baz/qux";

        var v1 = keyplace(str1);
        var v2 = keyplace(str2);
        var v3 = keyplace(str3);
        var v4 = keyplace(str4);

        it('should return blanks if no params', function () {
            expect(v1.format()).be.equal('');
            expect(v2.format()).be.equal('/bar');
            expect(v3.format()).be.equal('/path/to/');
            expect(v4.format()).be.equal('/path/to////qux');
        });

        it('should return blanks if zero object', function () {
            var params = {};

            expect(v1.format(params)).be.equal('');
            expect(v2.format(params)).be.equal('/bar');
            expect(v3.format(params)).be.equal('/path/to/');
            expect(v4.format(params)).be.equal('/path/to////qux');
        });


        it('should return formaed string if one parameter', function () {
            var params = { foo: "OK" };

            expect(v1.format(params)).be.equal('OK');
            expect(v2.format(params)).be.equal('OK/bar');
            expect(v3.format(params)).be.equal('/path/to/OK');
            expect(v4.format(params)).be.equal('/path/to/OK///qux');
        });

        it('should return formaed string if just parameters', function () {
            var params = { foo: "OK", bar: 123, baz: "456" };

            expect(v1.format(params)).be.equal('OK');
            expect(v2.format(params)).be.equal('OK/bar');
            expect(v3.format(params)).be.equal('/path/to/OK');
            expect(v4.format(params)).be.equal('/path/to/OK/123/456/qux');
        });

        it('should not cycle if set placeholder values', function () {
            var params = { foo: ":foo", bar: ":baz", baz: ":bar" };

            expect(v1.format(params)).be.equal(':foo');
            expect(v2.format(params)).be.equal(':foo/bar');
            expect(v3.format(params)).be.equal('/path/to/:foo');
            expect(v4.format(params)).be.equal('/path/to/:foo/:baz/:bar/qux');
        });

        it('should not format if no word placeholder', function () {
            var str5 = "日本語が含まれても:key適切に置換される:thats_ok";
            var str6 = "プレースホルダーが/:日本語/では置換されない";

            var v5 = keyplace(str5);
            var v6 = keyplace(str6);

            var params = { key: "プレースホルダーがアルファベットならば",
                           thats_ok: "あとアンダースコアもOK",
                           ":日本語": "それ以外は許されない" };

            expect(v5.format(params)).be.equal("日本語が含まれてもプレースホルダーがアルファベットならば適切に置換されるあとアンダースコアもOK");
            expect(v6.format(params)).be.equal(str6);
        });
    });
});
