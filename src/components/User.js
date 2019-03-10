import '../styles/user.scss';

export class User {
    constructor(data) {
        this.id = data.id;
        this.gender = data.gender;
        this.firstName = data.first_name;
        this.lastName = data.last_name;
        this.birthday = data.birthday;
        this.avatar = data.avatar;
    }

    init() {
        this.userData = document.createElement('td');
        this.userData.className = 'user-data';
        this.userDetails = document.createElement('div');
        this.userDetails.className = 'user-details hidden';
        this.userDetails.id = `user-details_${this.id}`;
        this.userDetailsLink = document.createElement('a');
        this.userDetailsLink.setAttribute('href', '#');
    }

    handleClick(e) {
        e.preventDefault();
        this.userDetails.classList.toggle('hidden');
    }

    addUsername() {
        this.userDetailsLink.innerHTML = `${this.firstName} ${this.lastName}`;
        this.userDetailsLink.addEventListener('click', this.handleClick.bind(this));
        this.userDetailsLink.className = `${this.gender === 'Male' ? 'mr' : 'ms'}`;
    }

    addDetails() {
        const currentCompany = null;
        this.userDetails.innerHTML =
          `${this.birthday ? `<p>Birthday: ${new Date(this.birthday * 1000).toLocaleDateString()}</p>` : ''}
          <p><img src=${this.avatar} class="avatar"></p>
          ${currentCompany ? `<p>Company: <a href=${currentCompany.url} target="_blank">${currentCompany.title}</a></p>
          <p>Industry: ${currentCompany.industry}</p>` : ''}`;
    }

    getDataToRender() {
        this.userData.appendChild(this.userDetailsLink);
        this.userData.appendChild(this.userDetails);
        return this.userData;
    }
}
