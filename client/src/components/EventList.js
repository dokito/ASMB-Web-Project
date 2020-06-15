import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getEvents } from '../actions/eventActions';
import PropTypes from 'prop-types';


class EventList extends Component {
    static propTypes = {
        getEvents: PropTypes.func.isRequired,
        event: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.getEvents();
    }

    render() {
        const { events } = this.props.event;
        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="events-list">
                        {events.map(({ _id, nameOfEvent }) => (
                            <CSSTransition key={_id} timeout={500}>
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={this.onDeleteClick.bind(this, _id)}
                                    >
                                        &times;
										</Button>
                                    {nameOfEvent}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    event: state.event
});

export default connect(mapStateToProps, { getEvents })(EventList);