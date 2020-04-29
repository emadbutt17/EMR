const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get('file:///C:/Purdue/EPICS/EMR/src/pages/patient_prescriptions.html');

const drugPrescription = driver.findElement(By.id('drugPrescription'));
const dosePrescription = driver.findElement(By.id('dosePrescription'));
const durationPrescription = driver.findElement(By.id('durationPrescription'));
const instructionsPrescription = driver.findElement(By.id('instructionsPrescription'));
const submitButton = driver.findElement(By.id('submit-button'));


driver.sleep(3000).then(() => {
	drugPrescription.sendKeys('randomDrug');
	dosePrescription.sendKeys('300 ml');
	durationPrescription.sendKeys('100 days');
	instructionsPrescription.sendKeys('blah blah blah');
	driver.sleep(2000).then(() => {
		submitButton.click().then() => {
			const drug = driver.findElement(By.id('drugPrescription'));
			const dose = driver.findElement(By.id('dosePrescription'));
			const duration = driver.findElement(By.id('durationPrescription'));
			const instructions = driver.findElement(By.id('instructionsPrescription'));

			drug.getText().then((text) => {
				if (text === 'randomDrug')
					console.log('test passed');
				else
					console.log('test failed');
			});

			dose.getText().then((text) => {
				if (text === '300 ml')
					console.log('test passed');
				else
					console.log('test failed');
			});

			duration.getText().then((text) => {
				if (text === '100 days')
					console.log('test passed');
				else
					console.log('test failed');
			});

			insturctions.getText().then((text) => {
				if (text === 'blah blah blah')
					console.log('test passed')
				else
					console.log('test failed')
			
			});


			driver.quit();
		});
	});
});





