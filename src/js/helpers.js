export function getObject() {
  let authorizedUser = JSON.parse(localStorage.getItem('authorized_user'));
  let users = JSON.parse(localStorage.getItem('users'));
  return users[authorizedUser];
}

export function setUserCart(cart) {
  let users = JSON.parse(localStorage.getItem('users'));
  Object.assign(users[JSON.parse(localStorage.getItem('authorized_user'))], cart);
  localStorage.setItem('users', JSON.stringify(users));
}

export function removeBookFromCart(bookID) {
  let authorizedUser = JSON.parse(localStorage.getItem('authorized_user'));
  let users = JSON.parse(localStorage.getItem('users'));

  delete users[authorizedUser]['cart'][bookID];

  localStorage.setItem('users', JSON.stringify(users));
}

export function clearCart() {
  let users = JSON.parse(localStorage.getItem('users'));
  let authorizedUser = JSON.parse(localStorage.getItem('authorized_user'));
  users[authorizedUser]['cart'] = {};
  localStorage.setItem('users', JSON.stringify(users));
}