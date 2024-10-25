class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async tap(selector) {
    const element = await this.driver.$(selector);
    await element.click();
  }

  async proceedToNextStep() {
    await this.tap("accessibility id:Next");
  }

  async typeOnKeyboardAndSend(text) {
    for (let char of text) {
      await this.tap(`accessibility id:${char}`);
    }
    await this.tap("accessibility id:Return");
  }

  async performSwipe(startX, startY, endX, endY) {
    await this.driver
      .action("pointer")
      .move({ duration: 0, x: startX, y: startY })
      .down({ button: 0 })
      .move({ duration: 1000, x: endX, y: endY })
      .up({ button: 0 })
      .perform();
  }
}

module.exports = BasePage;
