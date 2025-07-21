export class ArticleService {
  async getArticles() {
    const res = await fetch('http://localhost:3000/articles');
    return res.json();
  }
} 