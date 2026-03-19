import { defineField, defineType } from 'sanity';

export const musicVideoType = defineType({
  name: 'musicVideo',
  title: 'Music Video',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(1)
    }),
    defineField({
      name: 'embed_link',
      title: 'Embed Link (iframe HTML)',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required()
    })
  ],
  preview: {
    select: {
      title: 'embed_link'
    },
    prepare({ title }) {
      return {
        title: 'Music Video',
        subtitle: title?.slice(0, 60)
      };
    }
  }
});
