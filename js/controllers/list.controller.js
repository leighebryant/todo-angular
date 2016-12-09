(function() {
    'use strict';

    angular
    .module('todos-angular')
    .controller("TodosController", TodosController);

    TodosController.$inject = ["todosFactory"];


    function TodosController(todosFactory) {

      this.allTodos = todosFactory.todos;

      this.newTodo = { todo: '', completed: false, editing: false };

      this.addNewTodo = function addNewTodo(form) {
        if (form.$valid) {
          this.allTodos.push(this.newTodo);
          this.newTodo = {todo: '', completed: false, editing: false};
          todosFactory.edit(this.allTodos);
        }
      };

      this.completedTodo = function completedTodo() {
        todosFactory.edit(this.allTodos);
      };

      this.doneEditing = function doneEditing(event, todo) {
        if (event.keyCode === 13 || event.keyCode === 27) {
          todo.editing = false;
        }
      };

      this.deleteTodo = function deleteTodo(i) {
        this.allTodos.splice(i, 1);
        todosFactory.edit(this.allTodos);
      };

      this.itemsLeft = function itemsLeft() {
        var itemsLeftCount = 0;
        this.allTodos.forEach(function loopTodos(element) {
          if (!element.completed) {
            itemsLeftCount++;
          }
        });
        return itemsLeftCount;
      };

      this.allActive = true;
      this.completedActive = false;
      this.activeActive = false;

      this.showAll = function showAll() {
        this.filter = false;

        this.allActive = true;
        this.completedActive = false;
        this.activeActive = false;
      };

      this.showActive = function showActive() {
        this.filter = {completed: false};

        this.allActive = false;
        this.completedActive = false;
        this.activeActive = true;
      };

      this.showCompleted = function showCompleted() {
        this.filter = {completed: true};

        this.allActive = false;
        this.completedActive = true;
        this.activeActive = false;
      };

      this.clearCompleted = function clearCompleted(todos) {
        for (var index = todos.length - 1; index >= 0; index -= 1) {
          if (todos[index].completed) {
            todos.splice(index, 1);
          }
        }
        todosFactory.edit(todos);
      };

    }

})();
