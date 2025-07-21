export class ApprovisionnementService {
  async getApprovisionnements() {
    const response = await fetch('http://localhost:3000/approvisionnements');
    return response.json();
  }

  async addApprovisionnement(data: any) {
    const response = await fetch('http://localhost:3000/approvisionnements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }
} 