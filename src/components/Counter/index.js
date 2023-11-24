import {Component} from 'react'
import {FaAngleLeft, FaAngleRight} from 'react-icons/fa'
import './index.css'

const totalPages = 4
const page = 1

class Counter extends Component {
  state = {currentPage: page}

  onClickLeftSide = () => {
    const {pageChangeFunction} = this.props
    const {currentPage} = this.state
    if (currentPage > 1) {
      this.setState(
        prevState => ({
          currentPage: prevState.currentPage - 1,
        }),
        pageChangeFunction(currentPage - 1),
      )
    }
  }

  onClickRightSide = () => {
    const {pageChangeFunction} = this.props
    const {currentPage} = this.state
    if (currentPage < totalPages) {
      this.setState(
        prevState => ({
          currentPage: prevState.currentPage + 1,
        }),
        pageChangeFunction(currentPage + 1),
      )
    }
  }

  render() {
    const {currentPage} = this.state
    return (
      <div className="pagination-container">
        <button
          type="button"
          onClick={this.onClickLeftSide}
          className="left-btn"
        >
          {}
          <FaAngleLeft className="angle-icon" />
        </button>
        <div className="pagination-num">
          <span className="pagination-num">{currentPage}</span> of 4
        </div>
        <button
          type="button"
          onClick={this.onClickRightSide}
          className="right-btn"
        >
          {}
          <FaAngleRight className="angle-icon" />
        </button>
      </div>
    )
  }
}

export default Counter
