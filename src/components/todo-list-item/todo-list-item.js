import React, { Component } from 'react';
import './todo-list-item.css';

export default class TodoListItem extends Component {
    render() {
        const {
            label,
            onDeleted,
            onToggleImportant,
            onToggleDone,
            important,
            done,
        } = this.props; // props

        let classNames = 'todo-list-item';

        if (done) {
            classNames += ' done';
        }
        if (important) {
            classNames += ' important';
        }

        return (
            <span className={classNames}>
                {/* lists */}
                <span className='todo-list-item-label' onClick={onToggleDone}>
                    {label}
                </span>

                {/* buttons */}
                <button
                    onClick={onToggleImportant}
                    type='button'
                    className='btn btn-outline-success btn-sm float-right right-button'>
                    <i className='fa fa-exclamation' />
                </button>

                <button
                    onClick={onDeleted}
                    type='button'
                    className='btn btn-outline-danger btn-sm float-right left-button'>
                    <i className='fa fa-trash-o' />
                </button>
            </span>
        );
    }
}
