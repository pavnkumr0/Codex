it('should throw an error when setting a negative value for numberOfMonths property', () => {
  expect(() => {
    component.numberOfMonths = -1;
  }).toThrowError('Number of months cannot be negative.');
});