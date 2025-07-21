export class FournisseurService {
  async getFournisseurs() {
    const res = await fetch('http://localhost:3000/fournisseurs');
    return res.json();
  }
} 