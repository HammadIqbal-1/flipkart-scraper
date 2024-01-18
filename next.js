const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });
  const page = await browser.newPage();
  const url =
    "https://www.flipkart.com/search?q=iphone%2013%20pro%20max&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off";
  await page.goto(url);

  await page.screenshot({
    path: "first.png",
    fullPage: true,
  });

  // _2MImiq(1-3)
  await page.waitForSelector("._2MImiq");
  const getingTotalPage = await page.$eval(
    "._2MImiq>span",
    (sp) => sp.textContent
  );

  let lastValue = getingTotalPage.split("of").pop().trim();
  console.log(lastValue);

  for (let i = 1; i < lastValue; i++) {
    let example = await page.$$("._1LKTO3");
    await page.waitForTimeout(2000);
    if (example.length > 1) {
      await example[1].click();
    } else {
      await example[0].click();
    }
    await page.waitForTimeout(2000);
  }

  await browser.close();
})();
