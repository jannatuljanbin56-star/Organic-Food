import { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const SeoHead = () => {
  const { route, selectedSlug, products, seoSettings, language } = useApp();

  useEffect(() => {
    let title = `${seoSettings.businessName} – Local Farm Fresh Organic Food & Produce in ${seoSettings.city}`;
    let description = seoSettings.defaultMetaDescription;
    let canonical = `${seoSettings.siteUrl}/`;
    let schemaData: any = null;

    if (route === 'shop') {
      title = `Buy Organic Produce & Farm Fresh Food Online | ${seoSettings.businessName}`;
      description = `Shop 100% certified pesticide-free vegetables, raw wildflower honey, cold-pressed oils & pasture dairy in ${seoSettings.city}. Fast local delivery.`;
      canonical = `${seoSettings.siteUrl}/products`;
    } else if (route === 'product-detail' && selectedSlug) {
      const product = products.find(p => p.slug === selectedSlug);
      if (product) {
        title = `${product.name} – Fresh Organic Delivery in ${seoSettings.city} | ${seoSettings.businessName}`;
        description = `${product.description} Sourced from ${product.farmOrigin}. Order online for local pickup or doorstep delivery in ${seoSettings.city}.`;
        canonical = `${seoSettings.siteUrl}/products/${product.slug}`;

        schemaData = {
          '@context': 'https://schema.org/',
          '@type': 'Product',
          name: product.name,
          image: [product.image],
          description: product.description,
          sku: product.id,
          brand: {
            '@type': 'Brand',
            name: product.farmOrigin
          },
          offers: {
            '@type': 'Offer',
            url: canonical,
            priceCurrency: 'USD',
            price: product.price.toFixed(2),
            itemCondition: 'https://schema.org/NewCondition',
            availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            seller: {
              '@type': 'Organization',
              name: seoSettings.businessName
            }
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating.toString(),
            reviewCount: product.reviewsCount.toString()
          }
        };
      }
    } else if (route === 'farms') {
      title = `Local Organic Farms & Sustainable Soil Practices | ${seoSettings.businessName}`;
      description = `Discover our network of pesticide-free organic family farms surrounding ${seoSettings.city}. Direct from local soil to your table.`;
      canonical = `${seoSettings.siteUrl}/local-farms`;
    } else if (route === 'about') {
      title = `About Our Local Organic Mission & Soil Standards | ${seoSettings.businessName}`;
      description = `Learn how ${seoSettings.businessName} promotes soil regeneration, chemical-free nutrition, and ethical local agriculture in ${seoSettings.region}.`;
      canonical = `${seoSettings.siteUrl}/about-our-farm`;
    } else if (route === 'contact') {
      title = `Contact Us & Farm Stand Pickup Location | Google Maps | ${seoSettings.businessName}`;
      description = `Visit our organic farm stand in ${seoSettings.city} at ${seoSettings.streetAddress}. Interactive Google Maps directions, phone hours, and local farm pickup info.`;
      canonical = `${seoSettings.siteUrl}/contact-and-pickup`;
      
      schemaData = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: seoSettings.businessName,
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
        telephone: seoSettings.contactPhone,
        email: seoSettings.contactEmail,
        address: {
          '@type': 'PostalAddress',
          streetAddress: seoSettings.streetAddress,
          addressLocality: seoSettings.city,
          addressRegion: seoSettings.region,
          postalCode: seoSettings.postalCode,
          addressCountry: seoSettings.country
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 37.7749,
          longitude: -122.4194
        },
        url: canonical
      };
    } else if (route === 'sitemap') {
      title = `XML Sitemap & Search Engine Indexing Directory | ${seoSettings.businessName}`;
      description = `Browse the complete XML sitemap directory for ${seoSettings.businessName}. Optimized SEO index for local organic food search engine bots.`;
      canonical = `${seoSettings.siteUrl}/sitemap.xml`;
    } else if (route === 'seo-hub') {
      title = `Local SEO Optimization Hub & SERP Live Preview | ${seoSettings.businessName}`;
      description = `Audit local search visibility, edit meta tags, inspect Schema.org JSON-LD, and monitor search ranking signals for ${seoSettings.businessName}.`;
      canonical = `${seoSettings.siteUrl}/local-seo-manager`;
    } else if (route === 'checkout') {
      title = `Secure Checkout – Local Organic Delivery & Farm Pickup | ${seoSettings.businessName}`;
      description = `Complete your order for fresh local organic food. Same-day delivery or easy farm stand pickup in ${seoSettings.city}.`;
      canonical = `${seoSettings.siteUrl}/checkout`;
    } else if (route === 'admin') {
      title = `Admin Control Center | ${seoSettings.businessName}`;
      description = `Protected Store Management and Order Fulfillment Center.`;
      canonical = `${seoSettings.siteUrl}/admin-portal`;
    }

    // Default schema if none set
    if (!schemaData) {
      schemaData = {
        '@context': 'https://schema.org',
        '@type': 'GroceryStore',
        name: seoSettings.businessName,
        description: description,
        url: canonical,
        telephone: seoSettings.contactPhone,
        address: {
          '@type': 'PostalAddress',
          streetAddress: seoSettings.streetAddress,
          addressLocality: seoSettings.city,
          addressRegion: seoSettings.region,
          postalCode: seoSettings.postalCode,
          addressCountry: seoSettings.country
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 37.7749,
          longitude: -122.4194
        }
      };
    }

    // Apply document title
    document.title = title;

    // Apply or update meta tags
    const updateMeta = (nameOrProperty: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${nameOrProperty}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, nameOrProperty);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('description', description);
    updateMeta('og:title', title, true);
    updateMeta('og:description', description, true);
    updateMeta('og:url', canonical, true);
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);

    // Update dynamic schema script
    let dynamicSchemaTag = document.getElementById('dynamic-page-schema');
    if (!dynamicSchemaTag) {
      dynamicSchemaTag = document.createElement('script');
      dynamicSchemaTag.id = 'dynamic-page-schema';
      dynamicSchemaTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(dynamicSchemaTag);
    }
    dynamicSchemaTag.textContent = JSON.stringify(schemaData, null, 2);

  }, [route, selectedSlug, products, seoSettings, language]);

  return null;
};
