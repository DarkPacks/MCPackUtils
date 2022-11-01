import { writeFile as originalWriteFile } from "fs/promises";
import { InControl } from "./incontrol";

const writeFile = originalWriteFile as jest.Mock<any, any>;

jest.mock("fs/promises", () => ({
  writeFile: jest.fn(),
}));

describe("InControl", () => {
  it("writes to all configs", async () => {
    const inControl = new InControl();
    await inControl.generateFiles();
    expect(writeFile).toHaveBeenCalledTimes(7);
  });
});
