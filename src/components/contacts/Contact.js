import React, { Component } from "react";
import PropTypes from "prop-types";
import { Consumer } from "../../context";
import axios from "axios";
import { Link } from "react-router-dom";

class Contact extends Component {
  state = {
    showContactInfo: false
  };

  handleDelete = async (id, dispatch) => {
    try {
      // ASYNC/AWAIT METHOD
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      dispatch({ type: "DELETE_CONTACT", payload: id });
    } catch (e) {
      dispatch({ type: "DELETE_CONTACT", payload: id });
    }

    // REGULAR AXIOS METHOD
    // axios
    //   .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
    //   .then(res => dispatch({ type: "DELETE_CONTACT", payload: id }));
  };

  render() {
    const { id, name, email, phone } = this.props.contact; // use destructuring to pull out contact details
    const { showContactInfo } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}
                <i
                  onClick={() =>
                    this.setState({
                      showContactInfo: !this.state.showContactInfo
                    })
                  }
                  className="fas fa-sort-down ml-1"
                  style={{ cursor: "pointer" }}
                />
                <div
                  style={{
                    float: "right"
                  }}
                >
                  <Link to={`contact/edit/${id}`}>
                    <i
                      className="fas fa-pencil-alt"
                      style={{
                        cursor: "pointer",
                        color: "black",
                        marginRight: "1rem"
                      }}
                    />
                  </Link>
                  <i
                    className="fas fa-times"
                    style={{
                      cursor: "pointer",
                      color: "red"
                    }}
                    onClick={this.handleDelete.bind(this, id, dispatch)}
                  />
                </div>
              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Contact;
