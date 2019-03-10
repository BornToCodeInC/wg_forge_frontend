import { Application } from './components/Application';

export default (async function () {
  const orders = await Application.getData('/api/orders.json');
  const users = await Application.getData('/api/users.json');
  const companies = await Application.getData('/api/companies.json');
  const app = new Application(orders, users, companies);

  app.init();
}());
