const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get('file:///C:/Purdue/EPICS/EMR/src/pages/pharmacy.html');

const new_prescription_button = driver.findElement(By.id('new-prescription'));
const modal = driver.findElement(By.id('new-prescription-modal'));
const prescription_name_input = driver.findElement(By.id('new-prescription-name'));
const inventory_input = driver.findElement(By.id('inventory-number2'));
const new_prescription_save_button = driver.findElement(By.id('new-prescription-save-button'));

driver.sleep(3000).then(() => {
    new_prescription_button.click().then(() => {
        prescription_name_input.sendKeys('Amoxicillin').then(() => {
            inventory_input.sendKeys('180').then(() => {
                new_prescription_save_button.click().then(() => {
                    driver.sleep(1000).then(() => {
                        driver.findElements(By.css('td > a')).then((cells) => {
                            cells[0].getText().then((drugName) => {
                                if (drugName != 'Amoxicillin') {
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
.catch((err) => {
    console.log(err);
    console.log('test failed');
    driver.quit();
});