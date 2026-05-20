describe('Basic user flow for Website', () => {
  beforeAll(async () => {
    await page.goto('https://cse110-sp25.github.io/CSE110-Shop/');
  });

  it('Initial Home Page - Check for 20 product items', async () => {
    console.log('Checking for 20 product items...');
    const numProducts = await page.$$eval('product-item', (prodItems) => {
      return prodItems.length;
    });
    expect(numProducts).toBe(20);
  });

  it('Make sure <product-item> elements are populated', async () => {
    console.log('Checking to make sure <product-item> elements are populated...');
    let allArePopulated = true;
    const prodItemsData = await page.$$eval('product-item', prodItems => {
      return prodItems.map(item => {
        return data = item.data;
      });
    });
    for (let i = 0; i < prodItemsData.length; i++) {
      console.log(`Checking product item ${i + 1}/${prodItemsData.length}`);
      const item = prodItemsData[i];
      if (item.title.length == 0) { allArePopulated = false; }
      if (item.price.length == 0) { allArePopulated = false; }
      if (item.image.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 10000);

  it('Clicking the "Add to Cart" button should change button text', async () => {
    console.log('Checking the "Add to Cart" button...');
    const firstItem = await page.$('product-item');
    const shadowRoot = await firstItem.getProperty('shadowRoot');
    const button = await shadowRoot.$('button');
    await button.click();
    const innerText = await button.getProperty('innerText');
    const text = await innerText.jsonValue();
    expect(text).toBe('Remove from Cart');
  }, 2500);

  it('Checking number of items in cart on screen', async () => {
    console.log('Checking number of items in cart on screen...');

    // Click all remaining buttons (skip first, already clicked)
    await page.evaluate(() => {
      const items = document.querySelectorAll('product-item');
      for (let i = 1; i < items.length; i++) {
        items[i].shadowRoot.querySelector('button').click();
      }
    });

    const cartCount = await page.$eval('#cart-count', el => el.innerText);
    expect(cartCount).toBe('20');
  }, 10000);

  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');
    await page.reload();

    const allRemove = await page.evaluate(() => {
      const items = document.querySelectorAll('product-item');
      for (let item of items) {
        const btn = item.shadowRoot.querySelector('button');
        if (btn.innerText !== 'Remove from Cart') return false;
      }
      return true;
    });
    expect(allRemove).toBe(true);

    const cartCount = await page.$eval('#cart-count', el => el.innerText);
    expect(cartCount).toBe('20');
  }, 10000);

  it('Checking the localStorage to make sure cart is correct', async () => {
    const cart = await page.evaluate(() => localStorage.getItem('cart'));
    expect(cart).toBe('[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]');
  });

  it('Checking number of items in cart on screen after removing from cart', async () => {
    console.log('Checking number of items in cart on screen...');

    await page.evaluate(() => {
      const items = document.querySelectorAll('product-item');
      for (let item of items) {
        item.shadowRoot.querySelector('button').click();
      }
    });

    const cartCount = await page.$eval('#cart-count', el => el.innerText);
    expect(cartCount).toBe('0');
  }, 10000);

  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');
    await page.reload();

    const allAdd = await page.evaluate(() => {
      const items = document.querySelectorAll('product-item');
      for (let item of items) {
        const btn = item.shadowRoot.querySelector('button');
        if (btn.innerText !== 'Add to Cart') return false;
      }
      return true;
    });
    expect(allAdd).toBe(true);

    const cartCount = await page.$eval('#cart-count', el => el.innerText);
    expect(cartCount).toBe('0');
  }, 10000);

  it('Checking the localStorage to make sure cart is correct', async () => {
    console.log('Checking the localStorage...');
    const cart = await page.evaluate(() => localStorage.getItem('cart'));
    expect(cart).toBe('[]');
  });
});