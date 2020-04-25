const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get('file:///C:/Purdue/EPICS/EMR/src/pages/Registration.html');

const registerButton = driver.findElement(By.id('registerButton'));
driver.sleep(3000).then(() => {
    registerButton.click().then(() => {
        driver.getCurrentUrl().then((url) => {

        });
    })
})