import Timer from '../Timer.ts';

test('Expect positive time to work fine', () => {
  const timer = new Timer();
  expect(() => { timer.currentTime = -2000; }).not.toThrow();
});

test('Expect 0 time to work fine', () => {
  const timer = new Timer();
  expect(() => { timer.currentTime = 0; }).not.toThrow();
});

test('Expect negative time to throw', () => {
  const timer = new Timer();
  expect(() => { timer.currentTime = -2000; }).toThrow();
});
