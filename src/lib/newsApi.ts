const API_KEY = "d4abc0777b65437d85e393d56d18e275";
const BASE_URL = "https://newsapi.org/v2";

export interface NewsArticle {
    source: { id: string | null; name: string };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

interface NewsApiResponse {
    status: string;
    totalResults: number;
    articles: NewsArticle[];
}

/** Categorias disponíveis no portal */
export type NewsCategory = "tecnologia" | "games" | "ciência";

/** Termos de busca otimizados por categoria */
const CATEGORY_QUERIES: Record<NewsCategory, string> = {
    tecnologia:
        '(tecnologia OR "inteligência artificial" OR programação OR cibersegurança OR startup OR software OR hardware OR inovação OR "machine learning" OR smartphone)',
    games:
        '(games OR videogame OR "jogos eletrônicos" OR PlayStation OR Xbox OR Nintendo OR "PC Gamer" OR eSports OR Steam OR "jogo mobile")',
    ciência:
        '(ciência OR "descoberta científica" OR NASA OR astronomia OR física OR genética OR "mudança climática" OR pesquisa OR "espaço sideral" OR neurociência)',
};

/** Limpa artigos inválidos / incompletos retornados pela API */
function cleanArticles(articles: NewsArticle[]): NewsArticle[] {
    return articles.filter(
        (a) =>
            a.title &&
            a.title !== "[Removed]" &&
            a.description &&
            a.description !== "[Removed]" &&
            a.url &&
            a.url !== "https://removed.com"
    );
}

/**
 * Busca as principais manchetes de tecnologia do Brasil.
 */
export async function fetchTopHeadlines(pageSize = 30): Promise<NewsArticle[]> {
    const url = `${BASE_URL}/top-headlines?country=br&category=technology&pageSize=${pageSize}&apiKey=${API_KEY}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Erro ao buscar manchetes: ${res.status}`);

    const data: NewsApiResponse = await res.json();
    return cleanArticles(data.articles);
}

/**
 * Busca notícias por categoria usando o endpoint /everything.
 */
export async function fetchNewsByCategory(
    category: NewsCategory,
    pageSize = 30
): Promise<NewsArticle[]> {
    const q = encodeURIComponent(CATEGORY_QUERIES[category]);
    const url = `${BASE_URL}/everything?q=${q}&language=pt&sortBy=publishedAt&pageSize=${pageSize}&apiKey=${API_KEY}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Erro ao buscar notícias: ${res.status}`);

    const data: NewsApiResponse = await res.json();
    return cleanArticles(data.articles);
}

/** Formatar data ISO para formato brasileiro legível */
export function formatNewsDate(isoDate: string): string {
    try {
        return new Intl.DateTimeFormat("pt-BR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(new Date(isoDate));
    } catch {
        return isoDate;
    }
}
