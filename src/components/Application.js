import { Order } from './Order';
import { User } from './User';
import { Company } from './Company';
import '../styles/common.scss';

export class Application {

    constructor(orders, users, companies) {
        this.orders = orders;
        this.users = users;
        this.companies = companies;
    }

    static async getData(url) {
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (err) {
            console.log(err);
        }
    }

    init(orders=this.orders) {
        orders.forEach((data) => {
            const currentUserData = this.users.filter(user => user.id === data.user_id)[0];
            const currentCompanyData = this.companies.filter(company => company.id === currentUserData.company_id)[0];
            const user = new User(currentUserData);
            const order = new Order(data.id);
            const company = new Company(currentCompanyData);

            user.init();
            user.addUsername();
            user.addDetails();

            company.init();
            company.addUrl();
            company.addIndustry();


            order.init();
            order.addTransactionId(data.transaction_id);
            order.addOrderDate(data.created_at);
            order.addOrderAmount(data.total);
            order.addCardNumber(data.card_number);
            order.addCardType(data.card_type);
            order.addLocation(data.order_country, data.order_ip);
            order.render(user.getDataToRender());
            company.render(data.id);
        });
        document.querySelector('table').addEventListener('click', this.sort.bind(this));
        document.getElementById('search').addEventListener('keyup', this.search.bind(this));
        Order.addStatistic(this.orders, this.users);
    }

    search() {
        document.getElementById('empty-result').className = 'hidden';
        let td, i, txtValue, cells;
        const input = document.getElementById("search");
        const filter = input.value.toUpperCase();
        const tbody = document.getElementsByTagName("tbody")[0];
        const tr = Array.from(tbody.rows);
        for (i = 0; i < tr.length; i++) {
            cells = Array.from(tr[i].cells);
            for (let j = 0, jLen = cells.length; j < jLen; j++) {
                td = cells[j];
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                        break;
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        }
        if(tr.filter(item => window.getComputedStyle(item).display === 'none').length >= tr.length){
            document.getElementById('empty-result').classList.remove('hidden');
        }
    }

    sort(e) {
        if (e.target.nodeName !== 'TH') return;
        const index = e.target.cellIndex;
        const table = document.querySelector('table');
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.rows);
        const type = e.target.getAttribute('datatype');
        const selected = document.getElementsByClassName('selected')[0];
        if (selected) {
            selected.parentNode.removeChild(selected);
        }
        const highlighter = document.createElement('span');
        highlighter.className = 'selected';
        highlighter.innerHTML = '&#8595;';
        e.target.appendChild(highlighter);
        rows.sort((a, b) => {
            let dataRowA = a.cells[index].innerHTML;
            let dataRowB = b.cells[index].innerHTML;
            switch (type) {
                case 'null':
                    break;
                case 'number':
                    return dataRowA - dataRowB;
                case 'date':
                    const dateA = dataRowA.split('.').reverse().join('-');
                    const dateB = dataRowB.split('.').reverse().join('-');
                    return new Date(dateA).getTime() - new Date(dateB).getTime();
                case 'link':
                    dataRowA = a.cells[index].querySelector('a').innerHTML;
                    dataRowB = b.cells[index].querySelector('a').innerHTML;
                case 'string':
                    if(dataRowA < dataRowB) return -1;
                    if (dataRowA > dataRowB) return 1;
                    return 0;
                default:
                    break;
            }

        });
        table.removeChild(tbody);
        rows.forEach(row => tbody.appendChild(row));
        table.appendChild(tbody);
    }

    destroy() {
        document.getElementsByTagName('tbody')[0].innerHTML = '';
    }
}
