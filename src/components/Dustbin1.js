import React from "react";
import PropTypes from "prop-types";

import { DropTarget } from "react-dnd";
import ItemTypes from "../types";

const style = {
  height: "12rem",
  width: "12rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  color: "white",
  padding: "1rem",
  textAlign: "center",
  fontSize: "1rem",
  lineHeight: "normal",
  float: "left",
};

const boxTarget = {
  //当有对应的drag source 放在当前组件区域时，会返回一个对象，可以在monitor.getDropResult() 中获取到
  drop: () => ({ name: "Dustbin" }),
};

@DropTarget(
  ItemTypes.BOX,
  //接收拖拽的事件对象
  boxTarget,
  //收集功能函数，包含connect和monitor参数
  //connect 里面的函数用来将DOM节点与react-dnd的backend建立联系
  (connect, monitor) => ({
    //包裹住DOM节点，使其可以接收对应的拖拽组件
    connectDropTarget: connect.dropTarget(),
    //drag source是否在drop target区域
    isOver: monitor.isOver(),
    //是否可以被放置
    canDrop: monitor.canDrop(),
  })
)
class Dustbin extends React.Component {
  static propTypes = {
    canDrop: PropTypes.bool.isRequired,
    isOver: PropTypes.bool.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
  };

  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;

    let backgroundColor = "#222";
    //拖拽组件此时正处于drag target 区域时，当前组件背景色变为darkgreen
    if (isActive) {
      backgroundColor = "darkgreen";
    }
    //当前组件可以放置drag source 时，背景色变为pink
    else if (canDrop) {
      backgroundColor = "darkkhaki";
    }

    // 使用 connectDropTarget 包裹住 DOM 节点，使其可以接收对应的 drag source 组件
    // connectDropTarget 包裹住的 DOM 节点才能接收 drag source 组件
    return (
      connectDropTarget &&
      connectDropTarget(
        <div style={{ ...style, backgroundColor }}>
          {isActive ? "Release to drop" : "Drag a box here"}
        </div>
      )
    );
  }
}

export default Dustbin;
