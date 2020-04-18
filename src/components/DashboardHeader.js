import {widgetsAPI} from "../capi";
import {Navbar, Nav, Dropdown, Modal, InputGroup, FormControl, Button} from "react-bootstrap";
import { dataSet} from "../data/timeseries";
import {Check, TextareaT, Grid3x3, Link, PencilSquare, CardList, PlusCircle, Trash} from "react-bootstrap-icons";
import React, {useState} from "react";
import {IconWrapperHeader} from "./IconWrapper";
import {CopyToClipboard} from 'react-copy-to-clipboard';

export const DashboardHeader = () => {

    const {editWidget, anyConfiguring, doneEditing, isDashboardCustom, makeDashboardCustom, persistState} = widgetsAPI({});
    const [mode, setMode] = useState("none");

    const save = () => {
        persistState();
        doneEditing();
    }


    return (
        <>
            {mode === "link" && <DashboardLinkModal onClose={()=>setMode("none")} />}
            {mode === "create" && <DashboardCreateModal onClose={()=>setMode("none")} />}
            {mode === "remove" && <DashboardRemoveModal onClose={()=>setMode("none")} />}
            <Navbar fixed="top" bg="dark" variant="dark" style={{height: 40}}>
                { !anyConfiguring &&
                    <>
                        <EditDropdown setMode={setMode}/>
                        <DashboardDropdown />
                    </>
                }
                { anyConfiguring &&
                    <EditModeNav />
                }
                <Navbar.Collapse className="justify-content-end">
                    {!anyConfiguring &&
                        <Navbar.Text>
                            <span style={{fontSize: 14}}>JHU data as of {dataSet.dateRange.last}</span>&nbsp;&nbsp;
                        </Navbar.Text>
                    }
                    {anyConfiguring &&
                        <Nav>
                            <Nav.Link onClick={save}>
                                <Check size={24} style={{marginTop: -4, marginRight: 3}}/>
                                <span className="dashboardMenu">Done</span>
                            </Nav.Link>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}
const EditModeNav = ({}) => {
    const {newWidget, setDataMode, setLayoutMode, anyConfiguringData, anyConfiguringLayout} = widgetsAPI({});
    return (
        <Nav className="mr-auto">
            <Nav.Link onClick={newWidget}>
                <PlusCircle size={13} style={{marginTop: -3, marginRight: 3}}/>
                <span className="dashboardMenu">
                    New Widget
                </span>
            </Nav.Link>
            {anyConfiguringData &&
                <Nav.Link onClick={setLayoutMode}>
                    <Grid3x3 size={12} style={{marginTop: -4, marginRight: 3}}/>
                    <span className="dashboardMenu">
                        Change Layout
                    </span>
                </Nav.Link>
            }
            {anyConfiguringLayout &&
                <Nav.Link onClick={setDataMode}>
                    <CardList size={16} style={{marginTop: -4, marginRight: 3}}/>
                    <span className="dashboardMenu">
                        Change Data
                    </span>
                </Nav.Link>
            }
        </Nav>
    );
}
const EditDropdown = ({setMode}) => {
    const {isDashboardCustom, setDataMode, addDashboard, makeDashboardCustom, editWidget, persistState} = widgetsAPI({});
    const edit = () => {
        if (!isDashboardCustom)
            makeDashboardCustom();
        setDataMode()
        editWidget();
        persistState();
    }
    const create = () => {
        addDashboard("My New Dashboard");
        setMode("create")
        editWidget();
        setDataMode()
    }

    return (
        <Dropdown id="DashboardDropDownMenu">
            <Dropdown.Toggle variant="dark"
                style={{backgroundColor: "transparent", border: "none", padding: 0, color: "transparent"}}
            >
                <IconWrapperHeader><PencilSquare size={20} style={{marginTop: -4}}/></IconWrapperHeader>
            </Dropdown.Toggle>
            <Dropdown.Menu >
                <Dropdown.Item onSelect={edit}>
                    <div className="menuDashboardItemTop">
                        <CardList size={14} style={{marginTop: -3, marginRight: 4}}/>
                        Edit Dashboard
                    </div>
                    <div className="menuDashboardItemBottom">Change countries and data</div>
                </Dropdown.Item>
                <Dropdown.Item onSelect={create}>
                    <div className="menuDashboardItemTop">
                        <PlusCircle size={13} style={{marginTop: -3, marginRight: 4}}/>
                        New Dashboard
                    </div>
                    <div className="menuDashboardItemBottom">Create an empty dashboard</div>
                </Dropdown.Item>
                {isDashboardCustom &&
                    <Dropdown.Item onSelect={() => setMode("remove")}>
                        <div className="menuDashboardItemTop">
                            <Trash size={16} style={{marginTop: -4, marginRight: 3}}/>
                            Remove Dashboard
                        </div>
                        <div className="menuDashboardItemBottom">Remove this dashboard from list</div>
                    </Dropdown.Item>
                }
                {isDashboardCustom &&
                    <Dropdown.Item onSelect={() => setMode("link")}>
                        <div className="menuDashboardItemTop">
                            <Link size={16} style={{marginTop: -4, marginRight: 3}}/>
                            Share Dashboard
                        </div>
                        <div className="menuDashboardItemBottom">Create a link you can share</div>
                    </Dropdown.Item>
                }
            </Dropdown.Menu>
        </Dropdown>
    );
}
const DashboardDropdown = () => {
    const {dashboards, name, setDashboardByName} = widgetsAPI({});
    return (
        <Dropdown >
            <Dropdown.Toggle variant="dark"
                             style={{backgroundColor: "transparent", border: "none", padding: 0}}
            >
                {name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {dashboards.map(d =>
                    <Dropdown.Item key={d.name} onSelect={() => setDashboardByName(d.name)}>
                        {d.name}
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    )
}

const DashboardLinkModal = ({onClose}) => {
    const {persistState, name, setName, link} = widgetsAPI({});
    const [mode, setMode] = useState("init")
    const formValues = {name: name}
    return (
        <Modal
            show={true}
            onHide={() => onClose()}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Share Your Dashboard
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                 {mode === 'init' &&
                     <React.Fragment>
                        <p>
                            Share this dashboard with someone else by sending them a link.
                            The dashboard you share will have the latest data.
                        </p>
                        <p style={{textAlign: "center"}}>
                            <br/>
                            Make sure name is descriptive
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        Name:
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl value={name}
                                    onChange={e => setName(e.target.value)}
                                    onBlur={persistState}
                                />
                            </InputGroup>
                        </p>
                        <p style={{textAlign: "center"}}>
                            <br/>
                             <CopyToClipboard
                                 onCopy={() => setMode("done")}
                                 options={{message: 'Whoa!'}}
                                 text={link}>
                                 <Button>Copy Link to Clipboard</Button>
                             </CopyToClipboard>
                         </p>
                     </React.Fragment>
                }
                {mode === 'done' &&
                    <p style={{textAlign: "center"}}>
                        Your link has been copied to the clipboard.  <br />
                        You can now paste it into any app.
                    </p>
                }
            </Modal.Body>
        </Modal>
    );
}
const DashboardRenameModal = ({onClose}) => {
    const {persistState, name, setName, link} = widgetsAPI({});
    const formValues = {name: name}
    return (
        <Modal
            show={true}
            onHide={() => onClose()}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Rename Your Dashboard
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p style={{textAlign: "center"}}>
                    <br/>
                    Change your dashboard name
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                Name:
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl value={name}
                                     onChange={e => setName(e.target.value)}
                                     onBlur={persistState}
                        />
                    </InputGroup>
                </p>
                <p style={{textAlign: "center"}}>
                    <br />
                    <Button variant="info" onClick={onClose}>Done</Button>
                </p>
            </Modal.Body>
        </Modal>
    );
}
const DashboardCreateModal = ({onClose}) => {
    const {persistState, name, setName, setDataMode} = widgetsAPI({});
    const [mode, setMode] = useState("init")
    const formValues = {name: name}
    const done = () => {persistState();onClose();setDataMode()}
    return (
        <Modal
            show={true}
            onHide={done}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Dashboard Created
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {mode === 'init' &&
                <React.Fragment>
                    <p>
                        You have a new dashboard!<br/>
                        You can edit it and can add widgets.
                    </p>
                    <p style={{textAlign: "center"}}>
                        <br/>
                        Give it a name if you like
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    Name:
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl value={name}
                                         onChange={e => setName(e.target.value)}
                                         onBlur={persistState}
                            />
                        </InputGroup>
                    </p>
                    <p style={{textAlign: "center"}}>
                        <br />
                        <Button variant="info" onClick={done}>Done</Button>
                    </p>
                </React.Fragment>
                }
                {mode === 'done' &&
                    <>
                        <p style={{textAlign: "center"}}>
                            Your link has been copied to the clipboard.  <br />
                            You can now paste it into any app.
                        </p>
                        <p style={{textAlign: "center"}}>
                            <br />
                            <Button variant="info" onClick={onClose}>Done</Button>
                        </p>
                    </>
                }
            </Modal.Body>
        </Modal>
    );
}
const DashboardRemoveModal = ({onClose}) => {
    const {persistState, name, removeDashboard} = widgetsAPI({});
    return (
        <Modal
            show={true}
            onHide={() => {persistState();onClose()}}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Remove Dashboard
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p style={{textAlign: "center"}}>
                    This dashboard will be removed from your list
                </p>
                <p style={{textAlign: "center"}}>
                    {name}
                </p>
                <p style={{textAlign: "center"}}>
                    <Button variant="info" onClick={() => {removeDashboard();persistState();onClose()}}>Remove</Button>
                </p>
            </Modal.Body>
        </Modal>
    );
}
