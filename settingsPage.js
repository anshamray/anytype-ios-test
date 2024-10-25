const BasePage = require("./basePage");

class SettingsPage extends BasePage {
  constructor(driver) {
    super(driver);
  }

  async navigateToVaultAndAccess() {
    await this.tap(
      '-ios class chain:**/XCUIElementTypeButton[`name == "Vault and access"`]'
    );
  }

  async deleteVault() {
    await this.tap("accessibility id:Delete vault");
    await this.tap("accessibility id:Delete");
  }

  async logoutAndClearData() {
    await this.tap("accessibility id:Logout and clear data");
  }

  async performFullLogout() {
    await this.navigateToVaultAndAccess();
    await this.deleteVault();
    await this.logoutAndClearData();
  }
}

module.exports = SettingsPage;
