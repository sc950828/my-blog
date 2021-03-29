import { PureComponent } from 'react'
import { renderRouter} from '../../utils/renderRouter'

class Dashboard extends PureComponent {

  render() {
    const {routes} = this.props
    return (
      <div>
        {renderRouter(routes)}
      </div>
    )
  }
}

export default Dashboard
