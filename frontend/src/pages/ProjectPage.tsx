import React, { Component } from "react";
import { connect } from "react-redux";
import { AppState } from "../redux/store";
import { getProjects, addProject } from "../redux/actions/projectActions";
import { Project } from "../redux/types";

interface Props {
  projects: Project[];
  getProjects: () => void;
  addProject: (data: any) => void;
}

interface State {
  name: string;
  description: string;
}

class ProjectPage extends Component<Props, State> {
  state: State = {
    name: "",
    description: "",
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

  render() {
    return (
      <div>
        <h2>Projects</h2>

        <input
          name="name"
          placeholder="Project Name"
          value={this.state.name}
          onChange={this.handleChange}
        />

        <input
          name="description"
          placeholder="Description"
          value={this.state.description}
          onChange={this.handleChange}
        />

        <button onClick={this.handleSubmit}>Add</button>

        <ul>
          {this.props.projects.map((p) => (
            <li key={p._id}>
              {p.name} - {p.description}
            </li>
          ))}
        </ul>
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
