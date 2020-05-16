/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTodoInput = {
  id?: string | null,
  name: string,
  description?: string | null,
};

export type ModelTodoConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelTodoConditionInput | null > | null,
  or?: Array< ModelTodoConditionInput | null > | null,
  not?: ModelTodoConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdateTodoInput = {
  id: string,
  name?: string | null,
  description?: string | null,
};

export type DeleteTodoInput = {
  id?: string | null,
};

export type CreateGameInfoInput = {
  id?: string | null,
  type: string,
  owner: string,
  ownerId: string,
  werewolf: number,
  villager: number,
  diviner: number,
  brave: number,
  people: number,
  players?: Array< string | null > | null,
  state?: string | null,
};

export type ModelGameInfoConditionInput = {
  type?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  ownerId?: ModelStringInput | null,
  werewolf?: ModelIntInput | null,
  villager?: ModelIntInput | null,
  diviner?: ModelIntInput | null,
  brave?: ModelIntInput | null,
  people?: ModelIntInput | null,
  players?: ModelStringInput | null,
  state?: ModelStringInput | null,
  and?: Array< ModelGameInfoConditionInput | null > | null,
  or?: Array< ModelGameInfoConditionInput | null > | null,
  not?: ModelGameInfoConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateGameInfoInput = {
  id: string,
  type?: string | null,
  owner?: string | null,
  ownerId?: string | null,
  werewolf?: number | null,
  villager?: number | null,
  diviner?: number | null,
  brave?: number | null,
  people?: number | null,
  players?: Array< string | null > | null,
  state?: string | null,
};

export type DeleteGameInfoInput = {
  id?: string | null,
};

export type CreatePlayersInfoInput = {
  roomId: string,
  times: number,
  alives?: Array< string | null > | null,
  deads?: Array< string | null > | null,
  startTime?: string | null,
  gameState?: string | null,
  playersVotes?: Array< string | null > | null,
  werewolfVotes?: Array< string | null > | null,
  defenceTargets?: Array< string | null > | null,
  players?: Array< string | null > | null,
};

export type ModelPlayersInfoConditionInput = {
  roomId?: ModelIDInput | null,
  times?: ModelIntInput | null,
  alives?: ModelStringInput | null,
  deads?: ModelStringInput | null,
  startTime?: ModelStringInput | null,
  gameState?: ModelStringInput | null,
  playersVotes?: ModelStringInput | null,
  werewolfVotes?: ModelStringInput | null,
  defenceTargets?: ModelStringInput | null,
  players?: ModelStringInput | null,
  and?: Array< ModelPlayersInfoConditionInput | null > | null,
  or?: Array< ModelPlayersInfoConditionInput | null > | null,
  not?: ModelPlayersInfoConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdatePlayersInfoInput = {
  roomId?: string | null,
  times?: number | null,
  alives?: Array< string | null > | null,
  deads?: Array< string | null > | null,
  startTime?: string | null,
  gameState?: string | null,
  playersVotes?: Array< string | null > | null,
  werewolfVotes?: Array< string | null > | null,
  defenceTargets?: Array< string | null > | null,
  players?: Array< string | null > | null,
};

export type DeletePlayersInfoInput = {
  id?: string | null,
};

export type CreatePlayerInput = {
  id?: string | null,
  userId?: string | null,
  roomId?: string | null,
  userName?: string | null,
  position?: string | null,
  state?: string | null,
  actions?: Array< string | null > | null,
  vote?: string | null,
};

export type ModelPlayerConditionInput = {
  userId?: ModelStringInput | null,
  roomId?: ModelStringInput | null,
  userName?: ModelStringInput | null,
  position?: ModelStringInput | null,
  state?: ModelStringInput | null,
  actions?: ModelStringInput | null,
  vote?: ModelStringInput | null,
  and?: Array< ModelPlayerConditionInput | null > | null,
  or?: Array< ModelPlayerConditionInput | null > | null,
  not?: ModelPlayerConditionInput | null,
};

export type UpdatePlayerInput = {
  id: string,
  userId?: string | null,
  roomId?: string | null,
  userName?: string | null,
  position?: string | null,
  state?: string | null,
  actions?: Array< string | null > | null,
  vote?: string | null,
};

export type DeletePlayerInput = {
  id?: string | null,
};

export type ModelTodoFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelTodoFilterInput | null > | null,
  or?: Array< ModelTodoFilterInput | null > | null,
  not?: ModelTodoFilterInput | null,
};

export type ModelGameInfoFilterInput = {
  id?: ModelIDInput | null,
  type?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  ownerId?: ModelStringInput | null,
  werewolf?: ModelIntInput | null,
  villager?: ModelIntInput | null,
  diviner?: ModelIntInput | null,
  brave?: ModelIntInput | null,
  people?: ModelIntInput | null,
  players?: ModelStringInput | null,
  state?: ModelStringInput | null,
  and?: Array< ModelGameInfoFilterInput | null > | null,
  or?: Array< ModelGameInfoFilterInput | null > | null,
  not?: ModelGameInfoFilterInput | null,
};

export type ModelPlayersInfoFilterInput = {
  roomId?: ModelIDInput | null,
  times?: ModelIntInput | null,
  alives?: ModelStringInput | null,
  deads?: ModelStringInput | null,
  startTime?: ModelStringInput | null,
  gameState?: ModelStringInput | null,
  playersVotes?: ModelStringInput | null,
  werewolfVotes?: ModelStringInput | null,
  defenceTargets?: ModelStringInput | null,
  players?: ModelStringInput | null,
  and?: Array< ModelPlayersInfoFilterInput | null > | null,
  or?: Array< ModelPlayersInfoFilterInput | null > | null,
  not?: ModelPlayersInfoFilterInput | null,
};

export type ModelPlayerFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelStringInput | null,
  roomId?: ModelStringInput | null,
  userName?: ModelStringInput | null,
  position?: ModelStringInput | null,
  state?: ModelStringInput | null,
  actions?: ModelStringInput | null,
  vote?: ModelStringInput | null,
  and?: Array< ModelPlayerFilterInput | null > | null,
  or?: Array< ModelPlayerFilterInput | null > | null,
  not?: ModelPlayerFilterInput | null,
};

export type CreateTodoMutationVariables = {
  input: CreateTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type CreateTodoMutation = {
  createTodo:  {
    __typename: "Todo",
    id: string,
    name: string,
    description: string | null,
  } | null,
};

export type UpdateTodoMutationVariables = {
  input: UpdateTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type UpdateTodoMutation = {
  updateTodo:  {
    __typename: "Todo",
    id: string,
    name: string,
    description: string | null,
  } | null,
};

export type DeleteTodoMutationVariables = {
  input: DeleteTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type DeleteTodoMutation = {
  deleteTodo:  {
    __typename: "Todo",
    id: string,
    name: string,
    description: string | null,
  } | null,
};

export type CreateGameInfoMutationVariables = {
  input: CreateGameInfoInput,
  condition?: ModelGameInfoConditionInput | null,
};

export type CreateGameInfoMutation = {
  createGameInfo:  {
    __typename: "GameInfo",
    id: string,
    type: string,
    owner: string,
    ownerId: string,
    werewolf: number,
    villager: number,
    diviner: number,
    brave: number,
    people: number,
    players: Array< string | null > | null,
    state: string | null,
  } | null,
};

export type UpdateGameInfoMutationVariables = {
  input: UpdateGameInfoInput,
  condition?: ModelGameInfoConditionInput | null,
};

export type UpdateGameInfoMutation = {
  updateGameInfo:  {
    __typename: "GameInfo",
    id: string,
    type: string,
    owner: string,
    ownerId: string,
    werewolf: number,
    villager: number,
    diviner: number,
    brave: number,
    people: number,
    players: Array< string | null > | null,
    state: string | null,
  } | null,
};

export type DeleteGameInfoMutationVariables = {
  input: DeleteGameInfoInput,
  condition?: ModelGameInfoConditionInput | null,
};

export type DeleteGameInfoMutation = {
  deleteGameInfo:  {
    __typename: "GameInfo",
    id: string,
    type: string,
    owner: string,
    ownerId: string,
    werewolf: number,
    villager: number,
    diviner: number,
    brave: number,
    people: number,
    players: Array< string | null > | null,
    state: string | null,
  } | null,
};

export type CreatePlayersInfoMutationVariables = {
  input: CreatePlayersInfoInput,
  condition?: ModelPlayersInfoConditionInput | null,
};

export type CreatePlayersInfoMutation = {
  createPlayersInfo:  {
    __typename: "PlayersInfo",
    roomId: string,
    times: number,
    alives: Array< string | null > | null,
    deads: Array< string | null > | null,
    startTime: string | null,
    gameState: string | null,
    playersVotes: Array< string | null > | null,
    werewolfVotes: Array< string | null > | null,
    defenceTargets: Array< string | null > | null,
    players: Array< string | null > | null,
  } | null,
};

export type UpdatePlayersInfoMutationVariables = {
  input: UpdatePlayersInfoInput,
  condition?: ModelPlayersInfoConditionInput | null,
};

export type UpdatePlayersInfoMutation = {
  updatePlayersInfo:  {
    __typename: "PlayersInfo",
    roomId: string,
    times: number,
    alives: Array< string | null > | null,
    deads: Array< string | null > | null,
    startTime: string | null,
    gameState: string | null,
    playersVotes: Array< string | null > | null,
    werewolfVotes: Array< string | null > | null,
    defenceTargets: Array< string | null > | null,
    players: Array< string | null > | null,
  } | null,
};

export type DeletePlayersInfoMutationVariables = {
  input: DeletePlayersInfoInput,
  condition?: ModelPlayersInfoConditionInput | null,
};

export type DeletePlayersInfoMutation = {
  deletePlayersInfo:  {
    __typename: "PlayersInfo",
    roomId: string,
    times: number,
    alives: Array< string | null > | null,
    deads: Array< string | null > | null,
    startTime: string | null,
    gameState: string | null,
    playersVotes: Array< string | null > | null,
    werewolfVotes: Array< string | null > | null,
    defenceTargets: Array< string | null > | null,
    players: Array< string | null > | null,
  } | null,
};

export type CreatePlayerMutationVariables = {
  input: CreatePlayerInput,
  condition?: ModelPlayerConditionInput | null,
};

export type CreatePlayerMutation = {
  createPlayer:  {
    __typename: "Player",
    id: string | null,
    userId: string | null,
    roomId: string | null,
    userName: string | null,
    position: string | null,
    state: string | null,
    actions: Array< string | null > | null,
    vote: string | null,
  } | null,
};

export type UpdatePlayerMutationVariables = {
  input: UpdatePlayerInput,
  condition?: ModelPlayerConditionInput | null,
};

export type UpdatePlayerMutation = {
  updatePlayer:  {
    __typename: "Player",
    id: string | null,
    userId: string | null,
    roomId: string | null,
    userName: string | null,
    position: string | null,
    state: string | null,
    actions: Array< string | null > | null,
    vote: string | null,
  } | null,
};

export type DeletePlayerMutationVariables = {
  input: DeletePlayerInput,
  condition?: ModelPlayerConditionInput | null,
};

export type DeletePlayerMutation = {
  deletePlayer:  {
    __typename: "Player",
    id: string | null,
    userId: string | null,
    roomId: string | null,
    userName: string | null,
    position: string | null,
    state: string | null,
    actions: Array< string | null > | null,
    vote: string | null,
  } | null,
};

export type GetTodoQueryVariables = {
  id: string,
};

export type GetTodoQuery = {
  getTodo:  {
    __typename: "Todo",
    id: string,
    name: string,
    description: string | null,
  } | null,
};

export type ListTodosQueryVariables = {
  filter?: ModelTodoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTodosQuery = {
  listTodos:  {
    __typename: "ModelTodoConnection",
    items:  Array< {
      __typename: "Todo",
      id: string,
      name: string,
      description: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetGameInfoQueryVariables = {
  id: string,
};

export type GetGameInfoQuery = {
  getGameInfo:  {
    __typename: "GameInfo",
    id: string,
    type: string,
    owner: string,
    ownerId: string,
    werewolf: number,
    villager: number,
    diviner: number,
    brave: number,
    people: number,
    players: Array< string | null > | null,
    state: string | null,
  } | null,
};

export type ListGameInfosQueryVariables = {
  filter?: ModelGameInfoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGameInfosQuery = {
  listGameInfos:  {
    __typename: "ModelGameInfoConnection",
    items:  Array< {
      __typename: "GameInfo",
      id: string,
      type: string,
      owner: string,
      ownerId: string,
      werewolf: number,
      villager: number,
      diviner: number,
      brave: number,
      people: number,
      players: Array< string | null > | null,
      state: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetPlayersInfoQueryVariables = {
  id: string,
};

export type GetPlayersInfoQuery = {
  getPlayersInfo:  {
    __typename: "PlayersInfo",
    roomId: string,
    times: number,
    alives: Array< string | null > | null,
    deads: Array< string | null > | null,
    startTime: string | null,
    gameState: string | null,
    playersVotes: Array< string | null > | null,
    werewolfVotes: Array< string | null > | null,
    defenceTargets: Array< string | null > | null,
    players: Array< string | null > | null,
  } | null,
};

export type ListPlayersInfosQueryVariables = {
  filter?: ModelPlayersInfoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPlayersInfosQuery = {
  listPlayersInfos:  {
    __typename: "ModelPlayersInfoConnection",
    items:  Array< {
      __typename: "PlayersInfo",
      roomId: string,
      times: number,
      alives: Array< string | null > | null,
      deads: Array< string | null > | null,
      startTime: string | null,
      gameState: string | null,
      playersVotes: Array< string | null > | null,
      werewolfVotes: Array< string | null > | null,
      defenceTargets: Array< string | null > | null,
      players: Array< string | null > | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetPlayerQueryVariables = {
  id: string,
};

export type GetPlayerQuery = {
  getPlayer:  {
    __typename: "Player",
    id: string | null,
    userId: string | null,
    roomId: string | null,
    userName: string | null,
    position: string | null,
    state: string | null,
    actions: Array< string | null > | null,
    vote: string | null,
  } | null,
};

export type ListPlayersQueryVariables = {
  filter?: ModelPlayerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPlayersQuery = {
  listPlayers:  {
    __typename: "ModelPlayerConnection",
    items:  Array< {
      __typename: "Player",
      id: string | null,
      userId: string | null,
      roomId: string | null,
      userName: string | null,
      position: string | null,
      state: string | null,
      actions: Array< string | null > | null,
      vote: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateTodoSubscription = {
  onCreateTodo:  {
    __typename: "Todo",
    id: string,
    name: string,
    description: string | null,
  } | null,
};

export type OnUpdateTodoSubscription = {
  onUpdateTodo:  {
    __typename: "Todo",
    id: string,
    name: string,
    description: string | null,
  } | null,
};

export type OnDeleteTodoSubscription = {
  onDeleteTodo:  {
    __typename: "Todo",
    id: string,
    name: string,
    description: string | null,
  } | null,
};

export type OnCreateGameInfoSubscription = {
  onCreateGameInfo:  {
    __typename: "GameInfo",
    id: string,
    type: string,
    owner: string,
    ownerId: string,
    werewolf: number,
    villager: number,
    diviner: number,
    brave: number,
    people: number,
    players: Array< string | null > | null,
    state: string | null,
  } | null,
};

export type OnUpdateGameInfoSubscription = {
  onUpdateGameInfo:  {
    __typename: "GameInfo",
    id: string,
    type: string,
    owner: string,
    ownerId: string,
    werewolf: number,
    villager: number,
    diviner: number,
    brave: number,
    people: number,
    players: Array< string | null > | null,
    state: string | null,
  } | null,
};

export type OnDeleteGameInfoSubscription = {
  onDeleteGameInfo:  {
    __typename: "GameInfo",
    id: string,
    type: string,
    owner: string,
    ownerId: string,
    werewolf: number,
    villager: number,
    diviner: number,
    brave: number,
    people: number,
    players: Array< string | null > | null,
    state: string | null,
  } | null,
};

export type OnCreatePlayersInfoSubscription = {
  onCreatePlayersInfo:  {
    __typename: "PlayersInfo",
    roomId: string,
    times: number,
    alives: Array< string | null > | null,
    deads: Array< string | null > | null,
    startTime: string | null,
    gameState: string | null,
    playersVotes: Array< string | null > | null,
    werewolfVotes: Array< string | null > | null,
    defenceTargets: Array< string | null > | null,
    players: Array< string | null > | null,
  } | null,
};

export type OnUpdatePlayersInfoSubscription = {
  onUpdatePlayersInfo:  {
    __typename: "PlayersInfo",
    roomId: string,
    times: number,
    alives: Array< string | null > | null,
    deads: Array< string | null > | null,
    startTime: string | null,
    gameState: string | null,
    playersVotes: Array< string | null > | null,
    werewolfVotes: Array< string | null > | null,
    defenceTargets: Array< string | null > | null,
    players: Array< string | null > | null,
  } | null,
};

export type OnDeletePlayersInfoSubscription = {
  onDeletePlayersInfo:  {
    __typename: "PlayersInfo",
    roomId: string,
    times: number,
    alives: Array< string | null > | null,
    deads: Array< string | null > | null,
    startTime: string | null,
    gameState: string | null,
    playersVotes: Array< string | null > | null,
    werewolfVotes: Array< string | null > | null,
    defenceTargets: Array< string | null > | null,
    players: Array< string | null > | null,
  } | null,
};

export type OnCreatePlayerSubscription = {
  onCreatePlayer:  {
    __typename: "Player",
    id: string | null,
    userId: string | null,
    roomId: string | null,
    userName: string | null,
    position: string | null,
    state: string | null,
    actions: Array< string | null > | null,
    vote: string | null,
  } | null,
};

export type OnUpdatePlayerSubscription = {
  onUpdatePlayer:  {
    __typename: "Player",
    id: string | null,
    userId: string | null,
    roomId: string | null,
    userName: string | null,
    position: string | null,
    state: string | null,
    actions: Array< string | null > | null,
    vote: string | null,
  } | null,
};

export type OnDeletePlayerSubscription = {
  onDeletePlayer:  {
    __typename: "Player",
    id: string | null,
    userId: string | null,
    roomId: string | null,
    userName: string | null,
    position: string | null,
    state: string | null,
    actions: Array< string | null > | null,
    vote: string | null,
  } | null,
};
