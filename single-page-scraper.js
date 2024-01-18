const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./temp",
  });
  const page = await browser.newPage();
  const url = "https://www.flipkart.com/";

  await page.goto(url, {
    waitUntil: "networkidle0",
  });
  await page.screenshot({
    path: "home.png",
    fullPage: true,
  });

  // await page.click("._30XB9F");
  await page.waitForSelector("._2L0uxW");
  await page.click(".Pke_EE");
  await page.type(".Pke_EE", "iphone 14 pro");
  await page.click("._2iLD__");
  await page.waitForSelector("._1YokD2 ._3Mn1Gg");

  // Wait for all images to load
  await page.waitForSelector("._1YokD2 ");
  //




  const pageInfo = await page.$$eval("._2kHMtA", (f) => {
    return f.map((z) => {
      const imgTag = z.querySelector("._396cs4").src;
      const titleTag = z.querySelector("._4rR01T").innerText;
      const priceTag = z.querySelector("._30jeq3").innerText;

      return {
        imgTag,
        titleTag,
        priceTag,
      };
    });
  });

  console.log(pageInfo);

  await browser.close();
})();
