import { createReducer, createAction, combineReducers } from '@reduxjs/toolkit';
import * as config from '../config'

const selectedItem: string = ""
const loadedItems: config.itemsList = []

type stringAction = {
    type: string,
    payload: string
}

type updateListAction = {
    type: string,
    payload: config.itemsList
}

export const actionNames = {
    selectItem: "SELECT_ITEM",
    updateList: "UPDATE_LIST"
}

export const actions = {
    SelectItem: createAction<string>(actionNames.selectItem),
    UpdateList: createAction<config.itemsList>(actionNames.updateList)
}

const ItemSelector = (state = selectedItem, action: stringAction) => {
    const newState = (action.type === actionNames.selectItem) ? 
    action.payload : state
    return newState
}

const UpdateList = (state = loadedItems, action: updateListAction) => {
    const newState = (action.type === actionNames.updateList) ? 
    action.payload : state
    return newState
}

export const RootReducer = combineReducers ({
    selectedItem: ItemSelector,
    itemsList: UpdateList
})

export type RootState = ReturnType<typeof RootReducer>