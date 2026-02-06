import React, { Component } from "react";
import { connect } from "react-redux";
import { AppState } from "../redux/store";
import { getProjects, addProject } from "../redux/actions/projectActions";
import { Project } from "../redux/types";
import TaskPage from "./TaskPage";

import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

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
      <Box sx={{ p: 3, maxWidth: 1100, margin: "auto" }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Project Dashboard
        </Typography>

        <Card sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Create New Project
            </Typography>

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
              multiline
              rows={2}
            />

            <Button
              variant="contained"
              onClick={this.handleSubmit}
              sx={{ mt: 1 }}
            >
              Add Project
            </Button>
          </CardContent>
        </Card>

        {/* PROJECT LIST - FLEX BASED (NO GRID ERRORS) */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {this.props.projects.map((p) => (
            <Box
              key={p._id}
              sx={{
                width: { xs: "100%", md: "32%" },
              }}
            >
              <Card
                sx={{
                  cursor: "pointer",
                  borderRadius: 3,
                  border:
                    this.state.selectedProjectId === p._id
                      ? "2px solid #1976d2"
                      : "1px solid #ddd",
                }}
                onClick={() => this.selectProject(p._id)}
              >
                <CardContent>
                  <Typography variant="h6">{p.name}</Typography>

                  <Typography variant="body2" color="text.secondary">
                    {p.description}
                  </Typography>

                  <Button
                    size="small"
                    sx={{ mt: 1 }}
                    variant={
                      this.state.selectedProjectId === p._id
                        ? "contained"
                        : "outlined"
                    }
                  >
                    Open
                  </Button>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {this.state.selectedProjectId && (
          <Box sx={{ mt: 4 }}>
            <TaskPage projectId={this.state.selectedProjectId} />
          </Box>
        )}
      </Box>
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
