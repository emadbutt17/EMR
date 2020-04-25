const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get('file:///C:/Purdue/EPICS/EMR/src/pages/patient_search_flex.html');

const input = driver.findElement(By.id('searchByNameText'));
const searchButton = driver.findElement(By.id('searchByNameButton'));
const table = driver.findElement(By.id('search-table-body'));


driver.sleep(3000).then(() => {
    input.sendKeys('Z');
    searchButton.click().then(() => {
        table.getCssValue('visibility').then((visible) => {
            const firstRow = driver.findElement(By.tagName('td'));
            firstRow.getText().then((text) => {
                if (text === 'ninguna paciente encontrada') {
                    console.log('test passed');
                } else {
                    console.log('test failed');
                }
                driver.quit();
            });
        });
    });
})
.catch((err) => {
    console.log(err);
    console.log('test failed');
    driver.quit();
});
