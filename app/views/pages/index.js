import PropTypes from 'prop-types';
import React from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import { connect } from 'react-redux';
import Spinner from '../../components/extras/spinner/Fallback-spinner';
import '../../assets/scss/plugins/tables/_agGridStyleOverride.scss';
import { ContextLayout } from '../../utility/context/Layout';
import {
  getSurveys,
  changeFormStatus,
} from '../../redux/actions/auth/surveyActions';
import Chip from '../../components/extras/chips/ChipComponent';
import { Edit } from 'react-feather';

class MySurvey extends React.Component {
  state = {
    loading: false,
    defaultColDef: {
      sortable: false,
      editable: false,
      resizable: true,
      suppressMenu: false,
      popOverVisible: true,
      selectedSurvey: null,
      showModal: false,
    },
    columnDefs: [
      {
        headerName: 'Name',
        field: 'fullName',
        filter: true,
      },
      {
        headerName: 'Email',
        field: 'email',
        filter: true,
      },
      {
        headerName: 'Actions',
        field: 'isApproved',
        filter: true,
        maxWidth: 300,
        cellRendererFramework: params => {
          return (
            <Row>
              <Col>
                <Chip
                  color={params.data.isApproved ? 'success' : 'danger'}
                  text={params.data.isApproved ? 'Approved' : 'Pending'}
                />
              </Col>
            </Row>
          );
        },
      },
      {
        headerName: 'Actions',
        width: 200,
        cellRendererFramework: params => (
          <>
            <button
              type="button"
              className="btn btn-icon btn-info"
              style={{ width: 72 }}
              onClick={() => {
                this.setState({
                  showModal: true,
                  selectedSurvey: params.data,
                });
              }}
            >
              <Edit size={36} />
            </button>
          </>
        ),
      },
    ],
  };

  componentWillMount() {
    this.props.getSurveys();
  }

  updateSearchQuery = val => {
    this.gridApi.setQuickFilter(val);
  };

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    window.innerWidth > 800
      ? params.api.sizeColumnsToFit()
      : params.columnApi.autoSizeColumns();
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  changeFormStatusData = data => {
    this.props.changeFormStatus(data);
  };

  render() {
    const { columnDefs, defaultColDef, loading } = this.state;
    return (
      <React.Fragment>
        <Modal
          isOpen={this.state.showModal}
          toggle={this.toggleModal}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={this.toggleModal}>Confirmation</ModalHeader>
          <ModalBody>
            <Row>
              <Col md="6">
                Email :
                {this.state.selectedSurvey
                  ? this.state.selectedSurvey.email
                  : ''}
              </Col>
              <Col md="6">
                Full Name :{' '}
                {this.state.selectedSurvey
                  ? this.state.selectedSurvey.fullName
                  : ''}
              </Col>
            </Row>

            {this.state.selectedSurvey &&
              this.state.selectedSurvey.surveyData &&
              this.state.selectedSurvey.surveyData.length > 0 &&
              this.state.selectedSurvey.surveyData.map((data, index) => {
                return (
                  <p>
                    Question {index + 1}: {data.question}
                    <br />
                    Answer {index + 1}: {data.answer}
                  </p>
                );
              })}
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                this.changeFormStatusData({
                  id: this.state.selectedSurvey && this.state.selectedSurvey.id,
                  status: true,
                });
                this.setState({ showModal: false });
              }}
            >
              Approve
            </Button>
            <Button
              color="danger"
              onClick={() => {
                this.changeFormStatusData({
                  id: this.state.selectedSurvey && this.state.selectedSurvey.id,
                  status: false,
                });
                this.setState({ showModal: false });
              }}
            >
              Disapprove
            </Button>
          </ModalFooter>
        </Modal>
        <Card className="overflow-hidden agGrid-card">
          <CardBody className="py-0">
            <div className="ag-theme-material w-100 my-2 ag-grid-table">
              <div className="d-flex flex-wrap justify-content-between align-items-center">
                <div className="d-flex flex-wrap justify-content-between mb-1">
                  <div className="table-input mr-1">
                    <Input
                      placeholder="Search..."
                      onChange={e => this.updateSearchQuery(e.target.value)}
                      value={this.state.value}
                    />
                  </div>
                </div>
              </div>
              {!this.props.allSurveys || loading ? (
                <Spinner />
              ) : (
                <ContextLayout.Consumer>
                  {() => (
                    <AgGridReact
                      gridOptions={{ suppressDragLeaveHidesColumns: true }}
                      defaultColDef={defaultColDef}
                      columnDefs={columnDefs}
                      rowData={
                        this.props.allSurveys !== undefined &&
                        this.props.allSurveys
                      }
                      onGridReady={this.onGridReady}
                      colResizeDefault="shift"
                      animateRows
                      floatingFilter
                      pagination
                      paginationPageSize={this.state.paginationPageSize}
                      pivotPanelShow="always"
                      onSelectionChanged={this.toggleDeleteButton}
                      enableRtl="rtl"
                    />
                  )}
                </ContextLayout.Consumer>
              )}
            </div>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

MySurvey.propTypes = {
  getSurveys: PropTypes.func,
  changeFormStatus: PropTypes.func,
  allSurveys: PropTypes.array,
};

const mapStateToProps = state => ({
  userRole: state.auth.login.loggedInUser,
  allSurveys: state.auth.survey.allSurveys,
});

export default connect(
  mapStateToProps,
  { getSurveys, changeFormStatus },
)(MySurvey);
