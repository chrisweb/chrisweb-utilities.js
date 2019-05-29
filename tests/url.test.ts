import { getUrlParameters, getUrlParameterByName, replaceUrlParameter } from '../src/utilities/url';

test('extract 1 parameter "foo" with a value "bar" from a valid url', () => {
    expect(getUrlParameters('https://www.example.com/playlist?foo=bar')).toHaveProperty('foo', 'bar');
});

test('extract 1 parameter "foo" with a value "bar" from a valid uri', () => {
    expect(getUrlParameters('foo=bar')).toHaveProperty('foo', 'bar');
});

test('extract 1 parameter "foo" with a value "bar" from a valid uri starting with a question mark', () => {
    expect(getUrlParameters('?foo=bar')).toHaveProperty('foo', 'bar');
});

test('extract 1 parameter "foo" with a value "bar" from a valid uri starting with a question mark', () => {
    expect(getUrlParameters('?foo=+bar')).toHaveProperty('foo', ' bar');
});

test('extract 2 parameters from a valid url', () => {
    let urlParameters = getUrlParameters('?foo=bar&hello=world');
    expect(urlParameters).toHaveProperty('foo', 'bar');
    expect(urlParameters).toHaveProperty('hello', 'world');
});
