(function() {
    'use strict';

    angular
    .module('todos-angular')
    .factory("todosFactory", todosFactory);

    var todos = [];

    if (!localStorage.getItem('todosKey')) {
      localStorage.setItem('todosKey', angular.toJson(todos));
    }
    function editTodos(todos) {
      localStorage.setItem('todosKey', angular.toJson(todos));
    }

    function todosFactory() {
      return {
        todos: JSON.parse(localStorage.getItem('todosKey')),
        edit: editTodos
      };
    }

})();
