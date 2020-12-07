import { EmployeeHandler } from "./pageObjects/EmployeeHandler";

const em = new EmployeeHandler();

// Set a longer timeout, because I was running into issues 
// with jest timing out after 5000ms. Tried 10000ms, and 
// ending up trying 30000, then 60000. Need to troubleshoot 
// and determine if the issue is with code or with local 
// machine.
jest.setTimeout(10000);

describe("Employee Manager", () => {
  beforeEach(async () => {
    await em.navigate();
  });
  it("can add a new employee", async () => {
    await em.addEmployee();
    await em.selectEmployeeByName("New Employee");
    await em.editEmployee({
      name: "test person",
      phone: "1234567890",
      title: "test result",
    });
    await em.saveChanges();
    await em.selectEmployeeByName("Dollie Berry");
    await em.selectEmployeeByName("test person");
    let employee = await em.getEmployeeInfo();
    expect(employee.name).toEqual("test person");
    expect(employee.phone).toEqual("1234567890");
    expect(employee.title).toEqual("test result");
  });
  it("can edit an existing employee", async () => {
    await em.selectEmployeeByName("Bernice Ortiz");
    await em.editEmployee({ title: "Grand Poobah" });
    await em.saveChanges();
    await em.selectEmployeeByName("Phillip Weaver");
    await em.selectEmployeeByName("Bernice Ortiz");
    let employee = await em.getEmployeeInfo();
    expect(employee).toEqual({
      id: 1,
      name: "Bernice Ortiz",
      phone: "4824931093",
      title: "Grand Poobah",
    });
  });
  it("can cancel editting an employee", async () => {
    await em.selectEmployeeByName("test person");
    await em.editEmployee({ name: "Cooper" });
    await em.cancelChanges();
    let employee = await em.getEmployeeInfo();
    expect(employee.name).toEqual("test person");
    });
});
// After continuing to run into timeout issues, I 
// Decided to break the testing up to see if this 
// would resolve my
describe("Employee Manager Set 2", () => {
  afterAll(async () => {
    await em.quit();
  });
  it("can add another employee", async () => {
    await em.addEmployee();
    await em.selectEmployeeByName("New Employee");
    await em.editEmployee({
      name: "Steven Cooper",
      phone: "3212002976",
      title: "QA Specialist",
    });
    await em.saveChanges();
    await em.selectEmployeeByName("Dollie Berry");
    await em.selectEmployeeByName("Steven Cooper");
    let employee = await em.getEmployeeInfo();
    expect(employee.name).toEqual("Steven Cooper");
    expect(employee.phone).toEqual("3212002976");
    expect(employee.title).toEqual("QA Specialist");
    });
  it("can edit, and navigate away without saving changes", async () => {
    await em.selectEmployeeByName("Dollie Berry");
    let employee = await em.getEmployeeInfo();
    await em.editEmployee({ phone: "3212002976"});
    await em.selectEmployeeByName("Steven Cooper");
    await em.selectEmployeeByName("Dollie Berry");
    let checkEmployee = await em.getEmployeeInfo();
    expect(employee).toEqual(checkEmployee);
  });
});
