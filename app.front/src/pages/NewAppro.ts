import { FournisseurService } from '../services/FournisseurService';
import { ArticleService } from '../services/ArticleService';

const fournisseurService = new FournisseurService();
const articleService = new ArticleService();

export const NewAppro = {
  async render(container: HTMLElement) {
    const fournisseurs = await fournisseurService.getFournisseurs();
    const articles = await articleService.getArticles();
    let articlesList: any[] = [];

    container.innerHTML = `
      <h2>Nouveau approvisionnement</h2>
      <form id='new-appro-form' class='mb-3'>
        <div class='mb-3'>
          <label for='ref' class='form-label'>Référence</label>
          <input type='text' class='form-control' id='ref' required />
        </div>
        <div class='mb-3'>
          <label for='date' class='form-label'>Date</label>
          <input type='date' class='form-control' id='date' required />
        </div>
        <div class='mb-3'>
          <label for='statut' class='form-label'>Statut</label>
          <select class='form-select' id='statut'>
            <option value='en attente'>En attente</option>
            <option value='validé'>Validé</option>
          </select>
        </div>
        <div class='mb-3'>
          <label for='fournisseur' class='form-label'>Fournisseur</label>
          <select class='form-select' id='fournisseur' required>
            <option value=''>Choisir...</option>
            ${fournisseurs.map((f: any) => `<option value='${f.id}'>${f.nom}</option>`).join('')}
          </select>
        </div>
        <hr />
        <h5>Articles</h5>
        <div class='row mb-3'>
          <div class='col'>
            <select class='form-select' id='article-select'>
              <option value=''>Choisir un article</option>
              ${articles.map((a: any) => `<option value='${a.id}'>${a.nom}</option>`).join('')}
            </select>
          </div>
          <div class='col'>
            <input type='number' class='form-control' id='article-qty' placeholder='Quantité' min='1' />
          </div>
          <div class='col'>
            <input type='number' class='form-control' id='article-price' placeholder='Prix' min='0' step='0.01' />
          </div>
          <div class='col'>
            <button type='button' class='btn btn-primary' id='add-article'>Ajouter</button>
          </div>
        </div>
        <ul id='articles-list' class='list-group mb-3'></ul>
        <button type='submit' class='btn btn-success'>Enregistrer</button>
      </form>
    `;

    const articlesListEl = document.getElementById('articles-list');
    document.getElementById('add-article')?.addEventListener('click', () => {
      const articleId = (document.getElementById('article-select') as HTMLSelectElement).value;
      const qty = (document.getElementById('article-qty') as HTMLInputElement).value;
      const price = (document.getElementById('article-price') as HTMLInputElement).value;
      if (articleId && qty && price) {
        const article = articles.find((a: any) => a.id == articleId);
        articlesList.push({ articleId, nom: article.nom, quantite: qty, prix: price });
        renderArticlesList();
      }
    });

    function renderArticlesList() {
      if (!articlesListEl) return;
      articlesListEl.innerHTML = articlesList.map(a => `<li class='list-group-item'>${a.nom} - ${a.quantite} x ${a.prix}€</li>`).join('');
    }

    document.getElementById('new-appro-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        reference: (document.getElementById('ref') as HTMLInputElement).value,
        date: (document.getElementById('date') as HTMLInputElement).value,
        statut: (document.getElementById('statut') as HTMLSelectElement).value,
        fournisseurId: (document.getElementById('fournisseur') as HTMLSelectElement).value,
        articles: articlesList.map(a => ({ articleId: a.articleId, quantite: a.quantite, prix: a.prix })),
      };
      const res = await fetch('http://localhost:3000/approvisionnements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        alert('Approvisionnement ajouté !');
        window.location.hash = '#/liste';
      }
    });
  }
}; 