/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <footer className="footer">
          <Container>
            <Row>
              <Col
                lg="4"
                xs="12"
                className="mb-0 mb-md-4 pb-0 pb-md-2"
                name="footercolumn"
              >
                <Link className="logo-footer">
                  <p>
                    Tecxar<span className="text-primary">.</span>
                  </p>
                </Link>
                <ul className="list-unstyled social-icon social mb-0 mt-4">
                  <li className="list-inline-item mr-1">
                    <Link to="" className="rounded">
                      <i className="mdi mdi-facebook" title="Facebook" />
                    </Link>
                  </li>
                  <li className="list-inline-item mr-1">
                    <Link to="" className="rounded">
                      <i className="mdi mdi-instagram" title="Instagram" />
                    </Link>
                  </li>
                  <li className="list-inline-item mr-1">
                    <Link to="" className="rounded">
                      <i className="mdi mdi-twitter" title="Twitter" />
                    </Link>
                  </li>
                </ul>
              </Col>

              <Col
                lg="2"
                md="4"
                xs="12"
                className="mt-4 mt-sm-0 pt-2 pt-sm-0"
                name="footercolumn"
              >
                <h4 className="footer-head">Company</h4>
                <ul className="list-unstyled footer-list mt-4" />
              </Col>

              <Col
                lg="3"
                md="4"
                xs="12"
                className="mt-4 mt-sm-0 pt-2 pt-sm-0"
                name="footercolumn"
              >
                <h4 className="footer-head">Usefull Links</h4>
                <ul className="list-unstyled footer-list mt-4" />
              </Col>

              <Col
                lg="3"
                md="4"
                xs="12"
                className="mt-4 mt-sm-0 pt-2 pt-sm-0"
                name="footercolumn"
              >
                <h4 className="footer-head">Usefull Links</h4>
                <ul className="list-unstyled footer-list mt-4" />
              </Col>
            </Row>
          </Container>
        </footer>
        <footer className="footer footer-bar">
          <Container className="text-center">
            <Row className="align-items-center">
              <Col sm="12">
                <div className="text-sm-center">
                  <p className="mb-0">© 2020-21 Tecxar.</p>
                </div>
              </Col>
            </Row>
          </Container>
        </footer>
      </React.Fragment>
    );
  }
}

export default Footer;
