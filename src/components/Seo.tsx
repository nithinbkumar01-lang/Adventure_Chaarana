import { Helmet } from 'react-helmet-async';
import { DEFAULT_SOCIAL_IMAGE, SITE_NAME, SITE_URL, serializeJsonLd } from '../../shared/seo';
import type { SeoMetadata } from '../../shared/seo';

export function Seo({ title, description, path, image = DEFAULT_SOCIAL_IMAGE, noindex = false, schema }: SeoMetadata) {
  const canonical = `${SITE_URL}${path}`;
  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex ? <meta name="robots" content="noindex, nofollow" /> : <link rel="canonical" href={canonical} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={`${SITE_NAME} trekking and travel`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {schema && <script type="application/ld+json">{serializeJsonLd(schema)}</script>}
    </Helmet>
  );
}
