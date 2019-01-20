const {Builder, By, until,Capabilities} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require("fs")

const webdriverPath = __dirname+"/drivers/chromedriver.exe";

const myGItlabDomain = "";
const userId = "";
const password = "";

const capabilities  = Capabilities.chrome()
capabilities.set('chromeOptions', {
    args: [
        // '--headless',
    ]
});

(async function (){
    try {
        const driver = await new Builder()
            .withCapabilities(capabilities)
            // .setChromeOptions
            .setChromeService(new chrome.ServiceBuilder(webdriverPath))
            .build();
    
        await driver.get(myGItlabDomain);
        await driver.findElement(By.id('user_login')).sendKeys(userId);
        await driver.findElement(By.id('user_password')).sendKeys(password);
        await driver.findElement(By.xpath('//*[@id="new_user"]/div[5]/input')).click();

        const elementId = By.id('sort-projects-dropdown');
        await driver.wait(until.elementLocated(elementId), 10000);
        const listB = await driver.findElement(elementId);

        console.log(await listB.getText());


        const t = await driver.takeScreenshot()
        await fs.writeFileSync("./sample.png", t, "base64")
        await driver.quit();
    } catch (error) {
        console.log("catch error" + error);
    }
})()

