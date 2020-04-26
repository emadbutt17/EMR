const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get('file:///C:/Purdue/EPICS/EMR/src/pages/patient_page.html');

const patientHistoryButton = driver.findElement(By.id('patient-history-button'));
driver.sleep(3000).then(() => {
    patientHistoryButton.click().then(() => {
        driver.getCurrentUrl().then((url) => {

        });
    })
})
const patientPrescriptionsButton = driver.findElement(By.id('patient-prescriptions-button'));
driver.sleep(3000).then(() => {
    patientPrescriptionsButton.click().then(() => {
        driver.getCurrentUrl().then((url) => {

        });
    })
})
const newCheckupButton = driver.findElement(By.id('new-checkup-button'));
driver.sleep(3000).then(() => {
    newCheckupButton.click().then(() => {
        driver.getCurrentUrl().then((url) => {

        });
    })
})
const generalNotesButton = driver.findElement(By.id('generalNotes-button'));
const generalNotes = driver.findElement(By.id('generalNotes'));

driver.sleep(3000).then(() => {
    generalNotes.click().then(() => {
        generalNotes.sendKeys('Patient page notes test').then(() => {
                generalNotesButton.click().then(() => {
                    driver.sleep(1000).then(() => {
                     patientHistoryButton.click().then(() => {
                        driver.findElements(By.css('td > a')).then((cells) => {
                            cells[0].getText().then((generalNotes-table-body) => {
                                if (generalNotes-table-body != 'Patient page notes test') {
                                    console.log('test failed');
                                    driver.quit();
                                }
                                cells[1].getText().then((inventory) => {
                                    if (inventory != '180') {
                                        console.log('test failed');
                                        driver.quit();
                                    }
                                    console.log('test passed');
                                })
                            })
                        })
                    })
                })
            })
        })
    })
})