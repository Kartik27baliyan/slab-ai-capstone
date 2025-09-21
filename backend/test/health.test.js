const { logHealth } = require("../lib/utils");
test("Logs health timestamp", () => {
  jest.spyOn(console, "log");
  logHealth();
  expect(console.log).toHaveBeenCalled();
});
