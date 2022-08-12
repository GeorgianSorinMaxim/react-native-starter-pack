const analytics = () => ({
  log: jest.fn(),
  recordError: jest.fn(),
  setUserId: jest.fn(),
  setAttributes: jest.fn(),
});

export default analytics;
