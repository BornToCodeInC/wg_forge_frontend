// this is an example of improting data from JSON
// import orders from '../data/orders.json';

export default (async function () {
  // YOUR CODE GOES HERE

  const getData = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
      return json;
    } catch (err) {
      console.log(err);
    }
  };
  const orders = await getData('/api/orders.json');
  const users = await getData('/api/users.json');
  const companies = await getData('/api/companies.json');

  const tbody = document.getElementsByTagName('tbody')[0];

  function handleClick(e) {
    e.preventDefault();
    console.log(e.target);
  }

  orders.forEach((order) => {
    const tr = document.createElement('tr');
    tr.setAttribute('id', `order_${order.id}`);
    const transactionId = document.createElement('td');
    const userData = document.createElement('td');
    const orderDate = document.createElement('td');
    const orderAmount = document.createElement('td');
    const cardNumber = document.createElement('td');
    const cardType = document.createElement('td');
    const location = document.createElement('td');
    const userDetails = document.createElement('div');
    const cardNumberLength = order.card_number.length;
    const AMOUNT_OF_SHOWN_CHARS_BEGIN = 2;
    const AMOUNT_OF_SHOWN_CHARS_END = 4;
    const currentUser = users.filter(user => user.id === order.user_id)[0];
    const currentCompany = companies.filter(company => company.id === currentUser.company_id)[0];


    transactionId.innerHTML = order.transaction_id;
    userDetails.innerHTML =
      `${currentUser.birthday ?
        `<p>Birthday: ${new Date(currentUser.birthday * 1000).toLocaleDateString()}</p>` : ''}
      <p><img src=${currentUser.avatar} width="100px"></p>
      ${currentCompany ?
    `<p>Company: <a href=${currentCompany.url} target="_blank">${currentCompany.title}</a></p>
          <p>Industry: ${currentCompany.industry}</p>` : ''}`;
    userData.className = 'user_data';
    userData.innerHTML = `<a href="#" id="user">${order.user_id} ${currentUser.gender === 'Male' ? 'Mr' : 'Ms'} ${currentUser.first_name} ${currentUser.last_name}</a>`;
    userData.appendChild(userDetails);
    orderDate.innerHTML = new Date(order.created_at * 1000).toLocaleString();
    orderAmount.innerHTML = `$${order.total}`;
    cardNumber.innerHTML = `${order.card_number.substr(0, AMOUNT_OF_SHOWN_CHARS_BEGIN)}
      ${'*'.repeat(order.card_number.substr(AMOUNT_OF_SHOWN_CHARS_BEGIN, cardNumberLength - AMOUNT_OF_SHOWN_CHARS_END).length)}
      ${order.card_number.substr(cardNumberLength - AMOUNT_OF_SHOWN_CHARS_END)}`;
    cardType.innerHTML = order.card_type;
    location.innerHTML = `${order.order_country} (${order.order_ip})`;


    tr.appendChild(transactionId);
    tr.appendChild(userData);
    tr.appendChild(orderDate);
    tr.appendChild(orderAmount);
    tr.appendChild(cardNumber);
    tr.appendChild(cardType);
    tr.appendChild(location);

    tbody.appendChild(tr);
    document.getElementById('user').addEventListener('click', handleClick);
  });

  // next line is for example only
  // document.getElementById('app').innerHTML = await getOrders('../data/orders.json');
}());
