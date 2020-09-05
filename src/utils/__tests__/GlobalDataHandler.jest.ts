import GlobalDataHandler from '../GlobalDataHandler.ts';

test('Expect all instances to be the same', () => {
  expect(new GlobalDataHandler()).toBe(new GlobalDataHandler());
});

test('Check if data gets saved', () => {
  const handler = new GlobalDataHandler();
  handler.updatePersistent();
  expect(JSON.stringify(handler.data))
    .toEqual(localStorage.getItem('globalData'));
});

test('Check if data can be retrieved', () => {
  const handler = new GlobalDataHandler();
  handler.updatePersistent();
  const oldData = handler.data;
  handler.readPersistent();
  expect(oldData)
    .toEqual(handler.data);
});

test('Check if localStorage data overrides the previous data', () => {
  const handler = new GlobalDataHandler();
  localStorage.setItem('globalData', JSON.stringify({
    documentTitle: 'foo',
  }));
  handler.readPersistent();
  localStorage.setItem('globalData', JSON.stringify({
    documentTitle: 'bar',
  }));
  handler.readPersistent();

  expect(handler.data.documentTitle).toEqual('bar');
});
