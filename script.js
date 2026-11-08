const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  });
});

const filterButtons = document.querySelectorAll('.filter-btn');
const propertyCards = document.querySelectorAll('.property-card');
const searchInput = document.querySelector('#property-search');
let activeFilter = 'all';

function updateListings() {
  const term = searchInput.value.trim().toLowerCase();
  propertyCards.forEach(card => {
    const matchesFilter = activeFilter === 'all' || card.dataset.status === activeFilter;
    const matchesSearch = card.dataset.search.includes(term);
    card.hidden = !(matchesFilter && matchesSearch);
  });
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    activeFilter = button.dataset.filter;
    updateListings();
  });
});
searchInput.addEventListener('input', updateListings);

document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#inquiry-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const name = data.get('firstName').trim();
  document.querySelector('.form-feedback').textContent =
    `Thank you, ${name}. This demo form is ready to be connected to the agent's inbox or CRM.`;
  form.reset();
});
