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
      ownerId
      werewolf
      villager
      diviner
      brave
      people
      players
      state
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
      ownerId
      werewolf
      villager
      diviner
      brave
      people
      players
      state
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
      ownerId
      werewolf
      villager
      diviner
      brave
      people
      players
      state
    }
  }
`;
export const createPlayersInfo = /* GraphQL */ `
  mutation CreatePlayersInfo(
    $input: CreatePlayersInfoInput!
    $condition: ModelPlayersInfoConditionInput
  ) {
    createPlayersInfo(input: $input, condition: $condition) {
      roomId
      times
      alives
      deads
      startTime
      gameState
      playersVotes
      werewolfVotes
      defenceTargets
      players {
        id
        userId
        userName
        position
        state
        actions
        vote
      }
    }
  }
`;
export const updatePlayersInfo = /* GraphQL */ `
  mutation UpdatePlayersInfo(
    $input: UpdatePlayersInfoInput!
    $condition: ModelPlayersInfoConditionInput
  ) {
    updatePlayersInfo(input: $input, condition: $condition) {
      roomId
      times
      alives
      deads
      startTime
      gameState
      playersVotes
      werewolfVotes
      defenceTargets
      players {
        id
        userId
        userName
        position
        state
        actions
        vote
      }
    }
  }
`;
export const deletePlayersInfo = /* GraphQL */ `
  mutation DeletePlayersInfo(
    $input: DeletePlayersInfoInput!
    $condition: ModelPlayersInfoConditionInput
  ) {
    deletePlayersInfo(input: $input, condition: $condition) {
      roomId
      times
      alives
      deads
      startTime
      gameState
      playersVotes
      werewolfVotes
      defenceTargets
      players {
        id
        userId
        userName
        position
        state
        actions
        vote
      }
    }
  }
`;
export const createPlayer = /* GraphQL */ `
  mutation CreatePlayer(
    $input: CreatePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    createPlayer(input: $input, condition: $condition) {
      id
      userId
      userName
      position
      state
      actions
      vote
    }
  }
`;
export const updatePlayer = /* GraphQL */ `
  mutation UpdatePlayer(
    $input: UpdatePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    updatePlayer(input: $input, condition: $condition) {
      id
      userId
      userName
      position
      state
      actions
      vote
    }
  }
`;
export const deletePlayer = /* GraphQL */ `
  mutation DeletePlayer(
    $input: DeletePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    deletePlayer(input: $input, condition: $condition) {
      id
      userId
      userName
      position
      state
      actions
      vote
    }
  }
`;
