import {PasswordWrapper} from './style'
import {connect} from 'react-redux'

const Password = (props) => {
    return (
      <PasswordWrapper>
        <p>{props.hasChange ? 'true' : 'false'}</p>
        <div onClick={props.handleChangeTrue}>变true</div>
        <div onClick={props.handleChangeFalse}>变false</div>
      </PasswordWrapper>
    )
}

const mapStateToProps = (state) => {
  return {
    hasChange: state.password.hasChange
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChangeTrue() {
      const action = {
        type: "change_true"
      }
      dispatch(action)
    },
    handleChangeFalse() {
      const action = {
        type: "change_false"
      }
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Password)
