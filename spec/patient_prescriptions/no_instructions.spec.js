const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

const alertIsPresent = async () => {
    alertFound = false;
    await driver.wait(until.alertIsPresent(), 5000)
    .then((res) => {
        alertFound = true;
    })
    .catch((err) => {
        console.log(err);
    });
    return alertFound;
}

driver.get('file:///C:/Purdue/EPICS/EMR/src/pages/patient_prescriptions.html?id=fakeid');

const drugInput = driver.findElement(By.id('drugPrescription'));
const doseInput = driver.findElement(By.id('dosePrescription'));
const instructionsInput = driver.findElement(By.id('instructionsPrescription'));
const durationInput = driver.findElement(By.id('durationPrescription'));
const submitButton = driver.findElement(By.id('submit-button'));

driver.sleep(2000)
.then(() => {
    durationInput.sendKeys('7d').then((res) => {
        doseInput.sendKeys('30mg').then((res) => {
            drugInput.sendKeys('Amoxicillin').then((res) => {
                submitButton.click()
                .then((res) => {
                    if (alertIsPresent()) {
                        console.log('test passed');
                    } else {
                        console.log('test failed1');
                    }
                    driver.quit();
                })
                .catch((err) => {
                    driver.quit();
                });
            })
            .catch((err) => {
                console.log('test failed3');
                return err;
            });
        })
        .catch((err) => { 
            console.log(err);
            return err;
        });
    })
    .catch((err) => {
        console.log(err);
        return err;
    });
})
.catch((err) => {
    console.log('test failed2');
    return err;
});