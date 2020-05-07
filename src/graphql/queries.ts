/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
      }
      nextToken
    }
  }
`;
export const getGameInfo = /* GraphQL */ `
  query GetGameInfo($id: ID!) {
    getGameInfo(id: $id) {
      roomid
      type
      owner
      werewolf
      people
    }
  }
`;
export const listGameInfos = /* GraphQL */ `
  query ListGameInfos(
    $filter: ModelGameInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGameInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        roomid
        type
        owner
        werewolf
        people
      }
      nextToken
    }
  }
`;
