import React, { Component } from 'react';
import './todo-list-item.css'

export default class TodoListItem extends Component {

    // states
    state = {
        done: false,
        important: false
    }

    // line to list function
    onLabelClick = () => {
        this.setState(({ done }) => {
            return {
                done: !done
            };
        });
    };

    // important function
    onMarkImportant = () => {
        this.setState(({ important }) => {
            return {
                important: !important
            };
        });
    };

    render() {

        const { label, onDeleted } = this.props; // props
        const { done, important } = this.state;

        let classNames = 'todo-list-item';

        if (done) {
            classNames += ' done';
        };
        if (important) {
            classNames += ' important'
        };

        return (
            <span className={classNames}>

                {/* lists */}
                <span
                    className="todo-list-item-label"
                    onClick={this.onLabelClick} >
                    {label}
                </span>

                {/* buttons */}
                <button onClick={this.onMarkImportant} type="button"
                    className="btn btn-outline-success btn-sm float-right right-button">
                    <i className="fa fa-exclamation" />
                </button>

                <button onClick={onDeleted}
                    type="button"
                    className="btn btn-outline-danger btn-sm float-right left-button">
                    <i className="fa fa-trash-o" />
                </button>
            </span>
        );
    };
};