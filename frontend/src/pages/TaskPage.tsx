import React, { Component } from "react";
import { connect } from "react-redux";

import { AppState } from "../redux/store";
import { getTasks, addTask, completeTask } from "../redux/actions/taskActions";
import { Task } from "../redux/types";

import { TextField, Button, Card, CardContent } from "@mui/material";

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
    // ✔ use projectId from props (your original design)
    this.props.getTasks(this.props.projectId);
  }

  componentDidUpdate(prevProps: Props) {
    // ✔ reload tasks when project changes
    if (prevProps.projectId !== this.props.projectId) {
      this.props.getTasks(this.props.projectId);
    }
  }

  handleAdd = () => {
    this.props.addTask({
      title: this.state.title,
      projectId: this.props.projectId,   // ✔ correct
    });

    this.setState({ title: "" });
  };

  render() {
    return (
      <Card style={{ marginTop: 20 }}>
        <CardContent>
          <h3>Tasks</h3>

          <TextField
            label="Task title"
            value={this.state.title}
            onChange={(e) => this.setState({ title: e.target.value })}
            fullWidth
            margin="normal"
          />

          <Button variant="contained" onClick={this.handleAdd}>
            Add Task
          </Button>

          <ul>
            {this.props.tasks.map((t) => (
              <li key={t._id}>
                {t.title} - {t.completed ? "Done" : "Pending"}

                {!t.completed && (
                  <Button
                    size="small"
                    onClick={() => this.props.completeTask(t._id)}
                  >
                    Complete
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
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
