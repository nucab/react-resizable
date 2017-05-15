import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

class Resizable extends React.Component {
	static propTypes = {
		children: PropTypes.object.isRequired
	};

	constructor() {
		super();

		this.state = {
			node: null,
			position: 'left',
			startX: 0,
			width: 0,
			height: 0,
			startY: 0,
			startWidth: 0,
			startHeight: 0
		};
	}

	componentDidMount = () => {
		this.setState({
			width: this.divResizable.offsetWidth,
			startWidth: parseInt(this.divResizable.offsetWidth, 10)
		});

		this.divResizable.addEventListener('mousedown', this.handleDragStart);
	}

	handleDragStart = e => {

		this.setState({
			startX: e.clientX
		});

		document.documentElement.addEventListener('mousemove', this.handleDragging);
		document.documentElement.addEventListener('mouseup', this.handleDragStop);

		// Disable highlighting while dragging
		if(e.stopPropagation) e.stopPropagation();
		if(e.preventDefault) e.preventDefault();
		e.cancelBubble = true;
		e.returnValue = false;
	}

	handleDragging = e => {

		setTimeout(() => {
			const { startX, startWidth } = this.state;
			const width = startWidth + startX - e.clientX;

			this.setState({
				width
			});
		}, 50);
	}

	handleDragStop = () => {
		document.documentElement.removeEventListener('mousemove', this.handleDragging);
		document.documentElement.removeEventListener('mouseup', this.handleDragStop);
	}

	render() {


		const { position, width } = this.state;
		// console.log(width);

		let styles = {
			flexBasis: width
		};
		return (
			<div className="nj-resizable" ref={div => this.divResizable = div} style={styles}>
				{this.props.children}
				<div className={classNames('resizer', `resizer-${position}`)}><span>&nbsp;</span></div>
			</div>
		);
	}
}

export default Resizable;
