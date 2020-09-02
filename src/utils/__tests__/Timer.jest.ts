import Timer from '../Timer.ts';

test('Expect positive time to work fine', () => {
  expect(() => { new Timer(3000); }).not.toThrow();
});

test('Expect 0 time to work fine', () => {
  expect(() => { new Timer(0); }).not.toThrow();
});

test('Expect negative time to throw', () => {
  expect(() => { new Timer(-2000); }).toThrow();
});

test('Expect string value to fail', () => {
  expect(() => { new Timer('400'); }).toThrow();
});

test('Expect object value to fail', () => {
  expect(() => { new Timer({ foo: 'bar' }); }).toThrow();
});
