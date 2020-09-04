import GlobalDataHandler from '../GlobalDataHandler.ts';

test('Expect all instances to be the same', () => {
  expect(new GlobalDataHandler()).toBe(new GlobalDataHandler());
});
