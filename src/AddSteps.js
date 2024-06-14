import { TextField, Button, Grid, makeStyles } from '@material-ui/core';
import React, { useState, useContext, useEffect } from "react";
import HeaderDivider from './components/headerWithDivider';
import { STEP_TYPE_OPTIONS, ACTION_TYPE_OPTIONS, OBJECTS_OPTIONS, SELECTOR_TYPE_OPTIONS } from './components/constants';
import { Autocomplete, MenuItem, IconButton, Tooltip } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 4
    },
    card: {
        padding: 8,
        width: '99%',
        boxShadow: '3px 3px 10px 3px #CECAC8'
    },
    cardGrid: {
        paddingLeft: 20,
        paddingTop: 5,
        paddingRight: 20,
        color: '#4A4A4A'
    },
    headerStyle: {
        marginTop: '0px',
        fontSize: '18px',
        fontWeight: '600'
    },
    stickToTop: {
        padding: '1% 2% 1% 2%',
        alignItems: 'center',
        marginLeft: '-0.6%'
    },
    inputStyle: {
        backgroundColor: 'white',
        borderRadius: '2px',
        border: '1px solid #DDDBDA'
    }
}));

export default function AddRule(props) {
    // const context = useContext(AppContext);
    const classes = useStyles();

    const [steps, setSteps] = useState({
        stepName: '',
        stepType: ''
    })

    const [stepBoxOpen, setStepBoxOpen] = useState(false)
    const [actionBoxOpen, setActionBoxOpen] = useState(false)

    const [formData, setFormData] = useState({
        scenarioName: '',
        tags: '',
        dataSource: { filepath: '', rowId: '' },
        beforeAll: [],
        beforeEach: [],
        steps: [],
        afterEach: [],
        afterAll: []
    })
    const [actions, setActions] = useState({
        actionType: '',
        selectorType: '',
        selector: '',
        occurance: '',
        x: '',
        y: '',
        value: ''
    })
    const [popupIsOpen, setPopupIsOpen] = useState(false)
    const [selectorTypeIndex, setSelectorTypeIndex] = useState(0)
    const [selectedOptions, setSelectedOptions] = useState([])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...steps, [name]: value });
    }

    const handleCheckboxChange = (e) => {
        console.log("hi")
    }
    const onSelectChange = (e) => {
        const { name, value } = e.target;
        setSteps({ ...steps, [name]: value });
    }
    const onActionChange = (e) => {
        const { name, value } = e.target
        setActions({ ...actions, [name]: value })
    }
    const onSelectorTypeChange = (e) => {
        const { name, value } = e.target
        setActions({ ...actions, [name]: value })
        setSelectorTypeIndex(SELECTOR_TYPE_OPTIONS.indexOf(actions.selectorType))
        setSelectedOptions(OBJECTS_OPTIONS[selectorTypeIndex])
    }

    const resetData = () => {
        setSteps({
            ...steps,
            stepName: '',
            stepType: ''
        })
        setActions({
            ...actions,

        })
    }

    return (
        <Grid container style={{ backgroundColor: "#fff" }}>
            <Grid container direction="row" className={classes.cardGrid}>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <h5 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3a546b', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif ', paddingTop: '1rem', width: '50%' }}> Add JSON </h5>
                    <Grid container direction="row-reverse" spacing={2} className={classes.stickToTop}>
                        <Grid item style={{ marginleft: '2%' }}>
                            <Button
                                variant="contained" color="primary" className="button"
                            // onClick={saveAndAdd}
                            >
                                Generate JSON
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained" color="secondary" className="button"
                            // onClick={resetData}
                            >
                                Reset
                            </Button>
                        </Grid>
                    </Grid>
                </div>

                <Grid container style={{ marginBottom: '2%' }}>
                    <HeaderDivider
                        title={
                            <div style={{ display: 'flex' }}>
                                <h3 className={classes.headerStyle}>Scenario Information</h3>
                            </div>
                        }
                    />
                    <Grid container direction="row" style={{ paddingLeft: '2%', paddingBottom: '20px' }}>
                        <Grid item xs={12} md={6} ls={6} xl={6}>
                            <div style={{ paddingBottom: '5px', paddingTop: '10px' }}>
                                Scenario Name
                                <span style={{ color: 'red' }}>*</span>
                            </div>
                            <TextField
                                margin='dense'
                                name="Scenario Name"
                                placeholder="Enter Scenario Name"
                                id="scenarioName"
                                type='text'
                                onChange={e => handleChange(e)}
                                value={formData.scenarioName}
                                variant='outlined'
                            />
                        </Grid>
                        <Grid item xs={12} md={6} ls={6} xl={6}>
                            <div style={{ paddingBottom: '5px', paddingTop: '10px' }}>
                                Tags
                                <span style={{ color: 'red' }}>*</span>
                            </div>
                            <TextField
                                margin='dense'
                                name="Tags"
                                placeholder="Enter Tags"
                                id="Tags"
                                type='text'
                                onChange={e => handleChange(e)}
                                value={formData.tags}
                                variant='outlined'
                            />
                        </Grid>
                        <Grid item xs={12} md={6} ls={6} xl={6}>
                            <div style={{ paddingBottom: '5px', paddingTop: '10px' }}>
                                Data Source - FilePath
                                <span style={{ color: 'red' }}>*</span>
                            </div>
                            <TextField
                                margin='dense'
                                name="filepath"
                                placeholder="Enter filepath"
                                type='text'
                                onChange={e => handleChange(e)}
                                value={formData.dataSource.filepath}
                                variant='outlined'
                            />
                        </Grid>
                        <Grid item xs={12} md={6} ls={6} xl={6}>
                            <div style={{ paddingBottom: '5px', paddingTop: '10px' }}>
                                Data Source - Row ID
                                <span style={{ color: 'red' }}>*</span>
                            </div>
                            <TextField
                                margin='dense'
                                name="rowId"
                                placeholder="Enter row ID"
                                type='text'
                                onChange={e => handleChange(e)}
                                value={formData.dataSource.rowId}
                                variant='outlined'
                            />
                        </Grid>
                        <Grid item xs={12} md={6} ls={6} xl={6}>
                            <div style={{ paddingBottom: '5px', paddingTop: '10px' }}>
                                Steps
                                <span style={{ color: 'red' }}>*</span>
                            </div>
                            {/* <ul>
                {formData.steps.map((step, index) => (
                  <li key={index} className="stepItem">
                    <span className="stepName">{step.stepName || `Step ${index + 1}`}</span>
                    <div className='stepActions'>
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
              </ul> */}
                            {stepBoxOpen ? <Grid className='step-dialog-container' container style={{ marginBottom: '2%' }}>
                                <HeaderDivider
                                    title={
                                        <div style={{ display: 'flex' }}>
                                            <h3 className={classes.headerStyle}>General Information</h3>
                                        </div>
                                    }
                                />
                                <Grid container direction="row" style={{ paddingLeft: '2%', paddingBottom: '20px' }}>
                                    <Grid item xs={12} md={4} ls={4} xl={4}>
                                        <div style={{ paddingBottom: '5px', paddingTop: '10px' }}>
                                            Step Name
                                            <span style={{ color: 'red' }}>*</span>
                                        </div>
                                        <TextField
                                            margin='dense'
                                            name="Step Name"
                                            placeholder="Enter Step Name"
                                            id="stepName"
                                            type='text'
                                            onChange={e => handleChange(e, 'stepName')}
                                            value={steps.stepName}
                                            variant='outlined'
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4} ls={4} xl={4}>
                                        <div style={{ paddingBottom: '5px', paddingTop: '10px' }}>
                                            Step Type
                                            <span style={{ color: 'red' }}>*</span>
                                        </div>
                                        <TextField
                                            select
                                            name="stepType"
                                            placeholder='Select Step Type'
                                            style={{ width: '300px' }}
                                            value={steps.stepType}
                                            onChange={onSelectChange}
                                        >
                                            {STEP_TYPE_OPTIONS.map((option) => (
                                                <MenuItem key={option} value={option}> {option} </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} md={4} ls={4} xl={4}>
                                        <div style={{ paddingBottom: '5px', paddingTop: '10px' }}>
                                            Step Type
                                            <span style={{ color: 'red' }}>*</span>
                                        </div>
                                        <Button
                                            variant="contained" color="primary" className="step-button"
                                            onClick={() => setStepBoxOpen(true)}
                                        >
                                            Add Action
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid> : <></>}
                            <Button
                                variant="contained" color="primary" className="step-button"
                                onClick={() => setStepBoxOpen(true)}
                            >
                                Add Step
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>



                {steps.stepType === 'UI' ? <Grid container style={{ marginBottom: '2%' }}>
                    <HeaderDivider
                        title={
                            <div style={{ display: 'flex' }}>
                                <h3 className={classes.headerStyle}>Actions</h3>
                            </div>
                        }
                    />
                    <Grid container direction="row" style={{ paddingLeft: '2%', paddingBottom: '20px' }}>
                        <Button
                            variant="contained" color="primary" className="button"
                            onClick={() => setPopupIsOpen(true)}
                        >
                            Add Action
                        </Button>
                    </Grid>
                </Grid> : <></>}

                {actionBoxOpen ? <Grid container style={{ backgroundColor: "#fff" }}>
                    <Grid container direction="row" className={classes.cardGrid}>
                        <Grid container style={{ marginBottom: '2%' }}>
                            <HeaderDivider
                                title={
                                    <div style={{ display: 'flex' }}>
                                        <h3 className={classes.headerStyle}>Action Type</h3>
                                    </div>
                                }
                            />
                            <Grid container direction="row" style={{ paddingLeft: '2%', paddingBottom: '20px' }}>
                                <Grid item xs={12} md={6} ls={6} xl={6}>
                                    <div style={{ paddingBottom: '5px', paddingTop: '10px' }}>
                                        Action Type
                                        <span style={{ color: 'red' }}>*</span>
                                    </div>
                                    <TextField
                                        select
                                        name="actionType"
                                        placeholder='Select Action Type'
                                        style={{ width: '300px' }}
                                        value={actions.actionType}
                                        onChange={onActionChange}
                                    >
                                        {ACTION_TYPE_OPTIONS.map((option) => (
                                            <MenuItem key={option} value={option}> {option} </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Grid>

                        {['click', 'dblclick', 'clear', 'clickAtPosition', 'hoverAtPosition', 'input'].includes(actions.actionType) ?
                            <Grid container style={{ marginBottom: '2%' }}>
                                <HeaderDivider
                                    title={
                                        <div style={{ display: 'flex' }}>
                                            <h3 className={classes.headerStyle}>More Information</h3>
                                        </div>
                                    }
                                />

                                <Grid container direction="row" style={{ paddingLeft: '2%', paddingBottom: '20px' }}>
                                    <Grid item xs={6} md={4} ls={4} xl={4}>
                                        <div style={{ paddingBottom: '5px', paddingTop: '10px' }}>
                                            Selector Type
                                            <span style={{ color: 'red' }}>*</span>
                                        </div>
                                        <TextField
                                            select
                                            name="selectorType"
                                            placeholder='Select Selector Type'
                                            style={{ width: '300px' }}
                                            value={actions.actionType}
                                            onChange={onSelectorTypeChange}
                                        >
                                            {SELECTOR_TYPE_OPTIONS.map((option) => (
                                                <MenuItem key={option} value={option}> {option} </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={6} md={8} ls={8} xl={8}>
                                        <div style={{ paddingBottom: '5px', paddingTop: '10px' }}>
                                            Select Objects
                                            <span style={{ color: 'red' }}>*</span>
                                        </div>
                                        {/* <BlumeSelect
                      width="200px"
                      data={selectedOptions}
                      // value={actions.selectorType}
                      placeholder='Select Selector Type'
                      // onChange={(e) => onActionChange(e, 'selectorType')}
                      style={{ overflow: 'initial' }}
                    /> */}
                                        <TextField
                                            select
                                            name="selectorType"
                                            placeholder='Select Selector Type'
                                            style={{ width: '300px' }}
                                            value={actions.actionType}
                                            onChange={onActionChange}
                                        >
                                            {selectedOptions.map((option) => (
                                                <MenuItem key={option} value={option}> {option} </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" style={{ paddingLeft: '2%', paddingBottom: '20px' }}>
                                    <Grid item xs={12} md={6} ls={6} xl={6}>
                                        <div style={{ paddingBottom: '5px', paddingTop: '10px' }}>
                                            Selector
                                            <span style={{ color: 'red' }}>*</span>
                                        </div>
                                        <TextField
                                            margin='dense'
                                            type='text'
                                            variant='outlined'
                                            id="selector"
                                            title="Selector"
                                            required={true}
                                            onChange={e => onActionChange(e, 'selector')}
                                            value={actions.selector}
                                            placeholder="Enter Selector"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" style={{ paddingLeft: '2%', paddingBottom: '20px' }}>
                                    {['click', 'dblclick', 'clear', 'input'].includes(actions.actionType) ?
                                        <Grid item xs={6} md={4} ls={4} xl={4}>
                                            <div style={{ paddingBottom: '5px', paddingTop: '10px' }}>
                                                Occurance
                                                <span style={{ color: 'red' }}>*</span>
                                            </div>
                                            <TextField
                                                id="occurance"
                                                title="Occurance"
                                                required={true}
                                                onChange={e => onActionChange(e, 'occurance')}
                                                value={actions.occurance}
                                                placeholder={'enter number'}
                                                variant='outlined'
                                            />
                                        </Grid> :
                                        <>
                                            <Grid item xs={6} md={4} ls={4} xl={4}>
                                                <div style={{ paddingBottom: '5px', paddingTop: '10px' }}>
                                                    X
                                                    <span style={{ color: 'red' }}>*</span>
                                                </div>
                                                <TextField
                                                    id="x"
                                                    title="X"
                                                    required={true}
                                                    onChange={e => handleChange(e, 'x')}
                                                    value={actions.x}
                                                    placeholder="Enter X"
                                                    variant='outlined'
                                                />
                                            </Grid>
                                            <Grid item xs={6} md={4} ls={4} xl={4}>
                                                <div style={{ paddingBottom: '5px', paddingTop: '10px' }}>
                                                    Y
                                                    <span style={{ color: 'red' }}>*</span>
                                                </div>
                                                <TextField
                                                    id="y"
                                                    title="Y"
                                                    required={true}
                                                    onChange={e => handleChange(e, 'y')}
                                                    value={actions.y}
                                                    placeholder="Enter Y"
                                                    variant='outlined'
                                                />
                                            </Grid>
                                        </>}
                                </Grid>
                            </Grid> : <></>}
                    </Grid>
                </Grid> : <></>}
            </Grid >
        </Grid >
    )
}