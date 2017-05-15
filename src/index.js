import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

class Resizable extends React.Component {
	static propTypes = {
		children: PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);

		this.state = Object.assign({}, {
			position: 'left',
			delay: 0,
			startX: 0,
			startY: 0,
			clientX: 0,
			width: 0,
			height: 0,
			startWidth: 0,
			startHeight: 0
		}, props);
	}

	componentDidMount = () => {
		this.resizerHandle.addEventListener('mousedown', this.handleDragStart);
	}

	handleDragStart = e => {

		const { startWidth, width } = this.state;
		this.setState({
			startWidth: 0,
			width: startWidth + width,
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
		const { startX, delay } = this.state;
		setTimeout(() => {
			let differenceX = startX - e.clientX;

			this.setState({
				startWidth: differenceX,
				clientX: e.clientX
			});
		}, delay);
	}

	handleDragStop = () => {
		document.documentElement.removeEventListener('mousemove', this.handleDragging);
		document.documentElement.removeEventListener('mouseup', this.handleDragStop);
	}

	render() {
		const { position, width, startWidth, className } = this.state;
		let styles = {
			flexBasis: width + startWidth
		};
		return (
			<div className={classNames('nj-resizable', className)} ref={div => this.divResizable = div} style={styles}>
				{this.props.children}
				<div ref={div => this.resizerHandle = div} className={classNames('resizer', `resizer-${position}`)}><span>&nbsp;</span></div>
			</div>
		);
	}
}

export default Resizable;
