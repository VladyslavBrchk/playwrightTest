const { Page } = require('./page');

const newIssueButton = '.new-issue'
const subjectField = '#issue_subject'
const descriptionField = '#issue_description'
const createButton = "input[name='commit']"
const infoMessage = '#flash_notice'

class IssuesPage extends Page {
    constructor(page) {
        super(page);
        this.page = page;
    }

    async clickNewIssueButton() {
        await super.clickElement(newIssueButton);
    }

    async inputSubject(data) {
        await super.inputData(subjectField, data);
    }

    async inputDescription(data) {
        await super.inputData(descriptionField, data);
    }

    async clickCreateButton() {
        await super.clickElement(createButton);
    }

    async getInfoMessageText(){
        return await super.getElementText(infoMessage);
    }
}

module.exports = { IssuesPage };