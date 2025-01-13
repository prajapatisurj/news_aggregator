import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import "./News.css";

interface Article {
  url: string;
  urlToImage?: string;
  name?: string;
  author?: string;
  title: string;
}

const News: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const API_KEY = "714ef9b8a6ef47d19b4bda6f4f0d100f";
  const BASE_URL = "https://newsapi.org/v2/";

  const fetchAllArticles = async () => {
    setLoading(true);
    try {
      const endpoint =
        selectedCategory === "all"
          ? `${BASE_URL}top-headlines?country=us&apiKey=${API_KEY}`
          : `${BASE_URL}top-headlines?category=${selectedCategory}&apiKey=${API_KEY}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      setTimeout(() => {
        setArticles(data.articles || []);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching articles", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllArticles();
  }, [selectedCategory]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setLoading(true);

    if (query) {
      try {
        const endpoint = `${BASE_URL}everything?q=${query}&apiKey=${API_KEY}`;
        const response = await fetch(endpoint);
        const data = await response.json();
        setTimeout(() => {
          setArticles(data.articles || []);
          setLoading(false); // Stop loader after 2 seconds
        }, 2000);
      } catch (error) {
        console.error("Error fetching search results", error);
        setLoading(false);
      }
    } else {
      fetchAllArticles();
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <>
      <Navbar
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        onSearchChange={handleSearch}
        onCategoryChange={handleCategoryChange}
      />
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="mainDiv">
          {articles.map((article) => (
            <div
              className="card"
              style={{
                marginTop: "2rem",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
              key={article.url}
            >
              <img
                src={
                  article.urlToImage ||
                  "https://kubrick.htvapps.com/vidthumb/f6865cb1-d77d-4a31-ba83-d57c4b2324d8/4b9c9d8f-ad14-47ea-bcf4-bf24ee0bb1f3.jpg?crop=0.383xw:0.383xh;0.517xw,0.252xh&resize=1200:*"
                }
                className="card-img-top"
                alt="News thumbnail"
              />
              <div className="card-body">
                <h5 className="card-title">
                  {article.name || article.author || "Unknown Author"}
                </h5>
                <p className="card-text">{article.title}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default News;
