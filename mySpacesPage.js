const BasePage = require("./basePage");

class MySpacesPage extends BasePage {
  constructor(driver) {
    super(driver);
  }

  async typeItemTitle(title) {
    await this.tap("accessibility id:Untitled");
    for (let char of title) {
      await this.tap(`accessibility id:${char}`);
    }
  }

  async createItem() {
    await this.tap("accessibility id:Create");
  }

  async completeItemCreation() {
    await this.proceedToNextStep();
    await this.proceedToNextStep();
    await this.tap("accessibility id:Done");
  }

  async proceedToNextStep() {
    await this.tap("accessibility id:Next");
  }

  async createNewItem() {
    await this.tap("accessibility id:x32/Plus");
  }

  async navigateToSettings() {
    await this.tap("accessibility id:NavigationBase/Settings");
  }

  async checkSpacesExist(...spaceNames) {
    for (const spaceName of spaceNames) {
      const selector = `//XCUIElementTypeButton[contains(@name, '${spaceName}')]`;
      try {
        await this.driver.$(selector).waitForExist({ timeout: 5000 });
      } catch (error) {
        throw new Error(`Space "${spaceName}" does not exist`);
      }
    }
  }
}

module.exports = MySpacesPage;
