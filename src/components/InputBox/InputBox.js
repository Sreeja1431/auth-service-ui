import React, { PureComponent } from 'react';

import './InputBox.scss';

class inputBox extends PureComponent {
    render() {
        const {
            type,
            lableText,
            inputType,
            inputName,
            inputId,
            inputplaceholder,
            inputValue,
            isRequired,
            maxLen,
            textInput,
            errorField,
            handleChange,
            keyPress,
        } = this.props;

        function keyPressEvent(event) {
            if ((event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123)) {
                event.preventDefault();
            }
        }

        function keyPressHandler(event) {
            if (keyPress) {
                return keyPressEvent(event);
            }
            return true;
        }

        return (
            <div id="inputBox">
                <label className="usc-grid__col col-12 input-lable">
                    {lableText}
                    {isRequired ? '* ' : null}
                </label>
                <input
                    className={errorField ? 'input-box input-box-error' : 'input-box input-box-clean'}
                    type={inputType}
                    ref={textInput}
                    name={inputName}
                    id={inputId}
                    placeholder={inputplaceholder}
                    value={inputValue}
                    onChange={handleChange}
                    required
                    maxLength={maxLen}
                    onKeyPress={keyPressHandler}
                    type={type}
                />
            </div>
        );
    }
}

export default inputBox;
