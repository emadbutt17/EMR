const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get('file:///C:/Purdue/EPICS/EMR/src/pages/patient_prescriptions.html?id=fakeid');