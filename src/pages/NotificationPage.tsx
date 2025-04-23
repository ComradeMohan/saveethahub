import React, { useState, useEffect } from 'react';

const Portfolio: React.FC = () => {
  const [portfolioLinks, setPortfolioLinks] = useState<{ name: string, url: string }[]>([]);
  const [allPortfolioLinks, setAllPortfolioLinks] = useState<{ name: string, url: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchPortfolioData = async () => {
    const response = await fetch(
      'https://api.github.com/repos/emmabostian/developer-portfolios/contents/README.md'
    );
    const data = await response.json();

    // Decode the base64-encoded content
    const content = atob(data.content);

    // Extract links from the README content
    const links = content.match(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g);

    if (links) {
      const parsedLinks = links.map(link => {
        const parts = link.match(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/);
        return parts ? { name: parts[1], url: parts[2] } : null;
      }).filter(Boolean);

      setAllPortfolioLinks(parsedLinks as { name: string, url: string }[]);
    }

    setLoading(false);
  };

  const loadMoreProfiles = () => {
    const currentLength = portfolioLinks.length;
    const nextProfiles = allPortfolioLinks.slice(currentLength, currentLength + 10); // Fetch 10 profiles at a time
    setPortfolioLinks([...portfolioLinks, ...nextProfiles]);

    if (portfolioLinks.length + nextProfiles.length >= allPortfolioLinks.length) {
      setHasMore(false); // No more profiles to load
    }
  };

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  useEffect(() => {
    // Ignore first 5 profiles and load from index 5 onwards
    setPortfolioLinks(allPortfolioLinks.slice(5, 15));
  }, [allPortfolioLinks]);

  return (
    <div className="portfolio-container p-4">
      <h2 className="text-3xl font-bold text-white text-center mb-8">Developer Portfolios</h2>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="portfolio-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {portfolioLinks.map((link, index) => (
            <div key={index} className="portfolio-item bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="portfolio-header p-4">
                <h2 className="text-xl font-semibold">{link.name}</h2>
              </div>
              <div className="iframe-container p-4">
                <iframe
                  src={link.url}
                  title={`Developer Portfolio ${index + 1}`}
                  width="100%"
                  height="500px"
                  frameBorder="0"
                  className="rounded-lg w-full h-[500px] object-cover"
                  style={{
                    border: 'none',
                    height: '500px', // Fixed height for laptop screen size
                    maxWidth: '100%', // Ensures the iframe is responsive
                  }}
                  onError={() => {
                    console.error(`Failed to load portfolio: ${link.name}`);
                  }}
                />
              </div>
              <div className="portfolio-actions p-4 flex justify-between items-center">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  View Portfolio
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {hasMore && !loading && (
        <div className="text-center mt-8">
          <button
            onClick={loadMoreProfiles}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
