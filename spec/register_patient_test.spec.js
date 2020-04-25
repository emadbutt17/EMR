const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get('file:///C:/Purdue/EPICS/EMR/src/pages/Registration.html');

const nameInput = driver.findElement(By.id('firstNameRegister'));
const surnameInput = driver.findElement(By.id('surnameRegister'));
const dobInput = driver.findElement(By.id('dobRegister'));
const sexInput = driver.findElement(By.id('sexRegister'));
const weightInput = driver.findElement(By.id('weightRegister'));
const heightInput = driver.findElement(By.id('heightRegister'));
const dateInput = driver.findElement(By.id('dateRegister'));
const communityInput = driver.findElement(By.id('communityRegister'));
const incomeInput = driver.findElement(By.id('incomeRegister'));
const previousInput = driver.findElement(By.id('previousClinicsRegister'));
const migrantInput = driver.findElement(By.id('migrantRegister'));
const spssInput = driver.findElement(By.id('spssRegister'));
const indigenousInput = driver.findElement(By.id('indigenousRegister'));
const disabledInput = driver.findElement(By.id('disabilityRegister'));
const registerButton = driver.findElement(By.id('registerButton'));

driver.sleep(3000).then(() => {
    nameInput.sendKeys('Charles');
    surnameInput.sendKeys('Barkley');
    dobInput.sendKeys('01031998');
    sexInput.sendKeys('Male');
    weightInput.sendKeys('83');
    heightInput.sendKeys('180');
    dateInput.sendKeys('06012020');
    communityInput.sendKeys('West Lafayette');
    incomeInput.sendKeys('95000');
    previousInput.sendKeys('None');
    migrantInput.click();
    spssInput.click();
    indigenousInput.click();
    disabledInput.click();
    driver.sleep(2000).then(() => {
        registerButton.click().then(() => {
            const name = driver.findElement(By.id('page-header'));
            name.getText().then((text) => {
                if (text === 'Charles Barkley') {
                    console.log('test passed');
                } else {
                    console.log('test failed');
                }
                driver.quit();
            });
        });
    });
});