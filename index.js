const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    userDataDir: "./temp",
  });

  try {
    const page = await browser.newPage();
    const searchUrl = "https://www.flipkart.com/";

    await page.goto(searchUrl, {
      waitUntil: "networkidle0",
    });

    // Dynamically locate search input and button
    await page.waitForSelector("input[type='text']");

    // add anything here to scrape replace my iphone 15 with desired result
    await page.type("input[type='text']", "iphone 15");
    await page.waitForSelector("button[type='submit']");
    await page.click("button[type='submit']");

    // Wait for search results to load
    await page.waitForSelector("._1YokD2 ._3Mn1Gg", { visible: true });

    // Get the total number of pages
    const totalPages = await page.$eval("._2MImiq > span", (sp) =>
      parseInt(sp.textContent.split("of").pop().trim(), 10)
    );
    // console.log(totalPages);

    let data = [];

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
      await page.waitForSelector("._2kHMtA", { visible: true });

      const pageInfo = await page.$$eval("._2kHMtA", (elements) => {
        return elements.map((element) => {
          const imgTag = element.querySelector("._396cs4").src;
          const titleTag = element.querySelector("._4rR01T").innerText;
          const priceTag = element.querySelector("._30jeq3").innerText;

          return {
            imgTag,
            titleTag,
            priceTag,
          };
        });
      });

      data.push(...pageInfo);

      if (currentPage < totalPages) {
        await page.click("._1LKTO3:last-child");
        await page.waitForTimeout(2000);
      }
    }

    const filename = "iphone-14-pro.json";
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
    console.log("we fuck*ng did it.");
  } catch (error) {
    console.error("fuck this is not for me :", error);
  } finally {
    await browser.close();
  }
})();
