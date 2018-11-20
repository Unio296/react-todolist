import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const DEFAULT_TODOS = [
  { title: "React" },
  { title: "就活" },
];

const Todo = (props) => {
  return(
    <li className="todo-item">
      <span>{props.todo.title}</span>
      <button onClick={() => props.onRemove(props.todo)}>x</button>
    </li>
  );
}
//型チェック 
Todo.propTypes = {
  todo: PropTypes.object,
  onRemove: PropTypes.func
}

const TodoList = (props) => {
  //propsからtodoのリストを生成
  const todoList = props.todos.map((todo, index) => {
    return (
      <Todo key={index} todo={todo} onRemove={props.onRemove} />
    );
  });

  //生成したtodoのリストを返す
  return(
    <React.Fragment>
      <h2 className="todolist-title">Todoリスト</h2>
      <ul className="todolist">
        {todoList}
      </ul>
    </React.Fragment>
  );
}

//型チェック　todosは配列
TodoList.propTypes = {
  todos: PropTypes.array
}

const TodoForm = (props) => {
  return (
    <form className="todo-form" onSubmit={props.onSubmit}>
      <TextField onChange={props.onChange} value={props.value} />
      <Button type="submit" variant="contained" color="default">追加</Button>
    </form>
  );
}

//型チェック
TodoForm.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string
}

class App extends Component {
  //初期化
  constructor(props){
    super(props);
    this.state = {
      todos: DEFAULT_TODOS,
      newTodo: ""
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }
  
  //入力を変更する
  onChange(e){
    const {value} = e.target;
    this.setState({ newTodo: value });
  }

  //入力を確定する
  onSubmit(e){
    e.preventDefault();

    const { newTodo, todos } = this.state;

    //何も入力されていない場合は何もしない
    if(!newTodo.trim()){
      return;
    }
    
    //更新するためにTodosをコピーする
    const newTodos = todos.slice();

    //入力したTodoをコピーしたTodosに追加
    newTodos.push({
      title: newTodo
    });

    //追加したTodosでStateを更新
    this.setState({
      todos: newTodos,
      newTodo: ""
    });
  }

  onRemove(todo){
    const {todos} = this.state;
    const index = todos.indexOf(todo);

    if(index > -1){
      let newTodos = todos.slice();

      newTodos.splice(index, 1);

      this.setState({ todos: newTodos });
    }

  }


  render() {
    return (
      <div className="todo-app">
        <TodoList todos={this.state.todos} onRemove={this.onRemove} />
        <TodoForm value={this.state.newTodo} onChange={this.onChange} onSubmit={this.onSubmit} />
      </div>
    );
  }
}



export default App;
