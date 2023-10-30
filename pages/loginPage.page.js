const { Page } = require('./page');

const loginField = '#username'
const passwordField = '#password'
const loginButton = '#login-submit'
const fleshError = '#flash_error'

class LoginPage extends Page {
    constructor(page) {
        super(page);
        this.page = page;
    }

    async inputLogin(data) {
        await super.inputData(loginField, data);
    }

    async inputPassword(data) {
        await super.inputData(passwordField, data);
    }

    async clickLogInButton() {
        await super.clickElement(loginButton);
    }

    async getFleshError() {
        return await super.getElement(fleshError)
    }

}

module.exports = { LoginPage };