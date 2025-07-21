export class ArticleService {
  async getArticles() {
    const response = await fetch('http://localhost:3000/articles');
    return response.json();
  }
} 