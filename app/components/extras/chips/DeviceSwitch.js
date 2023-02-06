import React from 'react';
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'reactstrap';
import Switch from 'react-switch';
import { connect } from 'react-redux';
import Chip from './ChipComponent';
import { changeDeviceStatus } from '../../../redux/actions/auth/deviceActions';

class DeviceSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      value: props.value,
      modalOpen: false,
    };
    this.statusChanged = this.statusChanged.bind(this);
  }

  toggleModal = () => {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen,
    }));
  };

  changeDeviceStatus(value) {
    this.setState({ isLoading: true, value });
    this.toggleModal();
    this.props.changeDeviceStatus(
      this.props.deviceID,
      value,
      this.statusChanged,
    );
  }

  statusChanged(_) {
    this.setState({ isLoading: false });
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modalOpen}
          toggle={this.toggleModal}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={this.toggleModal}>Confirmation</ModalHeader>
          <ModalBody className="modal-dialog-centered">
            Do you want to change the device status now?
            <br /> Your changes will be effective immediately.
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.toggleModal}>
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={() => {
                this.changeDeviceStatus(!this.state.value);
              }}
            >
              Confirm
            </Button>
          </ModalFooter>
        </Modal>
        <Row>
          <Col className="col-4" style={{ marginTop: '7px' }}>
            <Switch
              disabled={this.state.isLoading}
              offColor={this.props.isTagged ? '#ea5455' : '#d5d5d5'}
              onColor="#008000"
              onChange={this.toggleModal}
              checked={this.state.value}
            />
          </Col>
          <Col
            style={{
              marginTop: this.props.chipVisible && '10px',
              marginLeft: this.props.chipVisible && '5px',
            }}
          >
            <Chip
              color={
                this.props.isTagged
                  ? this.state.value
                    ? 'success'
                    : 'danger'
                  : '#d5d5d5'
              }
              text={
                this.props.isTagged
                  ? this.state.value
                    ? 'Active'
                    : 'Locked'
                  : 'Invalid'
              }
              disabled={!this.props.isTagged || this.state.isLoading}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { changeDeviceStatus },
)(DeviceSwitch);
