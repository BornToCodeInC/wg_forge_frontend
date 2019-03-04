// this is an example of improting data from JSON
// import orders from '../data/orders.json';

export default (async function () {
  // YOUR CODE GOES HERE

  const getOrders = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
    } catch (err) {
      console.log(err);
    }
  };
  await getOrders('/api/orders.json');
  // next line is for example only
  // document.getElementById('app').innerHTML = await getOrders('../data/orders.json');
}());
