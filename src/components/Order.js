export class Order {
    constructor(id) {
        this.id = id;
    }

    init() {
        this.transactionId = document.createElement('td');
        this.orderDate = document.createElement('td');
        this.orderAmount = document.createElement('td');
        this.orderAmount.className = 'amount';
        this.cardNumber = document.createElement('td');
        this.cardType = document.createElement('td');
        this.location = document.createElement('td');
    }

    addTransactionId(transaction_id) {
        this.transactionId.innerHTML = transaction_id;
    }

    addOrderDate(created_at) {
        this.orderDate.innerHTML = new Date(created_at * 1000).toLocaleString();
    }

    addOrderAmount(total) {
        this.orderAmount.innerHTML = `${total}`;
        this.orderAmount.className = 'currency';
    }

    addCardNumber(card_number) {
        const cardNumberLength = card_number.length;
        const AMOUNT_OF_SHOWN_CHARS_BEGIN = 2;
        const AMOUNT_OF_SHOWN_CHARS_END = 4;
        this.cardNumber.innerHTML = `${card_number.substr(0, AMOUNT_OF_SHOWN_CHARS_BEGIN)}
      ${'*'.repeat(card_number.substr(AMOUNT_OF_SHOWN_CHARS_BEGIN, cardNumberLength - AMOUNT_OF_SHOWN_CHARS_END).length)}
      ${card_number.substr(cardNumberLength - AMOUNT_OF_SHOWN_CHARS_END)}`;
    }

    addCardType(card_type) {
        this.cardType.innerHTML = card_type;
    }

    addLocation(order_country, order_ip) {
        this.location.innerHTML = `${order_country} (${order_ip})`;
    }

    static addStatistic(data, users) {
        const ordersCount = document.createElement('tr');
        const ordersTotal = document.createElement('tr');
        const medianValue = document.createElement('tr');
        const averageCheck = document.createElement('tr');
        const averageCheckF = document.createElement('tr');
        const averageCheckM = document.createElement('tr');
        const total = data.reduce((sum, order) => sum + Number.parseFloat(order.total),0);
        const sorted = data.sort((a,b) => a.total - b.total);
        let fCounter = 0;
        const totalFemale = data.reduce((sum, order) => {
            const females = users.filter(user =>  user.gender === 'Female' && user.id === order.user_id);
            if (females.length){
                fCounter++;
                return sum + Number.parseFloat(order.total);
            }
            return sum;
        },0);
        ordersCount.innerHTML = `<td colspan="3">Orders Count</td><td colspan="3">${data.length}</td>`;
        ordersTotal.innerHTML = `<td colspan="3">Orders Total</td><td colspan="3" class="currency">${total}</td>`;
        medianValue.innerHTML = `<td colspan="3">Median Value</td><td colspan="3" class="currency">${sorted.length % 2 === 0 ?
            (Number.parseFloat(sorted[sorted.length / 2].total) +
            Number.parseFloat(sorted[sorted.length / 2 - 1].total)) / 2 : sorted[sorted.length / 2].total}</td>`;
        averageCheck.innerHTML = `<td colspan="3">Average Check</td><td colspan="3" class="currency">${total/data.length}</td>`;
        averageCheckF.innerHTML = `<td colspan="3">Average Check (Female)</td><td colspan="3" class="currency">${totalFemale/fCounter}</td>`;
        averageCheckM.innerHTML = `<td colspan="3">Average Check (Male)</td><td colspan="3" class="currency">${(total - totalFemale)/(data.length - fCounter)}</td>`;
        const statistic = document.createElement('table');
        statistic.classList.add('table', 'table-dark');
        statistic.appendChild(ordersCount);
        statistic.appendChild(ordersTotal);
        statistic.appendChild(medianValue);
        statistic.appendChild(averageCheck);
        statistic.appendChild(averageCheckF);
        statistic.appendChild(averageCheckM);
        document.getElementById('app').appendChild(statistic);
    }

    static get container() {
        return document.getElementsByTagName('tbody')[0];
    }

    render(userData) {
        const tr = document.createElement('tr');
        tr.setAttribute('id', `order_${this.id}`);
        tr.appendChild(this.transactionId);
        tr.appendChild(userData);
        tr.appendChild(this.orderDate);
        tr.appendChild(this.orderAmount);
        tr.appendChild(this.cardNumber);
        tr.appendChild(this.cardType);
        tr.appendChild(this.location);

        Order.container.appendChild(tr);
    }
}
