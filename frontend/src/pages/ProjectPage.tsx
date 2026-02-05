import React, { Component } from "react";
import { connect } from "react-redux";
import { AppState } from "../redux/store";
import { getProjects, addProject } from "../redux/actions/projectActions";
import { Project } from "../redux/types";
import TaskPage from "./TaskPage";

import { TextField, Button, Card, CardContent } from "@mui/material";

interface Props {
  projects: Project[];
  getProjects: () => void;
  addProject: (data: any) => void;
}

interface State {
  name: string;
  description: string;
  selectedProjectId: string | null;
}

class ProjectPage extends Component<Props, State> {
  state: State = {
    name: "",
    description: "",
    selectedProjectId: null,
  };

  componentDidMount() {
    this.props.getProjects();
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  handleSubmit = () => {
    this.props.addProject({
      name: this.state.name,
      description: this.state.description,
    });

    this.setState({ name: "", description: "" });
  };

  selectProject = (id: string) => {
    this.setState({ selectedProjectId: id });
  };

  render() {
    return (
      <div>
        <h2>Projects</h2>

        <Card>
          <CardContent>
            <TextField
              name="name"
              label="Project Name"
              value={this.state.name}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
            />

            <TextField
              name="description"
              label="Description"
              value={this.state.description}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
            />

            <Button variant="contained" onClick={this.handleSubmit}>
              Add Project
            </Button>
          </CardContent>
        </Card>

        <ul>
          {this.props.projects.map((p) => (
            <li key={p._id}>
              <span
                style={{ cursor: "pointer", color: "blue" }}
                onClick={() => this.selectProject(p._id)}
              >
                {p.name}
              </span>
            </li>
          ))}
        </ul>

        {this.state.selectedProjectId && (
          <TaskPage projectId={this.state.selectedProjectId} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  projects: state.projects,
});

export default connect(mapStateToProps, {
  getProjects,
  addProject,
})(ProjectPage);
