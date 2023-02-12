import resolvers from "../server/schema/resolvers";
import Notes from "../server/models/Notes";

jest.mock('../server/models/Notes', () => {
  return jest.fn().mockImplementation(({title, content}) => {
    return {
      save: jest.fn(() => {
        return {
          id: Math.round(Math.random() * 10).toString(),
          title,
          content
        }
      })
    }
  })
})

describe('Test resolvers', () => {
  const mockedNotes = [    { id: '1', title: 'title', content: 'content' },    { id: '2', title: 'title2', content: 'content2' },  ];

  const findMock = jest.fn().mockReturnValue(mockedNotes);
  const findByIdMock = jest.fn((id) => mockedNotes.find((item) => item.id === id));
  const findByIdAndUpdateMock = jest.fn((id, data) => {
    const note = mockedNotes.find((item) => item.id === id);
    return note ? Object.assign(note, data) : note;
  });
  const findByIdAndRemoveMock = jest.fn((id) => !!mockedNotes.find((item) => item.id === id));

  beforeEach(() => {
    Notes.find = findMock;
    Notes.findById = findByIdMock as any;
    Notes.findByIdAndUpdate = findByIdAndUpdateMock;
    Notes.findByIdAndRemove = findByIdAndRemoveMock as any;
  });

  describe('Test query resolvers', () => {
    it('getNotes should return an array of notes', () => {
      const result = resolvers.Query.notes();

      expect(result).toEqual(mockedNotes);
      expect(Array.isArray(result)).toBe(true);
      expect(Notes.find).toHaveBeenCalled();
    });

    it('getNote should return the note with specified ID', async () => {
      const mockedNote = mockedNotes[1];
      const args = {
        id: mockedNote.id,
      };
      const result = await resolvers.Query.note({}, args);

      expect(result).toEqual(mockedNote);
      expect(Notes.findById).toHaveBeenCalledWith(mockedNote.id);
    });
  });

  describe('Test mutation resolvers', () => {
    it('createNote should return the created note', async () => {
      const args = {
        title: 'createdTitle',
        content: 'createdContent',
      };
      const result = await resolvers.Mutation.createNote({}, args);

      expect(result).toEqual({
        id: expect.any(String),
        ...args,
      });
    });

    it('updateNote should return the updated note', async () => {
      const args = {
        id: '1',
        title: 'updatedTitle',
        content: 'updatedContent',
      };
      const result = await resolvers.Mutation.updateNote({}, args);

      expect(result).toEqual(args);
      expect(Notes.findByIdAndUpdate).toHaveBeenCalled();
    });

    it('deleteNote should return a boolean indicating success', async () => {
      const args = {
        id: '1',
      };
      await resolvers.Mutation.deleteNote({}, args);

      expect(Notes.findByIdAndRemove).toHaveBeenCalled();
    })
  })

})