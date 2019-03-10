export class Company {
    constructor(data) {
        if (data) {
            this.url = data.url || null;
            this.title = data.title || null;
            this.industry = data.industry || null;
        } else {
            this.url = null;
            this.title = null;
            this.industry = null;
        }
    }

    init() {
        this.companyParagraph = document.createElement('p');
        this.companyParagraph.innerHTML = 'Company: ';
        this.conpanyUrl = document.createElement('a');
        this.industryParagraph = document.createElement('p');
    }

    addUrl() {
        this.conpanyUrl.setAttribute('href', this.url);
        this.conpanyUrl.setAttribute('target', '_blank');
        this.conpanyUrl.innerHTML = this.title;
    }

    addIndustry() {
        this.industryParagraph.innerHTML = `Industry: ${this.industry}`;
    }

    static getContainer(id) {
        const elementId = `order_${id}`;
        const tr = document.getElementById(elementId);
        return tr.getElementsByClassName('user-details')[0];
    }

    render(id) {
        this.companyParagraph.appendChild(this.conpanyUrl);
        this.url && Company.getContainer(id).appendChild(this.companyParagraph);
        this.industry && Company.getContainer(id).appendChild(this.industryParagraph);
    }
}
