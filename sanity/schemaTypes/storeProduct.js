import { defineField, defineType } from 'sanity';

export const storeProductType = defineType({
  name: 'storeProduct',
  title: 'Store Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'productType',
      title: 'Product Type',
      type: 'string',
      initialValue: 'object',
      options: {
        list: [
          { title: 'Book', value: 'book' },
          { title: 'Object / Print', value: 'object' }
        ],
        layout: 'radio'
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'active',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Coming Soon', value: 'comingSoon' },
          { title: 'Sold Out', value: 'soldOut' }
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Display price in dollars.',
      validation: (Rule) => Rule.required().min(0)
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(220)
    }),
    defineField({
      name: 'description',
      title: 'Long Description (HTML)',
      type: 'text',
      rows: 12,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'primaryImage',
      title: 'Primary Image',
      type: 'image',
      description: 'Optional. If left empty, the storefront will use the first image from Gallery.',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      description: 'Drag one or more images here. The first image can act as the main product image automatically.',
      type: 'array',
      of: [
        defineField({
          name: 'galleryImage',
          title: 'Gallery Image',
          type: 'image',
          options: {
            hotspot: true
          }
        })
      ]
    }),
    defineField({
      name: 'stripePriceId',
      title: 'Stripe Price ID',
      type: 'string',
      description: 'Optional. Leave empty to use dynamic Checkout pricing from the product price.'
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(1)
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'productType',
      media: 'primaryImage'
    }
  }
});
