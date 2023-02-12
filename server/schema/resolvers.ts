import Notes from "../models/Notes";

export const queryResolvers = {
  Query: {
    notes: () => {
      return Notes.find();
    },

    note: (_: any, args: { id: string }) => {
      return Notes.findById(args.id);
    },
  },
};

export const mutationResolvers = {
  Mutation: {
    createNote: (_: any, args: { title: string, content: string }) => {
      const { title, content } = args;
      if (!title || !content) {
        throw new Error('Title and content are required')
      }
      const note = new Notes({
        title,
        content,
      });
      return note.save();
    },

    updateNote: (_: any, args: {id: string, title: string, content: string }) => {
      const { title, content } = args;
      const updatedNote = {
        ...title ? {title} : {},
        content: content
      };
      return Notes.findByIdAndUpdate(args.id, updatedNote, { new: true });
    },

    deleteNote: async (_: any, args: { id: string }) => {
      await Notes.findByIdAndRemove(args.id);
      return true;
    },
  },
};

export default {
  ...mutationResolvers,
  ...queryResolvers
}
