export class FournisseurService {
  async getFournisseurs() {
    const response = await fetch('http://localhost:3000/fournisseurs');
    return response.json();
  }
} 