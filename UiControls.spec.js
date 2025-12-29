const {test, expect}= require ('@playwright/test');

test("UI Controls", async({page})=>{
    // const context= await browser.newContext(); //Open new fresh instance of browser(Wihout existing cookies and plugins)
    // const page = await context.newPage();
    const username = page.locator('[id="username"]')
    const pswd = page.locator('[type="password"]')
    const signIn= page.locator('#signInBtn')
    const dropdown =page.locator("select.form-control")
    const radiobtn =page.locator(".radiotextsty")
    const checkBox= page.locator("#terms")
    const docLink = page.locator('.blinkingText')
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await username.fill('rahulshettyacademy')
    await pswd.fill('learning')
    // dropdown 
    await dropdown.selectOption('Teacher');
    // radioBtn 
    await radiobtn.last().click();
    await (page.locator('#okayBtn')).click();
    console.log(await radiobtn.last().isChecked());
    await expect(radiobtn.last()).toBeChecked();

    // checkbox  await used when actual action is performed.
    await checkBox.click();
    await expect(checkBox.last()).toBeChecked();
    await checkBox.uncheck();
    expect(await checkBox.isChecked()).toBeFalsy();
    await expect(docLink).toHaveAttribute('class','blinkingText')

});

//Handling Child Window
 test('Handling Child Window',async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const docLink = page.locator('[href*="documents-request"]');

    const [newPage2]=await Promise.all(
    [
        context.waitForEvent('page'),   //Listen for any new page.
        docLink.click(),//new page opened
    ]
) 
    const text = await newPage2.locator('.red').textContent();
    const arrayTxt = text.split("@")
    const finalTxt = arrayTxt[1].split(" ")[0]
    await page.locator("#username").fill(finalTxt);
    console.log(await page.locator("#username").inputValue());

 });

