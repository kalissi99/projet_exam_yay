import './style.css';
import { NewAppro } from './pages/NewAppro';
import { ListeAppro } from './pages/ListeAppro';

function router() {
  const app = document.getElementById('app');
  if (!app) return;
  switch (window.location.hash) {
    case '#/nouveau':
      NewAppro.render(app);
      break;
    case '#/liste':
      ListeAppro.render(app);
      break;
    default:
      app.innerHTML = '<h2>Bienvenue !</h2>';
  }
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
