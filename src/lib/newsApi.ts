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

/**
 * Busca as principais manchetes de tecnologia do Brasil.
 * Usando `country=br` + `category=technology` garantimos resultados nativos em pt-BR.
 */
export async function fetchTechNews(pageSize = 20): Promise<NewsArticle[]> {
    const url = `${BASE_URL}/top-headlines?country=br&category=technology&pageSize=${pageSize}&apiKey=${API_KEY}`;

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Erro ao buscar notícias: ${res.status}`);
    }

    const data: NewsApiResponse = await res.json();

    // Filtrar artigos que foram removidos pela API ("[Removed]")
    return data.articles.filter(
        (a) => a.title !== "[Removed]" && a.description !== "[Removed]"
    );
}

/**
 * Buscar tudo sobre tecnologia (endpoint /everything) para ter mais volume.
 * Útil como fallback se o top-headlines retornar poucos resultados.
 */
export async function fetchEverythingTech(pageSize = 30): Promise<NewsArticle[]> {
    const url = `${BASE_URL}/everything?q=tecnologia OR inteligência artificial OR programação&language=pt&sortBy=publishedAt&pageSize=${pageSize}&apiKey=${API_KEY}`;

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Erro ao buscar notícias: ${res.status}`);
    }

    const data: NewsApiResponse = await res.json();

    return data.articles.filter(
        (a) => a.title !== "[Removed]" && a.description !== "[Removed]"
    );
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
