export const ListeAppro = {
  async render(container: HTMLElement) {
    container.innerHTML = `
      <div class="card shadow-sm">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h2 class="card-title mb-0">Liste des approvisionnements</h2>
            <input type='text' id='search-ref' class='form-control w-25' placeholder='Recherche par référence'>
          </div>
          <div class="table-responsive">
            <table class='table table-striped table-hover align-middle'>
              <thead class="table-primary">
                <tr>
                  <th>Référence</th>
                  <th>Date</th>
                  <th>Statut</th>
                  <th>Fournisseur</th>
                  <th>Articles</th>
                </tr>
              </thead>
              <tbody id='appro-list'></tbody>
            </table>
          </div>
        </div>
      </div>
    `;
    const approListEl = document.getElementById('appro-list');
    const searchInput = document.getElementById('search-ref') as HTMLInputElement;
    let approvisionnements: any[] = [];
    let fournisseurs: any[] = [];

    async function loadData() {
      const [approRes, fourRes] = await Promise.all([
        fetch('http://localhost:3000/approvisionnements'),
        fetch('http://localhost:3000/fournisseurs')
      ]);
      approvisionnements = await approRes.json();
      fournisseurs = await fourRes.json();
      renderList();
    }

    function renderList() {
      if (!approListEl) return;
      const filter = searchInput.value.toLowerCase();
      approListEl.innerHTML = approvisionnements
        .filter(a => a.reference.toLowerCase().includes(filter))
        .map(a => {
          const fournisseur = fournisseurs.find(f => f.id == a.fournisseurId || f.id == String(a.fournisseurId));
          return `<tr>
            <td>${a.reference}</td>
            <td>${a.date}</td>
            <td><span class="badge bg-${a.statut === 'validé' ? 'success' : 'secondary'}">${a.statut}</span></td>
            <td>${fournisseur ? fournisseur.nom : ''}</td>
            <td>${a.articles.map((art: any) => `${art.quantite} x ${art.prix}€`).join('<br>')}</td>
          </tr>`;
        }).join('');
    }

    searchInput?.addEventListener('input', renderList);
    loadData();
  }
}; 