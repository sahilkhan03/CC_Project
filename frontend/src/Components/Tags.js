import React, { Component } from 'react';
import Swal from 'sweetalert2'
import { withRouter } from 'react-router-dom'
import withReactContent from 'sweetalert2-react-content'
import { Tabs, Tab, Container, ListGroup } from 'react-bootstrap';

class Tags extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "tags": [],
            "activeType": "all",
        }
        this.setRedirect = this.setRedirect.bind(this)
    }
    componentDidMount() {
        this.props.removeAll()
        fetch('/api/tags/')
            .then(data => data.json())
            .then((res) => {
                console.log(res);
                this.setState({ "tags": res })
            })
    }

    setRedirect(item) {
        this.props.addTag(item);
        this.props.history.push('/tags/problems/')
    }

    render() {
        const MySwal = withReactContent(Swal)
        return (
            <div>
                <Container fluid="md">
                    <h2 className="d-flex justify-content-center">Tags</h2>
                    <Tabs
                        activeKey={this.state.activeType}
                        onSelect={(k) => this.setState({ activeType: k })}
                    >
                        <Tab eventKey="all" title="All" />
                        <Tab eventKey="author" title="Author" />
                        <Tab eventKey="actual_tag" title="Concepts" />
                    </Tabs>
                    <ListGroup>
                    {
                        this.state.tags.map(item => {
                            let curType = this.state.activeType
                            if (curType === "all" || curType === item.type)
                                return (
                                    <ListGroup.Item key={item.id} style={{ "cursor": "pointer" }} onClick={e =>
                                        MySwal.fire({
                                            title: item.tag_name,
                                            text: "Type: " + item.type + "  |  Count: " + item.count,
                                            showCancelButton: true,
                                            confirmButtonColor: '#3085d6',
                                            cancelButtonColor: '#d33',
                                            confirmButtonText: 'See Problems'
                                        }).then((result) => {
                                            if (result.value) {
                                                this.setRedirect(item)
                                            }
                                        })
                                    }> {item.tag_name} 
                                    </ListGroup.Item>
                                )
                            return null
                        })
                    }
                    </ListGroup>
                </Container>
            </div>
        )
    }
}
export default withRouter(Tags);