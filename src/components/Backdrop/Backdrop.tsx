import React from 'react';

class Backdrop extends React.Component {
    show = () => {
        this.setState({ visible: true });
    };

    hide = () => {
        this.setState({ visible: false });
    };

    state = {
        visible: false,
    };

    render(): JSX.Element | null {
        return this.state.visible ? (
            <div className='backdrop' />
        ) : null;
    }
}

export default Backdrop;