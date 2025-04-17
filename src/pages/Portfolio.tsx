import React, { useState, useEffect } from 'react';

const Portfolio: React.FC = () => {
  const [portfolioLinks, setPortfolioLinks] = useState<{ name: string; url: string }[]>([]);
  const [allPortfolioLinks, setAllPortfolioLinks] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchPortfolioData = async () => {
    try {
      const response = await fetch(
        'https://api.github.com/repos/emmabostian/developer-portfolios/contents/README.md'
      );
      const data = await response.json();
      const content = atob(data.content);
      const links = content.match(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g);

      if (links) {
        const parsedLinks = links
          .map(link => {
            const parts = link.match(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/);
            return parts ? { name: parts[1], url: parts[2] } : null;
          })
          .filter(Boolean) as { name: string; url: string }[];

        const filteredLinks = parsedLinks.filter(
          link => link.url !== 'https://comrademohan.rf.gd/?i=1'
        );

        setAllPortfolioLinks(filteredLinks.slice(5));
      }
    } catch (err) {
      console.error('Error fetching GitHub portfolios:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreProfiles = () => {
    const currentLength = portfolioLinks.length;
    const nextProfiles = allPortfolioLinks.slice(currentLength, currentLength + 10);
    setPortfolioLinks(prev => [...prev, ...nextProfiles]);

    if (currentLength + nextProfiles.length >= allPortfolioLinks.length) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  useEffect(() => {
    setPortfolioLinks(allPortfolioLinks.slice(0, 10));
  }, [allPortfolioLinks]);

  return (
    <div className="portfolio-container p-4 pt-10 overflow-hidden">
      <h2 className="text-4xl font-bold text-center text-white mb-6">Developer Portfolios</h2>

      {loading ? (
        <div className="text-center text-white">Loading...</div>
      ) : (
        <div className="portfolio-list grid grid-cols-1 sm:grid-cols-2 gap-8">
          {portfolioLinks.map((link, index) => (
            <div
              key={index}
              className="relative group bg-white rounded-lg shadow-lg overflow-hidden border-2 border-transparent"
            >
              <div className="portfolio-header p-2">
                <h2 className="text-xl font-semibold">{link.name}</h2>
              </div>

              <div className="iframe-container p-4 relative">
                <iframe
                  src={link.url}
                  title={`Developer Portfolio ${index + 1}`}
                  width="100%"
                  height="500px"
                  frameBorder="0"
                  scrolling="no"
                  className="rounded-lg w-full h-[500px] pointer-events-none"
                  style={{
                    border: 'none',
                    maxWidth: '100%',
                    overflow: 'hidden',
                  }}
                />

                {/* Transparent clickable layer */}
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10"
                  aria-label={`Open ${link.name} Portfolio`}
                />
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
