import { filterAlphaNumericPlus, removeAllSpaces } from '../src/utilities/string';

test('test to check alpha + numeric filter works', () => {
    const filtered = filterAlphaNumericPlus(' foo   123  bar   #!$%&/()?       baz ');
    expect(filtered).toBe('foo123barbaz')
});

test('test to check alpha + numeric plus filter works', () => {
    const filtered = filterAlphaNumericPlus(' foo  bar   !$%    baz ', '!$%');
    expect(filtered).toBe('foobar!$%baz')
});

test('test to check alpha + numeric filter works accepts space as specialcharacter that shouldnt get filtered', () => {
    const filtered = filterAlphaNumericPlus(' foo  bar   #!$%&/()?  baz ', ' ');
    expect(filtered).toBe(' foo  bar     baz ')
});

test('test to check if removing spaces works', () => {
    const noSpacesString = removeAllSpaces(' foo  bar       baz ');
    expect(noSpacesString).toBe('foobarbaz')
});