import React, { Component } from "react";
import { Menu, Dropdown, Icon, Row, Col, Input } from "antd";
const Search = Input.Search;
const { TextArea } = Input;
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestType: "GET",
            url: ""
        };
    }

    getMenu() {
        return (
            <Menu
                onClick={e => {
                    this.setState({ requestType: e.item.props.children });
                }}
            >
                <Menu.Item key="0">GET</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="1">POST</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3">DELETE</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="4">PUT</Menu.Item>
            </Menu>
        );
    }

    render() {
        return (
            <div>
                <br />
                <br />
                <br />
                <Row>
                    <Col lg={{ span: 7 }} />
                    <Col lg={{ span: 2 }}>
                        <Dropdown
                            style={{ margin: "10px" }}
                            overlay={this.getMenu()}
                            trigger={["click"]}
                        >
                            <a className="ant-dropdown-link">
                                {this.state.requestType} <Icon type="down" />
                            </a>
                        </Dropdown>
                    </Col>
                    <Col lg={{ span: 10 }}>
                        <Search
                            placeholder="input search text"
                            enterButton="Search"
                            size="large"
                            onSearch={value => {
                                if (this.state.requestType === "GET") {
                                    fetch(value, {
                                    method: "GET"
                                })
                                    .then(res => res.json())
                                    .then(resJson => console.log(resJson));
                                } else {
                                    fetch(value, {
                                        method: this.state.requestType,
                                        body: this.state.body
                                    })
                                        .then(res => res.json())
                                        .then(resJson => console.log(resJson));
                                }
                            }}
                        />
                    </Col>
                </Row>
                <br />
                <br />
                <br />
                <div className="col-md-4" />
                <div className="col-md-6">
                    <TextArea
                        placeholder="Autosize height based on content lines"
                        autosize
                        onChange={t => this.setState({ body: t.target.value })}
                    />
                    <div style={{ margin: "24px 0" }} />
                </div>
            </div>
        );
    }
}

// 9445842297
// http://localhost:1122/api/signup
// {"phone_number":9750187663}
