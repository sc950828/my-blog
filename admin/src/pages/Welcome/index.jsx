import {PureComponent} from 'react'
import {connect} from 'react-redux'

class Welcome extends PureComponent {

  render() {
    const {userInfo} = this.props
    return <div>欢迎你 {userInfo && userInfo.nick_name}</div>
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.get("user").get("userInfo")
  }
}

export default connect(mapStateToProps, null)(Welcome)
