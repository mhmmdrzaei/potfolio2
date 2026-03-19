import { defineField, defineType } from 'sanity';

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'site_header',
      title: 'Site Header',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'about_text',
      title: 'About Text (HTML)',
      type: 'text',
      rows: 10,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'works_header',
      title: 'Works Header',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'email_address',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email()
    }),
    defineField({
      name: 'contact',
      title: 'Contact Links',
      type: 'array',
      of: [
        defineField({
          name: 'contactItem',
          title: 'Contact Item',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: 'url',
              type: 'url',
              validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] })
            })
          ]
        })
      ]
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: false
      },
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Default Meta Title',
          type: 'string',
          description: 'Primary SEO title for the homepage and fallback title for the site.',
          validation: (Rule) => Rule.max(60)
        }),
        defineField({
          name: 'metaDescription',
          title: 'SEO Description',
          type: 'text',
          rows: 3,
          description: 'Short description used in search results and social sharing.',
          validation: (Rule) => Rule.max(160)
        }),
        defineField({
          name: 'siteName',
          title: 'Site Name',
          type: 'string',
          description: 'Brand or site name used in Open Graph tags and page title suffixes.'
        }),
        defineField({
          name: 'canonicalBaseUrl',
          title: 'Canonical Base URL',
          type: 'url',
          description: 'Full site URL, for example https://mohammadrezaei.com',
          validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] })
        }),
        defineField({
          name: 'openGraphImage',
          title: 'Default Open Graph Image',
          type: 'image',
          description: 'Default image used for link previews when a page-specific image is not set.',
          options: {
            hotspot: true
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string'
            })
          ]
        }),
        defineField({
          name: 'twitterCard',
          title: 'Twitter Card',
          type: 'string',
          initialValue: 'summary_large_image',
          description: 'Controls the card layout used when links are shared on X/Twitter.',
          options: {
            list: [
              { title: 'Summary Large Image', value: 'summary_large_image' },
              { title: 'Summary', value: 'summary' }
            ],
            layout: 'radio'
          }
        }),
        defineField({
          name: 'twitterHandle',
          title: 'Twitter/X Handle',
          type: 'string',
          description: 'Use format like @yourhandle'
        }),
        defineField({
          name: 'robotsNoIndex',
          title: 'No Index',
          type: 'boolean',
          description: 'Enable only if you want search engines to avoid indexing the site.',
          initialValue: false
        })
      ]
    })
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' };
    }
  }
});
