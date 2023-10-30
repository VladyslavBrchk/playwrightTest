const { Page } = require('./page');

const myPageAddMenu = 'form>#block-select'
const myPageAddMenuOption = 'form>#block-select option'
const myPageListItems = '#list-top>div>h3'
const myPageListItemsX = '#list-top>div>div>.icon-close'


class MyPage extends Page {
    constructor(page) {
        super(page);
        this.page = page;
    }

    async clickAddMenu() {
        await super.clickElement(myPageAddMenu);
    }

    async addMenuLength(){
        const elements = await super.getElements(myPageAddMenuOption);
        return await elements.length;
    }

    async clickAddMenuOption(index) {
        await this.page.selectOption(myPageAddMenu, {index: index});
    }

    async addMenuOptionText(index) {
        const element = await super.getElementByIndex(myPageAddMenuOption, index)
        return await element.textContent();
    }

    async getPageListItem(index) {
        return await super.getElementByIndex(myPageListItems, index);
    }

    async pageListLength(){
        const elements = await super.getElements(myPageListItems);
        return await elements.length;
    }

    async pageListItemText(index) {
        const element = await super.getElementByIndex(myPageListItems, index)
        return await element.textContent();
    }

    async closeListItem(index) {
        await super.hoverElementByIndex(myPageListItems, index);
        await super.clickElementByIndex(myPageListItemsX, index);
    }
}

module.exports = { MyPage };