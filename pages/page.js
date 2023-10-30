const { el } = require('@faker-js/faker');

class Page {
    /**
    * @param {import('@playwright').Page} page
    */
    constructor(page) {
        this.page = page;
    }

    async openUrl(url) {
        await this.page.goto(url == undefined ? '/' : url);
        await this.page.waitForLoadState('load');
    }

    async getUrl() {
        return await this.page.url();
    }

    async getElement(element) {
        return await this.page.locator(element);
    }

    async getElements(element) {
        const elements = await this.page.locator(element).all();
        return elements;
    }

    async getElementByIndex(element, index) {
        const elements = await this.getElements(element);
        if (index >= 0 && index < elements.length) {
            return elements[index];
        } else {
            throw new Error("Index is out of bounds.");
        }
    }

    async clickElement(element) {
        await (await this.getElement(element)).click();
    }

    async clickElementByIndex(element, index) {
        await (await this.getElementByIndex(element, index)).click();
    }

    async hoverElement(element) {
        await (await this.getElement(element)).hover();
    }

    async hoverElementByIndex(element, index) {
        await (await this.getElementByIndex(element, index)).hover();
    }

    async inputData(element, data) {
        await (await this.getElement(element)).fill(data);
    }

    async getElementText(element) {     
        const elementHandle = await this.getElement(element)    
        return await elementHandle.textContent();
    }
}

module.exports = { Page }