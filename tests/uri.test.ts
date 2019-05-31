import { decodeUri, encodeUri } from '../src/utilities/uri';

// decodeUri
test('decode an uri, should replace the plus sign with a space', () => {
    expect(decodeUri('foo+bar')).toEqual('foo bar');
});

// encodeUri
test('encode an uri, exclamation mark should be returned as "%21"', () => {
    expect(encodeUri('foo!')).toEqual('foo%21');
});

test('encode an uri, "\'" should be returned as "%27"', () => {
    expect(encodeUri('foo\'')).toEqual('foo%27');
});

test('encode an uri, "(" should be returned as "%28"', () => {
    expect(encodeUri('foo(')).toEqual('foo%28');
});

test('encode an uri, ")" should be returned as "%29"', () => {
    expect(encodeUri('foo)')).toEqual('foo%29');
});

test('encode an uri, "~" should be returned as "%7E"', () => {
    expect(encodeUri('foo~')).toEqual('foo%7E');
});

test('encode an uri, " " should be returned as "+"', () => {
    expect(encodeUri('foo ')).toEqual('foo+');
});

test('encode an uri, "\x00" should be returned as "+"', () => {
    expect(encodeUri('foo\x00')).toEqual('foo+');
});
