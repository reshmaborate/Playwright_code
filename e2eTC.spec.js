const { test, expect } = require('@playwright/test');
const { execPath } = require('node:process');


test("ENd to End Test Case", async ({ page }) => {
    const productToOrder = "ADIDAS ORIGINAL"
    const username = page.locator('[id="userEmail"]')
    const pswd = page.locator('#userPassword')
    const signIn = page.locator('#login')
    const productList = page.locator('.card-body');
    const cart = page.locator('[routerlink*="cart"]');
    const orderPage =page.locator('button[routerlink*="myorders"]');
    const email = 'TestData@outlook.com'

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    await username.fill(email);
    await pswd.fill('Reshma@123')
    await signIn.click();

    const data = await page.locator('.card-body b').nth(0).waitFor();
    const count = await productList.count();
    console.log("Count ", count)

    for (let i = 0; i < count; ++i) {
        console.log("Product Name:- ", await productList.nth(i).locator("b").textContent())

        if (await productList.nth(i).locator("b").textContent() === productToOrder) {
            console.log("Matched Product Names", await productList.nth(i).locator("b").textContent())

            await productList.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await cart.click();
    await page.locator('div li').first().waitFor();
    //Validate cart item
    const cartItemPresent = await page.locator('h3:has-text("ADIDAS ORIGINAL")').isVisible();
    console.log("cartItemPresent", cartItemPresent)
    //Checkout Cart item
    await page.locator(".subtotal button").click();
    await page.locator("[placeholder='Select Country']").pressSequentially('Indi', { delay: 150 });
    const options = page.locator(".ta-results");
    await options.first().waitFor();
    const optionsCount = await options.locator('button').count();
    for (let i = 0; i < optionsCount; ++i) {
        const matchedText = await options.locator('button').nth(i).textContent();
        console.log(matchedText);

        if (matchedText.trim() === "India") {
            await options.locator('button').nth(i).click();
            break;
        }
    }

    await expect(page.locator('.user__name [type="text"]').first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log("OrderID which is pPlaced Recently:-", orderId)
    //Search OrderId and view Details

    const tableOrder = page.locator(".table-bordered tbody tr");
    await orderPage.click();
    await tableOrder.first().waitFor();
    const allOrders = await tableOrder.locator('th').allTextContents();
    console.log('allOrders', allOrders);

    const orderIdCount = await tableOrder.locator('th').count();

    for (let i = 0; i < orderIdCount; ++i)
    {
        const matchedOrderIdList = await tableOrder.nth(i).locator('th').textContent();
        console.log("matchedOrderIdList", matchedOrderIdList) 

        if (orderId.includes(matchedOrderIdList)) 
        {
            const viewOrder = tableOrder.locator('button:has-text("View")')
            await viewOrder.nth(i).click();
            break;
        }
    }

     const MatchedFinalIDToBeView = await page.locator('div.col-text').textContent();
     expect(orderId.includes(MatchedFinalIDToBeView)).toBeTruthy();
});
