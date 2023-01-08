import React, { Component } from "react";
import style from "./Home.module.css";
import GitHub from "./img/GitHub-Mark.png";

class QuienEsChoque extends Component {

    constructor(props) {
        super(props);
      }
    
    render() {
        return (
        <div className={style.container}>
            <p>Yo soy choque</p>
            
            <a href="https://www.soyhenry.com/" target="_blank">
                <img src={GitHub} alt="planeta" className={style.imagen2} />
            </a>
        </div>
    );
  }
}

export default QuienEsChoque;
