import React, { Component } from "react"

export default class Recipe extends Component {
    render() { 
        // destructuring the array
        const {
            image_url,
            title,
            source_url,
            publisher,
            recipe_id
        } = this.props.recipe;

        const{handleDetails} = this.props;

        return (
            // <div> div will be replaced by React.Fragment
            <React.Fragment>
                <div className="col-10 mx-auto col-md-6 col-lg-4 my-3">
                    <div className="card">
                        <img src={image_url} 
                        className="img-card-top"
                        style={{height:"14rem"}} 
                        alt="recipe"/>
                        <div className="card-body text-capitalize">
                            <h6>{title}</h6>
                            <h6 className="text-warning text-slanted"> provided by {publisher}</h6>
                        </div>
                        <div className="card-footer">
                            <button 
                                type="button"
                                className="btn btn-primary text-capitaize"
                                onClick={ () => handleDetails(0, recipe_id)}
                                >details
                            </button>
                                <a href={source_url} 
                                className="btn btn-success mx-2 text-capitalize"
                                target="_blank"
                                rel="noopener noreferrer"
                                >recipe url</a>
                                {/* download button pdf to be placed here */}

                        </div>
                    </div>
                </div>

            </React.Fragment>
            // </div>
        )
    }
}


// <div class="img">
//                      <img src="./src/Download-icon.png" class="img-fluid" alt="">
//                      <a href="./src/ch2_recursive_state_estimation.pdf" download="doc">
//                      <button type="button" class="btn btn-indigo btn-lg" style="float: right;">Download</button>
//                     </a>
//                 </div>