import React from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { getRequest } from "../../services/database.service";


class Side_Canvas extends React.Component {
    constructor(props) {
        super(props);
    }
    handleClose = ()=>{
        this.props.handleCanvasClose();
    }
    goToMyFavoriteList = ()=>{
        this.handleClose();
        this.props.goToMyFavoriteList();
    }
    handleLogout = ()=>{
        getRequest("/logout").then((return_data) => {
          if (return_data.status === 200) {
          } else {
              alert("could not logout");
          }
      });
    }

    render() {
      //const email = window.sessionStorage.getItem("email");
        return (
      <Offcanvas show={this.props.canvasIsShow} onHide={this.handleClose} className="off-canvas">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="off-canvas-title">Hello, <br/> username</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="off-canvas-body">
              <div>
                  <button className="off-canvas-btn" onClick={this.goToMyFavoriteList}>My Favorite Recipes List</button>
              </div>
              <div className="off-canvas-logout">
                  <button className="off-canvas-btn" onClick={this.handleLogout}>Logout</button>
              </div>
        </Offcanvas.Body>
      </Offcanvas>
        )
    }
}

export default Side_Canvas;