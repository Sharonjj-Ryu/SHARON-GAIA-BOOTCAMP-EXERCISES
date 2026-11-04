import { useState, useEffect } from "react";

function NewsAggregator() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(
          "https://newsdata.io/api/1/latest?apikey=pub_d0972f27059f479a9737096ee077a9d2&q=NEWS%20AGGREGATOR"
        );

        const data = await res.json();

        console.log("API response:", data);

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch news");
        }

        setArticles(data.results || []);
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
        setArticles([]);
      }
    }

    fetchNews();
  }, []);

  return (
    <div>
      <h2>Latest News</h2>

      {error && <p>{error}</p>}

      <ul>
        {articles.map((article, index) => (
          <li key={article.article_id || index}>
            {article.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NewsAggregator;