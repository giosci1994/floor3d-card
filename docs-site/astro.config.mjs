// The documentation of floor3d-card mod, published on GitHub Pages by .github/workflows/docs.yml.
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://giosci1994.github.io',
  base: '/floor3d-card',
  integrations: [
    starlight({
      title: 'floor3d-card mod',
      description: 'The 3D model of your home in a Home Assistant card, live.',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/giosci1994/floor3d-card' }],
      editLink: { baseUrl: 'https://github.com/giosci1994/floor3d-card/edit/master/docs-site/' },
      lastUpdated: true,
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        { label: 'Getting started', items: [{ autogenerate: { directory: 'getting-started' } }] },
        { label: 'Features', items: [{ autogenerate: { directory: 'features' } }] },
      ],
    }),
  ],
});
