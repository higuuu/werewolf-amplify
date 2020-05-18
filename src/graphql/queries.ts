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
export const listGameInfos = /* GraphQL */ `
  query ListGameInfos(
    $filter: ModelGameInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGameInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getPlayersInfo = /* GraphQL */ `
  query GetPlayersInfo($id: ID!) {
    getPlayersInfo(id: $id) {
      roomId
      times
      alives
      deads
      startTime
      gameState
      playersVotes
      werewolfVotes
      defenceTargets
      players
    }
  }
`;
export const listPlayersInfos = /* GraphQL */ `
  query ListPlayersInfos(
    $filter: ModelPlayersInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlayersInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        roomId
        times
        alives
        deads
        startTime
        gameState
        playersVotes
        werewolfVotes
        defenceTargets
        players
      }
      nextToken
    }
  }
`;
export const getPlayer = /* GraphQL */ `
  query GetPlayer($id: ID!) {
    getPlayer(id: $id) {
      id
      userId
      roomId
      userName
      position
      state
      actions
      vote
    }
  }
`;
export const listPlayers = /* GraphQL */ `
  query ListPlayers(
    $filter: ModelPlayerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlayers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        roomId
        userName
        position
        state
        actions
        vote
      }
      nextToken
    }
  }
`;
export const getPlayerByRoomId = /* GraphQL */ `
  query GetPlayerByRoomId(
    $roomId: String
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPlayerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getPlayerByRoomId(
      roomId: $roomId
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        roomId
        userName
        position
        state
        actions
        vote
      }
      nextToken
    }
  }
`;
