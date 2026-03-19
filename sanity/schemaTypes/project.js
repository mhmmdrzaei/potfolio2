import { defineField, defineType } from 'sanity';

const mediaSlideFields = [
  defineField({
    name: 'mediaType',
    title: 'Media Type',
    type: 'string',
    initialValue: 'image',
    options: {
      list: [
        { title: 'Image', value: 'image' },
        { title: 'Video', value: 'video' }
      ],
      layout: 'radio'
    },
    validation: (Rule) => Rule.required()
  }),
  defineField({
    name: 'image',
    title: 'Slide Image',
    type: 'image',
    options: {
      hotspot: true
    },
    fields: [
      defineField({
        name: 'alt',
        title: 'Alt Text',
        type: 'string'
      })
    ],
    hidden: ({ parent }) => parent?.mediaType === 'video'
  }),
  defineField({
    name: 'video',
    title: 'Slide Video',
    type: 'file',
    options: {
      accept: 'video/*'
    },
    hidden: ({ parent }) => parent?.mediaType !== 'video'
  }),
  defineField({
    name: 'videoPoster',
    title: 'Video Poster',
    type: 'image',
    options: {
      hotspot: true
    },
    fields: [
      defineField({
        name: 'alt',
        title: 'Alt Text',
        type: 'string'
      })
    ],
    hidden: ({ parent }) => parent?.mediaType !== 'video'
  }),
  defineField({
    name: 'altText',
    title: 'Accessible Description',
    type: 'string',
    description: 'Optional shared description for the slide. Use this when the media needs more context than the image alt text.'
  })
];

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(1)
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'job_type',
      title: 'Job Type',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      description: 'These become clickable filters on the site, such as Branding or Web Development.',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Project Background Color',
      type: 'string',
      description: 'Hex color used for the page background while this project is in view. Example: #F7F7F7',
      validation: (Rule) => Rule.regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/).warning('Use a valid hex color, for example #F7F7F7.')
    }),
    defineField({
      name: 'mediaSlides',
      title: 'Main Media Slider',
      type: 'array',
      description: 'Full-width slider shown at the top of the project. Drag images or videos into the order you want them to appear.',
      of: [
        {
          type: 'object',
          name: 'projectMediaSlide',
          title: 'Media Slide',
          fields: mediaSlideFields,
          preview: {
            select: {
              title: 'altText',
              mediaType: 'mediaType',
              image: 'image',
              poster: 'videoPoster'
            },
            prepare(selection) {
              return {
                title: selection.title || (selection.mediaType === 'video' ? 'Video slide' : 'Image slide'),
                subtitle: selection.mediaType === 'video' ? 'Video' : 'Image',
                media: selection.image || selection.poster
              };
            }
          }
        }
      ]
    }),
    defineField({
      name: 'webImage',
      title: 'Fallback Web Image',
      type: 'image',
      description: 'Used only when the main media slider is empty.',
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
      name: 'mobileImage',
      title: 'Legacy Mobile Image',
      type: 'image',
      hidden: true,
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
      name: 'projectVideo',
      title: 'Side Detail Video',
      type: 'file',
      description: 'Optional supporting video shown beside the description lower on the page.',
      options: {
        accept: 'video/*'
      }
    }),
    defineField({
      name: 'projectVideoPoster',
      title: 'Side Detail Video Poster',
      type: 'image',
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
      name: 'video_caption',
      title: 'Video Caption',
      type: 'string'
    }),
    defineField({
      name: 'web_adress',
      title: 'Project URL',
      type: 'url',
      // validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] })
    }),
    defineField({
      name: 'description',
      title: 'Description (HTML)',
      type: 'text',
      rows: 10,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'web_img',
      title: 'Legacy Cloudinary Web Image Public ID',
      type: 'string',
      hidden: true
    }),
    defineField({
      name: 'mobile_img',
      title: 'Legacy Cloudinary Mobile Image Public ID',
      type: 'string',
      hidden: true
    }),
    defineField({
      name: 'video',
      title: 'Legacy Cloudinary Video Public ID',
      type: 'string',
      hidden: true
    }),
    defineField({
      name: 'video_sc',
      title: 'Legacy Cloudinary Video Cover Public ID',
      type: 'string',
      hidden: true
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'job_type',
      media: 'webImage'
    }
  }
});
