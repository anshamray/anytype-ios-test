const VaultSetupPage = require("./vaultSetupPage.js");
const MySpacesPage = require("./mySpacesPage.js");
const SettingsPage = require("./settingsPage.js");
const SpacePage = require("./spacePage.js");
const { remote } = require("webdriverio");

async function runTest() {
  const wdOpts = {
    hostname: "localhost", // or the IP address where Appium is running
    port: 4723, // default Appium port
    path: "/", // Remove "/wd/hub"
    capabilities: {
      "appium:app":
        "//Users/shamray/Library/Developer/Xcode/DerivedData/Anytype-evciqepohadcddcqdidnlrlktwqf/Build/Products/Debug-iphonesimulator/Anytype.app",
      platformName: "iOS",
      "appium:platformVersion": "18.0",
      "appium:automationName": "XCUITest",
      "appium:deviceName": "iPhone 16",
      "appium:autoAcceptAlerts": true,
      "appium:language": "en", // Add this line to set the language to Portuguese
    },
  };

  const driver = await remote(wdOpts);

  // Replace getActiveAppInfo with capabilities
  const appInfo = driver.capabilities;
  console.log("App Info:", appInfo);

  // Remove the getSession call and use the sessionId directly
  console.log("Session started:", driver.sessionId);

  const vaultSetup = new VaultSetupPage(driver);
  await vaultSetup.createNewVault();
  await vaultSetup.getMyKey();
  await vaultSetup.showMyKey();
  await vaultSetup.copyKeyToClipboardAndValidate();
  await vaultSetup.proceedToNextStep();
  await vaultSetup.enterName("Friedolin");
  await vaultSetup.enterVaultWithRetry();
  await vaultSetup.performSwipe(196, 87, 195, 655);

  const mySpaces = new MySpacesPage(driver);
  await mySpaces.createNewItem();
  await mySpaces.typeItemTitle("Workspace");
  await mySpaces.createItem();
  await mySpaces.completeItemCreation();

  const aSpace = new SpacePage(driver);
  await aSpace.checkSpaceName("Workspace");
  await aSpace.navigateBack();

  await mySpaces.checkSpacesExist("My First Space", "Workspace");
  await mySpaces.navigateToSettings();

  const settings = new SettingsPage(driver);
  await settings.performFullLogout();

  await driver.deleteSession();
}

runTest().catch(console.error);
