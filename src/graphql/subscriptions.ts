/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo {
    onCreateTodo {
      id
      name
      description
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo {
    onUpdateTodo {
      id
      name
      description
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo {
    onDeleteTodo {
      id
      name
      description
    }
  }
`;
export const onCreateGameInfo = /* GraphQL */ `
  subscription OnCreateGameInfo {
    onCreateGameInfo {
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
export const onUpdateGameInfo = /* GraphQL */ `
  subscription OnUpdateGameInfo {
    onUpdateGameInfo {
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
export const onDeleteGameInfo = /* GraphQL */ `
  subscription OnDeleteGameInfo {
    onDeleteGameInfo {
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
export const onCreatePlayersInfo = /* GraphQL */ `
  subscription OnCreatePlayersInfo {
    onCreatePlayersInfo {
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
export const onUpdatePlayersInfo = /* GraphQL */ `
  subscription OnUpdatePlayersInfo {
    onUpdatePlayersInfo {
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
export const onDeletePlayersInfo = /* GraphQL */ `
  subscription OnDeletePlayersInfo {
    onDeletePlayersInfo {
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
export const onCreatePlayer = /* GraphQL */ `
  subscription OnCreatePlayer {
    onCreatePlayer {
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
export const onUpdatePlayer = /* GraphQL */ `
  subscription OnUpdatePlayer {
    onUpdatePlayer {
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
export const onDeletePlayer = /* GraphQL */ `
  subscription OnDeletePlayer {
    onDeletePlayer {
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
