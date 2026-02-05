import React, { Component } from "react";
import { connect } from "react-redux";
import { AppState } from "../redux/store";
import { getTasks, addTask, completeTask } from "../redux/actions/taskActions";
import { Task } from "../redux/types";

interface Props {
  tasks: Task[];
  projectId: string;
  getTasks: (id: string) => void;
  addTask: (data: any) => void;
  completeTask: (id: string) => void;
}

interface State {
  title: string;
}

class TaskPage extends Component<Props, State> {
  state: State = {
    title: "",
  };

  componentDidMount() {
    this.props.getTasks(this.props.projectId);
  }

  handleAdd = () => {
    this.props.addTask({
      title: this.state.title,
      projectId: this.props.projectId,
    });

    this.setState({ title: "" });
  };

  render() {
    return (
      <div>
        <h3>Tasks</h3>

        <input
          value={this.state.title}
          onChange={(e) => this.setState({ title: e.target.value })}
          placeholder="Task title"
        />

        <button onClick={this.handleAdd}>Add Task</button>

        <ul>
          {this.props.tasks.map((t) => (
            <li key={t._id}>
              {t.title} - {t.completed ? "Done" : "Pending"}

              {!t.completed && (
                <button onClick={() => this.props.completeTask(t._id)}>
                  Complete
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  tasks: state.tasks,
});

export default connect(mapStateToProps, {
  getTasks,
  addTask,
  completeTask,
})(TaskPage);
