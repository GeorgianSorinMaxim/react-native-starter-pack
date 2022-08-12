const analytics = jest.fn().mockReturnValue({
  logEvent: jest.fn(),
  logScreenView: jest.fn(),
  getAppInstanceId: jest.fn(),
});

export default analytics;
