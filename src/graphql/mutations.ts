/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
    }
  }
`;
export const createGameInfo = /* GraphQL */ `
  mutation CreateGameInfo(
    $input: CreateGameInfoInput!
    $condition: ModelGameInfoConditionInput
  ) {
    createGameInfo(input: $input, condition: $condition) {
      id
      type
      owner
      owner_id
      werewolf
      villager
      diviner
      brave
      people
    }
  }
`;
export const updateGameInfo = /* GraphQL */ `
  mutation UpdateGameInfo(
    $input: UpdateGameInfoInput!
    $condition: ModelGameInfoConditionInput
  ) {
    updateGameInfo(input: $input, condition: $condition) {
      id
      type
      owner
      owner_id
      werewolf
      villager
      diviner
      brave
      people
    }
  }
`;
export const deleteGameInfo = /* GraphQL */ `
  mutation DeleteGameInfo(
    $input: DeleteGameInfoInput!
    $condition: ModelGameInfoConditionInput
  ) {
    deleteGameInfo(input: $input, condition: $condition) {
      id
      type
      owner
      owner_id
      werewolf
      villager
      diviner
      brave
      people
    }
  }
`;
