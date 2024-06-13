import React, { useState } from 'react';
import { TextField, Button, IconButton, Tooltip } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StepDialog from './components/StepDialog';
import './styles.css';

const MainForm = () => {
    const [formData, setFormData] = useState({
        scenarioName: '',
        tags: '',
        dataSource: { filepath: '', rowId: '' },
        beforeAll: [],
        beforeEach: [],
        steps: [],
        afterEach: [],
        afterAll: []
    });

    const [isStepDialogVisible, setStepDialogVisible] = useState(false);
    const [editingStepIndex, setEditingStepIndex] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleChangeDataSource = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            dataSource: { ...formData.dataSource, [name]: value }
        });
    };

    const handleAddStep = () => {
        setStepDialogVisible(true);
        setEditingStepIndex(null);
    };

    const saveStep = (step) => {
        const steps = [...formData.steps];
        if (editingStepIndex === null) {
            steps.push(step);
        } else {
            steps[editingStepIndex] = step;
        }
        setFormData({ ...formData, steps });
        setStepDialogVisible(false);
    };

    const removeStep = (index) => {
        const steps = formData.steps.filter((_, i) => i !== index);
        setFormData({ ...formData, steps });
    };

    const editStep = (index) => {
        setEditingStepIndex(index);
        setStepDialogVisible(true);
    };

    const generateJson = () => {
        const data = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()),
        };
        const json = JSON.stringify(data, null, 2);
        console.log(json);
        // Here you can add the logic to download the JSON or display it as needed
    };

    return (
        <div className="mainFormContainer">
            <div className="mainForm">
                <div className="formField">
                    <label>Scenario Name:</label>
                    <TextField
                        margin="dense"
                        name="scenarioName"
                        placeholder="Enter scenario name"
                        type="text"
                        fullWidth
                        value={formData.scenarioName}
                        onChange={handleChange}
                        className="textField"
                    />
                </div>
                <div className="formField">
                    <label>Tags:</label>
                    <TextField
                        margin="dense"
                        name="tags"
                        placeholder="Enter tags (comma-separated)"
                        type="text"
                        fullWidth
                        value={formData.tags}
                        onChange={handleChange}
                        className="textField"
                    />
                </div>
                <div className="formField">
                    <label>Data Source - Filepath:</label>
                    <TextField
                        margin="dense"
                        name="filepath"
                        placeholder="Enter filepath"
                        type="text"
                        fullWidth
                        value={formData.dataSource.filepath}
                        onChange={handleChangeDataSource}
                        className="textField"
                    />
                </div>
                <div className="formField">
                    <label>Data Source - Row ID:</label>
                    <TextField
                        margin="dense"
                        name="rowId"
                        placeholder="Enter row ID"
                        type="text"
                        fullWidth
                        value={formData.dataSource.rowId}
                        onChange={handleChangeDataSource}
                        className="textField"
                    />
                </div>

                <div className="formField">
                    <label>Steps:</label>
                    <ul>
                        {formData.steps.map((step, index) => (
                            <li key={index} className="stepItem">
                                {step.stepName || `Step ${index + 1}`}
                                <div>
                                    <Tooltip title="Edit">
                                        <IconButton onClick={() => editStep(index)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton onClick={() => removeStep(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <Tooltip title="Add Step">
                        <div onClick={handleAddStep} style={{ cursor: 'pointer', display: 'inline-block' }}>
                            <IconButton>
                                <AddCircleIcon />
                            </IconButton>
                            <span>Add Step</span>
                        </div>
                    </Tooltip>
                </div>

                {isStepDialogVisible && (
                    <StepDialog
                        stepData={editingStepIndex !== null ? formData.steps[editingStepIndex] : {}}
                        onSave={saveStep}
                        onRemove={() => removeStep(editingStepIndex)}
                    />
                )}

                <Button variant="contained" color="primary" onClick={generateJson} className="button">
                    Generate JSON
                </Button>
            </div>
        </div>
    );
};

export default MainForm;