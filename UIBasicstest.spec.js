const {test, expect}= require ('@playwright/test');

test("First Playwright Test", async function({page})
{
//Playwright Code
    await page.goto("https://gemini.google.com")
});

// {browser} have to use in {} to show as fixture in playwright if not used it is simple data passed to fucntion 
test("Second Playwright Test", async({page})=>
{
    await page.goto("https://google.com")

});

test("Third Playwright Test", async({browser})=>
{
    const context= await browser.newContext(); //Open new fresh instance of browser(Wihout existing cookies and plugins)
    const page = await context.newPage();
    const username = page.locator('[id="username"]')
    const pswd = page.locator('[type="password"]')
    const signIn= page.locator('#signInBtn')
    const cardTtile= page.locator(".card-body h4")
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy")
    // type, fill
    await username.fill('rahushetty')
    await pswd.fill('learning')
    await signIn.click();
    const errorMsg=await page.locator("[style*='block']").textContent()
    console.log('errorMsg:- ',errorMsg);
    await expect(errorMsg).toContain("Incorrect username/password.")
    username.fill("");
    username.fill("rahulshettyacademy");
    await signIn.click();
    // console.log(await cardTtile.nth(0).textContent())
    // console.log(await cardTtile.first().textContent())
    // console.log(await cardTtile.last().textContent())
    const allTitle = await cardTtile.allTextContents()
    console.log(allTitle)
    // https://rahulshettyacademy.com/client/#/auth/login
// TestData@outlook.com
// Reshma@123
});

test("Fourth Playwright Test", async({browser})=>
{
    const context= await browser.newContext(); //Open new fresh instance of browser(Wihout existing cookies and plugins)
    const page = await context.newPage();
    const username = page.locator('[id="userEmail"]')
    const pswd = page.locator('#userPassword')
    const signIn= page.locator('#login')
    const cardTtile= page.locator(".card-body h5")
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    console.log(await page.title());
    await expect(page).toHaveTitle("Let's Shop")
    // type, fill
    await username.fill('TestData@outlook.com')
    await pswd.fill('Reshma@123')
    await signIn.click();
    // await page.waitForLoadState('networkidle')
    await cardTtile.first().waitFor();
    const allTitle = await cardTtile.allTextContents()
    console.log(allTitle)
});