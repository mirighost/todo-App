import React, { Component } from 'react'

import AppHeader from '../app-header/index'
import SearchPanel from '../search-panel/index'
import TodoList from '../todo-list/index'
import ItemStatusFilter from '../item-status-filter/index';
import ItemAddForm from "../item-add-form/index"

import './app.css';

export default class App extends Component {

    // id of items
    maxId = 100;

    // items
    state = {
        todoData: [
            this.createTodoItem("Drink Coffee"),
            this.createTodoItem("Build Awesome App"),
            this.createTodoItem("Have a lunch"),
        ]
    };

    // create Item 
    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {

            const idx = todoData.findIndex((el) => el.id === id);

            const before = todoData.slice(0, idx); // elements in the left of deleted
            const after = todoData.slice(idx + 1); // elemetns in the right of deleted

            const newArray = [...before, ...after];

            return {
                todoData: newArray
            };
        });
    };

    // add item via button
    addItem = (text) => {
        let newItem = this.createTodoItem(text)

        this.setState(({ todoData }) => {
            const newArr = [
                ...todoData,
                newItem
            ];
            return {
                todoData: newArr
            };
        })
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);

        const oldItem = arr[idx];
        const newItem = {
            ...oldItem,
            [propName]: !oldItem[propName]
        };
        
        return [
            ...arr.slice(0, idx), // elements in the left of deleted
            newItem,
            ...arr.slice(idx + 1), // elemetns in the right of deleted
        ]
    }

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        })
    };

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };
        })
    };

    render() {
        const { todoData } = this.state

        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            < div className="todo-app" >
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel />
                    <ItemStatusFilter />
                </div>
                <TodoList
                    todos={todoData}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone} />
                <ItemAddForm
                    onItemAdded={this.addItem} />
            </div>
        );
    };
};