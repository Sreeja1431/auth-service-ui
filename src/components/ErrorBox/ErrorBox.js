import React from 'react';

import './ErrorBox.scss';

const ErrorBox = (props) => {
    const errorList = [...props.errorList];

    return (
        <div id="error-box">
            <div className="root_error">
                <p>{props.errorMessage}</p>
                {errorList.length > 0 ? (
                    <div>
                        <ul className="errorList">
                            {errorList.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default ErrorBox;
