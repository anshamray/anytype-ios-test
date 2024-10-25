const BasePage = require("./basePage");

class SpacePage extends BasePage {
  constructor(driver) {
    super(driver);
  }

  async navigateBack() {
    const backButton = await this.driver.$("accessibility id:x32/Island/back");
    await backButton.click();
  }

  async checkSpaceName(expectedName) {
    try {
      const spaceNameElement = await this.driver.$(
        `-ios predicate string:label == "${expectedName}"`
      );
      const isDisplayed = await spaceNameElement.isDisplayed();

      if (!isDisplayed) {
        throw new Error(`Space name "${expectedName}" is not displayed`);
      }
    } catch (error) {
      throw new Error(
        `Failed to find space name "${expectedName}": ${error.message}`
      );
    }
  }
}

module.exports = SpacePage;
