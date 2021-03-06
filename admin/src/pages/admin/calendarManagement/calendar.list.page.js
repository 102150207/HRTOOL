import React, { Component, Fragment } from "react";
import { Row, Col, Button, FormGroup, Label, Input } from "reactstrap";
import Datetime from "react-datetime";
import ModalInfo from "../../../components/modal/modal.info";
import Form from "react-validation/build/form";
import ModalConfirm from "../../../components/modal/modal.confirm";
import MultipleSelect from "../../../components/common/multiple.select";
import { getCalendarList } from "../../../actions/calendar.list.action";
import { getCalendarTypeList } from "../../../actions/calendar.type.list.action";
import { connect } from "react-redux";
import { toastSuccess, toastError, toastWarning } from "../../../helpers/toast.helper";
import ApiCalendar from "../../../api/api.calendar";
import { appConfig } from "../../../config/app.config";
import moment from "moment";
import FullCalendarCustom from "../../../components/common/full.calendar";
import RequestHelper from '../../../helpers/request.helper';
import CookieHelper from "../../../helpers/cookie.helper";

class CalendarListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowInfoModal: false,
            isShowDeleteModal: false,
            item: {},
            itemId: null,
            query: "",
            sortName: "type",
            isDesc: true,
            activeSort: "type",
            hubConnection: null,
            isEdit: false,
            currentUserId: null,
            userList: [],
            usesIdBefores: [],
            params: {
                dateStart: null,
                dateEnd: null
            }
        };
    }

    toggleModalInfo = async (item, title) => {
        if (this.state.isShowInfoModal) {
            await this.setState(prevState => ({
                isShowInfoModal: !prevState.isShowInfoModal,
                item: {},
            }));
        }
        else {
            await this.setState(prevState => ({
                isShowInfoModal: !prevState.isShowInfoModal,
                item: item || {},
                formTitle: title
            }));
        }
    };

    onModelChange = el => {
        let inputName = el.target.name;
        let inputValue = el.target.value;
        let item = Object.assign({}, this.state.item);
        item[inputName] = inputValue;
        this.setState({ item });
    };

    handleChangeUser = event => {
        var userIds = event.map(user => user.id);
        let item = {
            ...this.state.item,
            userIds,
            users: event
        };
        this.setState({
            item: item
        });
    };

    onDateStartChange = el => {
        let inputValue = el._d;
        let item = Object.assign({}, this.state.item);
        item["dateStart"] = inputValue;
        this.setState({ item });
    };

    onDateEndChange = el => {
        let inputValue = el._d;
        let item = Object.assign({}, this.state.item);
        item["dateEnd"] = inputValue;
        this.setState({ item });
    };

    showDetailModal = e => {
        let usesIdBefores = e.extendedProps.users.map((e) =>
            e.id
        );
        let title = e.title + " Detail";
        let item = Object.assign({}, e.extendedProps);
        item["id"] = e.publicId;
        this.setState({
            isEdit: false,
            usesIdBefores
        })
        this.toggleModalInfo(item, title);
    };

    onEditItem = () => {
        this.setState({
            isEdit: true
        })
    }

    showConfirmDelete = itemId => {
        this.setState(
            {
                itemId: itemId
            },
            () => this.toggleDeleteModal()
        );
    };

    toggleDeleteModal = () => {
        this.setState(prevState => ({
            isShowDeleteModal: !prevState.isShowDeleteModal
        }));
    };

    getCalendarList = () => {
        let sortName = this.state.sortName;
        let field = this.state.field;
        let params = Object.assign({}, this.state.params, {
            query: this.state.query,
            sortName: sortName,
            isDesc: this.state[field]
        });
        this.props.getCalendarList(params);
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.form.validateAll();
        this.saveCalendar();
    }

    saveCalendar = () => {
        let { id } = this.state.item;
        if (id) {
            this.updateCalendar();
        } else {
            this.addCalendar();
        }
    }

    showConfirmDelete = itemId => {
        this.setState(
            {
                itemId: itemId
            },
            () => this.toggleDeleteModal()
        );
    };

    addCalendar = async () => {
        try {
            let calendar = this.state.item;
            const { calendarTypeId, dateStart, dateEnd, userIds } = this.state.item;
            if (!calendarTypeId || !dateStart || !dateEnd || !userIds) {
                toastError("calendar null !!!");
                return;
            } else {
                await ApiCalendar.postCalendar(calendar);
                this.toggleModalInfo();
                this.getCalendarList();
                toastSuccess("The calendar has been created successfully");
                let nameSender = CookieHelper.getUser().JwtPayload.Name;
                this.props.hubConnectionCalendar.invoke("sendMessage", nameSender, userIds, calendar.description, appConfig.calendar_add)
                    .catch((err) => {
                        console.log(err);
                    })
            }
        } catch (err) {
            throw (err);
        }
    };

    updateCalendar = async () => {
        const {
            id,
            dateStart,
            dateEnd,
            calendarTypeId,
            description
        } = this.state.item;
        var userIds = this.state.item.users.map(data => data.id);
        const calendar = {
            id,
            dateStart,
            dateEnd,
            calendarTypeId,
            description,
            userIds
        };
        const {
            usesIdBefores
        } = this.state;
        try {
            await ApiCalendar.updateCalendar(calendar);
            this.toggleModalInfo();
            this.getCalendarList();
            let nameSender = CookieHelper.getUser().JwtPayload.Name;
            this.props.hubConnectionCalendar.invoke("sendUpdate", nameSender, userIds, usesIdBefores, calendar.description, appConfig.calendar_update)
                .catch((err) => {
                    console.log(err);
                })
            toastSuccess("The calendar has been updated successfully");
        } catch (err) {
            throw (err)
        }
    };

    deleteCalendar = async () => {
        try {
            await ApiCalendar.deleteCalendar(this.state.itemId);
            this.toggleDeleteModal();
            this.getCalendarList();
            this.toggleModalInfo();
            toastSuccess("The Calendar has been deleted successfully");
        } catch (err) {
            throw (err)
        }
    };

    showAddNew = e => {
        this.setState({
            isEdit: true
        })
        let myDate = new Date();
        let currentDate = new Date(e.date)
        if (currentDate.setDate(currentDate.getDate() + 1) <= myDate) {
            toastWarning("You cannot create calendar on this day!");
        } else {
            let title = "Create Calendar";
            let item = {
                dateStart: new Date(e.date),
                dateEnd: ""
            };
            this.toggleModalInfo(item, title);
        }
    };

    getUserList = () => {
        let params = Object.assign({}, {
            query: this.state.query
        });
        RequestHelper.get(appConfig.apiUrl + "users/all-users", params).then(result => {
            this.setState({
                userList: result,
            })
        });
    };

    showConfirmDelete = itemId => {
        this.setState(
            {
                itemId: itemId
            },
            () => this.toggleDeleteModal()
        );
    };

    toggleDeleteModal = () => {
        this.setState(prevState => ({
            isShowDeleteModal: !prevState.isShowDeleteModal
        }));
    };

    changeDateFunc = (range) => {
        let dateStart = new Date(range.start.toISOString().slice(0, -1)).toISOString().slice(0, -1);
        let dateEnd = new Date(range.end.toISOString().slice(0, -1)).toISOString().slice(0, -1);
        let params = {
            dateStart,
            dateEnd
        }
        this.setState({
            params
        },
            () => this.getCalendarList()
        );
    };

    componentDidMount = async () => {
        let currentUserId = await CookieHelper.getUser();
        this.setState({
            currentUserId: currentUserId.JwtPayload.UserId
        })
        // this.props.hubConnectionCalendar.on('Receive', (nameSender, idUsers, secalendarDescription, type) => {
        //     this.getCalendarList();
        // });
        this.props.getCalendarTypeList(null);
        this.getCalendarList();
        this.getUserList();
    };

    render() {
        const { calendarTypeList } = this.props.calendarTypeList;
        const { calendarList } = this.props.calendarList;
        const { isShowDeleteModal, isShowInfoModal, item, isEdit, currentUserId } = this.state;
        return (
            <div className="animated fadeIn">
                <ModalConfirm
                    clickOk={this.deleteCalendar}
                    isShowModal={isShowDeleteModal}
                    toggleModal={this.toggleDeleteModal}
                />

                <ModalInfo
                    size="lg"
                    title={this.state.formTitle}
                    isShowModal={isShowInfoModal}
                    hiddenFooter
                >
                    <div className="modal-wrapper">
                        <div className="form-wrapper">
                            <Form
                                onSubmit={e => this.onSubmit(e)}
                                ref={c => { this.form = c }}>

                                {isEdit &&
                                    <Fragment>
                                        <Row>
                                            <Col xs="6" sm="6" md="6" lg="6">
                                                <FormGroup>
                                                    <Label for="exampleDate">
                                                        <strong>Calendar Type:</strong>
                                                    </Label>
                                                    <select
                                                        value={item.calendarTypeId}
                                                        onChange={this.onModelChange}
                                                        className="custom-select"
                                                        name="calendarTypeId" >
                                                        <option value="">Choose calendar type</option>
                                                        {calendarTypeList && calendarTypeList.length > 0
                                                            ? calendarTypeList.map(item => (
                                                                <option key={item.id} value={item.id}>
                                                                    {item.name}
                                                                </option>
                                                            ))
                                                            : null}
                                                    </select>
                                                </FormGroup>
                                            </Col>

                                            <Col xs="6" sm="6" md="6" lg="6">
                                                <FormGroup>
                                                    <MultipleSelect
                                                        title="Assigned User"
                                                        type="select"
                                                        name="Name"
                                                        placeholder="Multiple Choose"
                                                        options={this.state.userList || []}
                                                        labelField="name"
                                                        valueField="id"
                                                        value={item.users}
                                                        onChange={this.handleChangeUser}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        {/* Start Day */}
                                        <Row>
                                            <Col xs="3" sm="3" md="3" lg="3">
                                                <FormGroup>
                                                    <Label for="examplePassword">
                                                        {" "}
                                                        <strong>Date Start: </strong>
                                                    </Label>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="9" sm="9" md="9" lg="9">
                                                <FormGroup>
                                                    <Datetime
                                                        defaultValue={moment(item.dateStart).format(
                                                            "DD-MM-YYYY HH:mm a"
                                                        )}
                                                        dateFormat="DD-MM-YYYY"
                                                        timeFormat="HH:mm A"
                                                        onChange={this.onDateStartChange}
                                                        isValidDate={current => {
                                                            if (item.dateEnd) {
                                                                return current.isBetween(
                                                                    item.dateStart,
                                                                    moment(item.dateEnd).add("day")
                                                                );
                                                            } else {
                                                                var yesterday = Datetime.moment().subtract(
                                                                    1,
                                                                    "day"
                                                                );
                                                                return current.isAfter(yesterday);
                                                            }
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        {/* End Day */}
                                        <Row>
                                            <Col xs="3" sm="3" md="3" lg="3">
                                                <FormGroup>
                                                    <Label for="examplePassword">
                                                        <strong>Date End: </strong>{" "}
                                                    </Label>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="9" sm="9" md="9" lg="9">
                                                <FormGroup>
                                                    <Datetime
                                                        defaultValue={
                                                            item.dateEnd
                                                                ? moment(item.dateEnd).format(
                                                                    "DD-MM-YYYY HH:mm A"
                                                                )
                                                                : ""
                                                        }
                                                        dateFormat="DD-MM-YYYY"
                                                        timeFormat="HH:mm A"
                                                        onChange={this.onDateEndChange}
                                                        isValidDate={current => {
                                                            return current.isAfter(
                                                                moment(item.dateStart).subtract(1, "day")
                                                            );
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <Label for="exampleText">
                                                        <strong> Description:</strong>
                                                    </Label>
                                                    <Input
                                                        type="textarea"
                                                        onChange={this.onModelChange}
                                                        value={item && item.description ? item.description : ''}
                                                        name="description"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Fragment>
                                }

                                {!isEdit && item.calendarType && item.calendarType.name === 'Interview' ?
                                    <div>
                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <div>
                                                        <strong><i className="fa fa-users" aria-hidden="true"></i>Reporter: </strong> {item.reporter ? item.reporter.name : null}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <div><strong><i className="fa fa-users" aria-hidden="true"></i>Interviewers: </strong>
                                                        {item.users ? item.users.map((user, i) => {
                                                            return (
                                                                //  <Badge outline="true" style={{"color":user.color, "backgroundColor":"white", "fontSize":"15px"}} pill key={i}>
                                                                user.name
                                                                //  </Badge>
                                                            )
                                                        }).join(", ") : ''} </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <div>
                                                        <strong> <i className="fa fa-user" aria-hidden="true"></i>Candidate: </strong>
                                                        {item.interviews ? item.interviews[0].candidate.name : ""}
                                                    </div>
                                                </FormGroup>

                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <div> <strong><i className="fa fa-clock-o" aria-hidden="true"></i> Date Start: </strong> {moment(item.dateStart).format("HH:mm A DD-MM-YYYY")} </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <div> <strong> <i className="fa fa-clock-o" aria-hidden="true"></i> Date End: </strong> {item.dateEnd ? moment(item.dateEnd).format("HH:mm A DD-MM-YYYY") : ""} </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <div>
                                                        <strong> <i className="fa fa-star" aria-hidden="true"></i>Status: </strong>
                                                        {item.interviews ? (item.interviews[0].status === 2 ? "Waiting" : item.interviews[0].status === 3 ? "Passed" : item.interviews[0].status === 4 ? "Failed" : "Pending") : ""}
                                                    </div>
                                                </FormGroup>

                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <div> <strong> <i className="fa fa-sticky-note-o" aria-hidden="true"></i> Description: </strong><p style={{"padding":"5px"}}>{item ? item.description : 'Not Comment'} </p> </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <FormGroup>
                                            <Label ><strong><i className="fa fa-paperclip" aria-hidden="true"></i> Attachments: </strong></Label>
                                            {item.interviews[0] && item.interviews[0].attachments ? item.interviews[0].attachments.map((attachment, i) => {
                                                return (
                                                    <Fragment key={i}>
                                                        <br />
                                                        <a href={attachment.link} target="_blank" rel="noopener noreferrer" download>
                                                            <i className="fa fa-download" aria-hidden="true"> {`${attachment.fileName}${attachment.extension}`}  </i>
                                                        </a>
                                                    </Fragment>
                                                )
                                            }) : ""}
                                        </FormGroup>
                                    </div>
                                    : !isEdit &&
                                    <div>
                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <div>
                                                        <strong><i className="fa fa-users" aria-hidden="true"></i>Reporter: </strong> {item.reporter ? item.reporter.name : null}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <div>
                                                        <strong><i className="fa fa-users" aria-hidden="true"></i>Assigned User:</strong> {item.users ? item.users.map((user, i) => {
                                                            return (
                                                                //   <Badge outline="true" color={rand < 1 ? "primary" : rand <= 2 ? "success" : rand <= 3 ? "warning" : rand <= 4 ? "info" : "danger"} pill key={i}>
                                                                user.name
                                                                //  </Badge>
                                                            )
                                                        }).join(", ") : ''}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <div> <strong><i className="fa fa-clock-o" aria-hidden="true"></i>Date Start: </strong> {moment(this.state.item.dateStart).format("HH:mm A DD-MM-YYYY")} </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <div> <strong><i className="fa fa-clock-o" aria-hidden="true"></i>Date End: </strong> {this.state.item.dateEnd ? moment(this.state.item.dateEnd).format("HH:mm A DD-MM-YYYY") : ""} </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <div> <strong><i className="fa fa-sticky-note-o" aria-hidden="true"></i> Description: </strong><p style={{"padding":"5px"}}>{item ? item.description : ''}</p> </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                }

                                <div className="text-center">
                                    {isEdit &&
                                        <Button className=" btn-primary" type="submit">
                                            Confirm
                                    </Button>
                                    }
                                    <Button className={`btn-danger ${!isEdit && "fa fa-chevron-up"}`} onClick={this.toggleModalInfo}>
                                        {isEdit ? "Cancel" : ""}
                                    </Button>
                                    {!isEdit && item.calendarType
                                        && item.calendarType.name !== 'Interview' && item.reporter
                                        && currentUserId === item.reporter.id &&
                                        < Button className="btn btn-primary fa fa-pencil" onClick={this.onEditItem}>
                                        </Button>}
                                    {!isEdit && item.calendarType
                                        && item.calendarType.name !== 'Interview' && item.reporter
                                        && currentUserId === item.reporter.id &&
                                        < Button className="btn btn-danger fa fa-trash" onClick={() => this.showConfirmDelete(item.id)}>
                                        </Button>}
                                </div>
                            </Form>
                        </div>
                    </div>
                </ModalInfo>

                <div className="animated fadeIn">
                    <Row>
                        <Col>
                            <FullCalendarCustom
                                height={800}
                                calendars={calendarList}
                                eventClick={e => this.showDetailModal(e)}
                                handleClick={e => this.showAddNew(e)}
                                changeDate={this.changeDateFunc}
                            />
                        </Col>
                    </Row>
                </div>
            </div >
        );
    }
}

export default connect(
    state => ({
        calendarList: state.calendarList,
        calendarTypeList: state.calendarTypeList,
        hubConnectionCalendar: state.hubConnectionCalendar.hubConnectionCalendar
    }),
    {
        getCalendarList,
        getCalendarTypeList
    }
)(CalendarListPage);
