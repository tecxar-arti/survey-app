import React from 'react';
import {
  Card,
  CardBody,
  Button,
  FormGroup,
  Label,
  Row,
  Col,
  CardHeader,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../components/extras/spinner/Fallback-spinner';
import {
  getQuestions,
  createSurvey,
} from '../../redux/actions/auth/surveyActions';
import { Formik, Field, Form } from 'formik';
import { surveyFormValidationSchema } from '../../middleware/validationSchema';

class MyCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataState: [],
    };
  }
  componentWillMount() {
    this.props.getQuestions();
  }
  submitSurvey = values => {
    const resultArr = Object.entries(values);
    const dataFilter =
      resultArr &&
      resultArr.length > 0 &&
      resultArr.map(arr => {
        const finalVal = this.props.questions.filter(ques => ques.id == arr[0]);
        return finalVal;
      });
    const array = [];
    dataFilter &&
      dataFilter.length > 0 &&
      dataFilter.map(ques => {
        ques &&
          ques.length > 0 &&
          ques.map(val => {
            const quesId = val.id;
            array.push(quesId);
            return array;
          });
      });
    values.question = array;
    this.props.createSurvey(values);
  };
  render() {
    return (
      <React.Fragment>
        <div className="account-setting-wrapper">
          <Row>
            <Col lg="12" md="12">
              <Card>
                <CardHeader>Survey Form</CardHeader>
                <CardBody className="pt-2">
                  <div className="tab-content">
                    <div className="tab-pane active">
                      {this.props.questions === undefined ? (
                        <Spinner />
                      ) : (
                        <Formik
                          initialValues={{
                            email: '',
                            fullName: '',
                          }}
                          validationSchema={surveyFormValidationSchema}
                          onSubmit={(values, { resetForm }) => {
                            this.submitSurvey(values);
                            resetForm();
                          }}
                        >
                          {({ errors, touched }) => (
                            <Form>
                              <Row>
                                <Col lg="6" md="6">
                                  <FormGroup className="form-label-group position-relative">
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
                                </Col>
                                <Col lg="6" md="6">
                                  <FormGroup className="form-label-group position-relative">
                                    <Field
                                      name="email"
                                      id="email"
                                      type="email"
                                      className={`form-control ${errors.email &&
                                        touched.email &&
                                        'is-invalid'}`}
                                      placeholder="Email"
                                    />
                                    <div className="form-control-position" />
                                    <Label>Email</Label>
                                    {errors.email && touched.email ? (
                                      <div className="text-danger">
                                        {errors.email}
                                      </div>
                                    ) : null}
                                  </FormGroup>
                                </Col>
                              </Row>
                              {this.props.questions &&
                                this.props.questions.length > 0 &&
                                this.props.questions.map((ques, index) => {
                                  return (
                                    <>
                                      <div id="checkbox-group">
                                        {ques.question}
                                      </div>
                                      <Row>
                                        {ques.answers &&
                                          ques.answers.length > 0 &&
                                          ques.answers.map(ans => {
                                            return (
                                              <Col sm="3" md="3" lg="3">
                                                <div
                                                  role="group"
                                                  aria-labelledby="checkbox-group"
                                                >
                                                  <label>
                                                    <Field
                                                      type="checkbox"
                                                      name={ques.id}
                                                      value={ans}
                                                    />
                                                    {` ${ans} `}
                                                  </label>
                                                
                                                </div>
                                              </Col>
                                            );
                                          })}
                                      </Row>
                                    </>
                                  );
                                })}

                              <div className=" d-block mb-1">
                                <Button.Ripple
                                  className="mr-1"
                                  color="primary"
                                  type="submit"
                                >
                                  Submit
                                </Button.Ripple>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      )}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

MyCustomer.propTypes = {
  getQuestions: PropTypes.func,
  questions: PropTypes.object,
  createSurvey: PropTypes.func,
};

const mapStateToProps = state => ({
  questions: state.auth.survey.questions,
});
export default connect(
  mapStateToProps,
  { getQuestions, createSurvey },
)(MyCustomer);
