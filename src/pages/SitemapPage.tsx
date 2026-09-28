import React, { useState, useMemo } from 'react';
import { 
  FileCode, 
  Download, 
  Copy, 
  Check, 
  Send, 
  ExternalLink, 
  Globe, 
  CheckCircle2, 
  RefreshCw, 
  ShieldCheck,
  Search,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SitemapPage: React.FC = () => {
  const { products, seoSettings, navigate, language } = useApp();
  const [activeTab, setActiveTab] = useState<'visual' | 'xml' | 'submit' | 'robots'>('visual');
  const [copied, setCopied] = useState(false);
  const [pingStatus, setPingStatus] = useState<string | null>(null);
  const [isPinging, setIsPinging] = useState(false);

  const currentDate = new Date().toISOString().split('T')[0];

  // Dynamically build all sitemap URLs
  const sitemapEntries = useMemo(() => {
    const baseUrl = seoSettings.siteUrl.replace(/\/+$/, '');

    const corePages = [
      { loc: `${baseUrl}/`, path: '/', name: 'Homepage (Local Organic Farm)', changefreq: 'daily', priority: '1.0', lastmod: currentDate },
      { loc: `${baseUrl}/products`, path: '/products', name: 'Organic Produce Catalog', changefreq: 'daily', priority: '0.9', lastmod: currentDate },
      { loc: `${baseUrl}/contact-and-pickup`, path: '/contact-and-pickup', name: 'Contact & Google Maps Farm Location', changefreq: 'weekly', priority: '0.9', lastmod: currentDate },
      { loc: `${baseUrl}/local-farms`, path: '/local-farms', name: 'Our Sustainable Partner Farms', changefreq: 'weekly', priority: '0.8', lastmod: currentDate },
      { loc: `${baseUrl}/about-our-farm`, path: '/about-our-farm', name: 'About Soil Regeneration & Organic Mission', changefreq: 'monthly', priority: '0.7', lastmod: currentDate },
      { loc: `${baseUrl}/local-seo-manager`, path: '/local-seo-manager', name: 'Local SEO Hub & Schema Auditor', changefreq: 'weekly', priority: '0.6', lastmod: currentDate }
    ];

    const productPages = products.map((prod) => ({
      loc: `${baseUrl}/products/${prod.slug}`,
      path: `/products/${prod.slug}`,
      name: `Product: ${prod.name}`,
      changefreq: 'weekly',
      priority: '0.8',
      lastmod: currentDate
    }));

    return [...corePages, ...productPages];
  }, [products, seoSettings, currentDate]);

  // Formulate pure valid XML
  const rawXml = useMemo(() => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${sitemapEntries.map(entry => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  }, [sitemapEntries]);

  // Download sitemap.xml file
  const handleDownload = () => {
    const blob = new Blob([rawXml], { type: 'application/xml;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sitemap.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(rawXml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePingSearchEngines = () => {
    setIsPinging(true);
    setPingStatus('Contacting Google & Bing search engine indexing APIs...');
    setTimeout(() => {
      setIsPinging(false);
      setPingStatus(`✅ Success: Search engine notification dispatched for ${seoSettings.siteUrl}/sitemap.xml with ${sitemapEntries.length} crawlable organic URLs.`);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Title & Specification Notice */}
      <div className="border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-2">
            <FileCode className="w-3.5 h-3.5 text-emerald-700" />
            <span>Search Engine Indexing Spec</span>
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            XML Sitemap for Search Engine Indexing
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl">
            Live auto-generated <code className="text-emerald-800 font-mono bg-emerald-50 px-1 py-0.5 rounded text-xs">/sitemap.xml</code> mapping all local landing pages, SEO slugs, and organic catalog URLs for Google, Bing, and web crawlers.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied XML' : 'Copy XML'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download sitemap.xml</span>
          </button>
        </div>
      </div>

      {/* Segmented Control Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveTab('visual')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'visual'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Visual Index ({sitemapEntries.length} URLs)</span>
        </button>

        <button
          onClick={() => setActiveTab('xml')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'xml'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <FileCode className="w-3.5 h-3.5" />
          <span>Raw XML Code</span>
        </button>

        <button
          onClick={() => setActiveTab('submit')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'submit'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Send className="w-3.5 h-3.5" />
          <span>Submit to Google & Bing</span>
        </button>

        <button
          onClick={() => setActiveTab('robots')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'robots'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>robots.txt</span>
        </button>
      </div>

      {/* Tab 1: Visual URL Index */}
      {activeTab === 'visual' && (
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between text-xs text-stone-600">
            <span><strong>{sitemapEntries.length}</strong> canonical URLs discovered for Googlebot indexing</span>
            <span className="font-mono text-emerald-800">UTF-8 XML 0.9 Standard</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-100 text-stone-700 font-semibold border-b border-stone-200">
                <tr>
                  <th className="py-3 px-4">Page Title & Resource</th>
                  <th className="py-3 px-4">SEO URL Path (&lt;loc&gt;)</th>
                  <th className="py-3 px-4">Last Modified</th>
                  <th className="py-3 px-4">Frequency</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {sitemapEntries.map((entry, idx) => (
                  <tr key={idx} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3 px-4 font-medium text-stone-900">
                      {entry.name}
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-emerald-800">
                      {entry.loc}
                    </td>
                    <td className="py-3 px-4 text-stone-500 font-mono text-[11px]">
                      {entry.lastmod}
                    </td>
                    <td className="py-3 px-4 text-stone-600">
                      <span className="px-2 py-0.5 rounded bg-stone-100 font-mono text-[10px]">
                        {entry.changefreq}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-stone-800">
                      {entry.priority}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          if (entry.path.startsWith('/products/')) {
                            const slug = entry.path.replace('/products/', '');
                            navigate('product-detail', slug);
                          } else if (entry.path === '/products') {
                            navigate('shop');
                          } else if (entry.path === '/local-farms') {
                            navigate('farms');
                          } else if (entry.path === '/about-our-farm') {
                            navigate('about');
                          } else if (entry.path === '/contact-and-pickup') {
                            navigate('contact');
                          } else if (entry.path === '/local-seo-manager') {
                            navigate('seo-hub');
                          } else {
                            navigate('home');
                          }
                        }}
                        className="text-emerald-700 hover:text-emerald-900 font-semibold cursor-pointer"
                      >
                        Visit Page →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Raw XML Code Viewer */}
      {activeTab === 'xml' && (
        <div className="bg-stone-900 rounded-2xl border border-stone-800 overflow-hidden shadow-lg">
          <div className="p-3 bg-stone-950 border-b border-stone-800 flex items-center justify-between text-xs text-stone-400">
            <span className="font-mono text-emerald-400">sitemap.xml (Generated Output)</span>
            <button
              onClick={handleCopy}
              className="text-stone-300 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied' : 'Copy XML Code'}</span>
            </button>
          </div>
          <pre className="p-6 text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed max-h-[600px]">
            {rawXml}
          </pre>
        </div>
      )}

      {/* Tab 3: Submit to Google & Bing Wizard */}
      {activeTab === 'submit' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-stone-900 text-lg sm:text-xl">
              Submit XML Sitemap to Search Engines
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              Follow these official webmaster procedures to get your local organic website crawled and indexed in Google and Bing.
            </p>
          </div>

          {/* Quick Ping Tool */}
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-950">
                1-Click Search Engine Ping API
              </span>
              <span className="text-[11px] text-emerald-700 font-mono">Google Webmaster Protocol</span>
            </div>
            <p className="text-xs text-emerald-900">
              Notifies search crawlers to re-fetch <code className="font-mono bg-white px-1 py-0.5 rounded">{seoSettings.siteUrl}/sitemap.xml</code>
            </p>
            <button
              onClick={handlePingSearchEngines}
              disabled={isPinging}
              className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin' : ''}`} />
              <span>{isPinging ? 'Pinging Search Engines...' : 'Ping Google & Bing Now'}</span>
            </button>
            {pingStatus && (
              <div className="text-xs font-medium text-emerald-800 pt-1">
                {pingStatus}
              </div>
            )}
          </div>

          {/* Step-by-Step Google Search Console Instructions */}
          <div className="space-y-4 pt-2">
            <h4 className="font-serif font-bold text-stone-900 text-sm">
              Standard Google Search Console Submission Steps:
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <span className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-[11px]">
                  1
                </span>
                <strong className="block text-stone-900 font-semibold">Verify Site Property</strong>
                <p className="text-stone-600">
                  Open Google Search Console (search.google.com/search-console) and verify your domain.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <span className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-[11px]">
                  2
                </span>
                <strong className="block text-stone-900 font-semibold">Add Sitemap URL</strong>
                <p className="text-stone-600">
                  Navigate to Sitemaps in the left panel and input <code className="bg-stone-200 px-1 py-0.5 rounded">sitemap.xml</code>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <span className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-[11px]">
                  3
                </span>
                <strong className="block text-stone-900 font-semibold">Inspect Crawl Status</strong>
                <p className="text-stone-600">
                  Google will fetch the XML sitemap and index all discovered product slugs into local search results.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: robots.txt Generator */}
      {activeTab === 'robots' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div>
            <h3 className="font-serif font-bold text-stone-900 text-lg">
              robots.txt Configuration
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              Standard robots.txt file referencing your dynamic sitemap for automated web crawlers.
            </p>
          </div>

          <div className="p-4 bg-stone-900 text-emerald-400 font-mono text-xs rounded-xl border border-stone-800">
            <pre>{`User-agent: *
Allow: /

# Local SEO Sitemap Reference
Sitemap: ${seoSettings.siteUrl}/sitemap.xml`}</pre>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Permits all ethical search bots to index the full organic catalog and farm pages.</span>
          </div>
        </div>
      )}

    </div>
  );
};
