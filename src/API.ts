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
  werewolf: number,
  people: number,
};

export type ModelGameInfoConditionInput = {
  type?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  werewolf?: ModelIntInput | null,
  people?: ModelIntInput | null,
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
  werewolf?: number | null,
  people?: number | null,
};

export type DeleteGameInfoInput = {
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

export type ModelGameInfoFilterInput = {
  id?: ModelIDInput | null,
  type?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  werewolf?: ModelIntInput | null,
  people?: ModelIntInput | null,
  and?: Array< ModelGameInfoFilterInput | null > | null,
  or?: Array< ModelGameInfoFilterInput | null > | null,
  not?: ModelGameInfoFilterInput | null,
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
    werewolf: number,
    people: number,
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
    werewolf: number,
    people: number,
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
    werewolf: number,
    people: number,
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
    werewolf: number,
    people: number,
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
      werewolf: number,
      people: number,
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
    werewolf: number,
    people: number,
  } | null,
};

export type OnUpdateGameInfoSubscription = {
  onUpdateGameInfo:  {
    __typename: "GameInfo",
    id: string,
    type: string,
    owner: string,
    werewolf: number,
    people: number,
  } | null,
};

export type OnDeleteGameInfoSubscription = {
  onDeleteGameInfo:  {
    __typename: "GameInfo",
    id: string,
    type: string,
    owner: string,
    werewolf: number,
    people: number,
  } | null,
};
