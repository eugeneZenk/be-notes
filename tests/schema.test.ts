import {readFileSync} from "fs";
import {join} from "path";
const EasyGraphQLTester = require('easygraphql-tester')

const schema = readFileSync(join(process.cwd(), "server", "schema", "schema.graphql"), {
  encoding: "utf-8",
});

describe('GraphQL Schema', () => {
  let tester = new EasyGraphQLTester(schema);

  beforeEach(() => {
    tester = new EasyGraphQLTester(schema);
  });

  describe('Query: notes', () => {
    it('Should have subfields: id, title, content', () => {
      const query = `
        {
          notes {
            id
            title
            content
          }
        }
      `;

      tester.test(true, query);
    });
  });

  describe('Query: note', () => {
    it('Should return note data if id is passed', () => {
      const testID = '1';
      const query = `
        {
          note(id: ${testID}) {
            id
            content
            title
          }
        }
      `;

      tester.test(true, query);
    });

    it('Should fail if id is not passed', () => {
      const query = `
        {
          note {
            id
            content
            title
          }
        }
      `;

      tester.test(false, query);
    });
  });

  describe('Mutation: createNote', () => {
    it('Should return created note data', () => {
      const testTitle = 'Dummy Note';
      const testContent = 'Dummy Content';
      const mutation = `
        mutation CreateNote($title: String!, $content: String!) {
          createNote(title: $title, content: $content) {
            id
            content
            title
          }
        }
      `;

      tester.test(true, mutation, {
        title: testTitle,
        content: testContent
      });
    });
  });

  describe('Mutation: updateNote', () => {
    it('Should return updated note data if id is passed', () => {
      const testTitle = 'New Title';
      const testContent = 'New Content';
      const testID = '1';
      const mutation = `
        mutation UpdateNote($title: String, $content: String, $id: ID!) {
          updateNote(title: $title, content: $content, id: $id) {
            id
            content
            title
          }
        }
      `;

      tester.test(true, mutation, {
        title: testTitle,
        content: testContent,
        id: testID
      });
    });

    it('Should fail if id is not passed', () => {
      const testTitle = 'New Title';
      const testContent = 'New Content';
      const mutation = `
        mutation UpdateNote($title: String, $content: String) {
          updateNote(title: $title, content: $content) {
            id
            content
            title
          }
        }
      `;

      tester.test(false, mutation, {
        title: testTitle,
        content: testContent
      });
    });
  });

  describe('Mutation: deleteNote', () => {
    it('Should succeed if ID is passed ', () => {
      const mutation = `
        mutation DeleteNote($id: ID!) {
          deleteNote(id: $id)
        }
        `;
          tester.test(true, mutation, {
            id: '1'
          });
        })

    it('Should not return data of deleted note', () => {
      const mutation = `
      mutation DeleteNote($id: ID!) {
        deleteNote(id: $id) {
          id
          content
          title
        }
      }
      `;
        tester.test(false, mutation, {
          id: '1'
        });
      })
  })
})