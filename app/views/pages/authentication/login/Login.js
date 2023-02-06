import React from 'react';
import {
  Button,
  Card,
  CardBody,
  Row,
  Col,
  FormGroup,
  Label,
  InputGroupAddon,
  InputGroupText,
  CardFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Mail, Lock, Eye, EyeOff } from 'react-feather';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import loginImg from '../../../../assets/img/pages/login.png';
import '../../../../assets/scss/pages/authentication.scss';
import {
  loginWithEmail,
  userRegister,
} from '../../../../redux/actions/auth/loginActions';
import { loginValidationSchema } from '../../../../middleware/validationSchema';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      inputVisibility: false,
      authMode: 'signIn',
    };
    const {
      label,
      hideIcon,
      showIcon,
      visible,
      className,
      htmlFor,
      placeholder,
      iconSize,
      ...rest
    } = props;
    this.loginStatus = this.loginStatus.bind(this);
    this.visibility = this.visibility.bind(this);
    this.changeAuthMode = this.changeAuthMode.bind(this);
  }

  userLogin = values => {
    this.setState({ isLoading: true });
    if (this.state.authMode == 'signIn') {
      this.props.loginWithEmail(
        values.email,
        values.password,
        this.loginStatus,
      );
    } else {
      this.props.userRegister(values, this.loginStatus);
    }
  };

  loginStatus() {
    this.setState({ isLoading: false });
  }

  changeAuthMode() {
    this.state.authMode == 'signIn'
      ? this.setState({ authMode: 'signUp' })
      : this.setState({ authMode: 'signIn' });
  }

  renderIcon = () => {
    const size = this.props.iconSize ? this.props.iconSize : 14;

    if (this.state.inputVisibility === true) {
      return this.props.hideIcon ? this.props.hideIcon : <Eye size={size} />;
    }
    return this.props.showIcon ? this.props.showIcon : <EyeOff size={size} />;
  };

  visibility() {
    this.setState(state => ({
      inputVisibility: !state.inputVisibility,
    }));
  }



  render() {
    return (
      <Row className="m-0 justify-content-center">
        <Col
          sm="8"
          xl="7"
          lg="10"
          md="8"
          className="d-flex justify-content-center"
        >
          <Card className="bg-authentication login-card rounded-0 mb-0 w-100">
            <Row className="m-0">
              <Col
                lg="6"
                className="d-lg-block d-none text-center align-self-center px-1 py-0"
              >
                <img src={loginImg} alt="loginImg" />
              </Col>
              <Col lg="6" md="12" className="p-0">
                <Card className="rounded-0 mb-0 px-2">
                  <CardBody>
                    <h4>
                      {this.state.authMode == 'signIn'
                        ? 'Login'
                        : 'Sign Up'}
                    </h4>
                    {this.state.authMode == 'signIn' && (
                      <p>Welcome back, please login to your account.</p>
                    )}
                    {this.state.authMode != 'signIn' && (
                      <p>After registration please login</p>
                    )}
                    <Formik
                      initialValues={{
                        email: '',
                        password: '',
                        fullName: '',
                      }}
                      validationSchema={loginValidationSchema}
                      onSubmit={values => {
                        this.userLogin(values);
                      }}
                    >
                      {({ errors, touched }) => (
                        <Form>
                          {this.state.authMode != 'signIn' && (
                            <FormGroup className="form-label-group position-relative has-icon-left">
                              <Field
                                name="fullName"
                                id="fullName"
                                type="text"
                                className={`form-control ${errors.fullName &&
                                  touched.fullName &&
                                  'is-invalid'}`}
                                placeholder="Full Name"
                              />
                              <Label>Full Name</Label>
                              {errors.fullName && touched.fullName ? (
                                <div className="text-danger">
                                  {errors.fullName}
                                </div>
                              ) : null}
                            </FormGroup>
                          )}
                          <FormGroup className="form-label-group position-relative has-icon-left">
                            <Field
                              name="email"
                              id="email"
                              type="email"
                              className={`form-control ${errors.email &&
                                touched.email &&
                                'is-invalid'}`}
                              placeholder="Email"
                            />
                            <div className="form-control-position">
                              <Mail size={15} />
                            </div>
                            <Label>Email</Label>
                            {errors.email && touched.email ? (
                              <div className="text-danger">
                                {errors.email}
                              </div>
                            ) : null}
                          </FormGroup>
                          <FormGroup className="form-label-group position-relative has-icon-left ">
                            <div className="input-group-merge input-group">
                              <Field
                                type={
                                  this.state.inputVisibility === false
                                    ? 'password'
                                    : 'text'
                                }
                                placeholder={
                                  this.props.placeholder
                                    ? this.props.placeholder
                                    : 'Password'
                                }
                                name="password"
                                id="password"
                                className={`form-control ${errors.password &&
                                  touched.password &&
                                  'is-invalid'}`}
                              />
                              <div className="form-control-position">
                                <Lock size={15} />
                              </div>
                              <InputGroupAddon
                                addonType="append"
                                onClick={this.visibility}
                              >
                                <InputGroupText className="cursor-pointer bg-tp">
                                  {this.renderIcon()}
                                </InputGroupText>
                              </InputGroupAddon>
                              {this.props.label ? (
                                <Label for={this.props.htmlFor}>
                                  {this.props.label}
                                </Label>
                              ) : null}
                            </div>
                            {errors.password && touched.password ? (
                              <div className="text-danger">
                                {errors.password}
                              </div>
                            ) : null}
                          </FormGroup>
                          {this.state.isLoading === true ? (
                            <div className="loading">
                              <div className="effect-1 effects" />
                              <div className="effect-2 effects" />
                              <div className="effect-3 effects" />
                            </div>
                          ) : (
                            <div>
                              <div className="float-md-left d-block mb-1">
                                <Button.Ripple
                                  className="mr-1"
                                  color="primary"
                                  type="submit"
                                >
                                  {this.state.authMode == 'signIn'
                                    ? 'Login'
                                    : 'Sign Up'}
                                </Button.Ripple>
                              </div>
                            </div>
                          )}
                        </Form>
                      )}
                    </Formik>
                  </CardBody>
                  <CardFooter>
                    {this.state.authMode == 'signIn' ? (
                      <p>
                        Not Registered yet?{' '}
                        <span
                          className="link-primary"
                          onClick={this.changeAuthMode}
                        >
                          Sign Up
                        </span>
                      </p>
                    ) : (
                      <p>
                        Already Registered ?{' '}
                        <span
                          className="link-primary"
                          onClick={this.changeAuthMode}
                        >
                          Sign In
                        </span>
                      </p>
                    )}
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    );
  }
}

Login.propTypes = {
  loginWithEmail: PropTypes.func,
  userRegister:PropTypes.func,
  hideIcon: PropTypes.bool,
  showIcon: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  visible: PropTypes.bool,
  className: PropTypes.string,
  htmlFor: PropTypes.string,
  iconSize: PropTypes.string,
};

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  { loginWithEmail,userRegister },
)(Login);
