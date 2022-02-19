import React from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';


class Side_Canvas extends React.Component {
    constructor(props) {
        super(props);
    }
    handleClose = ()=>{
        this.props.handleCanvasClose();
    }

    render() {
      const email = window.sessionStorage.getItem("email");
        return (
      <Offcanvas show={this.props.canvasIsShow} onHide={this.handleClose} className="off-canvas">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="off-canvas-title">Hello, <br/> {email}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="off-canvas-body">
              <div>
                  <button className="off-canvas-btn">My Favorite Recipes List</button>
              </div>
        </Offcanvas.Body>
      </Offcanvas>
        )
    }
}

export default Side_Canvas;